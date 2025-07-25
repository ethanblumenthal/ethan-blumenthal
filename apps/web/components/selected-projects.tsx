import { Button } from '@personal-app/ui';
import { PROJECTS } from '@/lib/constants';
import Link from 'next/link';
import { ExternalLink, TrendingUp, Building2, Users, Calendar } from 'lucide-react';

export default function SelectedProjects() {
  return (
    <section className="py-16">
      <div className="space-y-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
            <p className="text-lg text-gray-400">
              Commercial real estate technology solutions at scale
            </p>
          </div>
          <Button
            variant="outline"
            className="border-gray-600 hover:border-cyan-500 hover:bg-cyan-500/10 w-fit"
            asChild
          >
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group perplexity-card hover:scale-[1.02] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Project image */}
                <div className="aspect-video relative overflow-hidden rounded-lg border border-dark-border">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Project status badge */}
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-primary/80 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-cyan-400">Active</span>
                    </div>
                  </div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 bg-dark-primary/80 border border-gray-600 rounded-lg backdrop-blur-sm">
                      <ExternalLink className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                
                {/* Project details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-cyan-400 font-medium">{project.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{project.year}</div>
                      <div className="text-xs text-gray-400">{project.position}</div>
                    </div>
                  </div>
                  
                  {/* Project description */}
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Project metrics */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">PropTech</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-400">Growth Stage</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Portfolio summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-dark-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">$100M+</div>
            <div className="text-sm text-gray-400">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-gray-400">Companies Founded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">50K+</div>
            <div className="text-sm text-gray-400">Users Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">99%</div>
            <div className="text-sm text-gray-400">Platform Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
