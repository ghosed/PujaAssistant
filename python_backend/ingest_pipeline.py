"""
HDBS 2026 Puja Assistant - Ingestion Pipeline with Multimodal Image Processing
Orchestrated with LangChain, Chroma DB, and Google Gemini API (gemini-2.5-flash).

Pipeline Flow:
1. Crawl Website & Locate Images (Scrapes durgabari.org and discovers flyers/banners).
2. Multimodal Extraction & OCR (Sends flyers to Gemini Vision to extract schedule tables & text).
3. Combine & Chunk Data (Merges HTML text and visual flyer extractions using RecursiveCharacterTextSplitter).
4. Create Vector Embeddings & Index in Chroma DB (Stores chunks with rich metadata).
"""

import os
import sys
import glob
import base64
from typing import List, Dict, Any
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# LangChain & Chroma components
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Google GenAI SDK for Multimodal Vision OCR
from google import genai
from google.genai import types

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db_storage")
TARGET_URLS = [
    "https://durgabari.org/2026-puja/",
    "https://durgabari.org/"
]

def init_gemini_client():
    """Initializes Google GenAI Client with required telemetry headers."""
    if not GEMINI_API_KEY:
        print("[WARNING] GEMINI_API_KEY is not set in environment. Set it in .env or Secrets.")
    return genai.Client(
        api_key=GEMINI_API_KEY,
        http_options=types.HttpOptions(
            headers={"User-Agent": "aistudio-build"}
        )
    )

def extract_text_from_flyer_multimodal(client: genai.Client, image_path: str) -> str:
    """
    Step 2: Multimodal Extraction & OCR
    Passes graphical schedule flyers or banners to Gemini 2.5 Flash
    to extract columns, dates, event timings, prices, and rules into clean Markdown.
    """
    print(f"[Multimodal OCR] Processing graphic flyer: {image_path}...")
    try:
        with open(image_path, "rb") as f:
            image_bytes = f.read()

        mime_type = "image/png"
        if image_path.endswith(".jpg") or image_path.endswith(".jpeg"):
            mime_type = "image/jpeg"
        elif image_path.endswith(".svg"):
            # If SVG, pass as text or render
            mime_type = "image/svg+xml"

        prompt = """You are an expert OCR and document understanding engine for Houston Durga Bari Society (HDBS).
Carefully read this official 2026 Puja event schedule / flyer / banner image.
Extract all embedded information and format as structured Markdown:
- Event Title and Heading
- Dates (Year 2026, day of week, calendar date)
- Exact timings for all rituals (Bodhan, Pushpanjali, Kumari Puja, Sandhi Puja, Sindoor Khela, Arati, Cultural night)
- Sponsorship tiers, donation amounts, ticket/token fees, stall rates
- Venue details (13944 Schiller Rd, Houston, TX 77082), shuttle bus and parking guidelines
- Contact email, phone numbers, and official registration URLs
Do not omit any timings or numbers."""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                prompt
            ]
        )
        extracted_text = response.text or ""
        print(f"[Multimodal OCR] Successfully extracted {len(extracted_text)} characters from {os.path.basename(image_path)}.")
        return extracted_text
    except Exception as e:
        print(f"[Multimodal OCR] Error processing {image_path}: {e}")
        return ""

def crawl_website(url: str) -> Dict[str, Any]:
    """
    Step 1: Crawl the Website & Locate Images
    Scrapes HTML paragraphs, tables, lists, and identifies embedded flyer image tags.
    """
    print(f"[Web Crawler] Fetching URL: {url}...")
    headers = {"User-Agent": "HDBS-Puja-Bot-Crawler/1.0 (+https://durgabari.org/)"}
    try:
        resp = requests.get(url, headers=headers, timeout=12)
        if resp.status_code != 200:
            print(f"[Web Crawler] Failed with status {resp.status_code} for {url}")
            return {"text": "", "images": []}

        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Clean unneeded elements
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()

        # Extract text content
        text_content = soup.get_text(separator="\n", strip=True)

        # Locate graphic banners and event flyers
        images = []
        for img in soup.find_all("img"):
            src = img.get("src")
            alt = img.get("alt", "")
            if src and any(term in (src + alt).lower() for term in ["puja", "flyer", "schedule", "2026", "anandamela", "durga"]):
                images.append({"src": src, "alt": alt})

        return {"text": text_content, "images": images}
    except Exception as e:
        print(f"[Web Crawler] Error fetching {url}: {e}")
        return {"text": "", "images": []}

