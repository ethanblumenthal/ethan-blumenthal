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

interface BlogNotificationProps {
  firstName?: string;
  blogTitle: string;
  blogSlug: string;
  blogExcerpt: string;
  publishDate: string;
  readingTime: number;
  category: string;
  appUrl?: string;
}

export default function BlogNotification({
  firstName = 'there',
  blogTitle,
  blogSlug,
  blogExcerpt,
  publishDate,
  readingTime,
  category,
  appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ethanblumenthal.com',
}: BlogNotificationProps) {
  const blogUrl = `${appUrl}/blog/${blogSlug}`;
  const categoryColors: Record<string, { bg: string; text: string }> = {
    proptech: { bg: 'bg-blue-100', text: 'text-blue-800' },
    bitcoin: { bg: 'bg-orange-100', text: 'text-orange-800' },
    'real-estate': { bg: 'bg-green-100', text: 'text-green-800' },
    ai: { bg: 'bg-purple-100', text: 'text-purple-800' },
    tokenization: { bg: 'bg-pink-100', text: 'text-pink-800' },
  };

  const categoryStyle = categoryColors[category] || categoryColors.proptech;

  return (
    <Html>
      <Head />
      <Preview>{blogTitle} - New on CRE Insights</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-2xl font-bold m-0">New Article Published</Heading>
              <Text className="text-gray-300 mt-2 mb-0">
                Fresh insights on commercial real estate
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-4">Hi {firstName},</Text>

              <Text className="text-gray-700 mb-6">
                I just published a new article that I think you'll find valuable. Here's what's
                covered:
              </Text>

              {/* Article Preview */}
              <Section className="border border-gray-200 rounded-lg p-6 mb-6">
                {/* Category Badge */}
                <Section className="mb-4">
                  <Text
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text} m-0`}
                  >
                    {category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Text>
                </Section>

                {/* Article Title */}
                <Heading className="text-gray-900 text-xl font-bold mt-0 mb-3">{blogTitle}</Heading>

                {/* Article Meta */}
                <Section className="flex items-center gap-4 mb-4">
                  <Text className="text-gray-500 text-sm m-0">
                    {new Date(publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text className="text-gray-500 text-sm m-0">•</Text>
                  <Text className="text-gray-500 text-sm m-0">{readingTime} min read</Text>
                </Section>

                {/* Article Excerpt */}
                <Text className="text-gray-700 mb-4 leading-relaxed">{blogExcerpt}</Text>

                {/* Read More Button */}
                <Button
                  href={blogUrl}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Read Full Article
                </Button>
              </Section>

              {/* Why This Matters */}
              <Section className="bg-blue-50 rounded-lg p-6 mb-6">
                <Heading className="text-blue-800 text-lg font-semibold mt-0 mb-3">
                  💡 Why This Matters
                </Heading>
                <Text className="text-blue-700 mb-0">
                  The commercial real estate landscape is evolving rapidly with AI, blockchain, and
                  new financial instruments. Staying informed about these trends isn't just
                  valuable—it's essential for making smart investment decisions.
                </Text>
              </Section>

              {/* Related Topics */}
              <Section className="mb-6">
                <Text className="text-gray-800 font-semibold mb-3">More on this topic:</Text>
                <Section>
                  <Link
                    href={`${appUrl}/blog?category=${category}`}
                    className="text-blue-600 hover:underline"
                  >
                    View all {category.replace('-', ' ')} articles →
                  </Link>
                </Section>
              </Section>

              {/* Signature */}
              <Text className="text-gray-700 mb-2">Best,</Text>
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
                <Link href={`${appUrl}/blog`} className="text-gray-500">
                  View All Articles
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
