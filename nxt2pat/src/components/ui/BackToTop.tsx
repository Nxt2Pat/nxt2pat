'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / total) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-2xl glass-panel shadow-lg border border-ink/20 flex items-center justify-center text-deep hover:text-ink hover:border-ink transition-all duration-200 cursor-pointer group active:scale-95 bg-white/90 dark:bg-card-dark/90"
      title="Scroll back to top"
      aria-label="Scroll back to top"
    >
      <svg className="absolute w-10 h-10 -rotate-90 pointer-events-none">
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-card-border"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#6B5EE4"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100"
          fill="none"
        />
      </svg>
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
