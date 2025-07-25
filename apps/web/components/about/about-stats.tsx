export default function AboutStats() {
  return (
    <section className="py-6">
      <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8 rounded-lg bg-zinc-800 p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Austin, TX</h2>
          <p className="text-gray-400 text-lg">Based In</p>
        </div>
        <div className="md:border-l border-dotted border-gray-400 md:pl-8">
          <h2 className="text-2xl font-bold text-white mb-2">7</h2>
          <p className="text-gray-400 text-lg">Years of Experience</p>
        </div>
        <div className="md:border-l border-dotted border-gray-400 md:pl-8">
          <h2 className="text-2xl font-bold text-white mb-2">20+</h2>
          <p className="text-gray-400 text-lg">Funds Supported</p>
        </div>
      </div>
    </section>
  );
}
