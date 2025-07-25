# @cre-platform/email

Email service package providing transactional emails, newsletter management, and campaign automation using Resend and React Email. This package handles all email communications for the CRE Platform.

## Overview

This package provides a comprehensive email solution built with Resend for reliable delivery and React Email for beautiful, responsive email templates. It handles transactional emails, newsletter subscriptions, automated campaigns, and notification systems.

## Architecture

```
packages/email/
├── index.ts              # Main email service exports
├── service.ts            # Core email service implementation
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── templates/            # React Email templates
│   ├── blog-notification.tsx          # New blog post notifications
│   ├── campaign-followup.tsx          # Campaign follow-up emails
│   ├── contact-followup.tsx           # Contact form follow-ups
│   ├── contact-notification.tsx       # Internal contact notifications
│   ├── lead-nurture.tsx               # Lead nurturing sequences
│   ├── newsletter-welcome.tsx         # Newsletter welcome emails
│   └── social-content-approval.tsx    # Social media approval requests
└── node_modules/         # Email-specific dependencies
```

## Technology Stack

### Core Dependencies
- **Resend**: Modern email API for reliable delivery
- **React Email**: JSX-based email template system
- **@react-email/components**: Pre-built email components
- **@react-email/render**: Server-side email rendering
- **@react-email/tailwind**: Tailwind CSS support for emails

### Email Infrastructure
- **Transactional Emails**: Real-time notifications and confirmations
- **Newsletter System**: Subscription management and campaigns
- **Automated Sequences**: Drip campaigns and nurture flows
- **Template Engine**: React-based, responsive email templates

## Email Service (`service.ts`)

### Core Email Service Implementation

```typescript
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  private from = 'CRE Platform <hello@creplatform.com>';

  // Send transactional email
  async sendTransactional({
    to,
    subject,
    template,
    data
  }: {
    to: string;
    subject: string;
    template: React.ComponentType<any>;
    data?: any;
  }) {
    try {
      const html = render(template(data));
      
      const result = await resend.emails.send({
        from: this.from,
        to,
        subject,
        html
      });

      return { success: true, id: result.data?.id };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send newsletter to subscribers
  async sendNewsletter({
    subject,
    template,
    data,
    subscribers,
    batchSize = 50
  }: {
    subject: string;
    template: React.ComponentType<any>;
    data: any;
    subscribers: string[];
    batchSize?: number;
  }) {
    const html = render(template(data));
    const results = [];

    // Send in batches to respect rate limits
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      try {
        const batchResults = await Promise.all(
          batch.map(email => 
            resend.emails.send({
              from: this.from,
              to: email,
              subject,
              html
            })
          )
        );
        
        results.push(...batchResults);
        
        // Rate limiting delay
        if (i + batchSize < subscribers.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Batch ${i / batchSize + 1} error:`, error);
      }
    }

    return {
      sent: results.filter(r => r.data?.id).length,
      failed: results.filter(r => r.error).length,
      total: subscribers.length
    };
  }

  // Send automated sequence email
  async sendSequenceEmail({
    contactEmail,
    contactName,
    sequenceType,
    stepNumber,
    customData
  }: {
    contactEmail: string;
    contactName: string;
    sequenceType: 'lead_nurture' | 'onboarding' | 'campaign_followup';
    stepNumber: number;
    customData?: any;
  }) {
    const templates = {
      lead_nurture: LeadNurtureTemplate,
      onboarding: OnboardingTemplate,
      campaign_followup: CampaignFollowupTemplate
    };

    const subjects = {
      lead_nurture: [
        'Welcome to CRE Platform - Your Commercial Real Estate Journey Begins',
        'PropTech Trends That Are Reshaping Commercial Real Estate',
        'Bitcoin & Tokenization: The Future of CRE Investment'
      ],
      onboarding: [
        'Welcome to CRE Platform!',
        'Getting Started with Your CRE Dashboard',
        'Advanced Features You Should Know About'
      ],
      campaign_followup: [
        'Thanks for Your Interest in Our CRE Solutions',
        'Exclusive PropTech Insights for You',
        'Ready to Transform Your CRE Strategy?'
      ]
    };

    const template = templates[sequenceType];
    const subject = subjects[sequenceType][stepNumber - 1];

    return this.sendTransactional({
      to: contactEmail,
      subject,
      template,
      data: {
        contactName,
        stepNumber,
        ...customData
      }
    });
  }
}

