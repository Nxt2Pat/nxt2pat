'use client';

import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, FileText, RotateCcw, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';

const DEFAULT_TEMPLATE = `---
title: "New System Case Study"
slug: "new-system"
tagline: "Ultra-lean architecture crafted with zero external baggage"
category: "web"
status: "active"
featured: true
year: 2026
techStack: ["Next.js", "Bun", "Tailwind CSS"]
metrics:
  latency: "sub-100ms"
  footprint: "Zero DB"
---

# New System Case Study

## Executive Summary
Describe the primary architectural innovation here. Why was this tool built, and what problem does it solve without bloat?

## Key Architectural Decisions
- Decision 1: Kept state local-first to eliminate cold starts.
- Decision 2: Used Bun for fast package compilation.

## Engineering Metrics
| Metric | Baseline | This System | Gain |
|---|---|---|---|
| Load Time | 2400ms | 40ms | 60x faster |
| Memory | 350MB | 32MB | 10x lighter |
`;

export default function DraftStudioPage() {
  const [content, setContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedTime, setSavedTime] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('nxt2pat_draft_content');
    if (saved) {
      setContent(saved);
      setSavedTime('Loaded from browser local storage');
    } else {
      setContent(DEFAULT_TEMPLATE);
    }
  }, []);

  const handleContentChange = (val: string) => {
    setContent(val);
    localStorage.setItem('nxt2pat_draft_content', val);
    const now = new Date();
    setSavedTime(`Autosaved at ${now.toLocaleTimeString()}`);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'new-post.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetTemplate = () => {
    if (window.confirm('Reset draft to initial template? This will replace current draft.')) {
      handleContentChange(DEFAULT_TEMPLATE);
    }
  };

  return (
    <div className="py-8">
      <Container className="max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-card-border mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-ink font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>// LOCAL_DRAFT_STUDIO</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-deep">
              Author & Preview Studio
            </h1>
            <p className="text-xs text-muted font-mono mt-0.5">
              100% Client-Side · Autosaves to localStorage · Zero Server Requirements
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {savedTime && (
              <span className="text-xs font-mono text-muted mr-2">
                {savedTime}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleResetTemplate}>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="w-3.5 h-3.5" />
              <span>Export .md File</span>
            </Button>
          </div>
        </div>

        {/* Split-Screen Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]">
          {/* Left Editor */}
          <div className="flex flex-col rounded-2xl border border-card-border glass-panel overflow-hidden">
            <div className="px-4 py-2.5 bg-black/5 dark:bg-white/5 border-b border-card-border flex items-center justify-between text-xs font-mono text-muted">
              <span className="flex items-center gap-1.5 font-semibold text-deep">
                <FileText className="w-3.5 h-3.5 text-ink" />
                Raw Markdown & YAML Frontmatter
              </span>
              <span>{content.length} chars</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Paste or write Markdown with YAML frontmatter..."
              className="flex-1 w-full p-4 font-mono text-xs leading-relaxed text-deep bg-transparent resize-none focus:outline-hidden"
              spellCheck={false}
            />
          </div>

          {/* Right Live Preview */}
          <div className="flex flex-col rounded-2xl border border-card-border glass-panel overflow-hidden">
            <div className="px-4 py-2.5 bg-black/5 dark:bg-white/5 border-b border-card-border flex items-center justify-between text-xs font-mono text-muted">
              <span className="flex items-center gap-1.5 font-semibold text-deep">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                Aurora Ink Live Preview
              </span>
              <span>Compiled Client View</span>
            </div>
            <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
              <MarkdownRenderer content={content.replace(/^---[\s\S]*?---/, '')} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
