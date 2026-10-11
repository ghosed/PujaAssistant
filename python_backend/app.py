"""
HDBS 2026 Puja Assistant - FastAPI Backend Server
Provides REST endpoints for querying RAG, triggering ingestion, and testing Chroma search.
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from rag_chain import query_assistant
from ingest_pipeline import run_ingestion_pipeline

app = FastAPI(
    title="HDBS 2026 Puja Assistant API",
    description="Grounded RAG API using LangChain, Chroma DB, and Google Gemini",
    version="1.0.0"
)

app.add_middleware(
    CORSMSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

class SourceItem(BaseModel):
    title: str
    source_type: str
    source_url: str
    flyer_image_path: Optional[str] = ""
    content_snippet: str

class QueryResponse(BaseModel):
    answer: str
    sources: List[SourceItem]
    status: str

@app.get("/")
def read_root():
    return {
        "service": "HDBS 2026 Puja Assistant API",
        "temple": "Houston Durga Bari Society",
        "status": "online",
        "docs_url": "/docs"
    }

@app.post("/api/chat", response_model=QueryResponse)
def chat_endpoint(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    result = query_assistant(req.question)
    return result

@app.post("/api/ingest")
def trigger_ingest():
    res = run_ingestion_pipeline()
    return {"message": "Ingestion completed successfully", "status": "indexed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
