'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Devlogs', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Draft Studio', href: '/draft', badge: 'LOCAL' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Bangkok',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200 border-b',
        scrolled
          ? 'bg-white/85 dark:bg-cosmos/85 backdrop-blur-md border-card-border shadow-xs'
          : 'bg-transparent border-transparent'
      )}
    >
      <Container className="flex items-center justify-between h-12">
        {/* Logo / Brandmark */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif font-bold text-lg tracking-tight text-deep hover:text-ink transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-ink/10 flex items-center justify-center border border-ink/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-ink" />
          </div>
          <span>Nxt2Pat</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all relative',
                  isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-deep hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-muted border border-card-border">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools: Unified Search/Cmd, Theme, Clock */}
        <div className="hidden sm:flex items-center gap-2">
          {/* UTC+7 Clock */}
          {currentTime && (
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-muted border border-card-border px-2 py-0.5 rounded-lg bg-white/80 dark:bg-card-dark/80 backdrop-blur-xs">
              <span>{currentTime}</span>
              <span className="text-[9px] text-muted-light">BKK</span>
            </div>
          )}

          {/* Unified Search & Command Palette Trigger */}
          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 text-xs font-mono text-muted border border-card-border px-2.5 py-1 rounded-lg hover:border-ink hover:text-ink transition-colors bg-white/80 dark:bg-card-dark/80 cursor-pointer"
            aria-label="Open search and command palette"
          >
            <Search className="w-3 h-3 text-ink" />
            <span>Search / Cmd</span>
            <kbd className="text-[9px] bg-ink/10 px-1 py-0.2 rounded border border-ink/20">Ctrl+K</kbd>
          </button>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openSearch}
            className="p-1.5 rounded-xl border border-card-border text-muted hover:text-deep bg-white/80 dark:bg-card-dark/80"
            aria-label="Open Search & Command Palette"
          >
            <Search className="w-4 h-4 text-ink" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-deep hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-card-border bg-cosmos/95 dark:bg-cosmos/95 backdrop-blur-xl px-4 py-4 animate-in slide-in-from-top-3 duration-200 space-y-3">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
                    isActive ? 'bg-ink text-white' : 'text-deep hover:bg-black/5 dark:hover:bg-white/5'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-card-border flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
              className="flex items-center gap-2 text-xs font-mono text-ink cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search &amp; Commands (Ctrl+K / ~)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
