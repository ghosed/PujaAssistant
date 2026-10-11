import React from 'react';
import { Sparkles, Database, FileText, Code, MessageSquare, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'flyers' | 'chroma' | 'python';
  setActiveTab: (tab: 'chat' | 'flyers' | 'chroma' | 'python') => void;
  stats: {
    totalChunks: number;
    flyerChunks: number;
    webChunks: number;
    flyersIndexed: number;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, stats }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-stone-800 shadow-xs border-b border-stone-200">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-950 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-serif tracking-wider font-bold text-amber-900">॥ শ্রী শ্রী দুর্গায়ৈ নমঃ ॥</span>
          <span className="hidden sm:inline text-amber-400">•</span>
          <span className="hidden sm:inline text-stone-700">Houston Durga Bari Society (HDBS) Sharodotsav 2026 Grounded RAG Assistant</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-stone-700">
          <span className="flex items-center gap-1 text-amber-900 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-700" /> Oct 10–18, 2026
          </span>
          <a
            href="https://durgabari.org/2026-puja/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline text-amber-800 font-bold"
          >
            durgabari.org/2026-puja <ExternalLink className="w-3 h-3 text-amber-600" />
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-red-700 font-serif font-black text-2xl">
              🔱
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" title="Chroma Vector DB Connected" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-stone-900 flex items-center gap-2">
                HDBS 2026 Puja Assistant
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                Multimodal RAG
              </span>
            </div>
            <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>13944 Schiller Rd, Houston, TX 77082</span>
              <span className="text-stone-300">•</span>
              <span className="text-amber-800 font-medium">Grounded in Official Web &amp; Event Flyers</span>
            </p>
          </div>
        </div>

        {/* Right: Quick Stats & Navigation */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {stats && (
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <Database className="w-3.5 h-3.5 text-amber-600" />
                <span><strong>{stats.totalChunks}</strong> Chunks in Chroma</span>
              </div>
              <div className="w-px h-3 bg-stone-300" />
              <div className="flex items-center gap-1.5 text-stone-700">
                <FileText className="w-3.5 h-3.5 text-orange-600" />
                <span><strong>{stats.flyersIndexed}</strong> Flyers Processed</span>
              </div>
            </div>
          )}

          {/* Tab Navigation Buttons */}
          <nav className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('flyers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'flyers'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Flyers &amp; OCR</span>
            </button>

            <button
              onClick={() => setActiveTab('chroma')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'chroma'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Chroma Vector DB</span>
            </button>

            <button
              onClick={() => setActiveTab('python')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'python'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Python &amp; LangChain</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
