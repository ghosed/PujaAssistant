import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { ChatView } from './components/ChatView.tsx';
import { FlyersHub } from './components/FlyersHub.tsx';
import { ChromaInspector } from './components/ChromaInspector.tsx';
import { PythonPipelineView } from './components/PythonPipelineView.tsx';
import { CitationModal } from './components/CitationModal.tsx';
import { CitationSource } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'flyers' | 'chroma' | 'python'>('chat');
  const [activeCitation, setActiveCitation] = useState<CitationSource | null>(null);
  const [stats, setStats] = useState<{
    totalChunks: number;
    flyerChunks: number;
    webChunks: number;
    flyersIndexed: number;
  } | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-800 flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col px-3 sm:px-6">
        {activeTab === 'chat' && (
          <ChatView onOpenCitation={(src) => setActiveCitation(src)} />
        )}

        {activeTab === 'flyers' && <FlyersHub />}

        {activeTab === 'chroma' && <ChromaInspector />}

        {activeTab === 'python' && <PythonPipelineView />}
      </main>

      {/* Citation Modal for viewing exact retrieved chunk & flyer image */}
      <CitationModal
        source={activeCitation}
        onClose={() => setActiveCitation(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-4 px-4 sm:px-6 text-xs text-stone-600 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="text-stone-800 font-medium">
              Houston Durga Bari Society (HDBS) • 13944 Schiller Rd, Houston, TX 77082
            </p>
            <p className="text-stone-500 text-[11px]">
              HDBS is a 501(c)(3) religious non-profit organization. General inquiries: (281) 530-0304 • pujacommittee@durgabari.org
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://durgabari.org/2026-puja/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-800 font-semibold hover:underline"
            >
              2026 Puja Official Portal
            </a>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-medium">Chroma RAG Architecture</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-semibold">Gemini Vision OCR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
