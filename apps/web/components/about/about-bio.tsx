import Image from 'next/image';

export default function AboutBio() {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Hello! I&apos;m Ethan,
          </h2>
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
