import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Eye,
  RefreshCw,
  AlertCircle,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { FlyerAsset } from '../types/index.ts';

export const FlyersHub: React.FC = () => {
  const [flyers, setFlyers] = useState<FlyerAsset[]>([]);
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Load existing flyers
  const fetchFlyers = async () => {
    try {
      const res = await fetch('/api/flyers');
      if (res.ok) {
        const data = await res.json();
        setFlyers(data.flyers || []);
        if (data.flyers?.length > 0 && !selectedFlyer) {
          setSelectedFlyer(data.flyers[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load flyers:', err);
    }
  };

  useEffect(() => {
    fetchFlyers();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload-flyer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Flyer: ${file.name.replace(/\.[^/.]+$/, '')}`,
            fileName: file.name,
            mimeType: file.type || 'image/png',
            imageBase64: base64Data,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to process image with Gemini Vision');
        }

        const data = await res.json();
        setUploadSuccess(`Successfully extracted & indexed ${data.chunksAdded} chunks into Chroma DB via Gemini Vision!`);
        await fetchFlyers();
        if (data.flyer) {
          setSelectedFlyer(data.flyer);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Error processing flyer image');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 p-6 rounded-2xl border border-amber-200/90 shadow-sm text-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                Step 2: Multimodal Extraction &amp; OCR
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Flyer &amp; Graphic Schedule Vision Hub
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl">
              Many crucial timings, booth charges, and event details exist only inside image flyers and banners.
              Our pipeline uses <strong>Gemini Vision</strong> to read text, columns, and schedules from graphics, converting them into structured Markdown for Chroma vector indexing.
            </p>
          </div>

          {/* Upload Button */}
          <div className="flex-shrink-0">
            <label className="relative cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:brightness-110 text-white font-semibold text-sm shadow-md transition-all">
              <UploadCloud className="w-5 h-5" />
              <span>{isUploading ? 'Gemini Vision Processing...' : 'Upload & Process New Flyer'}</span>
              <input
                type="file"
                accept="image/*,.svg"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Upload Notifications */}
        {isUploading && (
          <div className="mt-4 p-3 bg-amber-100/80 border border-amber-300 rounded-xl flex items-center gap-3 text-xs text-amber-900">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-700" />
            <span>
              <strong>Gemini Vision Multimodal Step:</strong> Reading image layout, extracting schedule tables, dates, and sponsorship tiers...
            </span>
          </div>
        )}

        {uploadSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-xl flex items-center gap-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* Grid: Left = Flyer list, Right = Selected Flyer Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flyer Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Indexed Event Flyers ({flyers.length})</span>
          </h3>

          <div className="space-y-3">
            {flyers.map((flyer) => {
              const isSelected = selectedFlyer?.id === flyer.id;
              return (
                <div
                  key={flyer.id}
                  onClick={() => setSelectedFlyer(flyer)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left flex gap-3 ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-400'
                      : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50 shadow-xs'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-28 flex-shrink-0 bg-stone-100 rounded-lg border border-stone-200 overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={flyer.url}
                      alt={flyer.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                          {flyer.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 mt-1 line-clamp-2">
                        {flyer.title}
                      </h4>
                    </div>

                    <div className="text-xs text-stone-500 space-y-0.5 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>Added: {flyer.dateAdded}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                        <FileText className="w-3 h-3 text-amber-600" />
                        <span>{flyer.chunkCount} Chroma Chunks</span>
                      </div>
                    </div>
                  </div>

                  <div className="self-center text-stone-400">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Flyer Inspection & Extracted Structured Markdown */}
        <div className="lg:col-span-7">
          {selectedFlyer ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-5 shadow-sm text-stone-800">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                    Multimodal OCR Inspection
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">
                    {selectedFlyer.title}
                  </h3>
                </div>

                <a
                  href={selectedFlyer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition border border-stone-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open High-Res Visual</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>

              {/* Visual Preview */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-center max-h-72 overflow-hidden">
                <img
                  src={selectedFlyer.url}
                  alt={selectedFlyer.title}
                  className="max-h-68 w-auto object-contain rounded-lg"
                />
              </div>

              {/* Extracted Structured Markdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600" /> Extracted Structured Markdown (Indexed in Chroma)
                  </h4>
                  <span className="text-[11px] text-stone-500">
                    Processed with Gemini Vision
                  </span>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs font-mono text-stone-800 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                  {selectedFlyer.extractedMarkdown}
                </div>
              </div>

              {/* Explanatory Note */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  This structured text is automatically split into semantic chunks and embedded in Chroma.
                  When devotees ask about Sandhi Puja, booth rates, or Kumari Puja, the retriever pulls directly from this graphic data!
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 shadow-xs">
              Select a flyer from the list to view its visual and extracted multimodal OCR text.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
