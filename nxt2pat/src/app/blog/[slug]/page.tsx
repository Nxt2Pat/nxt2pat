import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { ReadingProgressBar } from '@/components/content/ReadingProgressBar';
import { TableOfContents } from '@/components/content/TableOfContents';
import { ReactionsBar } from '@/components/content/ReactionsBar';
import { ImageGallery } from '@/components/content/ImageGallery';
import { CoverImage } from '@/components/content/CoverImage';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — Devlog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12">
      <ReadingProgressBar />
      <Container className="max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Devlogs</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-card-border mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
            <span className="text-ink font-semibold uppercase">{post.category}</span>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-deep tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted leading-relaxed font-sans">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg bg-ink/5 dark:bg-ink/15 text-deep/80 dark:text-cyan border border-ink/10"
              >
                <Tag className="w-3 h-3 text-ink" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </header>

        {/* Featured Cover Image with Click-to-Zoom */}
        {post.imageUrl && (
          <CoverImage
            src={post.imageUrl}
            alt={post.title}
            aspectRatioClass="h-64 sm:h-80"
          />
        )}

        {/* Dynamic Table of Contents */}
        <TableOfContents content={post.content} />

        {/* Markdown Content */}
        <MarkdownRenderer content={post.content} />

        {/* Interactive Photo Gallery / Artifacts */}
        {post.gallery && post.gallery.length > 0 && (
          <ImageGallery
            items={post.gallery}
            title="ภาพประกอบบทความและบันทึกการพัฒนา (Article Gallery)"
            description="ภาพบันทึกหน้าจอ ขั้นตอนการทดลอง และไดอะแกรมประกอบบทความ"
          />
        )}

        {/* Interactive Reactions Bar */}
        <ReactionsBar itemSlug={post.slug} itemTitle={post.title} />
      </Container>
    </article>
  );
}
