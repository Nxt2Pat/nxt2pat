'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Bot } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { getAiUsageConfig } from '@/lib/aiUsage';
import type { Post } from '@/types/content';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = post.imageUrl || post.coverImage;

  const aiConfig = getAiUsageConfig(post.aiUsage);

  return (
    <Card className="flex flex-col justify-between h-full group overflow-hidden p-0 hover:border-ink/50 transition-all duration-300">
      <div>
        {/* Compact Thumbnail Image Preview */}
        {imageUrl && !imageError ? (
          <div className="relative w-full h-40 overflow-hidden bg-black/5 dark:bg-white/5 border-b border-card-border/60">
            <img
              src={imageUrl}
              alt={post.title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs uppercase font-semibold">
                {post.category}
              </span>
              {aiConfig && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-xs border border-white/20 inline-flex items-center gap-1">
                  <Bot className="w-3 h-3 shrink-0" />
                  <span>{aiConfig.label}</span>
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="px-5 pt-5 mb-1 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-ink/10 text-ink dark:text-cyan border border-ink/20 uppercase font-semibold">
              {post.category}
            </span>
            {aiConfig && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-muted border border-card-border inline-flex items-center gap-1">
                <Bot className="w-3 h-3 text-ink shrink-0" />
                <span>{aiConfig.label}</span>
              </span>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 pt-3">
          {/* Meta Header */}
          <div className="flex items-center gap-3 text-xs font-mono text-muted mb-2.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-ink" />
              <span>{formatDate(post.date)}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Post Title */}
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-ink transition-colors">
            <h3 className="font-serif text-xl font-bold text-deep mb-2.5 tracking-tight group-hover:text-ink transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* Post Excerpt (แสดงผลโดยย่อ) */}
          <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed font-sans">
            {post.summary || post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-ink/5 dark:bg-ink/15 text-deep/80 dark:text-cyan border border-ink/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Read Action */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-card-border/60">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:gap-2.5 transition-all"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
