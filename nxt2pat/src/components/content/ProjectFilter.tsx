import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
  activeAiLevel?: string;
  onSelectAiLevel?: (level: string) => void;
  aiCounts?: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
  activeAiLevel = 'all',
  onSelectAiLevel,
  aiCounts = {},
}) => {
  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Domains' },
    { key: 'embedded', label: 'Embedded & IoT' },
    { key: 'tauri', label: 'Desktop Tools' },
    { key: 'web', label: 'Web Systems' },
    { key: 'game', label: 'Games & Creative' },
    { key: 'ml', label: 'Lean ML / Engines' },
  ];

  const aiLevels: { key: string; label: string }[] = [
    { key: 'all', label: 'ทุกระดับ AI' },
    { key: 'none', label: 'ไม่ใช้เอไอ' },
    { key: 'partial', label: 'ใช้เอไอบางส่วน' },
    { key: 'mostly', label: 'ใช้เอไอส่วนใหญ่' },
    { key: 'full', label: 'ใช้เอไอทั้งหมด' },
  ];

  return (
    <div className="space-y-3 mb-8 select-none">
      {/* Domain Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count = cat.key === 'all' ? counts.all : counts[cat.key] || 0;

          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 border cursor-pointer flex items-center gap-2',
                isActive
                  ? 'bg-ink text-white border-ink shadow-xs shadow-ink/20 font-semibold'
                  : 'bg-white/60 dark:bg-card-dark/60 text-muted border-card-border hover:border-ink/50 hover:text-deep'
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-md',
                  isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-muted'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* AI Usage Level Filter */}
      {onSelectAiLevel && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-muted/70 mr-1 shrink-0">
            <Bot className="w-3.5 h-3.5 text-ink" />
            <span className="text-[11px]">ระดับ AI:</span>
          </div>

          {aiLevels.map((lvl) => {
            const isActive = activeAiLevel === lvl.key;
            const count = lvl.key === 'all' ? counts.all : aiCounts[lvl.key] || 0;

            // Only show if count > 0 or it's active or it's 'all'
            if (count === 0 && !isActive && lvl.key !== 'none' && lvl.key !== 'partial') {
              return null;
            }

            return (
              <button
                key={lvl.key}
                onClick={() => onSelectAiLevel(lvl.key)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] transition-all duration-150 border cursor-pointer flex items-center gap-1.5',
                  isActive
                    ? 'bg-ink/15 text-deep font-semibold border-ink/40 shadow-2xs'
                    : 'bg-white/40 dark:bg-card-dark/40 text-muted border-card-border hover:border-ink/30 hover:text-deep'
                )}
              >
                <span>{lvl.label}</span>
                <span
                  className={cn(
                    'text-[9px] px-1 py-0.1 rounded-sm',
                    isActive ? 'bg-ink/20 text-deep' : 'text-muted/60'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
