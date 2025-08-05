import FadeIn from '@/components/fade-in';
import Hero from '@/components/hero';
import TechStack from '@/components/tech-stack';
import SelectedProjects from '@/components/selected-projects';
import EnhancedNewsletter from '@/components/enhanced-newsletter';

export default function Home() {
  return (
    <div className="space-y-20">
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn delay={0.4}>
        <SelectedProjects />
      </FadeIn>
      {/* <FadeIn delay={0.6}>
        <RecentPosts />
      </FadeIn> */}
    </div>
  );
}
