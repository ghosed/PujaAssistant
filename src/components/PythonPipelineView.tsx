import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, FileCode, Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const PYTHON_INGEST_CODE = `"""
HDBS 2026 Puja Assistant - Ingestion Pipeline with Multimodal Image Processing
Orchestrated with LangChain, Chroma DB, and Google Gemini API (gemini-2.5-flash).
"""

import os
import glob
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from google import genai
from google.genai import types
import requests
from bs4 import BeautifulSoup

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHROMA_PERSIST_DIR = "./chroma_db_storage"

def extract_flyer_multimodal(client, image_path: str) -> str:
    \"\"\"Step 2: Multimodal Extraction & OCR with Gemini 2.5 Flash\"\"\"
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    prompt = \"\"\"You are an expert OCR engine for Houston Durga Bari Society (HDBS).
Extract all tables, timings, dates, ritual names, and sponsorship amounts from this 2026 Puja flyer.
Output clean structured Markdown.\"\"\"

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=image_bytes, mime_type="image/png"),
            prompt
        ]
    )
    return response.text or ""

def run_ingestion():
    # Initialize Google GenAI client
    client = genai.Client(api_key=GEMINI_API_KEY)
    documents = []

    # 1. Scrape Durgabari website
    resp = requests.get("https://durgabari.org/2026-puja/")
    soup = BeautifulSoup(resp.text, "html.parser")
    web_text = soup.get_text(separator="\\n", strip=True)
    documents.append(Document(page_content=web_text, metadata={"source": "durgabari.org/2026-puja"}))

    # 2. Extract embedded flyers via Gemini Vision
    for flyer in glob.glob("./flyers/*.png"):
        ocr_text = extract_flyer_multimodal(client, flyer)
        documents.append(Document(page_content=ocr_text, metadata={"source": flyer, "type": "flyer_ocr"}))

    # 3. LangChain Recursive Chunking
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
    chunks = text_splitter.split_documents(documents)

    # 4. Generate Embeddings & Persist to Chroma DB
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2-preview")
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_PERSIST_DIR,
        collection_name="hdbs_2026_puja"
    )
    print(f"Indexed {len(chunks)} chunks into Chroma DB successfully!")

if __name__ == "__main__":
    run_ingestion()
`;

const PYTHON_RAG_CODE = `"""
HDBS 2026 Puja Assistant - LangChain Grounded Retrieval Chain
"""

import os
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

SYSTEM_PROMPT = \"\"\"You are the official "HDBS 2026 Puja Assistant" for Houston Durga Bari Society (HDBS).
Answer the user's question using ONLY the provided retrieved context.

MANDATORY RULES:
1. Concise & Scannable: No dense paragraphs; format answers as concise bulleted lists or Markdown tables.
2. Parking Clarification: Offsite parking is NOT at Alief High School. Official overflow is at West Oaks Mall with free 10-min shuttles.
3. Official Citations: Always conclude with an explicit "### 📍 Official Source Citation" section.
4. Strict Anti-Hallucination: If missing, state: "I'm sorry, but I can't find that specific information on the Houston Durgabari website or event flyers. Please check https://durgabari.org/ or contact the Puja Committee directly."
5. Warm Community Tone: "Joy Maa Durga!"

RETRIEVED CONTEXT:
{context}

USER QUESTION:
{question}

HELPFUL GROUNDED RESPONSE (BULLETED LIST OR TABLE WITH CITATION):\"\"\"

def query_assistant(question: str):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2-preview")
    vectorstore = Chroma(persist_directory="./chroma_db_storage", embedding_function=embeddings, collection_name="hdbs_2026_puja")
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.1)
    prompt = ChatPromptTemplate.from_template(SYSTEM_PROMPT)

    def format_docs(docs):
        return "\\n\\n".join([f"[{d.metadata.get('source')}]\\n{d.page_content}" for d in docs])

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    answer = rag_chain.invoke(question)
    docs = retriever.invoke(question)
    return {"answer": answer, "sources": [d.metadata for d in docs]}
`;

