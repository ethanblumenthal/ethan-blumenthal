import { Input } from '@/components/ui/input';

export default function BlogHeader() {
  return (
    <section className="py-12 space-y-8">
      <div>
        <h1 className="text-6xl font-bold text-white mb-4">My Blog</h1>
        <p className="text-xl text-gray-400">
          I write about everything going on in the design world
        </p>
      </div>
      <div className="max-w-2xl">
        <Input
          type="search"
          placeholder="Search Articles..."
          className="bg-gray-900/50 border-gray-800 h-12 text-lg"
        />
      </div>
    </section>
  );
}
