import { MapPin, Briefcase } from 'lucide-react';
import { WORK_EXPERIENCES, type WorkExperience } from '@/lib/constants';

export default function WorkExperience() {
  return (
    <section className="py-16">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Work Experience</h2>
        <p className="text-lg text-gray-400">
          Building innovative solutions at the intersection of real estate, technology, and finance
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px w-0.5 h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        
        <div className="space-y-12">
          {WORK_EXPERIENCES.map((experience, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-dark-secondary" />
              
              {/* Date card (alternates sides) */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}>
                <div className={`inline-block ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                    {experience.period}
                  </div>
                </div>
              </div>
              
              {/* Content card */}
              <div className="md:w-1/2 ml-8 md:ml-0">
                <div className="group perplexity-card hover:scale-[1.02] transition-all duration-200">
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
                    <ul className="space-y-2">
                      {experience.bullets.map((bullet, bulletIndex) => (
                        <li 
                          key={bulletIndex} 
                          className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"
                        >
                          <span className="text-primary">•</span>
                          <span className="text-sm leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}