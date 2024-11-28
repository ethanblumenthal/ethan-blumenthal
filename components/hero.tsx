import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
          Available for Coffee
        </div>
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white">Hey, I&apos;m Ethan</h1>
          <h2 className="text-5xl font-bold text-white">
            Co-Founder, CTO @ Liquid Finance
          </h2>
          <p className="text-xl text-gray-400">
            I&apos;ve been building real estate investing products for the past
            5 years.
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200"
            asChild
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-800 hover:bg-gray-800"
            asChild
          >
            <Link href="/about">About Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
