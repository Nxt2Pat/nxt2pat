'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const TelemetryWidget: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [metricValue, setMetricValue] = useState<number>(42.4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let step = 0;
    const points: number[] = Array.from({ length: 50 }, () => 25);

    const render = () => {
      step += 0.05;
      const newVal = 25 + Math.sin(step) * 12 + (Math.random() - 0.5) * 4;
      points.shift();
      points.push(newVal);

      setMetricValue(parseFloat((newVal * 1.8 + 10).toFixed(1)));

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(107, 94, 228, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      const stepX = width / (points.length - 1);
      for (let i = 0; i < points.length; i++) {
        const x = i * stepX;
        const y = height - (points[i] / 50) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Card className="p-5 overflow-hidden border-ink/20">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-ink font-semibold">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>LIVE_TELEMETRY_MONITOR</span>
        </div>
        <span className="text-[10px] text-muted">ESP32 SENSOR FEED</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-2/3 h-24 rounded-xl bg-[#0D0B18] overflow-hidden border border-ink/20 flex items-center justify-center">
          <canvas ref={canvasRef} width={280} height={96} className="w-full h-full" />
        </div>

        <div className="w-full sm:w-1/3 space-y-2 text-xs font-mono">
          <div>
            <div className="text-[10px] text-muted">Oscillation Amplitude</div>
            <div className="text-xl font-bold text-cyan">{metricValue} µg/m³</div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bus Status: Stable</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
