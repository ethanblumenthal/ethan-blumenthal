import { Button } from '@/components/ui/button';
import Link from 'next/link';

const posts = [
  {
    date: 'Jun 19, 2024',
    title: 'Designing for Accessibility: Making the Web Inclusive for All',
    image: '/placeholder.svg',
  },
  {
    date: 'Jun 15, 2024',
    title: 'Bridging the Gap: Collaboration Between Designers and Developers',
    image: '/placeholder.svg',
  },
  {
    date: 'Jun 13, 2024',
    title: 'User-Centered Design: Why It Matters and How to Implement It',
    image: '/placeholder.svg',
  },
];

export default function RecentPosts() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">Recent Blog Posts</h2>
        <Button
          variant="outline"
          className="border-gray-800 hover:bg-gray-800"
          asChild
        >
          <Link href="/blog">View Blog</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.title}
            href="/blog"
            className="group rounded-lg border border-dashed border-gray-800 overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-900">
              <img
                src={post.image}
                alt=""
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <time className="text-sm text-gray-400">{post.date}</time>
              <h3 className="text-xl font-semibold mt-2 text-white group-hover:text-gray-300">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
