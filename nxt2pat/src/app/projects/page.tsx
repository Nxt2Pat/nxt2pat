import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProjectsClient } from './ProjectsClient';
import { getAllProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects & Case Studies',
  description: 'Explore technical case studies across embedded IoT, lightweight desktop tools, and zero-database web architectures by Nxt2Pat.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink uppercase tracking-wider font-semibold">
            // SYSTEMS_CATALOG
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep tracking-tight">
            Engineering Case Studies
          </h1>
          <p className="text-base text-muted leading-relaxed font-sans">
            A comprehensive index of hardware prototypes, desktop applications, and web architectures designed with clean separation of concerns and high runtime performance.
          </p>
        </div>

        {/* Interactive Client Component */}
        <ProjectsClient projects={projects} />
      </Container>
    </div>
  );
}
