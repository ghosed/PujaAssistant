import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { ChatView } from './components/ChatView.tsx';
import { FlyersHub } from './components/FlyersHub.tsx';
import { ChromaInspector } from './components/ChromaInspector.tsx';
import { PythonPipelineView } from './components/PythonPipelineView.tsx';
import { CitationModal } from './components/CitationModal.tsx';
import { AdminLoginModal } from './components/AdminLoginModal.tsx';
import { CitationSource } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'flyers' | 'chroma' | 'python'>('chat');
  const [activeCitation, setActiveCitation] = useState<CitationSource | null>(null);
  const [resetChatTrigger, setResetChatTrigger] = useState(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('hdbs_is_admin') === 'true');
  const [adminEmail, setAdminEmail] = useState<string | null>(() => localStorage.getItem('hdbs_admin_email') || null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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

  const handleResetChat = () => {
    setActiveTab('chat');
    setResetChatTrigger((prev) => prev + 1);
  };

  const handleAdminLoginSuccess = (email: string) => {
    setIsAdmin(true);
    setAdminEmail(email);
    localStorage.setItem('hdbs_is_admin', 'true');
    localStorage.setItem('hdbs_admin_email', email);
    setIsLoginModalOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem('hdbs_is_admin');
    localStorage.removeItem('hdbs_admin_email');
    setActiveTab('chat');
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  // Keep non-admin on chat tab
  useEffect(() => {
    if (!isAdmin && activeTab !== 'chat') {
      setActiveTab('chat');
    }
  }, [isAdmin, activeTab]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-800 flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* Top Header */}
      <Header
        isAdmin={isAdmin}
        adminEmail={adminEmail}
        onOpenAdminLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleAdminLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onResetChat={handleResetChat}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col px-1.5 sm:px-6 min-h-0">
        {activeTab === 'chat' && (
          <ChatView
            onOpenCitation={(src) => setActiveCitation(src)}
            resetTrigger={resetChatTrigger}
            isAdmin={isAdmin}
          />
        )}

        {isAdmin && activeTab === 'flyers' && <FlyersHub />}

        {isAdmin && activeTab === 'chroma' && <ChromaInspector />}

        {isAdmin && activeTab === 'python' && <PythonPipelineView />}
      </main>

      {/* Citation Modal for viewing exact retrieved chunk & flyer image (Admin only) */}
      {isAdmin && (
        <CitationModal
          source={activeCitation}
          onClose={() => setActiveCitation(null)}
        />
      )}

      {/* Admin Login / OTP Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Footer */}
      <footer className={`bg-white border-t border-stone-200 py-3 sm:py-4 px-4 sm:px-6 text-xs text-stone-600 shadow-sm ${activeTab === 'chat' ? 'hidden sm:block' : 'block'}`}>
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
            <span className="text-stone-500 font-medium">AI-Powered</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
