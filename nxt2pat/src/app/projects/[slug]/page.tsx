import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Cpu, Calendar, Activity, Bot } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { ReadingProgressBar } from '@/components/content/ReadingProgressBar';
import { TableOfContents } from '@/components/content/TableOfContents';
import { ReactionsBar } from '@/components/content/ReactionsBar';
import { ImageGallery } from '@/components/content/ImageGallery';
import { CoverImage } from '@/components/content/CoverImage';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { getAiUsageConfig } from '@/lib/aiUsage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const categoryVariant = ({
    embedded: 'emerald',
    tauri: 'ink',
    web: 'cyan',
    ml: 'amber',
    game: 'purple',
  }[project.category] || 'ink') as 'emerald' | 'ink' | 'cyan' | 'amber' | 'purple';

  const aiConfig = getAiUsageConfig(project.aiUsage);

  return (
    <article className="py-12">
      <ReadingProgressBar />
      <Container className="max-w-4xl">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Case Study Header */}
        <header className="space-y-6 pb-8 border-b border-card-border mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={categoryVariant}>
              {project.category.toUpperCase()}
            </Badge>
            {aiConfig && (
              <Badge variant={aiConfig.badgeVariant} className="py-1 gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>ระดับ AI: {aiConfig.label}</span>
              </Badge>
            )}
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>{project.status.toUpperCase()}</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep tracking-tight">
            {project.title}
          </h1>

          <p className="text-xl text-muted leading-relaxed font-sans">
            {project.tagline}
          </p>

          {/* AI Usage Transparency Note */}
          {aiConfig && (
            <div className="flex items-center gap-2 text-xs text-muted font-sans bg-black/2 dark:bg-white/2 border border-card-border/80 px-3.5 py-2 rounded-xl">
              <Bot className="w-4 h-4 text-ink shrink-0" />
              <span>
                <strong className="text-deep font-medium font-mono">{aiConfig.label}:</strong> {aiConfig.description}
              </span>
            </div>
          )}

          {/* Hardware Specification Callout */}
          {project.hardwareSpec && (
            <div className="flex items-center gap-2 text-xs font-mono text-deep bg-ink/5 dark:bg-ink/15 border border-ink/15 px-3.5 py-2 rounded-xl">
              <Cpu className="w-4 h-4 text-cyan shrink-0" />
              <span>Hardware Specification: {project.hardwareSpec}</span>
            </div>
          )}

          {/* Metrics & Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-deep border border-card-border"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-deep hover:text-ink border border-card-border px-3 py-1.5 rounded-xl transition-colors bg-white/60 dark:bg-card-dark/60"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-ink hover:bg-ink-hover px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Featured Cover Image with Click-to-Zoom */}
        {project.imageUrl && (
          <CoverImage
            src={project.imageUrl}
            alt={project.title}
            aspectRatioClass="h-64 sm:h-96"
          />
        )}

        {/* Dynamic Table of Contents */}
        <TableOfContents content={project.content} />

        {/* Markdown Content Body */}
        <MarkdownRenderer content={project.content} />

        {/* Interactive Photo Gallery / Artifacts */}
        {project.gallery && project.gallery.length > 0 && (
          <ImageGallery
            items={project.gallery}
            title="ภาพถ่ายชิ้นงานและเอกสารประกอบ (Case Study Gallery)"
            description="รวมภาพถ่ายชิ้นงานจริง แผนผังระบบ วงจรอิเล็กทรอนิกส์ และผลการทดสอบการทำงาน"
          />
        )}

        {/* Reactions & Celebratory Claps */}
        <ReactionsBar itemSlug={project.slug} itemTitle={project.title} />
      </Container>
    </article>
  );
}
