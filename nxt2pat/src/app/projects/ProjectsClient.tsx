'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ProjectFilter } from '@/components/content/ProjectFilter';
import { ProjectCard } from '@/components/content/ProjectCard';
import { getAiUsageConfig } from '@/lib/aiUsage';
import type { Project } from '@/types/content';

export const ProjectsClient: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeAiLevel, setActiveAiLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) {
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [projects]);

  const aiCounts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length, none: 0, partial: 0, mostly: 0, full: 0 };
    for (const p of projects) {
      const cfg = getAiUsageConfig(p.aiUsage);
      if (cfg) {
        map[cfg.key] = (map[cfg.key] || 0) + 1;
      }
    }
    return map;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;

      const aiCfg = getAiUsageConfig(project.aiUsage);
      const matchesAi = activeAiLevel === 'all' || (aiCfg && aiCfg.key === activeAiLevel);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        (aiCfg && aiCfg.label.toLowerCase().includes(query)) ||
        project.techStack.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesAi && matchesSearch;
    });
  }, [projects, activeCategory, activeAiLevel, searchQuery]);

  return (
    <div>
      {/* Search Input & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาโครงงาน, เทคโนโลยี, ระดับ AI..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-card-border bg-white/70 dark:bg-card-dark/70 text-deep focus:border-ink focus:outline-hidden backdrop-blur-md transition-all font-sans"
          />
        </div>
      </div>

      <ProjectFilter
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        counts={counts}
        activeAiLevel={activeAiLevel}
        onSelectAiLevel={setActiveAiLevel}
        aiCounts={aiCounts}
      />

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-card-border bg-white/30 dark:bg-card-dark/30">
          <p className="text-deep font-serif text-xl font-bold mb-1">ไม่พบโครงงานที่ตรงกับเงื่อนไข</p>
          <p className="text-sm text-muted">ลองปรับคำค้นหา หรือเลือกหมวดหมู่ / ระดับ AI อื่นดูครับ</p>
        </div>
      )}
    </div>
  );
};
