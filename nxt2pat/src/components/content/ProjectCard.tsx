'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Cpu, Bot } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAiUsageConfig } from '@/lib/aiUsage';
import type { Project } from '@/types/content';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = project.imageUrl || project.coverImage;

  const categoryVariant = ({
    embedded: 'emerald',
    tauri: 'ink',
    web: 'cyan',
    ml: 'amber',
    game: 'purple',
  }[project.category] || 'ink') as 'emerald' | 'ink' | 'cyan' | 'amber' | 'purple';

  const aiConfig = getAiUsageConfig(project.aiUsage);

  return (
    <Card className="flex flex-col justify-between h-full group overflow-hidden p-0 hover:border-ink/50 transition-all duration-300">
      <div>
        {/* Compact Thumbnail Image Preview */}
        {imageUrl && !imageError ? (
          <div className="relative w-full h-44 overflow-hidden bg-black/5 dark:bg-white/5 border-b border-card-border/60">
            <img
              src={imageUrl}
              alt={project.title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <Badge variant={categoryVariant}>
                {project.category.toUpperCase()}
              </Badge>
              {aiConfig && (
                <Badge variant={aiConfig.badgeVariant} className="bg-black/70 backdrop-blur-xs text-[10px] text-white border-white/20">
                  <Bot className="w-3 h-3 shrink-0" />
                  <span>{aiConfig.label}</span>
                </Badge>
              )}
            </div>
            <span className="absolute top-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs font-semibold">
              {project.year}
            </span>
          </div>
        ) : (
          <div className="px-5 pt-5 flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant={categoryVariant}>
                {project.category.toUpperCase()}
              </Badge>
              {aiConfig && (
                <Badge variant={aiConfig.badgeVariant} className="text-[10px] py-0.2">
                  <Bot className="w-3 h-3 shrink-0" />
                  <span>{aiConfig.label}</span>
                </Badge>
              )}
            </div>
            <span className="text-xs font-mono text-muted">{project.year}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 pt-4">
          {/* Project Title & Tagline */}
          <Link href={`/projects/${project.slug}`} className="block group-hover:text-ink transition-colors">
            <h3 className="font-serif text-xl font-bold text-deep mb-2 tracking-tight group-hover:text-ink transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed font-sans">
            {project.summary || project.tagline}
          </p>

          {/* Hardware or Performance Metric Pill */}
          {project.hardwareSpec && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted border border-card-border/80 px-2.5 py-1 rounded-lg bg-black/2 dark:bg-white/2 mb-4">
              <Cpu className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="truncate">{project.hardwareSpec}</span>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-ink/5 dark:bg-ink/15 text-deep/80 dark:text-cyan border border-ink/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-card-border/60 flex items-center justify-between text-xs">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-ink font-semibold group-hover:gap-2 transition-all"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 text-muted">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-deep hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                aria-label={`${project.title} source code`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-deep hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
