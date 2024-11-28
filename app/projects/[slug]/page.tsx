'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectMetadata from '@/components/projects/project-metadata';
import FadeIn from '@/components/fade-in';

const projects = {
  'liquid-finance': {
    title: 'Liquid Finance',
    description:
      'Liquid is an autonomous lending protocol that shrinks commercial real estate (CRE) financing timelines from 2-3 months to days. We leverage large language models (LLMs) to analyze deal materials (e.g., pro formas, pitch decks) and instantly generate actionable loan terms. Our terms provide borrowers with unmatched transparency, showing precisely how interest rates, collateral requirements, and repayment schedules are calculated.',
    year: '2024',
    position: 'Co-Founder, CTO',
    category: 'Commercial Debt',
    tool: 'Framer',
    previewUrl: 'https://liquid.finance',
  },
};

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects[params.slug as keyof typeof projects];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex justify-between items-center">
          <Button variant="outline" className="border-gray-800" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All projects
            </Link>
          </Button>
          <Button variant="outline" className="border-gray-800" asChild>
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Preview
            </a>
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <ProjectMetadata
          year={project.year}
          position={project.position}
          category={project.category}
          tool={project.tool}
        />
      </FadeIn>
    </div>
  );
}
