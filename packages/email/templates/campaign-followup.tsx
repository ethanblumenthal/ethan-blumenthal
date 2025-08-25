import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface CampaignFollowUpProps {
  firstName: string;
  campaign: 'proptech' | 'bitcoin' | 'cre';
}

interface CampaignConfig {
  name: string;
  bgColor: string;
  accentColor: string;
  deals: string[];
  ctaText: string;
}

const campaignConfigs: Record<string, CampaignConfig> = {
  proptech: {
    name: 'PropTech',
    bgColor: 'bg-blue-50',
    accentColor: 'text-blue-800',
    deals: [
      'AI-powered property management platform - Series A ($2M min)',
      'Virtual property tour technology - Seed round ($50K min)',
      'Blockchain property records startup - Pre-seed ($25K min)',
    ],
    ctaText: 'Explore PropTech Deals',
  },
  bitcoin: {
    name: 'Bitcoin + Real Estate',
    bgColor: 'bg-orange-50',
    accentColor: 'text-orange-800',
    deals: [
      'Tokenized Miami office building - 8.5% APY',
      'Bitcoin-backed industrial fund - 12% target returns',
      'DeFi real estate protocol - Pre-launch token access',
    ],
    ctaText: 'View Bitcoin Opportunities',
  },
  cre: {
    name: 'Commercial Real Estate',
    bgColor: 'bg-green-50',
    accentColor: 'text-green-800',
    deals: [
      'Class A multifamily portfolio - 14% IRR target',
      'Industrial logistics facilities - Triple net lease',
      'Mixed-use development project - Ground floor opportunity',
    ],
    ctaText: 'See CRE Deals',
  },
};

export default function CampaignFollowUp({ firstName, campaign }: CampaignFollowUpProps) {
  const config = campaignConfigs[campaign] || campaignConfigs.proptech;

  return (
    <Html>
      <Head />
      <Preview>Your {config.name} investment opportunities</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-3xl font-bold m-0">
                {config.name} Opportunities
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-4">Hi {firstName},</Text>

              <Text className="text-gray-700 mb-6">
                Thank you for your interest in {config.name.toLowerCase()} investment opportunities.
                Based on your profile, I have some exclusive deals that might interest you.
              </Text>

              {/* Deals Section */}
              <Section className={`${config.bgColor} rounded-lg p-6 mb-6`}>
                <Heading className={`${config.accentColor} text-xl font-bold mt-0 mb-4`}>
                  {campaign === 'proptech' && '🏢 Current PropTech Deals'}
                  {campaign === 'bitcoin' && '₿ Current Opportunities'}
                  {campaign === 'cre' && '🏢 Premium CRE Deals'}
                </Heading>
                <Section>
                  {config.deals.map((deal, index) => (
                    <Text key={index} className="text-gray-700 mb-2">
                      • {deal}
                    </Text>
                  ))}
                </Section>
              </Section>

              {/* Investment Highlights */}
              <Section className="mb-6">
                <Heading className="text-gray-800 text-lg font-semibold mb-3">
                  Why This Matters Now:
                </Heading>
                <Section>
                  {campaign === 'proptech' && (
                    <>
                      <Text className="text-gray-700 mb-2">
                        • PropTech funding is up 40% year-over-year
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • Early-stage deals offer 10x+ return potential
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • AI adoption in real estate is accelerating rapidly
                      </Text>
                    </>
                  )}
                  {campaign === 'bitcoin' && (
                    <>
                      <Text className="text-gray-700 mb-2">
                        • Institutional Bitcoin adoption continues growing
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • Real estate tokenization market expanding 35% annually
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • DeFi protocols offer higher yields than traditional finance
                      </Text>
                    </>
                  )}
                  {campaign === 'cre' && (
                    <>
                      <Text className="text-gray-700 mb-2">
                        • Commercial real estate values stabilizing after rate hikes
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • Industrial and logistics sectors showing strong fundamentals
                      </Text>
                      <Text className="text-gray-700 mb-2">
                        • Opportunistic buying window may be closing soon
                      </Text>
                    </>
                  )}
                </Section>
              </Section>

              {/* CTA Section */}
              <Section className="bg-blue-600 rounded-lg p-6 mb-6 text-center">
                <Heading className="text-white text-xl font-bold mt-0 mb-3">
                  Ready to Learn More?
                </Heading>
                <Text className="text-white mb-4">
                  Schedule a 15-minute call to discuss current opportunities and how they align with
                  your investment goals.
                </Text>
                <Button
                  href="mailto:ethan@ethanblumenthal.com?subject=Investment Opportunity Discussion"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
                >
                  Schedule Call
                </Button>
              </Section>

              {/* Signature */}
              <Text className="text-gray-700 mb-2">Best regards,</Text>
              <Text className="text-gray-800 font-bold">Ethan Blumenthal</Text>
              <Text className="text-gray-600 text-sm">Co-Founder & CTO | PropTech Investor</Text>

              <Hr className="my-6" />

              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center">
                You received this email because you expressed interest in{' '}
                {config.name.toLowerCase()} opportunities.
                <br />
                <Link href="mailto:ethan@ethanblumenthal.com" className="text-gray-500">
                  Contact Us
                </Link>{' '}
                |{' '}
                <Link href="{{unsubscribe_url}}" className="text-gray-500">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
