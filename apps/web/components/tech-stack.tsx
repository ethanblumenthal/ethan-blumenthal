const technologies = [
  {
    name: 'React',
    category: 'Frontend',
    icon: '/tech-stack/react.webp',
    proficiency: 95,
    yearsExp: '5+',
    description: 'Advanced component architecture & state management'
  },
  {
    name: 'NextJS',
    category: 'Frontend',
    icon: '/tech-stack/nextjs.webp',
    proficiency: 90,
    yearsExp: '4+',
    description: 'Full-stack React framework with SSR/SSG'
  },
  {
    name: 'NodeJS',
    category: 'Backend',
    icon: '/tech-stack/nodejs.webp',
    proficiency: 88,
    yearsExp: '5+',
    description: 'Scalable server-side JavaScript applications'
  },
  {
    name: 'Supabase',
    category: 'Backend',
    icon: '/tech-stack/supabase.webp',
    proficiency: 85,
    yearsExp: '2+',
    description: 'Modern backend-as-a-service with PostgreSQL'
  },
  {
    name: 'TypeScript',
    category: 'Language',
    icon: '/tech-stack/typescript.webp',
    proficiency: 92,
    yearsExp: '4+',
    description: 'Type-safe JavaScript for large-scale applications'
  },
  {
    name: 'Python',
    category: 'Language',
    icon: '/tech-stack/python.webp',
    proficiency: 80,
    yearsExp: '3+',
    description: 'Data analysis, AI/ML, and backend development'
  },
  {
    name: 'Golang',
    category: 'Language',
    icon: '/tech-stack/golang.webp',
    proficiency: 75,
    yearsExp: '2+',
    description: 'High-performance backend services'
  },
  {
    name: 'Solidity',
    category: 'Smart Contracts',
    icon: '/tech-stack/solidity.webp',
    proficiency: 70,
    yearsExp: '2+',
    description: 'Ethereum smart contracts & DeFi protocols'
  },
];

export default function TechStack() {
  return (
    <section className="py-16">
      <div className="space-y-8">
        {/* Section header */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Technology Stack</h2>
          <p className="text-lg text-gray-400">
            Core technologies powering modern CRE solutions
          </p>
        </div>
        
        {/* Technology grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group perplexity-card hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    className="w-12 h-12 rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {tech.name}
                    </h3>
                    <span className="text-xs text-cyan-400 font-medium">
                      {tech.yearsExp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{tech.category}</p>
                  
                  {/* Proficiency bar */}
                  <div className="mb-2">
                    <div className="h-1.5 bg-dark-tertiary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${tech.proficiency}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">Proficiency</span>
                      <span className="text-xs text-cyan-400 font-medium">
                        {tech.proficiency}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {tech.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8+</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-gray-400">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Passion Driven</div>
          </div>
        </div>
      </div>
    </section>
  );
}
