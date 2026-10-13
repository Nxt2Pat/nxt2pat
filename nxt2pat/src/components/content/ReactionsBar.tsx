'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Share2, Check, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReactionsBar: React.FC<{ itemSlug: string; itemTitle: string }> = ({
  itemSlug,
  itemTitle,
}) => {
  const [claps, setClaps] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const savedClaps = localStorage.getItem(`nxt2pat_claps_${itemSlug}`);
    if (savedClaps) {
      setClaps(parseInt(savedClaps, 10));
    }
    const savedBm = localStorage.getItem(`nxt2pat_bm_${itemSlug}`);
    if (savedBm === 'true') {
      setBookmarked(true);
    }
  }, [itemSlug]);

  const handleClap = () => {
    const next = claps + 1;
    setClaps(next);
    localStorage.setItem(`nxt2pat_claps_${itemSlug}`, String(next));

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6B5EE4', '#38BDF8', '#34D399'],
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: itemTitle,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(`nxt2pat_bm_${itemSlug}`, String(next));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-card-border mt-12 mb-8">
      <div className="flex items-center gap-3">
        {/* Applaud Button */}
        <button
          onClick={handleClap}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-ink/10 text-ink dark:text-cyan border border-ink/20 hover:bg-ink hover:text-white transition-all duration-200 cursor-pointer active:scale-95 select-none"
          title="Applaud this engineering writeup"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold">{claps > 0 ? `${claps} Claps` : 'Applaud'}</span>
        </button>

        {/* Bookmark Toggle */}
        <button
          onClick={handleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer select-none ${
            bookmarked
              ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
              : 'border-card-border text-muted hover:text-deep hover:border-ink/30'
          }`}
          title={bookmarked ? 'Saved to Local Reading List' : 'Save for Offline Reading'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          <span>{bookmarked ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Share Action */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink transition-colors cursor-pointer"
        aria-label="Share article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </>
        )}
      </button>
    </div>
  );
};