const PYTHON_REQUIREMENTS = `langchain>=0.3.0
langchain-community>=0.3.0
langchain-chroma>=0.2.0
chromadb>=0.5.0
google-genai>=0.1.0
langchain-google-genai>=2.0.0
beautifulsoup4>=4.12.0
requests>=2.31.0
pydantic>=2.7.0
pillow>=10.0.0
fastapi>=0.110.0
uvicorn>=0.28.0
`;

export const PythonPipelineView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'ingest' | 'rag' | 'req'>('ingest');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (selectedFile) {
      case 'ingest':
        return PYTHON_INGEST_CODE;
      case 'rag':
        return PYTHON_RAG_CODE;
      case 'req':
        return PYTHON_REQUIREMENTS;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-8 text-stone-800">
      {/* Visual Pipeline Flowchart */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 p-6 rounded-2xl border border-amber-200/90 shadow-sm space-y-6">
        <div>
          <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">
            Architecture Blueprint
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
            Python LangChain &amp; Chroma RAG Architecture
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl mt-1">
            How the 6-step ingestion, multimodal OCR vision, and vector retrieval flow operates from end to end:
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Step 1 */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-mono text-[10px]">
              STEP 1
            </span>
            <div className="font-bold text-stone-900">Crawl &amp; Locate Images</div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Crawls durgabari.org and identifies all embedded schedule &amp; flyer graphic tags.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 bg-white rounded-xl border border-orange-300 shadow-xs space-y-1.5 ring-1 ring-orange-200">
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold font-mono text-[10px]">
              STEP 2
            </span>
            <div className="font-bold text-orange-950">Gemini Vision OCR</div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Multimodal extraction of timings, booth fees, and schedules from image banners.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-mono text-[10px]">
              STEP 3
            </span>
            <div className="font-bold text-stone-900">LangChain Chunking</div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Recursive splitter splits unified text into 500-800 char chunks with overlap.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-mono text-[10px]">
              STEP 4
            </span>
            <div className="font-bold text-stone-900">Chroma DB Indexing</div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Generates embeddings and stores in persistent Chroma vector collection.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-3.5 bg-white rounded-xl border border-emerald-300 shadow-xs space-y-1.5 ring-1 ring-emerald-200">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold font-mono text-[10px]">
              STEP 5
            </span>
            <div className="font-bold text-emerald-950">Grounded Retriever</div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Cosine similarity retrieves top chunks under strict anti-hallucination prompt.
            </p>
          </div>

          {/* Step 6 */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-mono text-[10px]">
              STEP 6
            </span>
            <div className="font-bold text-stone-900">Interactive UI</div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              React + Tailwind chat, source badges, and live flyer upload inspector.
            </p>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        {/* Tab Header */}
        <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFile('ingest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                selectedFile === 'ingest'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              ingest_pipeline.py
            </button>
            <button
              onClick={() => setSelectedFile('rag')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                selectedFile === 'rag'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              rag_chain.py
            </button>
            <button
              onClick={() => setSelectedFile('req')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                selectedFile === 'req'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              requirements.txt
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition border border-stone-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 overflow-x-auto max-h-[500px]">
          <pre className="text-xs font-mono text-stone-800 leading-relaxed whitespace-pre">
            {getCode()}
          </pre>
        </div>

        {/* CLI Run instructions */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 text-xs text-stone-700 space-y-2">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-amber-700" />
            <span>How to execute this in your terminal:</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 text-stone-800 p-3.5 rounded-lg font-mono text-xs space-y-1">
            <p className="text-stone-500 font-semibold"># 1. Install dependencies</p>
            <p className="text-amber-900 font-medium">pip install -r python_backend/requirements.txt</p>
            <p className="text-stone-500 font-semibold mt-2"># 2. Run ingestion (Crawl, Multimodal OCR, Chroma DB)</p>
            <p className="text-amber-900 font-medium">python python_backend/ingest_pipeline.py</p>
            <p className="text-stone-500 font-semibold mt-2"># 3. Query with LangChain RAG CLI</p>
            <p className="text-amber-900 font-medium">python python_backend/rag_chain.py "When is Kumari Puja and Sandhi Puja?"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
