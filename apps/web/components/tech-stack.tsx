import StackIcon from 'tech-stack-icons';
import { TECHNOLOGIES } from '@/lib/constants';

export default function TechStack() {
  const categories = Object.keys(TECHNOLOGIES) as (keyof typeof TECHNOLOGIES)[];
  
  return (
    <section className="py-16">
      <div className="space-y-12">
        {/* Section header */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Technology Stack</h2>
          <p className="text-lg text-gray-400">
            Core technologies powering modern solutions
          </p>
        </div>
        
        {/* Technology categories */}
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {TECHNOLOGIES[category].map((tech) => (
                <div
                  key={tech.name}
                  className="group perplexity-card hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <StackIcon 
                      name={tech.iconName} 
                      className="w-10 h-10"
                      {...(tech.iconName === 'expressjs' ? { variant: 'dark' } : {})}
                    />
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white">
                        {tech.name}
                      </h3>
                      
                      {/* Proficiency bar */}
                      <div className="px-2">
                        <div className="h-1 bg-dark-tertiary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-primary font-medium">
                          {tech.proficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}