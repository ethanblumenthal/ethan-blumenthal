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

interface ContactFollowUpProps {
  firstName: string;
  appUrl?: string;
}

export default function ContactFollowUp({
  firstName,
  appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ethanblumenthal.com',
}: ContactFollowUpProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your interest in PropTech opportunities</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-3xl font-bold m-0">
                Thank You for Reaching Out
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-4">Hi {firstName},</Text>
              
              <Text className="text-gray-700 mb-6">
                Thank you for your interest in PropTech and commercial real estate 
                investment opportunities. I've received your inquiry and will personally 
                review it within the next 24 hours.
              </Text>

              <Text className="text-gray-800 font-semibold mb-3">
                What happens next:
              </Text>
              
              <Section className="mb-6">
                <Section className="flex items-start mb-3">
                  <Text className="text-gray-700 font-semibold mr-2">1.</Text>
                  <Section>
                    <Text className="text-gray-800 font-semibold mb-1">Personal Review</Text>
                    <Text className="text-gray-700 mt-0">
                      I'll review your inquiry and investment profile
                    </Text>
                  </Section>
                </Section>
                
                <Section className="flex items-start mb-3">
                  <Text className="text-gray-700 font-semibold mr-2">2.</Text>
                  <Section>
                    <Text className="text-gray-800 font-semibold mb-1">Direct Outreach</Text>
                    <Text className="text-gray-700 mt-0">
                      If there's a good fit, I'll reach out directly within 24-48 hours
                    </Text>
                  </Section>
                </Section>
                
                <Section className="flex items-start">
                  <Text className="text-gray-700 font-semibold mr-2">3.</Text>
                  <Section>
                    <Text className="text-gray-800 font-semibold mb-1">Opportunity Matching</Text>
                    <Text className="text-gray-700 mt-0">
                      I'll connect you with relevant deals and insights
                    </Text>
                  </Section>
                </Section>
              </Section>

              {/* CTA Section */}
              <Section className="bg-green-50 rounded-lg p-6 mb-6 text-center">
                <Heading className="text-green-800 text-xl font-bold mt-0 mb-3">
                  📈 In the Meantime
                </Heading>
                <Text className="text-green-700 mb-4">
                  Check out my latest insights on PropTech trends and follow me on 
                  LinkedIn for daily market updates.
                </Text>
                <Section className="flex gap-4 justify-center">
                  <Button
                    href={`${appUrl}/blog`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold mr-2"
                  >
                    Read Blog
                  </Button>
                  <Button
                    href="https://linkedin.com/in/ethanblumenthal"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Follow on LinkedIn
                  </Button>
                </Section>
              </Section>

              <Text className="text-gray-700 mb-4">Looking forward to connecting!</Text>

              {/* Signature */}
              <Text className="text-gray-700 mb-2">Best,</Text>
              <Text className="text-gray-800 font-bold">Ethan Blumenthal</Text>
              <Text className="text-gray-600 text-sm">
                Co-Founder & CTO | PropTech Investor
              </Text>

              <Hr className="my-6" />
              
              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center">
                You received this email because you contacted us through ethanblumenthal.com.
                <br />
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