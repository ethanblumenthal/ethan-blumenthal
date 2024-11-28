import FadeIn from '@/components/fade-in';
import ProjectCard from '@/components/projects/project-card';

const projects = [
  {
    title: 'Liquid Finance',
    category: 'Commercial Debt',
    image: '/placeholder.svg',
    slug: 'liquid-finance',
    gradient: 'from-red-500/20',
  },
  {
    title: 'Cityfunds',
    category: 'Home Equity',
    image: '/placeholder.svg',
    slug: 'cityfunds',
    gradient: 'from-gray-500/20',
  },
  {
    title: 'OwnProp',
    category: 'Commercial Equity',
    image: '/placeholder.svg',
    slug: 'ownprop',
    gradient: 'from-blue-500/20',
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <h1 className="text-4xl font-bold text-white">Recent Projects</h1>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={0.2 * (index + 1)}>
            <ProjectCard {...project} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
