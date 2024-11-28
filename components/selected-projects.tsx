import { Button } from '@/components/ui/button';
import Link from 'next/link';

const projects = [
  {
    name: 'Liquid Finance',
    category: 'Commercial Debt',
    image: '/placeholder.svg',
    gradient: 'from-red-500/20',
  },
  {
    name: 'Cityfunds',
    category: 'Home Equity',
    image: '/placeholder.svg',
    gradient: 'from-gray-500/20',
  },
  {
    name: 'OwnProp',
    category: 'Commercial Equity',
    image: '/placeholder.svg',
    gradient: 'from-blue-500/20',
  },
];

export default function SelectedProjects() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">Selected Projects</h2>
        <Button
          variant="outline"
          className="border-gray-800 hover:bg-gray-800"
          asChild
        >
          <Link href="/projects">All Projects</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.name}
            href="/projects"
            className="group relative rounded-lg border border-dashed border-gray-800 overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={project.image}
                alt=""
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${project.gradient} to-transparent opacity-60`}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-semibold text-white">
                {project.name}
              </h3>
              <p className="text-gray-300">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
