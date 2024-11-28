const technologies = [
  {
    name: 'React',
    category: 'Frontend',
    icon: '/placeholder.svg',
  },
  {
    name: 'NextJS',
    category: 'Frontend',
    icon: '/placeholder.svg',
  },
  {
    name: 'Supabase',
    category: 'Backend',
    icon: '/placeholder.svg',
  },
  {
    name: 'NodeJS',
    category: 'Backend',
    icon: '/placeholder.svg',
  },
  {
    name: 'TypeScript',
    category: 'Communication',
    icon: '/placeholder.svg',
  },
  {
    name: 'Golang',
    category: 'Collaboration',
    icon: '/placeholder.svg',
  },
  {
    name: 'Python',
    category: 'Content Generation',
    icon: '/placeholder.svg',
  },
  {
    name: 'Solidity',
    category: 'Smart Contracts',
    icon: '/placeholder.svg',
  },
];

export default function TechStack() {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-white mb-8">My Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="border border-dashed border-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={tech.icon}
              alt=""
              className="w-12 h-12"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
              <p className="text-gray-400">{tech.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
