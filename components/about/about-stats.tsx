export default function AboutStats() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 rounded-lg bg-gray-900/50 p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Based In</h2>
          <p className="text-gray-400 text-lg">Austin, TX</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">7</h2>
          <p className="text-gray-400 text-lg">Years of Experience</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">20+</h2>
          <p className="text-gray-400 text-lg">Funds Supported</p>
        </div>
      </div>
    </section>
  );
}
