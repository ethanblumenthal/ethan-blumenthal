import Image from 'next/image';

export default function AboutBio() {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
        <div className="space-y-6">
          <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
            <p>
              Ethan is a full-stack product developer with a focus on real
              estate investment marketplaces leveraging smart contracts and
              large language models (LLMs). As CEO of OwnProp, Ethan led the
              technical development of industry-first tokenization and
              fractionalization capabilities for CRE deals. Recently, as VP of
              Engineering at Nada Finance, he built the first home equity
              investment (HEI) origination platform and its associated retail
              investment product, Cityfunds. His technical acumen and
              understanding of blockchain’s impact on real-world assets position
              him uniquely to advance technology-driven solutions. Ethan holds a
              BA in Economics from the University of Illinois and pursued an MS
              in Computer Science at the University of Texas.
            </p>
          </div>
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
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/ethan-profile.jpg"
            alt="Ethan's profile"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
