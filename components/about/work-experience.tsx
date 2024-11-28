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
      'I led cross-functional teams to design and launch innovative digital products, significantly improving user engagement and satisfaction.',
  },
  {
    company: 'OwnProp (Rex)',
    period: '2021 - 2023',
    title: 'Co-Founder',
    description:
      'I developed responsive websites and interactive experiences, which enhanced client visibility and user interaction.',
  },
  {
    company: 'Rightpoint',
    period: '2019 - 2021',
    title: 'Software Developer',
    description:
      'I designed user-centered interfaces and conducted usability testing to ensure optimal user experiences.',
  },
  {
    company: 'Zeitgeist Artist Management',
    period: '2015 - 2018',
    title: 'Marketing Coordinator',
    description:
      'I assisted in designing and maintaining client websites, focusing on usability and aesthetic appeal.',
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
