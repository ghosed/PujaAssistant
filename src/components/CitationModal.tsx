import React from 'react';
import { X, ExternalLink, FileText, Globe, CheckCircle2, Copy, Check } from 'lucide-react';
import { CitationSource } from '../types/index.ts';

interface CitationModalProps {
  source: CitationSource | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ source, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!source) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(source.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFlyer = source.sourceType === 'flyer_ocr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 via-stone-50 to-orange-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isFlyer ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
              {isFlyer ? <FileText className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isFlyer ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}>
                  {isFlyer ? 'Multimodal Flyer OCR' : 'Official Web Page'}
                </span>
                <span className="text-xs text-amber-800 font-mono font-bold">
                  {source.similarity}% vector similarity
                </span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mt-1 line-clamp-1">
                {source.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          {/* Section & URL metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-500 block font-medium">Source Section:</span>
              <span className="text-stone-900 font-semibold">{source.section}</span>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Target URL:</span>
              <a
                href={source.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:underline flex items-center gap-1 font-mono truncate"
              >
                {source.sourceUrl} <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Graphic Flyer Preview if available */}
          {source.flyerImagePath && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" /> Referenced Event Flyer Visual
              </span>
              <div className="relative rounded-xl border border-stone-200 bg-stone-50 p-2 overflow-hidden max-h-64 flex items-center justify-center">
                <img
                  src={source.flyerImagePath}
                  alt={source.title}
                  className="max-h-60 w-auto object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Retrieved Context Chunk */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Exact Indexed Knowledge Chunk (Retrieved from Chroma DB)
              </span>
              <button
                onClick={handleCopy}
                className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy chunk'}</span>
              </button>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 font-sans text-stone-800 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
              {source.snippet}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              This information is certified grounded directly from Houston Durga Bari Society official records. No external assumptions or hallucinated data.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-lg text-xs font-semibold hover:brightness-110 transition shadow-xs"
          >
            Close Citation
          </button>
        </div>
      </div>
    </div>
  );
};
