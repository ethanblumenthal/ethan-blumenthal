import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
  gradient?: string;
}

export default function ProjectCard({
  title,
  category,
  image,
  slug,
  gradient,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative aspect-[6/3] overflow-hidden rounded-lg border border-gray-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent',
            gradient
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300">{category}</p>
        </div>
      </div>
    </Link>
  );
}
