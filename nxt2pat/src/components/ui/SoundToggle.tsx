'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '@/lib/sound';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(soundEngine.isEnabled());
  }, []);

  const handleToggle = () => {
    const next = !enabled;
    setEnabled(next);
    soundEngine.setEnabled(next);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`p-1.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
        enabled
          ? 'border-ink/30 text-ink bg-ink/10 shadow-xs'
          : 'border-card-border text-muted hover:text-deep hover:border-ink/30 bg-white/40 dark:bg-card-dark/40'
      }`}
      title={enabled ? 'Tactile Sound Effects: Enabled' : 'Tactile Sound Effects: Muted'}
      aria-label="Toggle UI Sound Effects"
    >
      {enabled ? <Volume2 className="w-4 h-4 text-ink" /> : <VolumeX className="w-4 h-4 text-muted" />}
    </button>
  );
};