export const emailService = new EmailService();
```

## Email Templates

### Newsletter Welcome Template (`templates/newsletter-welcome.tsx`)

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind
} from '@react-email/components';

interface NewsletterWelcomeProps {
  subscriberName?: string;
  subscriberEmail: string;
}

export function NewsletterWelcome({
  subscriberName = 'CRE Professional',
  subscriberEmail
}: NewsletterWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the CRE Platform Newsletter - Your PropTech Journey Begins</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="bg-white rounded-lg shadow-lg p-8">
              <Img
                src="https://creplatform.com/logo.png"
                width="200"
                height="50"
                alt="CRE Platform"
                className="mx-auto mb-8"
              />
              
              <Heading className="text-2xl font-bold text-gray-900 text-center mb-6">
                Welcome to CRE Platform, {subscriberName}!
              </Heading>
              
              <Text className="text-gray-700 text-lg mb-4">
                Thank you for subscribing to our newsletter. You're now part of an exclusive 
                community of commercial real estate professionals who are embracing the future 
                of PropTech, AI, and tokenization.
              </Text>
              
              <Section className="bg-blue-50 p-6 rounded-lg mb-6">
                <Heading className="text-xl font-semibold text-blue-900 mb-4">
                  What to Expect:
                </Heading>
                <Text className="text-blue-800 mb-2">
                  • Weekly insights on PropTech trends and innovations
                </Text>
                <Text className="text-blue-800 mb-2">
                  • Exclusive case studies on AI implementation in CRE
                </Text>
                <Text className="text-blue-800 mb-2">
                  • Bitcoin and tokenization updates for real estate
                </Text>
                <Text className="text-blue-800">
                  • Early access to our platform features and tools
                </Text>
              </Section>
              
              <Section className="text-center mb-6">
                <Link
                  href="https://creplatform.com/dashboard"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold inline-block"
                >
                  Explore the Platform
                </Link>
              </Section>
              
              <Text className="text-gray-600 text-sm">
                Best regards,<br />
                The CRE Platform Team
              </Text>
              
              <Section className="border-t border-gray-200 pt-6 mt-8 text-center">
                <Text className="text-gray-500 text-xs">
                  You're receiving this email because you subscribed to CRE Platform updates.
                  <br />
                  <Link href="{{unsubscribeUrl}}" className="text-blue-600">
                    Unsubscribe
                  </Link> | 
                  <Link href="https://creplatform.com" className="text-blue-600 ml-1">
                    Visit our website
                  </Link>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default NewsletterWelcome;
```

### Contact Notification Template (`templates/contact-notification.tsx`)

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Tailwind
} from '@react-email/components';

interface ContactNotificationProps {
  contactName: string;
  contactEmail: string;
  contactCompany?: string;
  contactPhone?: string;
  message: string;
  source: string;
  submittedAt: string;
}