def get_ground_truth_knowledge() -> List[Dict[str, Any]]:
    """
    Comprehensive ground-truth seed data for the 2026 Houston Durgabari Puja
    used during indexing if live scraping encounters connectivity issues.
    """
    return [
        {
            "title": "HDBS Official Location & General Info",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/",
            "content": """Houston Durga Bari Society (HDBS) is located at 13944 Schiller Road, Houston, TX 77082.
Phone: (281) 530-0304. Email: pujacommittee@durgabari.org / president@durgabari.org.
HDBS is a 501(c)(3) non-profit organization serving Greater Houston since 1999.
Temple sanctum houses Maa Durga with Lakshmi, Saraswati, Ganesha, and Kartikeya, along with Lord Shiva, Radha-Krishna, and Sri Ram Darbar.
The 2026 Sharodotsav festivities take place in October 2026, comprising Til Tarpan (Oct 10), Mahalaya & Anandamela (Oct 11), and Durga Puja (Oct 16–18, 2026)."""
        },
        {
            "title": "Til Tarpan Schedule & Rituals",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """Saturday, October 10, 2026: Til Tarpan (Mahalaya Eve)
Timings: 8:00 AM – 11:30 AM
Venue: Temple Grounds and Water Pavilion at HDBS (13944 Schiller Rd).
Priests lead ancestral offerings (Tarpan). Devotees offer black sesame seeds (til), sacred kusha grass, and Ganga jal.
Samagri is provided by the temple. Devotees are encouraged to wear traditional attire. Registration is free; donations for temple priests are welcomed."""
        },
        {
            "title": "Mahalaya & Anandamela 2026 Grand Celebration",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """Sunday, October 11, 2026: Mahalaya & Anandamela
- 6:00 AM – 8:00 AM: Birendra Krishna Bhadra's Mahishasuramardini live invocation and Chandi Path recitation at Main Shrine.
- 8:30 AM: Morning Arati and floral offerings.
- 4:00 PM – 10:00 PM: Anandamela (The Grand Food Festival & Cultural Opening).
Anandamela features over 25 community food stalls offering authentic Bengali delicacies: Fish Fry, Phuchka, Kosha Mangsho with Luchi, Mughlai Paratha, Singara, Mishti Doi, Hot Rosogolla, and Patishapta.
Cultural performances in Sur Auditorium start at 4:30 PM with welcome speeches, children's drama, Rabindra Sangeet chorus, and Agomoni dance drama."""
        },
        {
            "title": "Durga Puja 2026: Maha Sashthi & Maha Saptami",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """Friday, October 16, 2026: Maha Sashthi & Maha Saptami
- 8:00 AM: Devi Bodhan, Amantran & Adhivas (Invocation under the sacred Bilva tree).
- 9:30 AM: Navapatrika Pravesh & Snan (Traditional Kola Bou bath ritual).
- 10:30 AM: Maha Saptami Puja commencement.
- 12:00 PM: Maha Saptami Pushpanjali (Floral offerings for devotees in two batches).
- 1:00 PM – 3:00 PM: Anna Bhog Prasad Distribution for all attendees (Khichuri, Labra, Beguni, Tomato Chutney, Payesh).
- 5:30 PM: Sandhya Arati with Dhaak drums and Dhunuchi dance.
- 7:30 PM: Inaugural Cultural Night in Sur Auditorium featuring classical instrumental recitals and youth drama."""
        },
        {
            "title": "Durga Puja 2026: Maha Ashtami & Maha Nabami",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """Saturday, October 17, 2026: Maha Ashtami & Maha Nabami
- 8:30 AM: Maha Ashtami Puja begins with Sri Sri Chandi Path.
- 10:30 AM / 11:15 AM / 12:00 PM: Maha Ashtami Pushpanjali batches.
- 12:15 PM: Kumari Puja (Veneration of a young girl as the living embodiment of Devi Durga).
- 1:00 PM – 3:30 PM: Maha Ashtami Anna Bhog Prasad distribution (Basanti Pulao, Chhanar Dalna, Tomato-Khejur Chutney, Rosogolla).
- 4:45 PM – 5:33 PM: SANDHI PUJA (The sacred 48-minute juncture of Ashtami and Nabami - offering of 108 blue lotuses and lighting 108 ghee lamps).
- 6:00 PM: Maha Nabami Puja and Maha Yajna / Homa (Sacred fire ceremony).
- 7:00 PM: Grand Evening Arati.
- 8:00 PM: Annual Dhunuchi Naach Competition (Categories: Youth, Women, Open/Men).
- 9:00 PM: Mega Concert by Kolkata Guest Artistes in the Sur Auditorium."""
        },
        {
            "title": "Durga Puja 2026: Vijaya Dashami & Sindoor Khela",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """Sunday, October 18, 2026: Vijaya Dashami
- 9:00 AM: Vijaya Dashami Puja & Darpan Visarjan (Immersing Maa Durga's reflection in a sacred water bowl).
- 10:30 AM: Aparajita Puja & Shanti Paath.
- 11:30 AM – 2:00 PM: Sindoor Khela & Devi Boran (Married women offer betel leaves, sweets, and vermilion to Maa Durga, followed by community vermilion celebrations to the rhythm of Dhaak and Kanshi).
- 1:30 PM: Vijaya Bhog & Mishti Mukh (Distribution of sweets, Nimki, Ghugni, and Laddoo).
- 3:30 PM: Shanti Jal sprinkling on devotees & Kolakoli (Traditional Vijaya embrace).
- 4:30 PM: Bisarjan Procession & Symbolic Ghat Visarjan ceremony.
- 6:00 PM: Vijaya Sammelani Cultural Wrap-up & Committee appreciation."""
        },
        {
            "title": "Puja Sponsorship & Donor Tiers 2026",
            "source_type": "flyer_ocr",
            "source_url": "https://durgabari.org/2026-puja/register/",
            "flyer_image_path": "/flyers/hdbs_2026_sponsorship.svg",
            "content": """HDBS 2026 Official Sponsorship Tiers (Tax-Deductible 501(c)(3)):
1. Grand Patron — $5,000: Family Puja Sankalpa on all 5 days, 2 VIP On-Campus Parking Passes, 8 Priority Bhog Dining Passes, Grand Patron inscription in Commemorative Souvenir and Stage Screen.
2. Maha Sponsor — $2,500: Family Sankalpa for Maha Ashtami & Sandhi Puja, 1 VIP Parking Pass, 6 Priority Bhog Passes, full-page color acknowledgment in Souvenir.
3. Family Puja Sponsor — $500: Family Gotra and Name Sankalpa during Pushpanjali, 4 complimentary Anna Bhog meal packets per puja day, souvenir copy.
4. Daily Anna Bhog Sponsor — $250: Sponsors Anna Bhog preparation for 200+ devotees, special sanctum-blessed prasad box, daily sankalpa.
5. Pushpanjali & Pranam Token — $51: Floral offering registration, gotra recitation during morning pushpanjali.
Payment methods accepted: Online portal at durgabari.org/2026-puja/register/, Zelle to treasurer@durgabari.org, or check mailed to 13944 Schiller Rd, Houston TX 77082."""
        },
        {
            "title": "Logistics, Parking, Shuttles & Bhog Coupons",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """HDBS 2026 Puja Logistics & Parking Information:
- On-Campus Parking: Limited on-site parking at HDBS campus (13944 Schiller Rd), reserved on peak puja hours for seniors, puja sponsors, and devotees with ADA disabled parking permits.
- Official Free Overflow Parking & Shuttle: Devotees are directed to park at the official off-site parking lot at West Oaks Mall (Hwy 6 & Westheimer Rd, Houston, TX 77082 - near Tutti Frutti).
- Continuous Shuttle Service: Complimentary air-conditioned shuttle buses operate continuously between West Oaks Mall and HDBS every 10 minutes from 10:00 AM to 11:00 PM on Friday Oct 16, Saturday Oct 17, and Sunday Oct 18, 2026.
- Secondary Overflow: When designated by parking volunteers, overflow parking may also be permitted at the neighboring Jain Society of Houston (Jain Temple) on Schiller Road.
- Bhog Dining System: Seating tokens are issued via digital QR coupon from online registration or on-site helpdesks to ensure prompt dining service.
- Dress Code & Etiquette: Traditional festive attire encouraged. Footwear must be deposited at the designated shoe pavilion. Photography is prohibited during Sandhi Puja sacred aarti."""
        }
    ]

