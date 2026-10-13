'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '@/lib/sound';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (history.length === 0) {
        setHistory([
          {
            id: 'init',
            command: 'system.boot',
            output: (
              <div className="space-y-1 text-slate-300">
                <p className="text-cyan font-bold">Nxt2Pat Autonomous Console v1.0 [PWA Mode]</p>
                <p className="text-muted">Type <span className="text-ink font-semibold">help</span> to view available system commands or <span className="text-ink font-semibold">benchmark</span> to run a hardware test.</p>
              </div>
            ),
          },
        ]);
      }
    }
  }, [isOpen, history.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    soundEngine.playClick();

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-ink font-semibold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-400">
              <div><span className="text-cyan">projects</span> : List engineering case studies</div>
              <div><span className="text-cyan">blog</span>     : List technical devlogs</div>
              <div><span className="text-cyan">creed</span>    : View CPU-First manifesto</div>
              <div><span className="text-cyan">skills</span>   : Output engineering stack matrix</div>
              <div><span className="text-cyan">benchmark</span>: Run in-browser compute loop test</div>
              <div><span className="text-cyan">confetti</span> : Launch celebration particles</div>
              <div><span className="text-cyan">contact</span>  : Display transmission channels</div>
              <div><span className="text-cyan">clear</span>    : Wipe terminal buffer</div>
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-ink font-semibold">Engineering Projects:</p>
            <div className="space-y-1">
              <div>• <button onClick={() => { router.push('/projects/transforge'); onClose(); }} className="text-cyan underline hover:text-white cursor-pointer">TransForge</button> - Neutralino + Bun localization studio</div>
              <div>• <button onClick={() => { router.push('/projects/tea-care'); onClose(); }} className="text-emerald-400 underline hover:text-white cursor-pointer">TeaCare</button> - ESP32 high-altitude soil telemetry array</div>
              <div>• <button onClick={() => { router.push('/projects/dust-watch'); onClose(); }} className="text-amber-400 underline hover:text-white cursor-pointer">DustWatch</button> - ESP32-S3 LoRa particulate mesh</div>
              <div>• <button onClick={() => { router.push('/projects/wyrdvein'); onClose(); }} className="text-purple-400 underline hover:text-white cursor-pointer">Wyrdvein</button> - Rust + wgpu 2D ECS game engine</div>
            </div>
          </div>
        );
        break;

      case 'blog':
      case 'posts':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan font-semibold">Technical Devlogs:</p>
            <div className="space-y-1">
              <div>• <button onClick={() => { router.push('/blog/why-pwa-over-database'); onClose(); }} className="text-ink underline hover:text-white cursor-pointer">why-pwa-over-database</button></div>
              <div>• <button onClick={() => { router.push('/blog/desktop-bun-neutralino'); onClose(); }} className="text-ink underline hover:text-white cursor-pointer">desktop-bun-neutralino</button></div>
              <div>• <button onClick={() => { router.push('/blog/rx580-ml-optimization'); onClose(); }} className="text-ink underline hover:text-white cursor-pointer">rx580-ml-optimization</button></div>
            </div>
          </div>
        );
        break;

      case 'creed':
      case 'about':
        output = (
          <div className="p-2 border-l-2 border-ink bg-white/5 text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan font-bold">// THE CPU-FIRST CREED</p>
            <p>&quot;Respect constrained hardware. If software crawls on lean silicon, it is poorly engineered. True elegance is sub-100ms speed, local autonomy, and zero external baggage.&quot;</p>
            <p className="text-muted text-[11px]">Primary baseline: AMD Radeon RX 580 (Polaris 20 gfx803) + Ryzen 5 3600</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div><span className="text-emerald-400 font-semibold">[Embedded]</span>: ESP32, Arduino IDE, MQTT, LoRa</div>
            <div><span className="text-ink font-semibold">[Systems] </span>: Node.js, Bun, SQLite, Tauri 2, Python</div>
            <div><span className="text-cyan font-semibold">[Web App] </span>: TypeScript, JavaScript, Next.js, Tailwind, Supabase</div>
            <div><span className="text-amber-400 font-semibold">[Game Dev]</span>: PyGame, Unity, Ren&apos;Py, RPGMaker</div>
          </div>
        );
        break;

      case 'benchmark': {
        const t0 = performance.now();
        let sum = 0;
        for (let i = 0; i < 2_000_000; i++) {
          sum += Math.sqrt(i) * Math.sin(i);
        }
        const t1 = performance.now();
        const duration = (t1 - t0).toFixed(2);
        soundEngine.playSuccess();

        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300 border border-emerald-500/30 p-2.5 rounded-lg bg-emerald-500/5">
            <p className="text-emerald-400 font-bold">✓ Hardware Compute Benchmark Finished</p>
            <p>Calculated 2,000,000 vector trig iterations in <span className="text-white font-bold">{duration} ms</span>.</p>
            <p className="text-muted text-[11px]">Checksum: {sum.toFixed(4)} · Client Thread Status: Operational</p>
          </div>
        );
        break;
      }

      case 'confetti':
        soundEngine.playSuccess();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6B5EE4', '#38BDF8', '#34D399'],
        });
        output = <p className="text-emerald-400 text-xs font-mono">✦ Celebratory aurora particles dispatched!</p>;
        break;


      case 'contact':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p>Email: <a href="mailto:contact@nxt2pat.dev" className="text-cyan underline">contact@nxt2pat.dev</a></p>
            <p>GitHub: <a href="https://github.com/nxt2pat" target="_blank" rel="noreferrer" className="text-cyan underline">github.com/nxt2pat</a></p>
            <p>Location: Bangkok, Thailand (UTC+7)</p>
          </div>
        );
        break;

      case 'sudo':
      case 'sudo rm -rf /':
        output = <p className="text-amber-400 text-xs font-mono">permission denied: you already possess root autonomy in this PWA sandbox.</p>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            command not found: {rawCmd}. Type <span className="text-cyan underline">help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        command: rawCmd,
        output,
      },
    ]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl bg-[#0D0B18] border border-ink/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${isExpanded ? 'h-[85vh] max-w-4xl' : 'h-[480px]'
          }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#151226] border-b border-white/10 select-none">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <TerminalIcon className="w-4 h-4 text-ink" />
            <span className="font-semibold text-white">nxt2pat@autonomous-pwa: ~</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle terminal maximize"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400">❯</span>
                <span className="text-slate-200">{item.command}</span>
              </div>
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) handleCommand(input);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-[#110E20] border-t border-white/10"
        >
          <span className="text-emerald-400 font-mono text-xs">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command... (e.g. help, projects, benchmark, confetti)"
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-slate-500 focus:outline-hidden"
          />
          <kbd className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-400">Enter</kbd>
        </form>
      </div>
    </div>
  );
};
