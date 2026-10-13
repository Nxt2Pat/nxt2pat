import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, BookOpen, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/content/ProjectCard';
import { PostCard } from '@/components/content/PostCard';
import { Card } from '@/components/ui/Card';
import { ConstellationCanvas } from '@/components/canvas/ConstellationCanvas';
import { StoryShowcase } from '@/components/content/StoryShowcase';
import { ScrollThemeObserver } from '@/components/ui/ScrollThemeObserver';
import { getAllProjects, getAllPosts, getProfileData } from '@/lib/content';

export default function HomePage() {
  const projects = getAllProjects();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const posts = getAllPosts().slice(0, 3);
  const profile = getProfileData();

  return (
    <div id="top" className="space-y-24 pb-24">
      <ScrollThemeObserver targetId="about-intro" thresholdRatio={0.55} />
      {/* Immersive Full-Screen Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-3rem)] min-h-[calc(100dvh-3rem)] flex flex-col justify-between">
        {/* Interactive Canvas & Nebula Glow */}
        <ConstellationCanvas />
        <div className="absolute inset-0 nebula-gradient pointer-events-none" />

        {/* Top Breather */}
        <div className="pt-2 sm:pt-6" />

        {/* Centerpiece Hero Content */}
        <Container className="relative z-10 pointer-events-auto my-auto py-8 sm:py-12">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-deep leading-[1.08]">
              Engineering <span className="text-ink">Tangible Systems</span> &amp; Resilient Web Software.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed font-sans max-w-3xl">
              Hi, I&apos;m <span className="font-semibold text-deep">{profile.name}</span>. I build embedded IoT telemetry, ultra-lightweight desktop tools, and zero-database offline-first web applications with an uncompromising CPU-first creed.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/projects">
                <Button size="lg" className="shadow-xl shadow-ink/25 text-base px-6 py-3">
                  <span>Explore projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg" className="text-base px-6 py-3">
                  <BookOpen className="w-4 h-4 text-ink" />
                  <span>Read Devlogs</span>
                </Button>
              </Link>
              <a href="#about-intro">
                <Button variant="ghost" size="lg" className="text-base px-5 py-3">
                  <User className="w-4 h-4 text-cyan" />
                  <span>About Me</span>
                </Button>
              </a>
            </div>
          </div>
        </Container>

        {/* Bottom Breather */}
        <div className="pb-6 sm:pb-8" />
      </section>

      {/* Apple-Style Story Showcase Section */}
      <section id="about-intro" className="scroll-mt-16">
        <Container>
          <StoryShowcase profile={profile} />
        </Container>
      </section>

      {/* Featured Projects Section */}
      <section>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-ink font-semibold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>Featured Systems</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-deep tracking-tight">
                Case Studies & Inventions
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:gap-2.5 transition-all"
            >
              <span>View All {projects.length} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Recent Devlogs Section */}
      <section>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Architecture Journal</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-deep tracking-tight">
                Technical Devlogs & Field Notes
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:gap-2.5 transition-all"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* Skills & Concluding Disciplines */}
      <section className="pb-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono text-ink dark:text-cyan uppercase tracking-wider font-semibold">
              // CORE_STACK &amp; DISCIPLINES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep dark:text-white">
              ทักษะและความเชี่ยวชาญทางวิศวกรรม
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              &ldquo;ตั้งคำถามให้ลึก แล้วพิสูจน์ด้วยการลงมือทำจริง&rdquo; — ผสานองค์ความรู้ตั้งแต่วงจรฮาร์ดแวร์ ไมโครคอนโทรลเลอร์ จนถึงสถาปัตยกรรมซอฟต์แวร์เว็บความเร็วสูงและเกม เพื่อสร้างสรรค์นวัตกรรมที่ใช้งานได้จริงในโลกภายนอก
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="p-5">
                <h3 className="font-serif text-lg font-bold text-deep dark:text-white mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-deep/90 dark:text-slate-200 border border-card-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
