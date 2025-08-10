import { Button } from '@/components/ui/button';

export default function AboutHeader() {
  return (
    <section className="py-12">
      <h1 className="text-6xl font-bold text-white mb-8">About Me</h1>
      <div className="flex gap-4">
        <Button
          size="lg"
          href="/contact"
        >
          Get In Touch
        </Button>
        <Button
          size="lg"
          variant="outline"
          href="/"
        >
          View Projects
        </Button>
      </div>
    </section>
  );
}
