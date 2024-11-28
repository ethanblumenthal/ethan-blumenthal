import FadeIn from '@/components/fade-in';
import BlogHeader from '@/components/blog/blog-header';
import BlogCard from '@/components/blog/blog-card';

const posts = [
  {
    title: 'Designing for Accessibility: Making the Web Inclusive for All',
    date: 'Jun 19, 2024',
    image: '/placeholder.svg',
    slug: 'designing-for-accessibility',
  },
  {
    title: 'Bridging the Gap: Collaboration Between Designers and Developers',
    date: 'Jun 15, 2024',
    image: '/placeholder.svg',
    slug: 'bridging-the-gap',
  },
  {
    title: 'User-Centered Design: Why It Matters and How to Implement It',
    date: 'Jun 13, 2024',
    image: '/placeholder.svg',
    slug: 'user-centered-design',
  },
];

export default function BlogPage() {
  return (
    <div>
      <FadeIn>
        <BlogHeader />
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <FadeIn key={post.slug} delay={0.2 * (index + 1)}>
            <BlogCard {...post} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
