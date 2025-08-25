import { MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { WORK_EXPERIENCES, type WorkExperience } from '@/lib/constants';

export default function WorkExperience() {
  // Map company names to project slugs
  const projectLinks: Record<string, string> = {
    'Flow AI': '/projects/flow',
    'Nada Finance': '/projects/cityfunds',
    OwnProp: '/projects/ownprop',
  };

  return (
    <section className="py-16">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Work Experience</h2>
        <p className="text-lg text-gray-400">
          Building innovative solutions at the intersection of real estate, technology, and finance
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline line - positioned between date and card */}
        <div className="hidden md:block absolute left-[240px] top-8 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

        <div className="space-y-12">
          {WORK_EXPERIENCES.map((experience, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12"
            >
              {/* Timeline dot - positioned on the line */}
              <div className="hidden md:block absolute left-[240px] top-8 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-dark-secondary z-10" />

              {/* Date - aligned with top of card */}
              <div className="md:text-right md:pt-6">
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                  {experience.period}
                </div>
              </div>

              {/* Content card */}
              <div className="max-w-2xl">
                {projectLinks[experience.company] ? (
                  <Link href={projectLinks[experience.company]} className="block">
                    <div className="group perplexity-card hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                              {experience.company}
                            </h3>
                            {experience.tagline && (
                              <p className="text-sm text-gray-500 mt-1">{experience.tagline}</p>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-medium">{experience.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>{experience.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-1">
                          {experience.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"
                            >
                              <span className="text-primary leading-relaxed">•</span>
                              <span className="text-sm leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="group perplexity-card hover:scale-[1.01] transition-all duration-200">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {experience.company}
                          </h3>
                          {experience.tagline && (
                            <p className="text-sm text-gray-500 mt-1">{experience.tagline}</p>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-medium">{experience.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-1">
                        {experience.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"
                          >
                            <span className="text-primary leading-relaxed">•</span>
                            <span className="text-sm leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
