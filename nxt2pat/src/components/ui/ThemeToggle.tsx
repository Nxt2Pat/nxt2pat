'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nxt2pat_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored === 'dark' || (!stored && prefersDark);

    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nxt2pat_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nxt2pat_theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-xl border border-card-border hover:border-ink/40 text-muted hover:text-deep bg-white/40 dark:bg-card-dark/40 backdrop-blur-xs transition-colors cursor-pointer flex items-center justify-center group"
      title={isDark ? 'Switch to Daytime Cosmos' : 'Switch to Midnight Deep'}
      aria-label="Toggle visual theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-ink group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
