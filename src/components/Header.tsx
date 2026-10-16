import React from 'react';
import {
  Sparkles,
  Database,
  FileText,
  Code,
  MessageSquare,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Lock,
  LogOut,
  ShieldAlert
} from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  adminEmail: string | null;
  onOpenAdminLogin: () => void;
  onLogout: () => void;
  activeTab: 'chat' | 'flyers' | 'chroma' | 'python';
  setActiveTab: (tab: 'chat' | 'flyers' | 'chroma' | 'python') => void;
  stats: {
    totalChunks: number;
    flyerChunks: number;
    webChunks: number;
    flyersIndexed: number;
  } | null;
  onResetChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  adminEmail,
  onOpenAdminLogin,
  onLogout,
  activeTab,
  setActiveTab,
  stats,
  onResetChat,
}) => {
  // --- GENERAL USER VIEW: MATCHES IMAGE EXACTLY (NO TABS, NO RIBBONS, NO STATS) ---
  if (!isAdmin) {
    return (
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-stone-800 shadow-xs border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
          {/* Exactly matching image */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-red-700 font-serif font-black text-xl sm:text-2xl">
                🔱
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"
                title="System Online"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-stone-900 leading-tight">
                HDBS 2026 Puja Assistant (Beta)
              </h1>
              <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Durga Puja: Oct 16 - 18 & 24, 2026</span>
              </p>
              <p className="text-[11px] sm:text-xs text-red-600 italic mt-0.5 font-medium leading-snug">
                (Note: This is an AI tool and responses maybe inaccurate or outdated. If required, please verify at{' '}
                <a
                  href="https://durgabari.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-700"
                >
                  https://durgabari.org/
                </a>{' '}
                or emailing at{' '}
                <a
                  href="mailto:pc@durgabari.org"
                  className="underline hover:text-red-700"
                >
                  pc@durgabari.org
                </a>
                )
              </p>
            </div>
          </div>

          {/* Discreet Admin Login Trigger */}
          <button
            onClick={onOpenAdminLogin}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition border border-transparent hover:border-stone-200 cursor-pointer"
            title="Administrator Login"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </header>
    );
  }

  // --- ADMIN VIEW: FULL TOOLING, STATS, TABS, AND MANAGEMENT CAPABILITIES ---
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-stone-800 shadow-xs border-b border-stone-200">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-amber-950 border-b border-amber-200/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="font-serif tracking-wider font-bold text-amber-900">॥ শ্রী শ্রী দুর্গায়ৈ নমঃ ॥</span>
          <span className="hidden md:inline text-amber-400">•</span>
          <span className="hidden md:inline text-stone-700">Houston Durga Bari Society Sharodotsav 2026</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.2 bg-amber-200 text-amber-950 rounded-full font-bold text-[10px]">
            <ShieldCheck className="w-3 h-3 text-amber-800" /> Admin: {adminEmail}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-stone-700 shrink-0">
          <span className="flex items-center gap-1 text-amber-900 font-semibold">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" /> Oct 10–24, 2026
          </span>
          <a
            href="https://durgabari.org/2026-puja/puja-schedule/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:underline text-amber-800 font-bold"
          >
            Official Schedule <ExternalLink className="w-3 h-3 text-amber-600" />
          </a>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-0.5 text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded border border-red-200 font-semibold transition"
            title="Log Out of Admin"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="relative flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[7px] sm:rounded-[10px] flex items-center justify-center text-red-700 font-serif font-black text-lg sm:text-2xl">
              🔱
            </div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" title="Chroma Vector DB Connected" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-2xl font-serif font-bold tracking-wide text-stone-900 flex items-center gap-2">
                HDBS 2026 Puja Assistant (Beta)
              </h1>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                Admin Portal
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-600 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" />
              <span>Durga Puja: Oct 16 - 18 & 24, 2026</span>
            </p>
            <p className="text-[11px] sm:text-xs text-red-600 italic mt-0.5 font-medium leading-snug">
              (Note: This is an AI tool and responses maybe inaccurate or outdated. If required, please verify at{' '}
              <a
                href="https://durgabari.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-red-700"
              >
                https://durgabari.org/
              </a>{' '}
              or emailing at{' '}
              <a
                href="mailto:pc@durgabari.org"
                className="underline hover:text-red-700"
              >
                pc@durgabari.org
              </a>
              )
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
          <nav className="flex items-center p-0.5 sm:p-1 bg-stone-100 rounded-lg sm:rounded-xl border border-stone-200 text-[11px] sm:text-xs w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Chat</span><span className="hidden sm:inline">&nbsp;Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('flyers')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'flyers'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Flyers</span><span className="hidden sm:inline">&nbsp;&amp; OCR</span>
            </button>

            <button
              onClick={() => setActiveTab('chroma')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'chroma'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Chroma</span><span className="hidden sm:inline">&nbsp;DB</span>
            </button>

            <button
              onClick={() => setActiveTab('python')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'python'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Python</span><span className="hidden sm:inline">&nbsp;Code</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Strict Anti-Hallucination & Grounding Bar with Reset Button */}
      <div className="bg-stone-50/90 border-t border-stone-200/80 px-3 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-700 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-stone-800 text-[11px] sm:text-xs truncate">Strict Anti-Hallucination Active</span>
            <span className="text-stone-300 hidden md:inline">•</span>
            <span className="hidden md:inline text-stone-500 truncate text-xs">Target: durgabari.org/2026-puja/ + Multimodal Flyers</span>
          </div>

          <button
            onClick={onResetChat}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 hover:border-stone-300 rounded-lg transition shadow-xs text-[11px] sm:text-xs font-medium cursor-pointer flex-shrink-0"
            title="Restart Conversation"
          >
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