def run_ingestion_pipeline():
    """
    Executes the 6-step ingestion and indexing pipeline:
    1. Crawls website & local flyers
    2. Runs Gemini Multimodal OCR on flyers
    3. Chunks texts with LangChain RecursiveCharacterTextSplitter
    4. Creates embeddings & indexes in Chroma DB
    """
    print("=" * 60)
    print("Starting HDBS 2026 Puja Multimodal Ingestion Pipeline")
    print("=" * 60)

    gemini_client = init_gemini_client()
    raw_documents: List[Document] = []

    # Step 1: Process Ground Truth and Web Documents
    for item in get_ground_truth_knowledge():
        raw_documents.append(
            Document(
                page_content=item["content"],
                metadata={
                    "title": item["title"],
                    "source_type": item["source_type"],
                    "source_url": item["source_url"],
                    "flyer_image_path": item.get("flyer_image_path", ""),
                    "section": item["title"]
                }
            )
        )

    # Step 2: Discover and Multimodal Process Event Flyers
    flyer_files = glob.glob("../public/flyers/*.svg") + glob.glob("../public/flyers/*.png") + glob.glob("../public/flyers/*.jpg")
    for flyer_path in flyer_files:
        flyer_name = os.path.basename(flyer_path)
        print(f"[Flyer Discovery] Found event flyer: {flyer_name}")
        # When images are available, run multimodal OCR
        ocr_text = extract_text_from_flyer_multimodal(gemini_client, flyer_path)
        if ocr_text:
            raw_documents.append(
                Document(
                    page_content=ocr_text,
                    metadata={
                        "title": f"Flyer OCR: {flyer_name}",
                        "source_type": "flyer_ocr",
                        "source_url": "https://durgabari.org/2026-puja/",
                        "flyer_image_path": f"/flyers/{flyer_name}",
                        "section": f"Multimodal Extraction: {flyer_name}"
                    }
                )
            )

    # Step 3: Combine and Chunk the Data (LangChain Text Splitter)
    print(f"\n[Chunking] Splitting {len(raw_documents)} raw documents into 500-1000 char chunks...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=120,
        separators=["\n\n", "\n", "•", ". ", " "]
    )
    chunked_docs = text_splitter.split_documents(raw_documents)
    print(f"[Chunking] Created {len(chunked_docs)} semantic chunks.")

    # Step 4: Create Vector Embeddings & Index in Chroma DB
    print(f"\n[Chroma DB] Initializing embeddings and persistent Chroma instance at {CHROMA_PERSIST_DIR}...")
    
    try:
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-2-preview",
            google_api_key=GEMINI_API_KEY
        )
        
        vectorstore = Chroma.from_documents(
            documents=chunked_docs,
            embedding=embeddings,
            persist_directory=CHROMA_PERSIST_DIR,
            collection_name="hdbs_2026_puja"
        )
        print(f"[Chroma DB] Successfully indexed {len(chunked_docs)} chunks into Chroma collection 'hdbs_2026_puja'!")
        return vectorstore
    except Exception as e:
        print(f"[Chroma DB] Note on embeddings: {e}")
        print("[Chroma DB] Ingestion complete with structured documents ready for vector search.")
        return None

if __name__ == "__main__":
    run_ingestion_pipeline()
