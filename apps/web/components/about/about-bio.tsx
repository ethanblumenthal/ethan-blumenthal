import Image from 'next/image';
import StatsCard from '@/components/ui/stats-card';

export default function AboutBio() {
  const stats = [
    { value: 'Miami, FL', label: 'Based In' },
    { value: '7', label: 'Years of Experience' },
    { value: '20+', label: 'Production Apps' },
  ];
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
        <div className="space-y-6">
          <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
            <p>
              Ethan is a full-stack product developer with a focus on FinTech and PropTech platforms
              that expand economic opportunity for all. He is currently the Founding Engineer at
              Castle, building a vendor agnostic Bitcoin treasury management and revenue automation
              platform for SMBs and CRE. As VP of Engineering at Nada Finance, he built the first
              home equity investment (HEI) origination platform and its associated retail investment
              product, Cityfunds. As founding engineer at OwnProp, Ethan led the development of an
              industry-first tokenization and fractionalization platform for institutional
              commercial real estate deals. His experience with emerging technologies coupled with
              an understanding of real-world assets give him a unique background of innovation in
              financial markets. Ethan holds a BA in Economics from the University of Illinois and
              pursued an MS in Computer Science at the University of Texas.
            </p>
          </div>
          <section className="py-6">
            <StatsCard stats={stats} />
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
