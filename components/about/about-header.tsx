import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutHeader() {
  return (
    <section className="py-12">
      <h1 className="text-6xl font-bold text-white mb-8">About Me</h1>
      <div className="flex gap-4">
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
          <Link href="/services">View Services</Link>
        </Button>
      </div>
    </section>
  );
}
