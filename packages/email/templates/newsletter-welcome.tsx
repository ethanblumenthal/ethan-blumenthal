import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface NewsletterWelcomeProps {
  firstName?: string;
  topics: string[];
}

export default function NewsletterWelcome({
  firstName = 'there',
  topics = ['proptech'],
}: NewsletterWelcomeProps) {
  const formatTopic = (topic: string) =>
    topic.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Html>
      <Head />
      <Preview>Welcome to PropTech & Bitcoin Insights</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-3xl font-bold m-0">
                Welcome to the Network!
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-4">Hi {firstName},</Text>

              <Text className="text-gray-700 mb-6">
                Thank you for joining our exclusive network of investors and professionals
                interested in PropTech and Bitcoin innovations in commercial real estate.
              </Text>

              <Text className="text-gray-800 font-semibold mb-3">
                You've subscribed to insights on:
              </Text>

              <Section className="bg-gray-50 rounded-lg p-4 mb-6">
                {topics.map((topic, index) => (
                  <Text key={index} className="text-gray-700 m-1">
                    • {formatTopic(topic)}
                  </Text>
                ))}
              </Section>

              <Text className="text-gray-800 font-semibold mb-3">What to expect:</Text>

              <Section className="mb-6">
                <Text className="text-gray-700 m-1">
                  • Weekly market insights and trend analysis
                </Text>
                <Text className="text-gray-700 m-1">• Exclusive investment opportunities</Text>
                <Text className="text-gray-700 m-1">• Early access to new PropTech deals</Text>
                <Text className="text-gray-700 m-1">
                  • Expert commentary on Bitcoin + Real Estate
                </Text>
              </Section>

              {/* CTA Section */}
              <Section className="bg-blue-50 rounded-lg p-6 mb-6 text-center">
                <Heading className="text-blue-800 text-xl font-bold mt-0 mb-3">
                  🎯 Exclusive Opportunity
                </Heading>
                <Text className="text-blue-700 mb-4">
                  As a new subscriber, you have priority access to our upcoming PropTech deal flow.
                  Reply to this email if you're interested in learning more about current
                  opportunities.
                </Text>
                <Button
                  href="mailto:ethan@ethanblumenthal.com?subject=PropTech Investment Interest"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Express Interest
                </Button>
              </Section>

              {/* Signature */}
              <Text className="text-gray-700 mb-2">Best regards,</Text>
              <Text className="text-gray-800 font-bold">Ethan Blumenthal</Text>
              <Text className="text-gray-600 text-sm">Co-Founder & CTO | PropTech Investor</Text>

              <Hr className="my-6" />

              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center">
                You received this email because you subscribed to updates from ethanblumenthal.com.
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
