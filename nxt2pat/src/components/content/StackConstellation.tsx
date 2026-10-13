'use client';

import React, { useState } from 'react';
import { Cpu, Terminal, Globe, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StackNode {
  id: string;
  name: string;
  quadrant: string;
  icon: React.ReactNode;
  tagline: string;
  protocols: string[];
  description: string;
}

const NODES: StackNode[] = [
  {
    id: 'embedded',
    name: 'ESP32 Telemetry Array',
    quadrant: 'Bare-Metal Edge',
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    tagline: 'Autonomous sensor mesh with RTC deep sleep',
    protocols: ['MQTT over TLS', 'LoRa 915MHz', 'Arduino IDE'],
    description: 'Hardware nodes deployed in microclimates. Implements defensive timeouts to survive water ingress and sensor stall.',
  },
  {
    id: 'desktop',
    name: 'Neutralino + Bun Studio',
    quadrant: 'Lightweight Desktop',
    icon: <Terminal className="w-5 h-5 text-ink" />,
    tagline: 'High-performance desktop tools without Chromium bloat',
    protocols: ['Standard IO IPC', 'Hybrid SQLite JSON', 'Bun Subprocess'],
    description: 'Replaces heavy Electron architectures with native OS WebViews and Bun workers for instantaneous 400ms startup.',
  },
  {
    id: 'web',
    name: 'Next.js 16 PWA Client',
    quadrant: 'Zero-DB Web Architecture',
    icon: <Globe className="w-5 h-5 text-cyan" />,
    tagline: 'Pre-compiled static Markdown with Serwist caching',
    protocols: ['Stale-While-Revalidate', 'Web App Manifest', 'gray-matter'],
    description: 'Completely eliminates external database latency and server cold starts. Works seamlessly while flying or offline.',
  },
  {
    id: 'engine',
    name: 'Rust + wgpu 2D ECS',
    quadrant: 'Data-Oriented Systems',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    tagline: 'Zero-allocation graphics and physics engine',
    protocols: ['Vulkan 1.3', 'Metal / DX12', 'Rayon Parallelism'],
    description: 'Bespoke game engine architecture bypassing engine monoliths in favor of cache-coherent contiguous memory arrays.',
  },
];

export const StackConstellation: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('embedded');

  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <Card className="p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-white/95 to-ink-light/30 dark:from-card-dark/95 dark:to-ink/10 border-ink/20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-card-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-ink font-semibold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-cyan" />
            <span>// ARCHITECTURE_CONSTELLATION</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-deep">
            Interactive Systems Topology
          </h3>
          <p className="text-xs text-muted">
            Click any node below to inspect architectural contracts and system data flows.
          </p>
        </div>

        {/* Node Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {NODES.map((node) => {
            const isSelected = node.id === selectedId;
            return (
              <button
                key={node.id}
                onClick={() => handleSelect(node.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${isSelected
                    ? 'bg-ink text-white border-ink shadow-sm shadow-ink/25 font-semibold'
                    : 'bg-white/60 dark:bg-card-dark/60 text-muted border-card-border hover:border-ink/40 hover:text-deep'
                  }`}
              >
                {node.icon}
                <span>{node.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Detail Spotlight */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-ink/10 text-ink dark:text-cyan border border-ink/20 uppercase font-semibold">
            {activeNode.quadrant}
          </span>
        </div>
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-deep">
          {activeNode.name}
        </h4>
        <p className="text-sm text-muted leading-relaxed font-sans max-w-3xl">
          {activeNode.description}
        </p>

        {/* Protocols List */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-muted mr-1">Protocols & Standards:</span>
          {activeNode.protocols.map((proto) => (
            <span
              key={proto}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-deep border border-card-border"
            >
              {proto}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
