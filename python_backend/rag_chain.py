"""
HDBS 2026 Puja Assistant - Grounded LangChain RAG Query Engine
Uses Chroma vector store retrieval and Google Gemini model.
Enforces strict anti-hallucination guardrails and community tone.
"""

import os
import sys
from typing import Dict, Any, List
from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db_storage")

SYSTEM_PROMPT = """You are the official "HDBS 2026 Puja Assistant" for Houston Durga Bari Society (HDBS).
Your primary role is to provide accurate, welcoming, and grounded answers about the 2026 Sharodotsav / Durga Puja festivities at Houston Durga Bari Society (13944 Schiller Rd, Houston, TX 77082).

STRICT GUARDRAILS & READABILITY RULES:
1. CONCISE & READABLE FORMAT:
   - Do NOT write dense, uninterrupted paragraphs of text.
   - Keep answers concise, direct, and scannable.
   - Format information as clean bulleted lists (- ) with bold timestamps or key headers.
   - Use Markdown tables (| Column 1 | Column 2 | ... |) whenever displaying schedules, timetables, Pushpanjali batches, shuttle hours, or sponsorship tiers and pricing.

2. PARKING & OFFSITE LOCATION ACCURACY (CRITICAL):
   - Offsite parking is strictly NOT at Alief High School (or any Alief ISD school). Alief High School is not an authorized parking lot for HDBS Puja.
   - If asked about parking, shuttles, or Alief High School, explicitly clarify that offsite parking is NOT at Alief High School.
   - State clearly that the official free overflow parking is located at West Oaks Mall (Hwy 6 & Westheimer Rd, Houston, TX 77082 - near Tutti Frutti).
   - Display the free continuous shuttle bus timetable (every 10 minutes) as a Markdown table.
   - Note on-campus parking rules (13944 Schiller Rd is reserved for seniors 65+, ADA disabled placards, and VIP sponsors).

3. MANDATORY CITATIONS & SOURCES:
   - Every answer MUST conclude with an explicit citation section:
     ### 📍 Official Source Citation
     - **Document / Flyer**: [Exact document or flyer title]
     - **Type**: [Official Website Portal or Processed Event Flyer]
     - **Portal URL**: https://durgabari.org/2026-puja/
     - **Section**: [Exact Section Name, e.g. "Logistics & Parking Guidelines"]

4. GROUNDING ENFORCEMENT & ANTI-HALLUCINATION:
   - Answer the user's question using ONLY the provided retrieved context from the HDBS official website and processed event flyers.
   - If the answer to the user's question is NOT explicitly present in the provided context, state:
     "I'm sorry, but I can't find that specific information on the Houston Durgabari website or event flyers. Please check https://durgabari.org/ or contact the Puja Committee directly."
   - NEVER guess dates, timings, priest details, or fee amounts.

5. TONE & COURTESY:
   - Warm, respectful, community-oriented, festive, and helpful ("Joy Maa Durga!").

RETRIEVED CONTEXT FROM HDBS WEBSITE & FLYERS:
{context}

USER QUESTION:
{question}

HELPFUL GROUNDED RESPONSE (CONCISE BULLETED LIST OR TABLE WITH OFFICIAL CITATION):"""

def build_rag_chain():
    """Builds and returns the LangChain retrieval chain."""
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-2-preview",
        google_api_key=GEMINI_API_KEY
    )

    vectorstore = Chroma(
        persist_directory=CHROMA_PERSIST_DIR,
        embedding_function=embeddings,
        collection_name="hdbs_2026_puja"
    )

    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.1,
        google_api_key=GEMINI_API_KEY
    )

    prompt = ChatPromptTemplate.from_template(SYSTEM_PROMPT)

    def format_docs(docs: List[Any]) -> str:
        formatted = []
        for i, doc in enumerate(docs, 1):
            source_type = doc.metadata.get("source_type", "web_page")
            source_title = doc.metadata.get("title", "HDBS 2026 Document")
            formatted.append(f"[Document {i} | Type: {source_type} | Source: {source_title}]\n{doc.page_content}")
        return "\n\n".join(formatted)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain, retriever

def query_assistant(question: str) -> Dict[str, Any]:
    """Queries the RAG chain and returns the grounded answer along with retrieved sources."""
    try:
        chain, retriever = build_rag_chain()
        retrieved_docs = retriever.invoke(question)
        answer = chain.invoke(question)

        sources = [
            {
                "title": doc.metadata.get("title", "HDBS Document"),
                "source_type": doc.metadata.get("source_type", "web_page"),
                "source_url": doc.metadata.get("source_url", "https://durgabari.org/"),
                "flyer_image_path": doc.metadata.get("flyer_image_path", ""),
                "content_snippet": doc.page_content[:200] + "..."
            }
            for doc in retrieved_docs
        ]

        return {"answer": answer, "sources": sources, "status": "success"}
    except Exception as e:
        return {
            "answer": f"Error running query: {str(e)}",
            "sources": [],
            "status": "error"
        }

if __name__ == "__main__":
    test_question = sys.argv[1] if len(sys.argv) > 1 else "When is Mahalaya and Anandamela in 2026?"
    print(f"\nUser Query: {test_question}\n" + "-" * 50)
    res = query_assistant(test_question)
    print(res["answer"])
    print("\nRetrieved Sources:")
    for s in res["sources"]:
        print(f"- [{s['source_type']}] {s['title']}")
