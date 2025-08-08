import { MapPin, Calendar, Briefcase } from 'lucide-react';

interface WorkExperience {
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  title: string;
  bullets: string[];
}

const experiences: WorkExperience[] = [
  {
    company: 'Liquid Finance',
    location: 'Austin, TX',
    period: 'Nov 2024 - Jul 2025',
    startDate: 'Nov 2024',
    endDate: 'Jul 2025',
    title: 'Co-Founder, CTO',
    bullets: [
      'Building agentic workflows for commercial real estate operations',
      'Developed SaaS solutions for 15+ private equity firms',
      'Made 1200+ contributions to the codebase',
      'Architected V3 of the platform infrastructure'
    ],
  },
  {
    company: 'Nada Finance',
    location: 'Austin, TX',
    period: 'Apr 2023 - Oct 2024',
    startDate: 'Apr 2023',
    endDate: 'Oct 2024',
    title: 'VP of Engineering',
    bullets: [
      'Originated $10M in home equity investments funded by 20,000 investors',
      'Built web app, mobile app, and APIs for the Cityfunds investment platform',
      'Integrated CRM and AI powered tools to scale origination processing',
      'Setup tracking systems for marketing conversions and product analytics',
      'Created smart contracts for the first ever home equity originations on-chain',
      'Made 2200+ contributions including pull requests, commits, and code reviews',
      'Managed a team of three individuals across engineering and design'
    ],
  },
  {
    company: 'OwnProp',
    location: 'Austin, TX',
    period: 'Aug 2021 - Feb 2023',
    startDate: 'Aug 2021',
    endDate: 'Feb 2023',
    title: 'Co-Founder, Engineering Lead',
    bullets: [
      'Tokenized $850k in private equity commercial real estate assets',
      'Grew user base to 3500+ investors and signed up five private equity clients',
      'Architected ERC-1404 standard security token offerings on Arbitrum',
      'Designed automated market maker based on SushiSwap\'s Trident framework',
      'Oversaw development of web app, mobile app, APIs, and smart contracts',
      'Pitched potential investors and spoke at conferences to evangelize business',
      'Executed go-to-market strategy bringing product from zero to one'
    ],
  },
  {
    company: 'Rightpoint',
    location: 'Chicago, IL',
    period: 'Jul 2019 - Jun 2021',
    startDate: 'Jul 2019',
    endDate: 'Jun 2021',
    title: 'Software Developer',
    bullets: [
      'Architected scalable production systems using microservices and containers',
      'Performed code reviews and oversaw documentation & deployment pipelines',
      'Implemented credit and ACH payments using Stripe billing APIs for ZenKey',
      'Integrated a CMS with transit readerboards for Outfront Media in Miami',
      'Led frontend development for an Intranet build for Southwest Airlines'
    ],
  },
  {
    company: 'Zeitgeist Artist Management',
    location: 'San Francisco, CA',
    period: 'Sep 2015 - Aug 2018',
    startDate: 'Sep 2015',
    endDate: 'Aug 2018',
    title: 'Marketing Coordinator',
    bullets: [
      'Launched publicity and marketing campaigns earning 10M+ impressions',
      'Created content strategies for social media, advertising, and newsletters',
      'Oversaw the design and development of artist websites and stores'
    ],
  },
];

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
          {experiences.map((experience, index) => (
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
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {experience.company}
                      </h3>
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