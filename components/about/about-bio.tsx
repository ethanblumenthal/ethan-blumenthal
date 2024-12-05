import Image from 'next/image';

export default function AboutBio() {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">Hello! I&apos;m Ethan,</h2>
          <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
            <p>
              Ethan serves as the CTO and Co-Founder at Liquid Finance while
              also dedicating his expertise as the VP of Engineering at Nada.
              This company empowers homeowners by enabling them to capitalize on
              their home equity without the requirement of monthly payments.
              Nada&apos;s innovative platform, Cityfunds, offers investors an
              opportunity to invest in regional real estate markets through the
              collection of home equity investments.
            </p>
            <p>
              Ethan previously co-established OwnProp, a platform rooted in
              blockchain technology designed to democratize commercial real
              estate investment by reducing minimum investments and boosting
              liquidity. Before this, he was a Software Engineer at Rightpoint,
              assisting Fortune 500 companies in facilitating business outcomes
              through the deployment of viable technology solutions.
            </p>
            <p>
              After earning a BA in Economics from the University of Illinois,
              he is currently pursuing a MS in Computer Science at the
              University of Texas. Ethan holds a strong interest in merging
              real-world assets with Web3 to build a more evenly-distributed
              future.
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
