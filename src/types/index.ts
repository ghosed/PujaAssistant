export interface CitationSource {
  id: string;
  title: string;
  sourceType: 'flyer_ocr' | 'web_page';
  sourceUrl: string;
  flyerImagePath?: string;
  section: string;
  snippet: string;
  similarity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: CitationSource[];
  isGrounded?: boolean;
  retrievalConfidence?: number;
}

export interface VectorChunk {
  id: string;
  title: string;
  sourceType: 'flyer_ocr' | 'web_page';
  sourceUrl: string;
  flyerImagePath?: string;
  section: string;
  text: string;
  dateAdded: string;
  characterCount: number;
  embedding?: number[];
}

export interface FlyerAsset {
  id: string;
  title: string;
  fileName: string;
  url: string;
  dateAdded: string;
  extractedMarkdown: string;
  chunkCount: number;
  badge: string;
}

export interface SearchInspectResult {
  chunk: VectorChunk;
  similarity: number;
}
