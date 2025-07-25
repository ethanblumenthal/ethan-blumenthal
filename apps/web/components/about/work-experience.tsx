interface WorkExperience {
  company: string;
  period: string;
  title: string;
  description: string;
}

const experiences: WorkExperience[] = [
  {
    company: 'Nada Finance',
    period: '2023 - 2024',
    title: 'VP of Engineering',
    description:
      'Built and scaled mobile and web applications for Cityfunds platform holding over $10M in home equity investments across 150 homes.',
  },
  {
    company: 'OwnProp (Rex)',
    period: '2021 - 2023',
    title: 'Co-Founder',
    description:
      'Co-founded a tokenized commercial real estate platform, securing $850k in assets and 3,500 investors while pioneering ERC-1404 security tokens and AMM frameworks.',
  },
  {
    company: 'Rightpoint',
    period: '2019 - 2021',
    title: 'Software Developer',
    description:
      'Delivered enterprise-grade software solutions for Fortune 500 companies, integrating payment systems, CMS platforms, and microservices with a focus on scalability and user experience.',
  },
  {
    company: 'Zeitgeist Artist Management',
    period: '2015 - 2018',
    title: 'Marketing Coordinator',
    description:
      'Directed marketing campaigns generating 10M+ impressions, developed content strategies, and managed digital branding for indie rock artists.',
  },
];

export default function WorkExperience() {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-white mb-8">Work Experience</h2>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="relative pb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="md:w-1/3 space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl text-gray-400">
                    {experience.company}
                  </h3>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600">{experience.period}</span>
                </div>
                <p className="text-xl font-semibold text-white">
                  {experience.title}
                </p>
              </div>
              <p className="md:w-2/3 text-gray-400">{experience.description}</p>
            </div>
            {index !== experiences.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 border-b border-dashed border-gray-800" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
