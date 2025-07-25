import { Metadata } from 'next';
import CampaignForm from '@/components/campaigns/campaign-form';
import { Bitcoin, TrendingUp, Shield, Globe, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bitcoin + Real Estate Investment Opportunities | Ethan Blumenthal',
  description: 'Discover how Bitcoin and cryptocurrency are revolutionizing commercial real estate financing and investment strategies.',
  keywords: 'bitcoin, cryptocurrency, real estate, tokenization, blockchain, defi, commercial real estate',
  openGraph: {
    title: 'Bitcoin + Real Estate Investment Opportunities',
    description: 'Digital assets meet physical real estate - revolutionary investment strategies',
    type: 'website',
    url: '/campaigns/bitcoin',
  },
};

interface BitcoinPageProps {
  searchParams: Promise<{
    utm_source?: string;
    utm_campaign?: string;
    utm_medium?: string;
  }>;
}

export default async function BitcoinCampaignPage({ searchParams }: BitcoinPageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Bitcoin className="w-4 h-4" />
            Digital Assets + Real Estate
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Where <span className="text-orange-400">Bitcoin</span> Meets
            <br />Real Estate
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Access exclusive investment opportunities at the intersection of cryptocurrency and commercial real estate. 
            From tokenized properties to Bitcoin-backed lending, discover the future of real estate finance.
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-5 h-5" />
              <span>$2.1B+ Volume</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>23% Avg Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>12 Countries</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Insights */}
          <div className="space-y-12">
            {/* Investment Strategies */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Investment Strategies</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/20 rounded-lg p-3 mt-1">
                    <Bitcoin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Tokenized Real Estate</h3>
                    <p className="text-gray-300">
                      Fractional ownership of premium commercial properties through blockchain tokens. Lower minimums, higher liquidity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/20 rounded-lg p-3 mt-1">
                    <Shield className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Bitcoin-Backed Lending</h3>
                    <p className="text-gray-300">
                      Use Bitcoin as collateral for commercial real estate acquisitions. Maintain crypto exposure while accessing capital.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/20 rounded-lg p-3 mt-1">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">DeFi Real Estate Protocols</h3>
                    <p className="text-gray-300">
                      Participate in decentralized finance protocols focused on real estate lending, yield farming, and liquidity provision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Opportunities */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Current Opportunities</h2>
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">Miami Office Tower - Tokenized</span>
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm">8.5% APY</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    $50M Grade A office building tokenized into 5,000 NFTs. Monthly rental distributions in USDC.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Min: $10,000</span>
                    <span>•</span>
                    <span>Available: 847 tokens</span>
                    <span>•</span>
                    <span>Closes: 14 days</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">Industrial Portfolio Fund</span>
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm">12% Target</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Bitcoin-backed fund acquiring logistics facilities. 70% LTV, 3-year terms, quarterly distributions.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Min: $50,000</span>
                    <span>•</span>
                    <span>Raised: $12.5M</span>
                    <span>•</span>
                    <span>Target: $25M</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">PropTech DeFi Protocol</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">Pre-Launch</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Decentralized lending protocol for real estate development. Early token access for qualified investors.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Min: $25,000</span>
                    <span>•</span>
                    <span>Allocation: Limited</span>
                    <span>•</span>
                    <span>Whitelist Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Disclosure */}
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg p-8 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Important Disclosures
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Cryptocurrency and tokenized real estate investments carry significant risk</p>
                <p>• Past performance does not guarantee future results</p>
                <p>• Only invest capital you can afford to lose</p>
                <p>• Regulatory landscape is evolving - consult tax professionals</p>
                <p>• All investments are subject to market volatility</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8">
            <CampaignForm 
              campaign="bitcoin"
              utm_source={params.utm_source}
              utm_campaign={params.utm_campaign}
              utm_medium={params.utm_medium}
            />
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 pt-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Austin Data Center</h3>
              <p className="text-gray-300 text-sm mb-4">
                Tokenized data center generated 18% returns through Bitcoin mining revenue sharing.
              </p>
              <div className="text-2xl font-bold text-green-400">+18% APY</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Denver Multifamily</h3>
              <p className="text-gray-300 text-sm mb-4">
                Bitcoin-backed acquisition loan at 6% while BTC appreciated 45% during hold period.
              </p>
              <div className="text-2xl font-bold text-green-400">+51% Total</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">DeFi Yield Strategy</h3>
              <p className="text-gray-300 text-sm mb-4">
                Real estate-backed stablecoin farming strategy outperformed traditional REITs.
              </p>
              <div className="text-2xl font-bold text-green-400">+14.2% APY</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Explore Bitcoin + Real Estate?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive access to the most innovative investment opportunities at the intersection of digital assets and real estate.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>✓ Accredited investor only</span>
            <span>✓ Institutional grade deals</span>
            <span>✓ Expert guidance included</span>
          </div>
        </div>
      </div>
    </div>
  );
}