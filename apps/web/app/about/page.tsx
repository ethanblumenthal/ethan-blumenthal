import FadeIn from '@/components/fade-in';
import AboutHeader from '@/components/about/about-header';
import AboutBio from '@/components/about/about-bio';
import WorkExperience from '@/components/about/work-experience';
import Education from '@/components/about/education';
import TechStack from '@/components/tech-stack';

export default function About() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <AboutHeader />
      </FadeIn>
      <FadeIn delay={0.4}>
        <AboutBio />
      </FadeIn>
      <FadeIn delay={0.6}>
        <WorkExperience />
      </FadeIn>
      <FadeIn delay={0.8}>
        <Education />
      </FadeIn>
      <FadeIn delay={1.0}>
        <TechStack />
      </FadeIn>
    </div>
  );
}