export function ContactNotification({
  contactName,
  contactEmail,
  contactCompany,
  contactPhone,
  message,
  source,
  submittedAt
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - {contactName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="bg-white rounded-lg shadow-lg p-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-6">
                New Contact Form Submission
              </Heading>
              
              <Section className="mb-6">
                <Heading className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Information:
                </Heading>
                <Text className="text-gray-700 mb-2">
                  <strong>Name:</strong> {contactName}
                </Text>
                <Text className="text-gray-700 mb-2">
                  <strong>Email:</strong> {contactEmail}
                </Text>
                {contactCompany && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Company:</strong> {contactCompany}
                  </Text>
                )}
                {contactPhone && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Phone:</strong> {contactPhone}
                  </Text>
                )}
                <Text className="text-gray-700 mb-2">
                  <strong>Source:</strong> {source}
                </Text>
                <Text className="text-gray-700">
                  <strong>Submitted:</strong> {submittedAt}
                </Text>
              </Section>
              
              <Section className="bg-gray-50 p-6 rounded-lg">
                <Heading className="text-lg font-semibold text-gray-800 mb-3">
                  Message:
                </Heading>
                <Text className="text-gray-700 whitespace-pre-wrap">
                  {message}
                </Text>
              </Section>
              
              <Section className="mt-6 p-4 bg-blue-50 rounded-lg">
                <Text className="text-blue-800 text-sm">
                  <strong>Next Steps:</strong> This contact has been automatically added to 
                  your CRM and assigned a lead score. Review and follow up within 24 hours 
                  for optimal conversion rates.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactNotification;
```

### Lead Nurture Template (`templates/lead-nurture.tsx`)

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind
} from '@react-email/components';

interface LeadNurtureProps {
  contactName: string;
  stepNumber: number;
  company?: string;
  personalizedContent?: string;
}

export function LeadNurture({
  contactName,
  stepNumber,
  company,
  personalizedContent
}: LeadNurtureProps) {
  const content = {
    1: {
      subject: 'Welcome to the Future of Commercial Real Estate',
      heading: 'Your CRE Journey Begins Here',
      mainContent: `
        Welcome to CRE Platform, where commercial real estate meets cutting-edge technology. 
        As a forward-thinking CRE professional${company ? ` at ${company}` : ''}, you're 
        already ahead of the curve by exploring how AI, Bitcoin, and tokenization are 
        reshaping our industry.
      `,
      cta: 'Explore Our Solutions',
      ctaUrl: 'https://creplatform.com/solutions'
    },
    2: {
      subject: 'PropTech Trends That Are Reshaping CRE in 2024',
      heading: 'The PropTech Revolution Is Here',
      mainContent: `
        ${contactName}, the commercial real estate landscape is evolving rapidly. 
        From AI-powered property analysis to blockchain-based transactions, 
        technology is transforming how we buy, sell, and manage commercial properties.
      `,
      cta: 'Read Industry Insights',
      ctaUrl: 'https://creplatform.com/blog/proptech-trends-2024'
    },
    3: {
      subject: 'Bitcoin & Tokenization: The Future of CRE Investment',
      heading: 'Digital Assets Meet Real Assets',
      mainContent: `
        Imagine fractional ownership of prime commercial real estate, instant global 
        transactions, and 24/7 trading markets. Bitcoin and tokenization are making 
        this reality for forward-thinking CRE professionals like yourself.
      `,
      cta: 'Learn About Tokenization',
      ctaUrl: 'https://creplatform.com/tokenization'
    }
  };

  const stepContent = content[stepNumber as keyof typeof content];

  return (
    <Html>
      <Head />
      <Preview>{stepContent.subject}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="bg-white rounded-lg shadow-lg p-8">
              <Img
                src="https://creplatform.com/logo.png"
                width="200"
                height="50"
                alt="CRE Platform"
                className="mx-auto mb-8"
              />
              
              <Heading className="text-2xl font-bold text-gray-900 text-center mb-6">
                {stepContent.heading}
              </Heading>
              
              <Text className="text-gray-700 text-lg mb-6 leading-relaxed">
                {stepContent.mainContent}
              </Text>
              
              {personalizedContent && (
                <Section className="bg-blue-50 p-6 rounded-lg mb-6">
                  <Text className="text-blue-800">
                    {personalizedContent}
                  </Text>
                </Section>
              )}
              
              <Section className="text-center mb-6">
                <Link
                  href={stepContent.ctaUrl}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold inline-block"
                >
                  {stepContent.cta}
                </Link>
              </Section>
              
              <Section className="border-t border-gray-200 pt-6 mt-8">
                <Text className="text-gray-600 text-sm">
                  Questions? Reply to this email or schedule a personalized demo at 
                  <Link href="https://creplatform.com/demo" className="text-blue-600">
                    creplatform.com/demo
                  </Link>
                </Text>
                
                <Text className="text-gray-600 text-sm mt-4">
                  Best regards,<br />
                  The CRE Platform Team
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default LeadNurture;
```

## Email Automation Features

### Newsletter Management
- **Subscription Management**: Double opt-in with confirmation emails
- **Segmentation**: Target specific subscriber groups
- **Campaign Scheduling**: Schedule newsletters for optimal delivery times
- **Performance Tracking**: Open rates, click-through rates, and conversions

### Transactional Emails
- **Contact Form Responses**: Instant acknowledgment and internal notifications
- **Account Notifications**: Welcome emails, password resets, security alerts
- **CRM Updates**: Lead status changes, follow-up reminders
- **Social Media**: Content approval requests, performance reports

### Automated Sequences
- **Lead Nurturing**: Multi-step email sequences for prospect education
- **Onboarding**: Guide new users through platform features
- **Campaign Follow-ups**: Automated follow-up based on user actions
- **Re-engagement**: Win back inactive subscribers and users

## Environment Configuration

```bash
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key

# Email Settings
EMAIL_FROM_ADDRESS=hello@creplatform.com
EMAIL_FROM_NAME=CRE Platform
EMAIL_REPLY_TO=support@creplatform.com

# Domain Configuration (for tracking and reputation)
EMAIL_DOMAIN=creplatform.com

# Webhook Configuration (for delivery tracking)
RESEND_WEBHOOK_SECRET=your_webhook_secret
```

## Usage Examples

### Sending Welcome Email
```typescript
import { emailService } from '@cre-platform/email';
import { NewsletterWelcome } from '@cre-platform/email/templates/newsletter-welcome';

// Send welcome email to new subscriber
await emailService.sendTransactional({
  to: 'user@example.com',
  subject: 'Welcome to CRE Platform Newsletter',
  template: NewsletterWelcome,
  data: {
    subscriberName: 'John Doe',
    subscriberEmail: 'user@example.com'
  }
});
```

### Newsletter Campaign
```typescript
import { BlogNotification } from '@cre-platform/email/templates/blog-notification';

// Send new blog post notification
const subscribers = await getNewsletterSubscribers();

await emailService.sendNewsletter({
  subject: 'New Article: PropTech Trends in 2024',
  template: BlogNotification,
  data: {
    articleTitle: 'PropTech Trends Reshaping Commercial Real Estate',
    articleUrl: 'https://creplatform.com/blog/proptech-trends-2024',
    authorName: 'CRE Platform Team',
    excerpt: 'Discover the latest technology trends...'
  },
  subscribers: subscribers.map(s => s.email)
});
```

### Automated Lead Nurturing
```typescript
// Start lead nurture sequence
await emailService.sendSequenceEmail({
  contactEmail: 'prospect@company.com',
  contactName: 'Jane Smith',
  sequenceType: 'lead_nurture',
  stepNumber: 1,
  customData: {
    company: 'Smith Properties',
    interest: 'PropTech Solutions'
  }
});
```

## Integration with tRPC API

### Email Router Example
```typescript
// In packages/api/routers/email.ts
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { emailService } from '@cre-platform/email';

export const emailRouter = router({
  subscribeNewsletter: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
      source: z.string().default('website')
    }))
    .mutation(async ({ input }) => {
      // Add to database
      await db.insert(newsletterSubscribers).values(input);
      
      // Send welcome email
      await emailService.sendTransactional({
        to: input.email,
        subject: 'Welcome to CRE Platform Newsletter',
        template: NewsletterWelcome,
        data: {
          subscriberName: input.name || 'CRE Professional',
          subscriberEmail: input.email
        }
      });
      
      return { success: true };
    }),

  sendContactNotification: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      company: z.string().optional(),
      phone: z.string().optional(),
      message: z.string(),
      source: z.string()
    }))
    .mutation(async ({ input }) => {
      // Send internal notification
      await emailService.sendTransactional({
        to: 'team@creplatform.com',
        subject: `New Contact: ${input.name}`,
        template: ContactNotification,
        data: {
          ...input,
          submittedAt: new Date().toISOString()
        }
      });
      
      return { success: true };
    })
});
```

## Performance & Deliverability

### Rate Limiting
- Batch processing for large campaigns
- Configurable delays between batches
- Respect Resend API rate limits
- Automatic retry logic for failed sends

### Deliverability Best Practices
- **SPF/DKIM Setup**: Proper domain authentication
- **List Hygiene**: Regular cleanup of bounced emails
- **Engagement Tracking**: Monitor open and click rates
- **Reputation Management**: Maintain sender reputation

### Monitoring & Analytics
- **Delivery Tracking**: Real-time delivery status
- **Engagement Metrics**: Opens, clicks, conversions
- **Bounce Management**: Automatic bounce handling
- **Unsubscribe Tracking**: Honor unsubscribe requests

## Error Handling & Retries

### Robust Error Handling
```typescript
export async function sendEmailWithRetry({
  emailData,
  maxRetries = 3,
  delay = 1000
}: {
  emailData: EmailSendParams;
  maxRetries?: number;
  delay?: number;
}) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await emailService.sendTransactional(emailData);
    } catch (error) {
      if (attempt === maxRetries) {
        // Log final failure
        console.error('Email send failed after all retries:', error);
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}
```

## Development Tools

### Scripts
```bash
# Type checking
bun run type-check

# Linting  
bun run lint

# Build templates
bun run build

# Preview emails locally
bun run dev
```

### Testing Email Templates
```bash
# Install React Email CLI globally
npm install -g @react-email/cli

# Preview templates in browser
npx react-email dev
```

The email package provides a comprehensive, scalable email solution that enhances user engagement and automates communications across the CRE Platform ecosystem.