import { Button } from '@personal-app/ui';
import Link from 'next/link';
import { TrendingUp, Zap, Building2, Bitcoin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
      
      <div className="relative space-y-8">
        {/* Status badge */}
        <div className="inline-flex items-center rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/30 backdrop-blur-sm">
          <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Available for New Opportunities
        </div>
        
        {/* Main hero content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-white">Hey, I&apos;m </span>
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                Ethan
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-300 tracking-tight">
              Building the future of
              <span className="text-white"> Commercial Real Estate</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Combining AI, Bitcoin, and tokenization to revolutionize how we invest in commercial real estate. 
            5 years of experience in PropTech and emerging technologies.
          </p>
        </div>
        
        {/* Key focus areas */}
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-secondary border border-dark-border">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-gray-300 font-medium">AI-Powered Analytics</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-secondary border border-dark-border">
            <Bitcoin className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300 font-medium">Bitcoin Integration</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-secondary border border-dark-border">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-gray-300 font-medium">Tokenization</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-secondary border border-dark-border">
            <Building2 className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300 font-medium">CRE Technology</span>
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            size="lg"
            className="group relative overflow-hidden"
            asChild
          >
            <Link href="/contact">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 hover:border-cyan-500 hover:bg-cyan-500/10"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
