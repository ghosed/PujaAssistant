# HDBS 2026 Puja Assistant - Python & LangChain RAG Stack

This folder contains the complete Python-based Retrieval-Augmented Generation (RAG) backend utilizing **LangChain**, **Chroma DB**, and **Google Gemini (gemini-2.5-flash & gemini-embedding-2-preview)**.

---

## 🏛️ Architecture Overview

```
[HDBS Website: durgabari.org]        [Event Graphic Flyers & Banners]
          │                                         │
          ▼                                         ▼
   Web Crawler (BS4)                  Gemini 2.5 Flash Vision OCR
   Extracts text & image tags         Extracts tables, timings & rates
          │                                         │
          └─────────────────┬───────────────────────┘
                            ▼
              LangChain Text Splitter
           (RecursiveCharacterTextSplitter)
                            │
                            ▼
              Gemini Embeddings Generator
             (gemini-embedding-2-preview)
                            │
                            ▼
            Chroma Vector Database (Local)
            - Chunks, vectors, metadata
            - Source attribution tags
                            │
                 ┌──────────┴──────────┐
                 │ User Question Query │
                 └──────────┬──────────┘
                            ▼
              Similarity Retrieval (Top K)
                            │
                            ▼
               Strict Grounding Prompt
           - Anti-hallucination guardrail
           - Source citation builder
                            │
                            ▼
                   Gemini 2.5 Flash
                            │
                            ▼
               Grounded Response to Devotee
```

---

## 🚀 Setup & Execution

### 1. Create a Python Virtual Environment
```bash
cd python_backend
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Environment Variables
Add your Gemini API Key in `.env` (or pass it directly):
```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 4. Run the Ingestion Pipeline
To crawl the HDBS site, run Multimodal OCR on flyers, and populate Chroma DB:
```bash
python ingest_pipeline.py
```

### 5. Query the Assistant via CLI
```bash
python rag_chain.py "What are the timings for Sandhi Puja and Kumari Puja?"
```

### 6. Run the FastAPI Web Server (Optional)
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be accessible at: `http://localhost:8000/docs`
