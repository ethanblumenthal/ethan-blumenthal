import { Resend } from 'resend';

// Lazy load React Email to avoid server-side React issues
async function renderTemplate(templateName: string, props: any) {
  try {
    const { render } = await import('@react-email/render');
    let template;
    
    switch (templateName) {
      case 'newsletter-welcome':
        template = (await import('./templates/newsletter-welcome')).default;
        break;
      case 'contact-notification':
        template = (await import('./templates/contact-notification')).default;
        break;
      case 'contact-followup':
        template = (await import('./templates/contact-followup')).default;
        break;
      case 'campaign-followup':
        template = (await import('./templates/campaign-followup')).default;
        break;
      case 'blog-notification':
        template = (await import('./templates/blog-notification')).default;
        break;
      case 'lead-nurture':
        template = (await import('./templates/lead-nurture')).default;
        break;
      case 'social-content-approval':
        template = (await import('./templates/social-content-approval')).default;
        break;
      default:
        throw new Error(`Unknown template: ${templateName}`);
    }
    
    return render(template(props));
  } catch (error) {
    console.error(`Failed to render template ${templateName}:`, error);
    // Fallback to a simple HTML template
    return `<html><body><h1>Email Template</h1><p>Template rendering failed.</p></body></html>`;
  }
}

// Create mock resend client when API key is not available
const createMockResend = () => ({
  emails: {
    send: async (options: any) => {
      console.warn('Email send attempted without RESEND_API_KEY:', options.subject);
      return { data: { id: 'mock-email-id' }, error: null };
    }
  }
});

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : createMockResend() as any;

interface BaseEmailOptions {
  to: string;
  from?: string;
  replyTo?: string;
}

interface NewsletterWelcomeData {
  firstName?: string;
  topics: string[];
}

interface ContactNotificationData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
  group?: string;
  labels: string[];
}

interface ContactFollowUpData {
  firstName: string;
  appUrl?: string;
}

interface CampaignFollowUpData {
  firstName: string;
  campaign: 'proptech' | 'bitcoin' | 'cre';
}

interface BlogNotificationData {
  firstName?: string;
  blogTitle: string;
  blogSlug: string;
  blogExcerpt: string;
  publishDate: string;
  readingTime: number;
  category: string;
  appUrl?: string;
}

interface LeadNurtureData {
  firstName: string;
  leadScore: number;
  topics: string[];
  daysInPipeline: number;
  recommendedActions: string[];
}

interface SocialContentApprovalData {
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

export class EmailService {
  private readonly defaultFrom = 'noreply@ethanblumenthal.com';
  private readonly defaultReplyTo = 'ethan@ethanblumenthal.com';

  // Newsletter welcome email
  async sendNewsletterWelcome(
    data: NewsletterWelcomeData,
    options: BaseEmailOptions
  ) {
    const html = await renderTemplate('newsletter-welcome', data);
    
    return this.sendEmail({
      ...options,
      subject: 'Welcome to PropTech & Bitcoin Insights',
      html,
    });
  }

  // Contact form notification to admin
  async sendContactNotification(
    data: ContactNotificationData,
    options: Partial<BaseEmailOptions> = {}
  ) {
    const html = await renderTemplate('contact-notification', data);
    
    return this.sendEmail({
      to: options.to || this.defaultReplyTo,
      subject: `New ${data.source} contact: ${data.firstName} ${data.lastName}`,
      html,
      from: options.from,
      replyTo: options.replyTo,
    });
  }

  // Follow-up email to new contacts
  async sendContactFollowUp(
    data: ContactFollowUpData,
    options: BaseEmailOptions
  ) {
    const html = await renderTemplate('contact-followup', data);
    
    return this.sendEmail({
      ...options,
      subject: 'Thank you for your interest in PropTech opportunities',
      html,
    });
  }

  // Campaign-specific follow-up emails
  async sendCampaignFollowUp(
    data: CampaignFollowUpData,
    options: BaseEmailOptions
  ) {
    const html = await renderTemplate('campaign-followup', data);
    const campaignNames = {
      proptech: 'PropTech',
      bitcoin: 'Bitcoin + Real Estate',
      cre: 'Commercial Real Estate',
    };
    
    return this.sendEmail({
      ...options,
      subject: `Your ${campaignNames[data.campaign]} investment opportunities`,
      html,
    });
  }

  // Blog post notification to subscribers
  async sendBlogNotification(
    data: BlogNotificationData,
    options: BaseEmailOptions
  ) {
    const html = await renderTemplate('blog-notification', data);
    
    return this.sendEmail({
      ...options,
      subject: `${data.blogTitle} - New on CRE Insights`,
      html,
    });
  }

  // Lead nurture emails based on scoring
  async sendLeadNurture(
    data: LeadNurtureData,
    options: BaseEmailOptions
  ) {
    const html = await renderTemplate('lead-nurture', data);
    const temp = data.leadScore >= 80 ? 'Hot' : data.leadScore >= 60 ? 'Warm' : 'Cool';
    
    return this.sendEmail({
      ...options,
      subject: `Your personalized CRE insights - ${temp} lead follow-up`,
      html,
    });
  }

  // Social media content approval notifications
  async sendSocialContentApproval(
    data: SocialContentApprovalData,
    options: Partial<BaseEmailOptions> = {}
  ) {
    const html = await renderTemplate('social-content-approval', data);
    const platformName = data.platform === 'twitter' ? 'Twitter/X' : 'LinkedIn';
    
    return this.sendEmail({
      to: options.to || this.defaultReplyTo,
      subject: `AI-generated ${platformName} post awaiting approval`,
      html,
      from: options.from,
      replyTo: options.replyTo,
    });
  }

  // Generic email sender with React Email rendering
  async sendCustomEmail(
    component: React.ReactElement,
    options: BaseEmailOptions & { subject: string }
  ) {
    const { render } = await import('@react-email/render');
    const html = render(component);
    
    return this.sendEmail({
      ...options,
      html,
    });
  }

  // Internal email sending method
  private async sendEmail({
    to,
    subject,
    html,
    from,
    replyTo,
  }: {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
  }) {
    try {
      const result = await resend.emails.send({
        from: from || this.defaultFrom,
        to,
        subject,
        html,
        reply_to: replyTo || this.defaultReplyTo,
      });

      console.log('Email sent successfully:', {
        id: result.data?.id,
        to,
        subject,
      });
      
      return result;
    } catch (error) {
      console.error('Email sending failed:', {
        error,
        to,
        subject,
      });
      throw error;
    }
  }

  // Batch email sending for newsletters/campaigns
  async sendBatchEmails<T>(
    emailData: Array<T & { email: string }>,
    templateFunction: (data: T) => Promise<any>,
    options: {
      batchSize?: number;
      delayBetweenBatches?: number;
    } = {}
  ) {
    const { batchSize = 50, delayBetweenBatches = 1000 } = options;
    const results = [];
    
    for (let i = 0; i < emailData.length; i += batchSize) {
      const batch = emailData.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (data) => {
        try {
          return await templateFunction(data);
        } catch (error) {
          console.error(`Failed to send email to ${data.email}:`, error);
          return { error, email: data.email };
        }
      });
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
      
      // Delay between batches to respect rate limits
      if (i + batchSize < emailData.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }
    
    return results;
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export types for external use
export type {
  NewsletterWelcomeData,
  ContactNotificationData,
  ContactFollowUpData,
  CampaignFollowUpData,
  BlogNotificationData,
  LeadNurtureData,
  SocialContentApprovalData,
  BaseEmailOptions,
};