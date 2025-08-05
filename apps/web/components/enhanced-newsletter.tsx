'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Label, Checkbox } from '@personal-app/ui';
import { Button } from '@/components/ui/button';
// import { createContactSchema } from '@personal-app/api/schemas/client';
import { trpc } from '@/components/providers';
import { CheckCircle, AlertCircle, TrendingUp, Users, Zap } from 'lucide-react';

const newsletterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  interestedTopics: z.array(z.string()).min(1, 'Please select at least one topic'),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const topics = [
  { value: 'prop_tech', label: 'PropTech Innovations', icon: Zap },
  { value: 'bitcoin', label: 'Bitcoin & CRE', icon: TrendingUp },
  { value: 'tokenization', label: 'Real Estate Tokenization', icon: Users },
  { value: 'venture_capital', label: 'VC & Investment Trends', icon: TrendingUp },
  { value: 'early_stage', label: 'Early Stage Startups', icon: Zap },
];

export default function EnhancedNewsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      interestedTopics: [],
      agreeToTerms: false,
    },
  });

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      setSelectedTopics([]);
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await createContact.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || '',
        labels: selectedTopics as any,
        source: 'website' as const,
        notes: `Newsletter signup - Interested in: ${selectedTopics.join(', ')}`,
        status: 'prospect',
      });
    } catch (error) {
      console.error('Newsletter signup error:', error);
    }
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    const newTopics = checked
      ? [...selectedTopics, topic]
      : selectedTopics.filter(t => t !== topic);
    setSelectedTopics(newTopics);
    setValue('interestedTopics', newTopics);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="perplexity-card p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to the Community!
            </h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              You're now subscribed to receive exclusive insights on PropTech, Bitcoin, and the future of commercial real estate investing.
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-primary/90">
                🚀 Expect your first newsletter with market insights within 24 hours
              </p>
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Market Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">CRE Innovation</span> Newsletter
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get exclusive market analysis, PropTech insights, and investment opportunities delivered weekly. 
            Join thousands of investors, operators, and innovators shaping the future of commercial real estate.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span><strong className="text-white">2,500+</strong> Active Subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span><strong className="text-white">Weekly</strong> Market Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span><strong className="text-white">Zero</strong> Spam Policy</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Premium Market Intelligence
              </h3>
              <p className="text-gray-400">
                Institutional-grade insights delivered weekly
              </p>
            </div>
            
            <div className="grid gap-4">
              <div className="perplexity-card p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">PropTech Analysis</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Deep dives into emerging technologies disrupting commercial real estate markets</p>
                  </div>
                </div>
              </div>
              
              <div className="perplexity-card p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Bitcoin & Digital Assets</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">How cryptocurrency and blockchain are revolutionizing real estate investing</p>
                  </div>
                </div>
              </div>
              
              <div className="perplexity-card p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Exclusive Deal Flow</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Early access to investment opportunities and market-moving partnerships</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subscriber testimonial */}
            <div className="perplexity-card p-6 border-primary/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    "Ethan's insights have been invaluable for our PropTech investments. His newsletter is the first thing I read every week."
                  </p>
                  <div className="text-xs text-gray-400">
                    <div className="font-medium text-white">John Davis</div>
                    <div>Managing Partner, CRE Ventures</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="perplexity-card p-8">
            {createContact.error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50/10 p-4 dark:border-red-800">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                  <p className="text-red-400">
                    Something went wrong. Please try again.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white mb-2 block">
                    First Name *
                  </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="search-input"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-white mb-2 block">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="search-input"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="search-input"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company" className="text-white mb-2 block">
                    Company (Optional)
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your Company"
                    className="search-input"
                    {...register('company')}
                  />
                </div>

                <div>
                  <Label className="text-white mb-3 block">
                    I'm interested in: *
                  </Label>
                  <div className="space-y-3">
                    {topics.map((topic) => {
                      const IconComponent = topic.icon;
                      return (
                        <div key={topic.value} className="flex items-center space-x-3">
                          <Checkbox
                            id={topic.value}
                            checked={selectedTopics.includes(topic.value)}
                            onCheckedChange={(checked) => 
                              handleTopicChange(topic.value, checked as boolean)
                            }
                          />
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-gray-400" />
                            <Label 
                              htmlFor={topic.value} 
                              className="text-gray-300 cursor-pointer"
                            >
                              {topic.label}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.interestedTopics && (
                    <p className="text-red-400 text-sm mt-2">{errors.interestedTopics.message}</p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    {...register('agreeToTerms')}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-300 cursor-pointer">
                    I agree to receive newsletters and understand I can unsubscribe at any time. 
                    No spam, ever.
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </div>
                  ) : (
                    'Join the Community'
                  )}
                </Button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Join 2,500+ investors, operators, and innovators. Unsubscribe anytime with one click.
                <br />Your email is secure and will never be shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}