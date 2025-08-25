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

interface ContactNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
  group?: string;
  labels: string[];
}

export default function ContactNotification({
  firstName,
  lastName,
  email,
  company,
  message,
  source,
  group,
  labels,
}: ContactNotificationProps) {
  const formatLabel = (label: string) =>
    label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Html>
      <Head />
      <Preview>
        New {source} contact: {firstName} {lastName}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gray-50 rounded-lg p-6 mb-6">
              <Heading className="text-blue-800 text-2xl font-bold m-0">
                New Contact Submission
              </Heading>
              <Text className="text-gray-600 mt-2 mb-0">From {source}</Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <Heading className="text-gray-800 text-xl font-semibold mt-0 mb-4">
                Contact Information
              </Heading>

              <Section className="mb-6">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 font-semibold text-gray-700 w-32">Name:</td>
                      <td className="py-2 text-gray-800">
                        {firstName} {lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-gray-700">Email:</td>
                      <td className="py-2">
                        <Link href={`mailto:${email}`} className="text-blue-600">
                          {email}
                        </Link>
                      </td>
                    </tr>
                    {company && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Company:</td>
                        <td className="py-2 text-gray-800">{company}</td>
                      </tr>
                    )}
                    {group && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Group:</td>
                        <td className="py-2 text-gray-800">{formatLabel(group)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-2 font-semibold text-gray-700">Source:</td>
                      <td className="py-2 text-gray-800">{source}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-gray-700">Labels:</td>
                      <td className="py-2 text-gray-800">{labels.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              {message && (
                <Section className="mb-6">
                  <Heading className="text-gray-800 text-lg font-semibold mb-3">Message</Heading>
                  <Section className="bg-gray-50 rounded-lg p-4">
                    <Text className="text-gray-700 whitespace-pre-wrap m-0">{message}</Text>
                  </Section>
                </Section>
              )}

              {/* Action Button */}
              <Section className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  href={`mailto:${email}?subject=Re: Your inquiry`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Reply to Contact
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="mt-6">
              <Text className="text-gray-500 text-xs text-center">
                Sent from your CRE Platform contact form
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
