'use client';

import React, { useState, useEffect } from 'react';
import { SearchModal } from '@/components/ui/SearchModal';
import type { SearchableItem } from '@/lib/search';

export const AppSearch: React.FC<{ items: SearchableItem[] }> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setInitialQuery('');
        setIsOpen((prev) => !prev);
        return;
      }

      // ~ or ` triggers command mode when not typing in input/textarea
      if (e.key === '`' || e.key === '~') {
        const active = document.activeElement;
        if (active?.tagName !== 'INPUT' && active?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setInitialQuery('>');
          setIsOpen(true);
          return;
        }
      }
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setInitialQuery(customEvent.detail?.query ?? '');
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleCustomOpen);
    };
  }, []);

  return (
    <SearchModal
      isOpen={isOpen}
      initialQuery={initialQuery}
      onClose={() => {
        setIsOpen(false);
        setInitialQuery('');
      }}
      items={items}
    />
  );
};
