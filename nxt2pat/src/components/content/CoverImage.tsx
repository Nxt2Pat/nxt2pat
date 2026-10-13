'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({
  src,
  alt,
  className,
  aspectRatioClass = 'h-64 sm:h-96',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Clickable Image Banner */}
      <div
        onClick={() => setIsOpen(true)}
        className={cn(
          'group relative mb-10 overflow-hidden rounded-2xl border border-card-border shadow-md bg-black/5 dark:bg-white/5 cursor-pointer transition-all duration-300 hover:border-ink/50',
          className
        )}
        title="คลิกเพื่อดูภาพขนาดเต็ม (Click to view full size)"
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          className={cn(
            'w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102',
            aspectRatioClass
          )}
        />

        {/* Hover Overlay with Zoom Prompt */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
          <span className="text-white text-xs font-mono inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-xs border border-white/20 shadow-xs">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>คลิกเพื่อดูภาพขนาดเต็ม</span>
          </span>
          <span className="text-white/80 text-[11px] font-mono hidden sm:inline-block">
            COVER_PREVIEW
          </span>
        </div>

        {/* Floating Quick Action Icon (Top Right) */}
        <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs border border-white/15 opacity-80 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Top Bar: Title & Close Button */}
          <div
            className="flex items-center justify-between text-white text-xs font-mono z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
              <span className="text-white/70">หน้าปก //</span>
              <span className="font-semibold text-white truncate max-w-[260px] sm:max-w-md">
                {alt}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-all select-none"
            />
          </div>

          {/* Bottom Prompt */}
          <div
            className="text-center text-xs font-mono text-white/60 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span>กดปุ่ม Esc หรือคลิกพื้นที่ว่างเพื่อปิด</span>
          </div>
        </div>
      )}
    </>
  );
};
