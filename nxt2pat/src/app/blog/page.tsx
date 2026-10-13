import React from 'react';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PostCard } from '@/components/content/PostCard';
import { getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Engineering Devlogs',
  description: 'Technical notes on zero-database web architecture, lightweight desktop runtimes, and embedded hardware telemetry by Nxt2Pat.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>// ARCHITECTURE_JOURNAL</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep tracking-tight">
            Engineering Devlogs
          </h1>
          <p className="text-base text-muted leading-relaxed font-sans">
            Technical writing documenting real-world trade-offs in systems development, CPU-first performance optimization, and local-first architecture.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
