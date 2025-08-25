import Image from 'next/image';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  logo?: string;
}

const educationData: EducationItem[] = [
  {
    institution: 'University of Texas',
    degree: 'MS',
    field: 'Computer Science',
    period: 'Aug 2021 - May 2022',
    logo: '/icons/texas.png',
  },
  {
    institution: 'University of Illinois',
    degree: 'BA',
    field: 'Economics',
    period: 'Aug 2011 - May 2015',
    logo: '/icons/illinois.svg',
  },
  {
    institution: 'Fullstack Academy',
    degree: 'Cert',
    field: 'Software Engineering',
    period: 'Jan 2019 - Apr 2019',
    logo: '/icons/fullstack.png',
  },
];

export default function Education() {
  return (
    <section className="py-16">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Education</h2>
        <p className="text-lg text-gray-400">
          Academic foundation in computer science, economics, and software engineering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="group perplexity-card hover:scale-[1.02] transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Logo or Icon */}
              <div className="flex items-center justify-between">
                {edu.logo ? (
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={edu.institution === 'University of Illinois' ? 32 : 48}
                    height={edu.institution === 'University of Illinois' ? 32 : 48}
                    className="object-contain"
                  />
                ) : (
                  <GraduationCap className="h-12 w-12 text-primary" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {edu.institution}
                </h3>
                <p className="text-sm font-medium text-gray-300">
                  {edu.degree}, {edu.field}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
