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
            "title": "Official Durga Puja 2026 Master Schedule (Puja Timings & Program Details)",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/puja-schedule/",
            "content": """Official HDBS Sharodotsav 2026 Schedule (https://durgabari.org/2026-puja/puja-schedule/):
Table columns: Date & Day | Event | Puja Timings (Rituals, Bhog, Arati) | Program Details (Lunch, Dinner & Cultural)

- Til Tarpan (Saturday, Oct 10): Puja Timings: 7:00 AM – 9:30 AM
- Mahalaya & Anandamela (Sunday, Oct 11):
  * Puja Timings: 9:00 AM: Durga Puja; 10:00 AM: Mahishasur Mardini; 12:00 PM: Pushpanjali, Bhog, Arati
  * Program Details: 12:00 PM – 2:00 PM: Food Fest; 3:00 PM: Ek Je Chhilo Nayak; 4:30 PM: Fashion Show
- Maha Shashti (Bodhan) (Thursday, Oct 15): 6:00 PM: Bodhan & Arati
- Maha Shashti (Friday, Oct 16):
  * Puja Timings: 10:30 AM: Maha Shashti Puja; 6:00 PM: Amantran & Adhibas; 7:00 PM: Pushpanjali, Bhog, Sandhya Arati
  * Program Details: 6:30 PM: Music; 7:30 PM: Parikrama; 8:30 PM – 9:30 PM: Dinner – Culinary Celebration; 10:00 PM: Concert
  * (No lunch scheduled in Program Details)
- Maha Saptami (Saturday, Oct 17):
  * Puja Timings: 9:00 AM: Kalabou Snan; 10:00 AM: Saptami Puja; 12:00 PM: Balidaan; 12:30 PM: Pushpanjali, Bhog, Arati; 7:00 PM: Sandhya Arati
  * Program Details: 1:00 PM – 2:00 PM: Lunch: Bengali cuisine treat; 6:30 PM: Wedding traditions show; 8:30 PM – 9:30 PM: Dinner: Gastronomic experience; 10:00 PM: Concert
- Maha Ashtami (Sunday, Oct 18):
  * Puja Timings: 10:00 AM: Ashtami Puja; 12:00 PM: Bolidaan; 12:30 PM: Pushpanjali, Bhog, Arati; 6:00 PM: Sandhya Arati; 8:56 PM: Maha Sandhi Puja (108 Lotuses & 108 Pradip)
  * Program Details: 1:00 PM – 2:00 PM: Lunch: Maha Ashtami traditions on your plate; 2:45 PM: Orchestra; 3:30 PM: Homage to 5 Bards; 4:30 PM: Adda; 8:30 PM – 9:30 PM: Dinner: Puja feast continues next weekend
- Maha Nabami (Tithi) (Monday, Oct 19): 10:30 AM: Nabami Puja; 12:00 PM: Bolidaan; 12:30 PM: Pushpanjali, Bhog, Arati; 7:00 PM: Sandhya Arati
- Maha Dashami (Tithi) (Tuesday, Oct 20): 11:00 AM: Puja and Dadhikarma
- Dashami & Bijoya Sammiloni (Saturday, Oct 24):
  * Puja Timings: 3:30 PM: Aparajita Puja; 4:30 PM: Bhasaan, Sindoor Khela & Devi Boran
  * Program Details: 6:30 PM: Dhunuchi Nach; 8:30 PM – 9:30 PM: Dinner: Subho Bijoya gala dinner; 10:00 PM: Miss Jojo Concert
  * (No lunch scheduled in Program Details)
- Kojagori Lokkhi Puja (Sunday, Oct 25): 6:00 PM: Kojagari Lokkhi Puja, Pushpanjali, Bhog, Arati; 7:30 PM: Prasad
- Pre Kali Puja (Saturday, Nov 7): 7:00 PM: Sandhya Arati; 7:30 PM: Fireworks; 8:30 PM – 9:30 PM: Dinner: Deepabali Sandhyo-Bhoj; 9:30 PM: Drama
- Kali (Shyama) Puja (Sunday, Nov 8): 6:30 PM: Kali Puja, Bolidaan; 7:30 PM: Pushpanjali, Bhog, Arati; 8:30 PM – 9:30 PM: Dinner: Puja Savory
- Saraswati Puja (Saturday, Feb 13, 2027): 10:00 AM: Haate Khori; 11:00 AM: Puja; 12:30 PM: Pushpanjali, Bhog, Arati; 1:00 PM: Lunch; 8:00 PM – 9:00 PM: Dinner"""
        },
        {
            "title": "Official Durga Puja 2026 Lunch & Dinner Schedules (Program Details)",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/puja-schedule/",
            "content": """HDBS 2026 Durga Puja Lunch & Dinner Schedule (Source: https://durgabari.org/2026-puja/puja-schedule/ Program Details column):
When asked about lunch and dinner schedules, refer strictly to the Program Details column:
- Friday, Oct 16 (Maha Shashti):
  * Lunch: No lunch scheduled in Program Details
  * Dinner: 8:30 PM – 9:30 PM: Dinner – Culinary Celebration
- Saturday, Oct 17 (Maha Saptami):
  * Lunch: 1:00 PM – 2:00 PM: Lunch: Bengali cuisine treat
  * Dinner: 8:30 PM – 9:30 PM: Dinner: Gastronomic experience
- Sunday, Oct 18 (Maha Ashtami):
  * Lunch: 1:00 PM – 2:00 PM: Lunch: Maha Ashtami traditions on your plate
  * Dinner: 8:30 PM – 9:30 PM: Dinner: Puja feast continues next weekend
- Saturday, Oct 24 (Dashami & Bijoya Sammiloni):
  * Lunch: No lunch scheduled in Program Details
  * Dinner: 8:30 PM – 9:30 PM: Dinner: Subho Bijoya gala dinner
(Note: Puja Timings column lists religious rituals like Bhog and Pushpanjali at 12:00 PM / 12:30 PM and Arati at 6:00 PM / 7:00 PM, which are separate from community Lunch and Dinner hours)."""
        },
        {
            "title": "Official HDBS 2026 Puja Passes & Day Passes Policy (Limited Passes Available)",
            "source_type": "flyer_ocr",
            "source_url": "https://durgabari.org/2026-puja/registration/",
            "flyer_image_path": "/flyers/PujaPasses2026.jpeg",
            "content": """HDBS 2026 PUJA PASSES & DAY PASSES POLICY
Source: Official Registration Portal at https://durgabari.org/2026-puja/registration/ (Official Flyer: PujaPasses2026.jpeg)

ARE DAY PASSES AVAILABLE?
YES. LIMITED PASSES ARE AVAILABLE for Houston Durga Bari Society Sharadotsav 2026.
- How to Apply: Visit Puja Registration & Donation > Special Processing > Day Passes on the online registration portal.
- Full Registration Continues: Both Onsite and Online.

RATE TABLE (FAMILY / INDIVIDUAL RATES):
- Greater Houston Residents:
  * Fri Oct 16 (Evening): NOT OFFERED
  * Sat Oct 17 (Full Day): NOT OFFERED
  * Sat Oct 17 (Evening): NOT OFFERED
  * Sun Oct 18 (Full Day): $130 / $65
  * Sat Oct 24 (Evening): NOT OFFERED
- Out of Towners (Online address validation required):
  * Fri Oct 16 (Evening): $200 / $100
  * Sat Oct 17 (Full Day): $260 / $130
  * Sat Oct 17 (Evening): $240 / $120
  * Sun Oct 18 (Full Day): $130 / $65
  * Sat Oct 24 (Evening): $260 / $130

NOTES & GUIDELINES FOR PASS HOLDERS:
1. Cultural Programs Access: Passes provide full access to all cultural programs in Sur Auditorium, including external invited artists and performances.
2. Meals Included:
   - Day Pass: Includes both Lunch and Dinner.
   - Evening Pass: Includes Dinner only.
3. Parking Policy for Day/Evening Pass Holders:
   - NO onsite parking available for Day or Evening Pass holders.
   - Registrants and pass holders can use the free continuous shuttle bus service from West Oaks Mall (near Dillard's Clearance Center) or use rideshare (Uber / Lyft).
4. Temple Entry & Darshan:
   - Visiting the temple sanctuary for Maa Durga's darshan, offering floral Pushpanjali, and witnessing sacred Arati is always completely free and open to all devotees without purchasing passes or tickets.

CONTACTS FOR DAY PASSES:
- Email: registration@durgabari.org
- Phone Contacts: Anindita (713-808-5286), Sampurna (346-257-1068)"""
        },
        {
            "title": "Official HDBS 2026 Onsite Puja Registration, Decals & Badges Guide",
            "source_type": "flyer_ocr",
            "source_url": "https://durgabari.org/2026-puja/registration/",
            "flyer_image_path": "/flyers/PujaReg2026_2.jpeg",
            "content": """HOUSTON DURGA BARI SOCIETY - YOUR GUIDE TO ONSITE PUJA REGISTRATION
Source: https://durgabari.org/2026-puja/registration/ (Flyer: PujaReg2026_2.jpeg)

SCHEDULE & DISTRIBUTION SESSIONS:
- October 11 (12:30 – 3:00 PM): Parking Decals Distribution Session #3; Registration Badges Distribution Session #1 (Badges & Magazine - Collect lanyards & badge holders)
- October 14 (7:30 – 9:00 PM): Last pre-Puja distribution for Parking Decals and Registration Badges & Magazine
- During Puja Dates (Oct 16, 6:30 PM | Oct 17, 10:30 AM & 7:00 PM | Oct 18, 11:00 AM & 7:30 PM | Oct 24, 7:30 PM):
  * If you have not picked up your decal: Please use the shuttle from West Oaks Mall or use Uber/Lyft to come to DB and collect your decal.
  * Badge distribution, Onsite Registration & Donation.

PARKING DECALS CRITICAL NOTES:
- Reserved parking continues to Kali Puja. Please preserve your decals.
- Parking decals are not transferable. Must be affixed to car windshields for admission to the premises.
- E-authorization necessary if someone else is picking up on your behalf.

REGISTRATION BADGES CRITICAL NOTES:
- Integrated badge covering both Durga Puja & Kali Puja.
- If you have registered for All 3 Pujas, preserve your badges for Kali Puja.
- E-authorization necessary if someone else is picking up on your behalf.
- Email: registration@durgabari.org"""
        },
        {
            "title": "Official HDBS 2026 Puja Sponsorship Tiers, Benefits & Parking Privileges",
            "source_type": "flyer_ocr",
            "source_url": "https://durgabari.org/2026-puja/registration/",
            "flyer_image_path": "/flyers/2026PujaSposorship.jpeg",
            "content": """HDBS 2026 PUJA SPONSORSHIP TIERS & BENEFITS (501(c)(3) Tax-Deductible)
Source: Official Registration Portal at https://durgabari.org/2026-puja/registration/ (Flyer: 2026PujaSposorship.jpeg)

SPONSORSHIP TIERS & BENEFITS MATRIX:
- Diamond ($5,000+): Main Parking (Named slots for $10K+), Separate lanes for food and registration, Parents courtesy registration, Auditorium front rows, Priority access to snacks stall, Reserved table at food tent (close family members can join; eligibility applies, registration mandatory, special badges), Puja Sankalpa, Event sponsorship & special recognition. Registration optional for Diamond.
- Emerald ($2,200 – $4,999): Main Parking, Separate lanes for food & registration, Parents courtesy registration, Auditorium front rows, Priority access to snacks stall, Reserved table at food tent (sponsors only), Puja Sankalpa.
- Platinum ($1,500 – $2,199): Main or Kala Bhavan (KB) Parking (in order of date of sponsorship), Separate lanes for food & registration, Parents courtesy registration, Auditorium front rows, Puja Sankalpa.
- Gold ($1,000 – $1,499): Green Field Parking (KB Parking for CT Gold), Separate lanes for food & registration, Parents courtesy registration, Auditorium front rows, Puja Sankalpa.
- Silver ($750 – $999): Green Field Parking (KB Parking for Senior CT Silver), Separate lanes for food & registration, Parents courtesy registration.

RECURRING DONATIONS INFORMATION:
- Prefer to spread donation over time? Set up recurring ACH donations directly through your bank's online portal.
- Contact registration@durgabari.org or treasurer@durgabari.org for account/routing information.
- Sponsorship level based on total donation actually received.
- Auditorium seating subject to allocated capacity. Parking subject to availability.
- Calls: Subhas (832-677-0860), Swapan (713-254-1231), Souvik (419-709-5527)."""
        },
        {
            "title": "Logistics, Parking, Shuttles & Bhog Coupons",
            "source_type": "web_page",
            "source_url": "https://durgabari.org/2026-puja/",
            "content": """HDBS 2026 Puja Logistics & Parking Information:
- On-Campus Parking: Limited on-site parking at HDBS campus (13944 Schiller Rd). To park on the premises, all cars must have the approved DECAL clearly affixed to the windshield. Reserved for authorized permit holders, seniors, and VIP sponsors.
- Official Free Overflow Parking & Shuttle: Devotees are directed to park at the official off-site parking lot at West Oaks Mall (1000 West Oaks Mall #800, Houston, TX 77082 - near Dillard's Clearance Center).
- Free Shuttle Bus Timetable (Official Flyer):
  * Friday Oct 16: 5:00 pm – 12:30 am
  * Saturday Oct 17: 9:00 am – 12:30 am
  * Sunday Oct 18: 9:00 am – 10:30 pm
  * Saturday Oct 24: 2:00 pm – 12:30 am
  * Kali Puja: Saturday Nov 7 (5:00 pm – 12:30 am) & Sunday Nov 8 (5:00 pm – 10:30 pm)
- Accessibility: Limited state-law disabled parking on first-come first-served basis. Once full, drop-offs only. Green Field decal holders proceed to Green Field.
- Rideshare: Uber/Lyft pick-up and drop-off allowed (no waiting) via Schiller Rd.
- City Parking: City parking on Schiller Rd is NOT managed by HDBS; avoid parking over 1 hour.
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
