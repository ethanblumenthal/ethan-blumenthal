export { EmailService, emailService } from './service';
export type {
  NewsletterWelcomeData,
  ContactNotificationData,
  ContactFollowUpData,
  CampaignFollowUpData,
  BlogNotificationData,
  LeadNurtureData,
  SocialContentApprovalData,
  BaseEmailOptions,
} from './service';

// Templates are lazy-loaded by the EmailService to avoid React server-side issues
// To use templates directly, import them individually:
// import NewsletterWelcome from '@personal-app/email/templates/newsletter-welcome';
