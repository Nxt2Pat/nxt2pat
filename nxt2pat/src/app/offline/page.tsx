'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function OfflineFallbackPage() {
  const [retrying, setRetrying] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="py-20 min-h-[75vh] flex items-center">
      <Container className="max-w-xl">
        <Card className="text-center p-8 sm:p-12 space-y-6 border-ink/30">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
            <WifiOff className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold tracking-wider">
              // OFFLINE_CACHED_MODE
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-deep">
              Browsing Without Connection
            </h1>
            <p className="text-sm text-muted leading-relaxed font-sans">
              You are currently disconnected from the internet. This portfolio is engineered as an offline-first PWA, so all previously visited case studies and cached static pages remain fully readable.
            </p>
          </div>

          {/* Connection Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border bg-black/2 dark:bg-white/2 border-card-border">
            <span>
              {isOnline ? 'Connection Restored · Ready to Refresh' : 'Network Status: Disconnected'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button onClick={handleRetry} disabled={retrying} className="w-full sm:w-auto">
              <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
              <span>{retrying ? 'Checking Network...' : 'Retry Connection'}</span>
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </Button>
            </Link>
          </div>

          {/* Pre-cached Section Shortcuts */}
          <div className="pt-6 border-t border-card-border/60 text-left space-y-3">
            <span className="text-xs font-mono text-muted uppercase tracking-wider block">
              Pre-Cached Hubs Available:
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/projects"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-card-border hover:border-ink hover:text-ink transition-colors bg-white/50 dark:bg-card-dark/50"
              >
                <Layers className="w-4 h-4 text-ink" />
                <span className="font-medium">Projects Grid</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-card-border hover:border-ink hover:text-ink transition-colors bg-white/50 dark:bg-card-dark/50"
              >
                <BookOpen className="w-4 h-4 text-cyan" />
                <span className="font-medium">Devlogs Index</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero-database local cache enabled</span>
          </div>
        </Card>
      </Container>
    </div>
  );
}
