'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectMetadata from '@/components/projects/project-metadata';
import FadeIn from '@/components/fade-in';
import { PROJECTS } from '@/lib/constants';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const project = PROJECTS.find((project) => project.slug === params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="border-gray-800"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" className="border-gray-800" asChild>
            <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
              Go To App
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed">{project.description}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <ProjectMetadata
          year={project.year}
          position={project.position}
          tagline={project.tagline}
          location={project.location}
        />
      </FadeIn>

      {project?.mobileImages && project?.mobileImages.length > 0 && (
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {project?.mobileImages.map((image, index) => (
              <div key={index} className="relative h-[600px]">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {project?.desktopImages && project?.desktopImages.length > 0 && (
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project?.desktopImages.map((image, index) => (
              <div key={index} className="relative h-[280px] md:h-[400px]">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
