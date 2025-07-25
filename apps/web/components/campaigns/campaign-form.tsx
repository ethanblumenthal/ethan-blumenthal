'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Textarea, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@personal-app/ui';
import { trpc } from '@/components/providers';
import { CheckCircle, AlertCircle, Building, TrendingUp, Bitcoin, Zap } from 'lucide-react';

const campaignFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  investmentAmount: z.string().optional(),
  timeline: z.enum(['immediate', '3-months', '6-months', '12-months']).optional(),
  interests: z.array(z.string()).default([]),
  message: z.string().optional(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_medium: z.string().optional(),
});

type CampaignFormData = z.infer<typeof campaignFormSchema>;

interface CampaignConfig {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  interests: string[];
  fields: {
    investmentAmount?: boolean;
    timeline?: boolean;
    phone?: boolean;
    message?: boolean;
  };
  labels: string[];
  group?: 'venture_capital' | 'private_equity' | 'angel_investor' | 'lender' | 'broker';
}

const campaignConfigs: Record<string, CampaignConfig> = {
  proptech: {
    title: 'PropTech Investment Opportunities',
    subtitle: 'Exclusive Access to Emerging Real Estate Technology',
    description: 'Get early access to vetted PropTech startups and investment opportunities in the commercial real estate technology space.',
    icon: Building,
    color: 'blue',
    interests: ['proptech', 'saas', 'real-estate-tech', 'early-stage'],
    fields: { investmentAmount: true, timeline: true, message: true },
    labels: ['proptech', 'early_stage'],
    group: 'venture_capital',
  },
  bitcoin: {
    title: 'Bitcoin + Real Estate Investments',
    subtitle: 'Digital Assets Meet Physical Real Estate',
    description: 'Discover how Bitcoin and cryptocurrency are revolutionizing commercial real estate financing and investment strategies.',
    icon: Bitcoin,
    color: 'orange',
    interests: ['bitcoin', 'cryptocurrency', 'tokenization', 'defi'],
    fields: { investmentAmount: true, timeline: true, phone: true },
    labels: ['bitcoin', 'crypto'],
    group: 'angel_investor',
  },
  cre: {
    title: 'Commercial Real Estate Opportunities',
    subtitle: 'Premium CRE Investment Access',
    description: 'Exclusive access to high-quality commercial real estate deals, market insights, and investment strategies.',
    icon: TrendingUp,
    color: 'green',
    interests: ['multifamily', 'office', 'industrial', 'retail'],
    fields: { investmentAmount: true, timeline: true, phone: true, message: true },
    labels: ['multifamily', 'office'],
    group: 'private_equity',
  },
  ai: {
    title: 'AI-Powered Real Estate Solutions',
    subtitle: 'Artificial Intelligence in PropTech',
    description: 'Stay ahead with AI-driven property analysis, automated valuations, and intelligent investment recommendations.',
    icon: Zap,
    color: 'purple',
    interests: ['ai', 'machine-learning', 'automation', 'data-analytics'],
    fields: { timeline: true, message: true },
    labels: ['prop_tech', 'vertical_saas'],
    group: 'venture_capital',
  },
};

interface CampaignFormProps {
  campaign: keyof typeof campaignConfigs;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
}

export default function CampaignForm({ campaign, utm_source, utm_campaign, utm_medium }: CampaignFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const config = campaignConfigs[campaign];
  if (!config) return null;

  const createContact = trpc.contact.create.useMutation();
  const IconComponent = config.icon;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      utm_source: utm_source || campaign,
      utm_campaign: utm_campaign || campaign,
      utm_medium: utm_medium || 'landing-page',
      interests: [],
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    try {
      await createContact.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || '',
        phone: data.phone,
        group: config.group,
        labels: [...config.labels, ...selectedInterests] as any,
        notes: `Campaign: ${campaign}${data.message ? ` | Message: ${data.message}` : ''}${data.investmentAmount ? ` | Investment Amount: ${data.investmentAmount}` : ''}${data.timeline ? ` | Timeline: ${data.timeline}` : ''}`,
        source: 'website' as const,
      });

      setIsSubmitted(true);
      reset();
      setSelectedInterests([]);
    } catch (error) {
      console.error('Campaign form submission error:', error);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-gray-900/50 rounded-lg p-8 text-center border border-gray-800">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300 mb-6">
          We&apos;ve received your interest in {config.title.toLowerCase()}. Our team will be in touch within 24 hours with exclusive insights and opportunities.
        </p>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-400">
            <strong>What happens next?</strong><br />
            • Personalized investment opportunities<br />
            • Market analysis and insights<br />
            • Direct access to exclusive deals
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${config.color}-500/20 mb-4`}>
          <IconComponent className={`w-8 h-8 text-${config.color}-400`} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
        <p className="text-lg text-gray-300 mb-2">{config.subtitle}</p>
        <p className="text-sm text-gray-400">{config.description}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-300 mb-2 block">First Name *</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-gray-300 mb-2 block">Last Name *</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-gray-300 mb-2 block">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <Label htmlFor="company" className="text-gray-300 mb-2 block">Company</Label>
          <Input
            id="company"
            {...register('company')}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            placeholder="Your company name"
          />
        </div>

        {/* Phone (conditional) */}
        {config.fields.phone && (
          <div>
            <Label htmlFor="phone" className="text-gray-300 mb-2 block">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        )}

        {/* Investment Amount (conditional) */}
        {config.fields.investmentAmount && (
          <div>
            <Label htmlFor="investmentAmount" className="text-gray-300 mb-2 block">Investment Amount</Label>
            <Select onValueChange={(value) => register('investmentAmount').onChange({ target: { value } })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select investment range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m+">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Timeline (conditional) */}
        {config.fields.timeline && (
          <div>
            <Label htmlFor="timeline" className="text-gray-300 mb-2 block">Investment Timeline</Label>
            <Select onValueChange={(value) => register('timeline').onChange({ target: { value } })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="When are you looking to invest?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Ready to invest now</SelectItem>
                <SelectItem value="3-months">Within 3 months</SelectItem>
                <SelectItem value="6-months">Within 6 months</SelectItem>
                <SelectItem value="12-months">Within 12+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Interests */}
        <div>
          <Label className="text-gray-300 mb-3 block">Areas of Interest</Label>
          <div className="grid grid-cols-2 gap-2">
            {config.interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  selectedInterests.includes(interest)
                    ? `bg-${config.color}-500/20 border-${config.color}-500 text-${config.color}-300`
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {interest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Message (conditional) */}
        {config.fields.message && (
          <div>
            <Label htmlFor="message" className="text-gray-300 mb-2 block">Additional Information</Label>
            <Textarea
              id="message"
              {...register('message')}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
              placeholder="Tell us about your investment goals or any specific requirements..."
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700 text-white py-3`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Exclusive Access'}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to receive investment opportunities and market insights. 
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
}