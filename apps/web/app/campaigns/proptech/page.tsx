import { Metadata } from 'next';
import CampaignForm from '@/components/campaigns/campaign-form';
import { Building, TrendingUp, Users, Shield, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PropTech Investment Opportunities | Ethan Blumenthal',
  description: 'Get exclusive access to vetted PropTech startups and investment opportunities in commercial real estate technology.',
  keywords: 'proptech, real estate technology, startup investments, commercial real estate, venture capital',
  openGraph: {
    title: 'PropTech Investment Opportunities',
    description: 'Exclusive access to emerging real estate technology investments',
    type: 'website',
    url: '/campaigns/proptech',
  },
};

interface PropTechPageProps {
  searchParams: Promise<{
    utm_source?: string;
    utm_campaign?: string;
    utm_medium?: string;
  }>;
}

export default async function PropTechCampaignPage({ searchParams }: PropTechPageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building className="w-4 h-4" />
            Exclusive PropTech Access
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Future of Real Estate
            <span className="text-blue-400"> Technology</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join an exclusive network of investors getting first access to vetted PropTech startups 
            and breakthrough technologies revolutionizing commercial real estate.
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>500+ Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>$50M+ Deployed</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              <span>120+ Startups</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Social Proof */}
          <div className="space-y-12">
            {/* What You Get */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">What You Get</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-lg p-3 mt-1">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Vetted Opportunities</h3>
                    <p className="text-gray-300">
                      Pre-screened PropTech startups with proven traction, strong teams, and clear market opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-lg p-3 mt-1">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
                    <p className="text-gray-300">
                      Get invited to funding rounds 30-60 days before public announcements and general solicitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-lg p-3 mt-1">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Market Intelligence</h3>
                    <p className="text-gray-300">
                      Weekly market reports, trend analysis, and insights from industry leaders and successful exits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Success Stories */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Recent Success Stories</h2>
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-white">Property Management SaaS</span>
                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">3.2x Return</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    $2M Series A → $15M acquisition by major REIT after 18 months. 
                    Automated tenant communications and maintenance workflows.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-white">AI Valuation Platform</span>
                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">2.8x Return</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    $5M Series B → $28M strategic exit to commercial lending platform. 
                    Machine learning for automated property appraisals.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-white">Virtual Tour Technology</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">Growing</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Currently raising Series A after 400% revenue growth. 
                    VR/AR solutions for commercial property marketing.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-gray-700">
              <blockquote className="text-lg text-gray-300 mb-4">
                &quot;The PropTech deals I&apos;ve accessed through this network have consistently outperformed my traditional real estate investments. The due diligence and market insights are exceptional.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Michael Rodriguez</div>
                  <div className="text-gray-400 text-sm">Managing Partner, Urban Capital</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8">
            <CampaignForm 
              campaign="proptech"
              utm_source={params.utm_source}
              utm_campaign={params.utm_campaign}
              utm_medium={params.utm_medium}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Access Exclusive PropTech Opportunities?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join successful investors who are already capitalizing on the next generation of real estate technology.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>✓ No commitment required</span>
            <span>✓ Exclusive deal access</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}