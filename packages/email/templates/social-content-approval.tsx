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

interface SocialContentApprovalProps {
  postId: string;
  platform: 'twitter' | 'linkedin';
  content: string;
  hashtags: string[];
  scheduledFor?: string;
  tone: string;
  focus: string;
  estimatedEngagement: number;
  adminUrl?: string;
}

export default function SocialContentApproval({
  postId,
  platform,
  content,
  hashtags,
  scheduledFor,
  tone,
  focus,
  estimatedEngagement,
  adminUrl = process.env.ADMIN_URL || 'https://admin.ethanblumenthal.com',
}: SocialContentApprovalProps) {
  const platformName = platform === 'twitter' ? 'Twitter/X' : 'LinkedIn';
  const approveUrl = `${adminUrl}/social/approve/${postId}`;
  const rejectUrl = `${adminUrl}/social/reject/${postId}`;
  const editUrl = `${adminUrl}/social/edit/${postId}`;

  return (
    <Html>
      <Head />
      <Preview>AI-generated {platformName} post awaiting approval</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-lg p-8 text-center">
              <Heading className="text-white text-2xl font-bold m-0">
                🤖 AI Content Ready for Review
              </Heading>
              <Text className="text-purple-100 mt-2 mb-0">
                {platformName} post awaiting approval
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg">
              <Text className="text-lg text-gray-800 mb-6">
                A new AI-generated post is ready for your review and approval.
              </Text>

              {/* Post Preview */}
              <Section className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                <Section className="flex items-center justify-between mb-4">
                  <Section className="flex items-center gap-3">
                    <Section className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      platform === 'twitter' ? 'bg-blue-500' : 'bg-blue-700'
                    }`}>
                      <Text className="text-white font-bold text-sm m-0">
                        {platform === 'twitter' ? '𝕏' : 'in'}
                      </Text>
                    </Section>
                    <Section>
                      <Text className="font-semibold text-gray-800 m-0">Ethan Blumenthal</Text>
                      <Text className="text-gray-500 text-sm m-0">@ethanblumenthal</Text>
                    </Section>
                  </Section>
                  <Text className="text-gray-400 text-sm m-0">
                    {scheduledFor ? new Date(scheduledFor).toLocaleString() : 'Not scheduled'}
                  </Text>
                </Section>

                {/* Post Content */}
                <Text className="text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap">
                  {content}
                </Text>

                {/* Hashtags */}
                {hashtags.length > 0 && (
                  <Section className="flex flex-wrap gap-2 mb-4">
                    {hashtags.map((tag, index) => (
                      <Text key={index} className="text-blue-600 text-sm m-0">
                        #{tag}
                      </Text>
                    ))}
                  </Section>
                )}

                {/* Engagement Estimate */}
                <Section className="bg-gray-50 rounded p-3">
                  <Text className="text-gray-600 text-sm m-0">
                    📊 Estimated engagement: <strong>{estimatedEngagement}%</strong>
                  </Text>
                </Section>
              </Section>

              {/* Post Details */}
              <Section className="bg-blue-50 rounded-lg p-6 mb-6">
                <Heading className="text-blue-800 text-lg font-semibold mt-0 mb-4">
                  📋 Generation Details
                </Heading>
                <Section className="grid grid-cols-2 gap-4">
                  <Section>
                    <Text className="text-blue-700 font-semibold mb-1">Platform:</Text>
                    <Text className="text-gray-700 mt-0">{platformName}</Text>
                  </Section>
                  <Section>
                    <Text className="text-blue-700 font-semibold mb-1">Tone:</Text>
                    <Text className="text-gray-700 mt-0">{tone}</Text>
                  </Section>
                  <Section>
                    <Text className="text-blue-700 font-semibold mb-1">Focus:</Text>
                    <Text className="text-gray-700 mt-0">{focus}</Text>
                  </Section>
                  <Section>
                    <Text className="text-blue-700 font-semibold mb-1">Post ID:</Text>
                    <Text className="text-gray-700 mt-0 font-mono text-sm">{postId}</Text>
                  </Section>
                </Section>
              </Section>

              {/* Action Buttons */}
              <Section className="text-center mb-6">
                <Heading className="text-gray-800 text-lg font-semibold mb-4">
                  Choose Your Action
                </Heading>
                
                <Section className="flex gap-3 justify-center mb-4">
                  <Button
                    href={approveUrl}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    ✅ Approve & Post
                  </Button>
                  <Button
                    href={editUrl}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    ✏️ Edit First
                  </Button>
                  <Button
                    href={rejectUrl}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    ❌ Reject
                  </Button>
                </Section>

                <Text className="text-gray-600 text-sm">
                  Or visit the{' '}
                  <Link href={`${adminUrl}/social`} className="text-blue-600">
                    admin dashboard
                  </Link>{' '}
                  to manage all pending posts
                </Text>
              </Section>

              {/* AI Quality Note */}
              <Section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <Text className="text-yellow-800 font-semibold mb-2">🔍 Quality Check:</Text>
                <Text className="text-yellow-700 text-sm mb-0">
                  This content was generated using AI based on trending topics and your content strategy. 
                  Please review for accuracy, tone, and brand alignment before posting.
                </Text>
              </Section>

              <Hr className="my-6" />
              
              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center">
                This notification was sent from your CRE Platform social media automation system.
                <br />
                <Link href={`${adminUrl}/settings`} className="text-gray-500">
                  Manage Notifications
                </Link>{' '}
                |{' '}
                <Link href="mailto:support@ethanblumenthal.com" className="text-gray-500">
                  Support
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}