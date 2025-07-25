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

interface LeadNurtureProps {
  firstName: string;
  leadScore: number;
  topics: string[];
  daysInPipeline: number;
  recommendedActions: string[];
}

export default function LeadNurture({
  firstName,
  leadScore,
  topics,
  daysInPipeline,
  recommendedActions,
}: LeadNurtureProps) {
  const getLeadTemperature = (score: number) => {
    if (score >= 80) return { label: 'Hot', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 60) return { label: 'Warm', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score >= 40) return { label: 'Cool', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { label: 'Cold', color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const temp = getLeadTemperature(leadScore);
  const formatTopic = (topic: string) =>
    topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Html>
      <Head />
      <Preview>Your personalized CRE investment insights - {temp.label} lead follow-up</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-3xl font-bold m-0">
                Personalized CRE Insights
              </Heading>
              <Text className="text-indigo-100 mt-2 mb-0">
                Curated opportunities based on your interests
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-4">Hi {firstName},</Text>
              
              <Text className="text-gray-700 mb-6">
                Based on your {daysInPipeline} days in our network and your interest in{' '}
                {topics.map(formatTopic).join(', ')}, I have some tailored insights 
                and opportunities to share.
              </Text>

              {/* Lead Score Section */}
              <Section className={`${temp.bg} rounded-lg p-6 mb-6`}>
                <Section className="flex items-center justify-between mb-4">
                  <Heading className={`${temp.color} text-xl font-bold mt-0 mb-0`}>
                    Your Investment Profile: {temp.label} Lead
                  </Heading>
                  <Text className={`${temp.color} font-bold text-lg m-0`}>
                    {leadScore}/100
                  </Text>
                </Section>
                <Text className="text-gray-700 m-0">
                  Your engagement level and investment criteria suggest you're a{' '}
                  <strong className={temp.color.replace('text-', '').toLowerCase()}>
                    {temp.label.toLowerCase()}
                  </strong>{' '}
                  prospect for our current deal flow.
                </Text>
              </Section>

              {/* Recommended Actions */}
              <Section className="mb-6">
                <Heading className="text-gray-800 text-lg font-semibold mb-4">
                  🎯 Recommended Next Steps
                </Heading>
                <Section>
                  {recommendedActions.map((action, index) => (
                    <Section key={index} className="flex items-start mb-3">
                      <Text className="text-gray-600 font-semibold mr-3 mt-0">{index + 1}.</Text>
                      <Text className="text-gray-700 mt-0">{action}</Text>
                    </Section>
                  ))}
                </Section>
              </Section>

              {/* Personalized Opportunities */}
              <Section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <Heading className="text-indigo-800 text-lg font-semibold mt-0 mb-4">
                  💼 Opportunities Matching Your Interests
                </Heading>
                
                {topics.includes('proptech') && (
                  <Section className="mb-4">
                    <Text className="text-indigo-700 font-semibold mb-2">PropTech Focus:</Text>
                    <Text className="text-gray-700 mb-0">
                      • AI property management platform raising Series A
                      <br />
                      • Virtual tour technology with 300% YoY growth
                    </Text>
                  </Section>
                )}

                {topics.includes('bitcoin') && (
                  <Section className="mb-4">
                    <Text className="text-indigo-700 font-semibold mb-2">Bitcoin + Real Estate:</Text>
                    <Text className="text-gray-700 mb-0">
                      • Tokenized commercial property offering 8.5% APY
                      <br />
                      • BTC-backed real estate fund with institutional backing
                    </Text>
                  </Section>
                )}

                {topics.includes('tokenization') && (
                  <Section className="mb-4">
                    <Text className="text-indigo-700 font-semibold mb-2">Tokenization Opportunities:</Text>
                    <Text className="text-gray-700 mb-0">
                      • Fractional ownership platform pre-launch tokens
                      <br />
                      • Real estate DeFi protocol with yield farming
                    </Text>
                  </Section>
                )}
              </Section>

              {/* CTA based on lead score */}
              <Section className="text-center mb-6">
                {leadScore >= 80 ? (
                  <Section className="bg-red-600 rounded-lg p-6">
                    <Heading className="text-white text-xl font-bold mt-0 mb-3">
                      🔥 Priority Access Available
                    </Heading>
                    <Text className="text-red-100 mb-4">
                      As a hot lead, you have priority access to our exclusive deal flow.
                      Let's schedule a call this week to discuss specific opportunities.
                    </Text>
                    <Button
                      href="mailto:ethan@ethanblumenthal.com?subject=Priority Investment Discussion"
                      className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold"
                    >
                      Schedule Priority Call
                    </Button>
                  </Section>
                ) : leadScore >= 60 ? (
                  <Section className="bg-orange-600 rounded-lg p-6">
                    <Heading className="text-white text-xl font-bold mt-0 mb-3">
                      ⚡ Ready to Move Forward?
                    </Heading>
                    <Text className="text-orange-100 mb-4">
                      Based on your engagement, you're ready for the next level.
                      Let's discuss how these opportunities align with your goals.
                    </Text>
                    <Button
                      href="mailto:ethan@ethanblumenthal.com?subject=Investment Opportunity Discussion"
                      className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold"
                    >
                      Let's Talk Opportunities
                    </Button>
                  </Section>
                ) : (
                  <Section className="bg-blue-600 rounded-lg p-6">
                    <Heading className="text-white text-xl font-bold mt-0 mb-3">
                      📚 Learn More First?
                    </Heading>
                    <Text className="text-blue-100 mb-4">
                      I'd love to help you learn more about these opportunities.
                      Check out my latest insights or let's have a quick intro call.
                    </Text>
                    <Section className="flex gap-4 justify-center">
                      <Button
                        href="https://ethanblumenthal.com/blog"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
                      >
                        Read Insights
                      </Button>
                      <Button
                        href="mailto:ethan@ethanblumenthal.com?subject=Introduction Call Request"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Intro Call
                      </Button>
                    </Section>
                  </Section>
                )}
              </Section>

              {/* Signature */}
              <Text className="text-gray-700 mb-2">Best regards,</Text>
              <Text className="text-gray-800 font-bold">Ethan Blumenthal</Text>
              <Text className="text-gray-600 text-sm">
                Co-Founder & CTO | PropTech Investor
              </Text>

              <Hr className="my-6" />
              
              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center">
                This personalized email was sent based on your interests and engagement.
                <br />
                <Link href="{{unsubscribe_url}}" className="text-gray-500">
                  Unsubscribe
                </Link>{' '}
                |{' '}
                <Link href="mailto:ethan@ethanblumenthal.com" className="text-gray-500">
                  Contact Us
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}