'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Layers,
  BookOpen,
  ArrowRight,
  Terminal,
  Sparkles,
  Cpu,
  Zap,
  Mail,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createSearchIndex, type SearchableItem } from '@/lib/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SearchableItem[];
  initialQuery?: string;
}

type AppRouter = ReturnType<typeof useRouter>;

interface CommandItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  action: (router: AppRouter, onClose: () => void) => React.ReactNode | null;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  initialQuery = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [commandOutput, setCommandOutput] = useState<{ command: string; content: React.ReactNode } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex = useMemo(() => createSearchIndex(items), [items]);

  // Built-in Terminal & Command list
  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'cmd-skills',
        name: 'skills',
        description: 'Display 4 engineering disciplines stack matrix',
        category: 'Stack',
        icon: <Cpu className="w-4 h-4 text-cyan" />,
        action: () => (
          <div className="space-y-2 text-xs font-mono text-left">
            <div className="text-ink font-bold tracking-wider">// ENGINEERING DISCIPLINES MATRIX</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-deep/90">
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
                <div className="text-emerald-500 font-semibold mb-1">Embedded & IoT</div>
                <div className="text-xs text-muted">ESP32 · Arduino IDE · MQTT · LoRa</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
                <div className="text-ink font-semibold mb-1">Systems & Desktop</div>
                <div className="text-xs text-muted">Node.js · Bun · SQLite · Tauri 2 · Python</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
                <div className="text-cyan font-semibold mb-1">Web & Architecture</div>
                <div className="text-xs text-muted">TypeScript · JavaScript · Next.js · Tailwind CSS · Supabase</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
                <div className="text-amber-500 font-semibold mb-1">Game Dev & Creative Tools</div>
                <div className="text-xs text-muted">PyGame · Unity · Ren&apos;Py · RPGMaker</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'cmd-creed',
        name: 'creed',
        description: 'Read the CPU-First engineering manifesto',
        category: 'Philosophy',
        icon: <Zap className="w-4 h-4 text-amber-500" />,
        action: () => (
          <div className="space-y-2 text-xs font-mono text-left p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
            <div className="text-cyan font-bold tracking-wider">// THE CPU-FIRST CREED</div>
            <p className="text-deep/90 italic leading-relaxed">
              &quot;Respect constrained hardware. If software crawls on lean silicon, it is poorly engineered. True software elegance is sub-100ms speed, local autonomy, and zero external baggage.&quot;
            </p>
            <div className="text-[11px] text-muted pt-1 border-t border-card-border/60">
              Primary Hardware Rig: AMD Radeon RX 580 8GB (gfx803) + Ryzen 5 3600 · Sub-100ms Target
            </div>
          </div>
        ),
      },
      {
        id: 'cmd-benchmark',
        name: 'benchmark',
        description: 'Execute local 2,000,000 vector computation test',
        category: 'Hardware',
        icon: <Cpu className="w-4 h-4 text-emerald-500" />,
        action: () => {
          const t0 = performance.now();
          let sum = 0;
          for (let i = 0; i < 2_000_000; i++) {
            sum += Math.sqrt(i) * Math.sin(i);
          }
          const t1 = performance.now();
          const duration = (t1 - t0).toFixed(2);
          return (
            <div className="space-y-1.5 text-xs font-mono text-left p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-card-border">
              <div className="text-emerald-500 font-bold">✓ Hardware Compute Benchmark Finished</div>
              <div className="text-deep">Calculated 2,000,000 vector operations in <span className="font-bold text-ink">{duration} ms</span>.</div>
              <div className="text-[11px] text-muted">Checksum: {sum.toFixed(4)} · Client JS Engine: V8 / JavaScriptCore</div>
            </div>
          );
        },
      },
      {
        id: 'cmd-confetti',
        name: 'confetti',
        description: 'Trigger celebration particle burst',
        category: 'Visual',
        icon: <Sparkles className="w-4 h-4 text-pink-500" />,
        action: () => {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6B5EE4', '#38BDF8', '#34D399'],
          });
          return <div className="text-xs font-mono text-pink-500 font-semibold">✦ Aurora celebration particles dispatched!</div>;
        },
      },
      {
        id: 'cmd-contact',
        name: 'contact',
        description: 'Jump to Direct Contact Channels on About page',
        category: 'Navigation',
        icon: <Mail className="w-4 h-4 text-ink" />,
        action: (r: AppRouter, close: () => void) => {
          r.push('/about#contact');
          close();
          return null;
        },
      },
      {
        id: 'cmd-projects',
        name: 'projects',
        description: 'Navigate to Case Studies & Systems directory',
        category: 'Navigation',
        icon: <Layers className="w-4 h-4 text-ink" />,
        action: (r: AppRouter, close: () => void) => {
          r.push('/projects');
          close();
          return null;
        },
      },
      {
        id: 'cmd-blog',
        name: 'blog',
        description: 'Navigate to Architecture Journal and devlogs',
        category: 'Navigation',
        icon: <BookOpen className="w-4 h-4 text-cyan" />,
        action: (r: AppRouter, close: () => void) => {
          r.push('/blog');
          close();
          return null;
        },
      },
      {
        id: 'cmd-help',
        name: 'help',
        description: 'Display all available CLI commands',
        category: 'System',
        icon: <HelpCircle className="w-4 h-4 text-muted" />,
        action: () => (
          <div className="space-y-2 text-xs font-mono text-left">
            <div className="text-ink font-semibold">Supported Commands:</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted text-[11px]">
              <div><span className="text-cyan font-bold">&gt; skills</span> : Stack matrix</div>
              <div><span className="text-cyan font-bold">&gt; creed</span> : CPU-First manifesto</div>
              <div><span className="text-cyan font-bold">&gt; theme</span> : Toggle dark/light</div>
              <div><span className="text-cyan font-bold">&gt; benchmark</span> : Run compute loop</div>
              <div><span className="text-cyan font-bold">&gt; confetti</span> : Particle burst</div>
              <div><span className="text-cyan font-bold">&gt; contact</span> : Contact channels</div>
              <div><span className="text-cyan font-bold">&gt; projects</span> : View case studies</div>
              <div><span className="text-cyan font-bold">&gt; blog</span> : Devlogs journal</div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Determine if query is in command mode (starts with '>')
  const isCommandMode = query.trim().startsWith('>');
  const cleanCmdQuery = isCommandMode ? query.trim().slice(1).trim().toLowerCase() : query.trim().toLowerCase();

  // Filter commands
  const matchingCommands = useMemo(() => {
    if (isCommandMode) {
      if (!cleanCmdQuery) return commands;
      return commands.filter((c) => c.name.toLowerCase().includes(cleanCmdQuery) || c.description.toLowerCase().includes(cleanCmdQuery));
    }
    if (!cleanCmdQuery) return commands.slice(0, 3);
    return commands.filter((c) => c.name.toLowerCase().includes(cleanCmdQuery));
  }, [commands, isCommandMode, cleanCmdQuery]);

  // Filter content items
  const matchingContent = useMemo(() => {
    if (isCommandMode) return [];
    if (!cleanCmdQuery) return items.slice(0, 4);
    return searchIndex.search(cleanCmdQuery).map((res) => res.item);
  }, [isCommandMode, cleanCmdQuery, items, searchIndex]);

  // Unified selectable list: commands first (if matched or in cmd mode), then content items
  type UnifiedItem =
    | { kind: 'command'; item: CommandItem }
    | { kind: 'content'; item: SearchableItem };

  const unifiedList = useMemo<UnifiedItem[]>(() => {
    const list: UnifiedItem[] = [];
    matchingCommands.forEach((cmd) => list.push({ kind: 'command', item: cmd }));
    matchingContent.forEach((content) => list.push({ kind: 'content', item: content }));
    return list;
  }, [matchingCommands, matchingContent]);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setCommandOutput(null);
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setCommandOutput(null);
    }
  }, [isOpen, initialQuery]);

  const executeCommand = (cmd: CommandItem) => {
    const result = cmd.action(router, onClose);
    if (result) {
      setCommandOutput({ command: cmd.name, content: result });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (commandOutput) {
          setCommandOutput(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, unifiedList.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + unifiedList.length) % Math.max(1, unifiedList.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = unifiedList[selectedIndex];
        if (active) {
          if (active.kind === 'command') {
            executeCommand(active.item);
          } else {
            router.push(active.item.url);
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, unifiedList, selectedIndex, commandOutput, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-deep/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl glass-panel shadow-2xl border border-card-border overflow-hidden bg-white/95 dark:bg-card-dark/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search & CMD Input Box */}
        <div className="flex items-center px-4 border-b border-card-border gap-3">
          {isCommandMode ? (
            <Terminal className="w-4 h-4 text-cyan shrink-0 animate-pulse" />
          ) : (
            <Search className="w-4 h-4 text-ink shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects & devlogs, or type > for commands..."
            className="w-full py-4 text-sm text-deep placeholder:text-muted bg-transparent focus:outline-hidden font-mono"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setCommandOutput(null);
              }}
              className="p-1 text-muted hover:text-deep rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-black/5 dark:bg-white/5 border border-card-border px-1.5 py-0.5 rounded text-muted">
            ESC
          </kbd>
        </div>

        {/* Command Output Card (if executed) */}
        {commandOutput && (
          <div className="p-4 mx-2 mt-2 rounded-xl bg-ink/5 dark:bg-ink/10 border border-ink/20 space-y-2">
            <div className="flex items-center justify-between border-b border-card-border/60 pb-2">
              <span className="text-xs font-mono font-bold text-ink flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>&gt; {commandOutput.command}</span>
              </span>
              <button
                onClick={() => setCommandOutput(null)}
                className="text-[11px] font-mono text-muted hover:text-deep flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Output</span>
              </button>
            </div>
            <div>{commandOutput.content}</div>
          </div>
        )}

        {/* Unified Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {unifiedList.length > 0 ? (
            unifiedList.map((entry, index) => {
              const isSelected = index === selectedIndex;
              if (entry.kind === 'command') {
                const cmd = entry.item;
                return (
                  <div
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-ink/10 text-ink dark:bg-ink/20 font-medium'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-deep'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                        {cmd.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-semibold truncate flex items-center gap-2">
                          <span className="font-mono text-ink">&gt; {cmd.name}</span>
                        </div>
                        <div className="text-xs text-muted truncate">{cmd.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/10 text-ink uppercase">
                        CMD
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted" />
                    </div>
                  </div>
                );
              }

              // Content item
              const content = entry.item;
              return (
                <div
                  key={content.id}
                  onClick={() => {
                    router.push(content.url);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-ink/10 text-ink dark:bg-ink/20 font-medium'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-deep'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                      {content.type === 'project' ? (
                        <Layers className="w-4 h-4 text-ink" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-cyan" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold truncate">{content.title}</div>
                      <div className="text-xs text-muted truncate">{content.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 uppercase text-muted">
                      {content.type}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-muted font-mono">
              No matching commands or articles found. Type &gt; for CLI command list.
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 bg-black/2 dark:bg-white/2 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-muted">
          <span>Navigate with ↑ / ↓ · Enter to execute</span>
          <span>Type &gt; for CLI mode</span>
        </div>
      </div>
    </div>
  );
};
