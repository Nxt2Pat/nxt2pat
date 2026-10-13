'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse h2 and h3 markdown lines
    const lines = content.split('\n');
    const parsed: TocItem[] = [];

    for (const line of lines) {
      const h2Match = /^##\s+(.+)$/.exec(line);
      const h3Match = /^###\s+(.+)$/.exec(line);

      if (h2Match) {
        const text = h2Match[1].trim();
        parsed.push({ id: slugify(text), text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        parsed.push({ id: slugify(text), text, level: 3 });
      }
    }

    setItems(parsed);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const scrollPos = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          const id = el.id || slugify(el.textContent || '');
          setActiveId(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl glass-panel border border-card-border mb-8 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono text-ink font-semibold uppercase tracking-wider">
        <List className="w-3.5 h-3.5" />
        <span>Table of Contents</span>
      </div>
      <nav className="space-y-1.5 text-xs font-sans">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id) || Array.from(document.querySelectorAll('h2, h3')).find(
                  (h) => slugify(h.textContent || '') === item.id
                );
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(item.id);
                }
              }}
              className={`block transition-colors py-1 ${
                item.level === 3 ? 'pl-3' : ''
              } ${
                isActive
                  ? 'text-ink font-semibold dark:text-cyan'
                  : 'text-muted hover:text-deep'
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
