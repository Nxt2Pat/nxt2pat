'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Images,
  Grid,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
} from 'lucide-react';
import type { GalleryItem } from '@/types/content';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  items,
  title = 'ภาพถ่ายและเอกสารประกอบ (Gallery & Artifacts)',
  description = 'คอลเลกชันภาพถ่ายชิ้นงานจริง ขั้นตอนการประกอบ และภาพบันทึกการทำงาน',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const total = items.length;

  // Handle keyboard navigation in lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % total : null));
      }
    },
    [selectedIndex, total]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, selectedIndex]);

  if (!items || items.length === 0) {
    return null;
  }

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section className="mt-14 pt-10 border-t border-card-border/80">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ink uppercase tracking-wider font-semibold mb-1">
            <Images className="w-3.5 h-3.5" />
            <span>IMAGE_GALLERY // {total} ITEMS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted mt-1 font-sans">{description}</p>
          )}
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="inline-flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border/80 text-xs font-mono self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === 'grid'
                ? 'bg-white dark:bg-card-dark text-deep font-semibold shadow-xs'
                : 'text-muted hover:text-deep'
            )}
            title="มุมมองแบบตาราง (Grid View)"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={cn(
              'px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === 'carousel'
                ? 'bg-white dark:bg-card-dark text-deep font-semibold shadow-xs'
                : 'text-muted hover:text-deep'
            )}
            title="มุมมองแบบสไลด์ (Carousel View)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Slider</span>
          </button>
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={item.url + index}
              onClick={() => setSelectedIndex(index)}
              className="group relative rounded-2xl overflow-hidden border border-card-border/80 bg-black/3 dark:bg-white/3 hover:border-ink/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-black/5 dark:bg-white/5">
                <img
                  src={item.url}
                  alt={item.alt || `Gallery item ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-mono flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>คลิกเพื่อขยาย</span>
                  </span>
                </div>
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs font-semibold">
                  {index + 1} / {total}
                </span>
              </div>

              {/* Caption Underneath */}
              {item.caption && (
                <div className="p-3 bg-white/40 dark:bg-card-dark/40 border-t border-card-border/60">
                  <p className="text-xs text-muted font-sans line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Carousel / Slider View Mode */}
      {viewMode === 'carousel' && (
        <div className="rounded-2xl border border-card-border/80 bg-white/40 dark:bg-card-dark/40 p-4 sm:p-6 space-y-4">
          {/* Main Large Display */}
          <div className="relative aspect-16/10 sm:aspect-16/9 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-card-border/60">
            <img
              src={items[carouselIndex].url}
              alt={items[carouselIndex].alt || `Slide ${carouselIndex + 1}`}
              className="w-full h-full object-contain bg-black/20"
            />

            {/* Prev / Next Carousel Controls */}
            <button
              onClick={() =>
                setCarouselIndex((prev) => (prev - 1 + total) % total)
              }
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCarouselIndex((prev) => (prev + 1) % total)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Lightbox Trigger on Main Slide */}
            <button
              onClick={() => setSelectedIndex(carouselIndex)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs font-mono backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>ขยายเต็มจอ</span>
            </button>

            <span className="absolute top-3 left-3 text-xs font-mono px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs font-semibold">
              {carouselIndex + 1} / {total}
            </span>
          </div>

          {/* Caption for Current Carousel Item */}
          {items[carouselIndex].caption && (
            <p className="text-sm text-center text-muted font-sans px-4">
              {items[carouselIndex].caption}
            </p>
          )}

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {items.map((item, idx) => (
              <button
                key={item.url + idx}
                onClick={() => setCarouselIndex(idx)}
                className={cn(
                  'relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer',
                  carouselIndex === idx
                    ? 'border-ink scale-105 shadow-xs'
                    : 'border-card-border/80 opacity-60 hover:opacity-100'
                )}
              >
                <img
                  src={item.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="flex items-center justify-between text-white text-xs font-mono z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
              <span>ภาพที่ {selectedIndex + 1} จาก {total}</span>
            </div>
            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Main Image with Prev/Next Controls */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.url}
              alt={activeItem.alt || `Photo ${selectedIndex + 1}`}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all select-none"
            />

            {/* Prev Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev !== null ? (prev - 1 + total) % total : null
                )
              }
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev !== null ? (prev + 1) % total : null
                )
              }
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Caption & Mini-Thumbnail Bar */}
          <div
            className="space-y-3 z-10 max-w-3xl mx-auto w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.caption && (
              <p className="text-sm sm:text-base text-white/90 font-sans bg-black/40 backdrop-blur-xs px-4 py-2 rounded-xl inline-block">
                {activeItem.caption}
              </p>
            )}

            {/* Bottom Mini-Strip for Quick Selection */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {items.map((item, idx) => (
                <button
                  key={item.url + idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={cn(
                    'w-12 h-9 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer',
                    selectedIndex === idx
                      ? 'border-white scale-110'
                      : 'border-white/30 opacity-50 hover:opacity-100'
                  )}
                >
                  <img
                    src={item.url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
