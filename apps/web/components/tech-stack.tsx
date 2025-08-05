import StackIcon from 'tech-stack-icons';

const technologies = {
  Languages: [
    {
      name: 'TypeScript',
      iconName: 'typescript',
      proficiency: 92,
      yearsExp: '4+',
      description: 'Type-safe JavaScript for large-scale applications'
    },
    {
      name: 'Python',
      iconName: 'python',
      proficiency: 80,
      yearsExp: '3+',
      description: 'Data analysis, AI/ML, and backend development'
    },
    {
      name: 'Golang',
      iconName: 'go',
      proficiency: 75,
      yearsExp: '2+',
      description: 'High-performance backend services'
    },
    {
      name: 'Rust',
      iconName: 'rust',
      proficiency: 65,
      yearsExp: '1+',
      description: 'Systems programming and performance-critical apps'
    },
    {
      name: 'Solidity',
      iconName: 'solidity',
      proficiency: 70,
      yearsExp: '2+',
      description: 'Ethereum smart contracts & DeFi protocols'
    },
  ],
  'Web Dev': [
    {
      name: 'LLMs',
      iconName: 'openai',
      proficiency: 85,
      yearsExp: '2+',
      description: 'OpenAI, Claude, and custom AI integrations'
    },
    {
      name: 'Next.js',
      iconName: 'nextjs2',
      proficiency: 90,
      yearsExp: '4+',
      description: 'Full-stack React framework with SSR/SSG'
    },
    {
      name: 'React',
      iconName: 'react',
      proficiency: 95,
      yearsExp: '5+',
      description: 'Advanced component architecture & state management'
    },
    {
      name: 'Node.js',
      iconName: 'nodejs',
      proficiency: 88,
      yearsExp: '5+',
      description: 'Scalable server-side JavaScript applications'
    },
    {
      name: 'Express',
      iconName: 'expressjs',
      proficiency: 85,
      yearsExp: '4+',
      description: 'Fast, minimalist web framework for Node.js'
    },
    {
      name: 'GraphQL',
      iconName: 'graphql',
      proficiency: 82,
      yearsExp: '3+',
      description: 'Efficient data fetching and API architecture'
    },
  ],
  Databases: [
    {
      name: 'PostgreSQL',
      iconName: 'postgresql',
      proficiency: 85,
      yearsExp: '4+',
      description: 'Advanced relational database management'
    },
    {
      name: 'MongoDB',
      iconName: 'mongodb',
      proficiency: 80,
      yearsExp: '3+',
      description: 'NoSQL database for flexible data models'
    },
    {
      name: 'Redis',
      iconName: 'redis',
      proficiency: 78,
      yearsExp: '3+',
      description: 'In-memory caching and message brokering'
    },
    {
      name: 'Neo4j',
      iconName: 'neo4j',
      proficiency: 70,
      yearsExp: '2+',
      description: 'Graph database for connected data'
    },
  ],
  DevOps: [
    {
      name: 'GitHub Actions',
      iconName: 'github',
      proficiency: 85,
      yearsExp: '3+',
      description: 'CI/CD automation and workflow orchestration'
    },
    {
      name: 'Vercel',
      iconName: 'vercel',
      proficiency: 88,
      yearsExp: '3+',
      description: 'Edge deployments and serverless functions'
    },
    {
      name: 'Docker',
      iconName: 'docker',
      proficiency: 82,
      yearsExp: '4+',
      description: 'Containerization and microservices'
    },
    {
      name: 'Kubernetes',
      iconName: 'kubernetes',
      proficiency: 75,
      yearsExp: '2+',
      description: 'Container orchestration at scale'
    },
  ],
  Cloud: [
    {
      name: 'Google Cloud',
      iconName: 'gcloud',
      proficiency: 80,
      yearsExp: '3+',
      description: 'GCP services, BigQuery, and cloud infrastructure'
    },
    {
      name: 'Amazon AWS',
      iconName: 'aws',
      proficiency: 85,
      yearsExp: '4+',
      description: 'EC2, S3, Lambda, and AWS ecosystem'
    },
  ],
};

export default function TechStack() {
  const categories = Object.keys(technologies);
  const totalTechnologies = Object.values(technologies).flat().length;
  
  return (
    <section className="py-16">
      <div className="space-y-12">
        {/* Section header */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Technology Stack</h2>
          <p className="text-lg text-gray-400">
            Core technologies powering modern CRE solutions
          </p>
        </div>
        
        {/* Technology categories */}
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies[category].map((tech) => (
                <div
                  key={tech.name}
                  className="group perplexity-card hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <StackIcon 
                        name={tech.iconName} 
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {tech.name}
                        </h3>
                        <span className="text-xs text-primary font-medium">
                          {tech.yearsExp}
                        </span>
                      </div>
                      
                      {/* Proficiency bar */}
                      <div className="mb-2">
                        <div className="h-1.5 bg-dark-tertiary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">Proficiency</span>
                          <span className="text-xs text-primary font-medium">
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
          </div>
        ))}
      </div>
    </section>
  );
}