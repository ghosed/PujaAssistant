import React, { useState, useEffect } from 'react';
import {
  Database,
  Search,
  Filter,
  FileText,
  Globe,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Code,
  Info
} from 'lucide-react';
import { VectorChunk, SearchInspectResult } from '../types/index.ts';

export const ChromaInspector: React.FC = () => {
  const [chunks, setChunks] = useState<VectorChunk[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexMessage, setReindexMessage] = useState<string | null>(null);

  // Filters
  const [filterType, setFilterType] = useState<'all' | 'flyer_ocr' | 'web_page'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Vector Search Tester
  const [testQuery, setTestQuery] = useState('What are the dates for Sandhi Puja and Pushpanjali?');
  const [testResults, setTestResults] = useState<SearchInspectResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  // Selected chunk for detailed inspection
  const [activeChunk, setActiveChunk] = useState<VectorChunk | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const data = await res.json();
        setChunks(data.chunks || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchDocuments();
  }, []);

  const handleTestSearch = async () => {
    if (!testQuery.trim()) return;
    setIsTesting(true);
    try {
      const res = await fetch('/api/search-inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: testQuery.trim(), topK: 4 }),
      });
      if (res.ok) {
        const data = await res.json();
        setTestResults(data.results || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleReindex = async () => {
    setIsReindexing(true);
    setReindexMessage(null);
    try {
      const res = await fetch('/api/reingest', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setReindexMessage(data.message || 'Database re-indexed successfully!');
        await fetchStats();
        await fetchDocuments();
      }
    } catch (err: any) {
      setReindexMessage('Failed to re-index database.');
    } finally {
      setIsReindexing(false);
    }
  };

  // Filtered Chunks
  const filteredChunks = chunks.filter((c) => {
    if (filterType !== 'all' && c.sourceType !== filterType) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.text.toLowerCase().includes(q) ||
        c.section.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6 text-stone-800">
      {/* Header & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
            <span className="font-semibold uppercase tracking-wider">Chroma Collection</span>
            <Database className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold font-mono text-stone-900">
            {stats?.collectionName || 'hdbs_2026_puja'}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Persistent Vector Database</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
            <span className="font-semibold uppercase tracking-wider">Total Chunks</span>
            <span className="text-xs font-mono text-amber-700 font-bold">100%</span>
          </div>
          <div className="text-xl font-bold font-mono text-stone-900">
            {stats?.totalChunks ?? chunks.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Split 500–800 chars with overlap</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-orange-800 mb-1">
            <span className="font-semibold uppercase tracking-wider">Flyer OCR Chunks</span>
            <FileText className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-xl font-bold font-mono text-orange-900">
            {stats?.flyerChunks ?? 0}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Extracted via Gemini Vision</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-blue-800 mb-1">
            <span className="font-semibold uppercase tracking-wider">Web Page Chunks</span>
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold font-mono text-blue-900">
            {stats?.webChunks ?? 0}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Crawled from durgabari.org/2026-puja</div>
        </div>
      </div>

      {/* Vector Search Tester Section */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Chroma Vector Similarity Search Simulator</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter any query to inspect cosine similarity rankings, distance scores, and retrieved chunks.
            </p>
          </div>

          <button
            onClick={handleReindex}
            disabled={isReindexing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? 'animate-spin' : ''}`} />
            <span>{isReindexing ? 'Re-indexing...' : 'Re-crawl & Re-index'}</span>
          </button>
        </div>

        {reindexMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{reindexMessage}</span>
          </div>
        )}

        {/* Query Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="e.g., What are the Kumari Puja timings? or Anandamela food booth fees?"
            className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-amber-600 rounded-xl text-stone-900 text-xs outline-none font-sans"
          />
          <button
            onClick={handleTestSearch}
            disabled={isTesting}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold text-xs rounded-xl hover:brightness-110 transition flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isTesting ? 'Computing Cosine...' : 'Run Vector Search'}</span>
          </button>
        </div>

        {/* Results */}
        {testResults.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Top Retrieved Chunks (Sorted by Cosine Similarity):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testResults.map((res, i) => {
                const isFlyer = res.chunk.sourceType === 'flyer_ocr';
                return (
                  <div
                    key={res.chunk.id}
                    onClick={() => setActiveChunk(res.chunk)}
                    className="p-3.5 bg-stone-50/80 rounded-xl border border-stone-200 hover:border-amber-400 cursor-pointer transition space-y-2 text-left hover:bg-stone-50"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${isFlyer ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                        {isFlyer ? 'Flyer OCR' : 'Web Page'}
                      </span>
                      <span className="font-mono text-amber-800 font-bold">
                        {Math.round(res.similarity * 100)}% Similarity
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-stone-900 line-clamp-1">
                      {res.chunk.title}
                    </div>

                    <div className="text-[11px] text-stone-600 line-clamp-3 font-sans leading-relaxed">
                      {res.chunk.text}
                    </div>

                    <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-200 flex items-center justify-between">
                      <span>Section: {res.chunk.section}</span>
                      <span className="text-amber-700 font-medium">Click to inspect →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Database Chunk Browser */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              <span>Chroma Database Chunk Explorer ({filteredChunks.length})</span>
            </h3>
            <p className="text-xs text-stone-500">
              Browse all stored semantic chunks, source URLs, character counts, and metadata tags.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-stone-50 border border-stone-300 text-stone-800 text-xs px-3 py-1.5 rounded-lg outline-none"
            >
              <option value="all">All Sources</option>
              <option value="flyer_ocr">Flyers Only (Multimodal OCR)</option>
              <option value="web_page">Web Pages Only</option>
            </select>

            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by keyword..."
              className="bg-stone-50 border border-stone-300 text-stone-900 text-xs px-3 py-1.5 rounded-lg outline-none w-36 sm:w-48"
            />
          </div>
        </div>

        {/* Chunk Table / List */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredChunks.map((chunk) => {
            const isFlyer = chunk.sourceType === 'flyer_ocr';
            return (
              <div
                key={chunk.id}
                onClick={() => setActiveChunk(chunk)}
                className="p-3 bg-stone-50/70 hover:bg-stone-100/90 rounded-xl border border-stone-200 cursor-pointer transition flex items-start justify-between gap-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isFlyer ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                      {isFlyer ? 'Flyer OCR' : 'Web Page'}
                    </span>
                    <span className="font-semibold text-stone-900">{chunk.title}</span>
                    <span className="text-stone-300 text-[10px]">•</span>
                    <span className="text-stone-500 text-[11px]">{chunk.section}</span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2 font-sans">
                    {chunk.text}
                  </p>
                </div>

                <div className="text-right flex-shrink-0 text-[11px] text-stone-400">
                  <span className="font-mono">{chunk.characterCount} chars</span>
                  <div className="text-amber-700 hover:underline text-[10px] mt-0.5 font-medium">Inspect →</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Chunk Inspection */}
      {activeChunk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs uppercase font-bold text-amber-800">Chunk Inspector</span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">{activeChunk.title}</h3>
              </div>
              <button
                onClick={() => setActiveChunk(null)}
                className="text-stone-500 hover:text-stone-900 text-xs px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div>
                <span className="text-stone-500 block">Source Type:</span>
                <span className="font-bold text-stone-900">{activeChunk.sourceType}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Section:</span>
                <span className="font-bold text-stone-900">{activeChunk.section}</span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-500 block">Target URL:</span>
                <span className="font-mono text-amber-700 truncate block">{activeChunk.sourceUrl}</span>
              </div>
            </div>

            {activeChunk.flyerImagePath && (
              <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 max-h-48 overflow-hidden flex items-center justify-center">
                <img
                  src={activeChunk.flyerImagePath}
                  alt={activeChunk.title}
                  className="max-h-44 object-contain rounded"
                />
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-800">Chunk Text:</span>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed font-sans">
                {activeChunk.text}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveChunk(null)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
