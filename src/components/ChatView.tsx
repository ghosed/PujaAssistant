import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  FileText,
  Globe,
  AlertCircle,
  HelpCircle,
  Calendar,
  ShieldCheck,
  Clock,
  Car
} from 'lucide-react';
import { ChatMessage, CitationSource } from '../types/index.ts';
import { MarkdownRenderer } from './MarkdownRenderer.tsx';

interface ChatViewProps {
  onOpenCitation: (source: CitationSource) => void;
  resetTrigger?: number;
  isAdmin?: boolean;
}

const formatMessageBody = (text: string, isUser: boolean, isAdmin: boolean) => {
  if (isUser || isAdmin) return text;
  // Remove "### 📍 Official Source Citation" or "### Official Source Citation" and everything following it
  return text.replace(/\n*###\s*(?:📍\s*)?Official Source Citation[\s\S]*$/i, '').trim();
};

const DEFAULT_WELCOME_MESSAGE = `Joy Maa Durga! Namoskar. 🙏

Welcome to the HDBS 2026 Puja Assistant for Houston Durga Bari Society.

I will be your assistant during the Pujas and answer any queries or provide quick information. Since I'm an AI powered tool, my responses may not be always 100% accurate. Please verify it at [HDBS Website](https://durgabari.org/2026-puja/) or [Facebook](https://www.facebook.com/HoustonDurgaBari/).`;

const SUGGESTED_PROMPTS = [
  {
    label: "Places to Stay (Out-of-Towner)",
    query: "For an out-of-towner, suggest some nearby, good places to stay during the Pujas.",
    icon: "🏨"
  },
  {
    label: "Offsite Parking Location",
    query: "Where is the offsite parking? Is it at Alief High School? Can you give the source / citation of this information?",
    icon: "🚗"
  },
  {
    label: "Free Shuttle Schedule",
    query: "What are the exact hours and frequency for the free shuttles to the temple? Please show as a table.",
    icon: "🚌"
  },
  {
    label: "Durga Puja 2026 Dates",
    query: "What are the official dates and daily schedule for Durga Puja 2026? Please format as a concise table or bulleted list.",
    icon: "🔱"
  },
  {
    label: "Houston Tourist Places",
    query: "What are some general tourist places in Houston to visit?",
    icon: "🏙️"
  },
  {
    label: "Sandhi & Kumari Puja",
    query: "What time is Sandhi Puja and Kumari Puja on Maha Ashtami? Please be concise.",
    icon: "🪔"
  },
  {
    label: "Mahalaya & Anandamela",
    query: "When is Mahalaya and Anandamela in 2026? What are the food festival timings?",
    icon: "🌅"
  },
  {
    label: "Sponsorship & Rates",
    query: "What are the 2026 Puja sponsorship packages and registration amounts? Please list them in a table.",
    icon: "💳"
  },
  {
    label: "Event Gallery Flyers",
    query: "What other festivals and events are on the Durgabari Event Gallery page, and what are their schedules and flyer details?",
    icon: "🖼️"
  },
  {
    label: "Vishwakarma & Tarpan",
    query: "What are the timings and details for Vishwakarma Puja and Til Tarpan from the event gallery flyers?",
    icon: "🪁"
  }
];

export const ChatView: React.FC<ChatViewProps> = ({ onOpenCitation, resetTrigger, isAdmin = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: DEFAULT_WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGrounded: true,
      retrievalConfidence: 100,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean speech synthesis when unmounting
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend.trim(), isAdmin: !!isAdmin }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || "I'm sorry, but I can't find that specific information on the Houston Durgabari website or event flyers. Please check https://durgabari.org/ or contact the Puja Committee directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        isGrounded: data.isGrounded,
        retrievalConfidence: data.retrievalConfidence,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        text: "I'm sorry, but I encountered an error retrieving this information from the vector store. Please check https://durgabari.org/ or contact the Puja Committee directly at (281) 530-0304.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGrounded: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown chars for clean voice output
    const cleanText = text.replace(/[*#_`>-]/g, '').replace(/https?:\/\/\S+/g, 'link');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'assistant',
        text: DEFAULT_WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGrounded: true,
        retrievalConfidence: 100,
      },
    ]);
  };

  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      handleResetChat();
    }
  }, [resetTrigger]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100dvh-135px)] sm:h-[calc(100dvh-175px)] max-w-5xl mx-auto w-full bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-md sm:shadow-xl overflow-hidden my-1 sm:my-3 min-h-0">
      {/* Suggested Quick Question Chips */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-stone-50/70 border-b border-stone-200/80 overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2 shrink-0">
        <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" /> Quick Inquiries:
        </span>
        {SUGGESTED_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.query)}
            disabled={isLoading}
            className="flex-shrink-0 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-400 transition-all flex items-center gap-1 sm:gap-1.5 shadow-xs disabled:opacity-50"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-stone-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar on Left for Assistant */}
              {!isUser && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-0.5 flex-shrink-0 shadow-xs">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-red-700 text-lg font-serif">
                    🔱
                  </div>
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-semibold text-stone-700">
                    {isUser ? 'You (Devotee)' : 'HDBS Puja Assistant'}
                  </span>
                  <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                  {isAdmin && !isUser && msg.isGrounded && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full font-medium">
                      Grounded
                    </span>
                  )}
                </div>

                {/* Bubble Text */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none font-sans'
                  }`}
                >
                  {/* Formatted body with MarkdownRenderer for Tables, Bullets, and Citations */}
                  <MarkdownRenderer
                    content={formatMessageBody(msg.text, isUser, isAdmin)}
                    isUser={isUser}
                  />

                  {/* Source Citations under Assistant Message - ONLY FOR ADMIN */}
                  {isAdmin && !isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-200">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-600" /> Verified Sources &amp; Flyers:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, idx) => {
                          const isFlyer = src.sourceType === 'flyer_ocr';
                          return (
                            <button
                              key={idx}
                              onClick={() => onOpenCitation(src)}
                              className={`group text-left px-2.5 py-1.5 rounded-lg text-xs border transition flex items-center gap-2 ${
                                isFlyer
                                  ? 'bg-orange-50/70 border-orange-200 text-orange-900 hover:bg-orange-100 hover:border-orange-300'
                                  : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-amber-50 hover:border-amber-300'
                              }`}
                            >
                              {isFlyer ? (
                                <FileText className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                              ) : (
                                <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                              )}
                              <span className="truncate max-w-[200px] font-medium">
                                {src.title}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-700 font-mono font-bold">
                                {src.similarity}%
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions Toolbar */}
                  {!isUser && (
                    <div className="mt-3 pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                      <span className="text-[11px] text-stone-500">
                        Houston Durga Bari Society Official Records
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`p-1.5 rounded hover:bg-stone-100 hover:text-stone-800 transition ${
                            speakingId === msg.id ? 'text-amber-700 bg-amber-100' : ''
                          }`}
                          title={speakingId === msg.id ? 'Stop reading' : 'Read answer aloud'}
                        >
                          {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 rounded hover:bg-stone-100 hover:text-stone-800 transition"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Avatar on Right */}
              {isUser && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 p-0.5 flex-shrink-0 shadow-sm">
                  <div className="w-full h-full bg-stone-100 rounded-[10px] flex items-center justify-center text-amber-800">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-0.5 flex-shrink-0 shadow-xs animate-pulse">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-red-700 font-serif">
                🔱
              </div>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-4 text-xs text-stone-700 space-y-2 max-w-sm shadow-xs">
              <div className="flex items-center gap-2 font-medium text-amber-800">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>Searching Chroma vector embeddings &amp; event flyers...</span>
              </div>
              <p className="text-stone-500 text-[11px]">
                Checking schedules, flyer tables, pushpanjali batches, and official HDBS announcements.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about 2026 Puja dates, Mahalaya, Anandamela, Pushpanjali batches, sponsorship..."
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-stone-50 border border-stone-300 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none transition pr-10 sm:pr-12"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 sm:right-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center justify-center shadow"
            title="Send query"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </form>

        <div className="mt-1.5 hidden sm:flex items-center justify-between text-[11px] text-stone-500 px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Houston Durgabari Society Official Grounding Active
          </span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
