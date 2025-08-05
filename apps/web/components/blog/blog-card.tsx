import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  slug: string;
  excerpt?: string;
  readingTime?: string;
  tags?: string[];
}

export default function BlogCard({ 
  title, 
  date, 
  image, 
  slug, 
  excerpt,
  readingTime,
  tags 
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="rounded-lg border border-gray-800 overflow-hidden bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <time className="text-sm text-gray-400">{new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</time>
          
          <h2 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h2>
          
          {excerpt && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {readingTime && (
              <span className="text-xs text-gray-500">{readingTime}</span>
            )}
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="text-gray-500 text-xs">+{tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
