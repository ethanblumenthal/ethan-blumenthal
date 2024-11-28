import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  title: string
  date: string
  image: string
  slug: string
}

export default function BlogCard({ title, date, image, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="rounded-lg border border-gray-800 overflow-hidden">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <time className="text-sm text-gray-400">{date}</time>
          <h2 className="text-xl font-semibold text-white mt-2 group-hover:text-gray-300">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
