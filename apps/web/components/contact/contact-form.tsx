'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Label } from '@personal-app/ui';
import { Button } from '@/components/ui/button';
import { createContactSchema, type CreateContact } from '@personal-app/api/schemas/client';
import { trpc } from '@/components/providers';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [subject, setSubject] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateContact>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      notes: '',
      source: 'website',
    },
  });

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
    },
  });

  const onSubmit = async (data: CreateContact) => {
    try {
      const notesWithSubject = subject ? `Subject: ${subject}\n\n${data.notes || ''}` : data.notes;
      await createContact.mutateAsync({
        ...data,
        notes: notesWithSubject,
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-lg border border-green-200 bg-green-50 p-8 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              Thank You!
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-6">
              Your inquiry has been submitted successfully. I'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12">
        <div className="space-y-8">
          <div className="perplexity-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Let's Connect
            </h2>
            
            {createContact.error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                  <p className="text-red-700 dark:text-red-300">
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
                    className="bg-primary/10 text-white border-0 ring-1 ring-inset ring-primary/30 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-white mb-2 block">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-primary/10 text-white border-0 ring-1 ring-inset ring-primary/30 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-primary/10 text-white border-0 ring-1 ring-inset ring-primary/30 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="text-white mb-2 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="bg-primary/10 text-white border-0 ring-1 ring-inset ring-primary/30 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-white mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Tell me about your project or investment interests..."
                  className="bg-primary/10 text-white border-0 ring-1 ring-inset ring-primary/30 backdrop-blur-sm min-h-[120px] placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
                  {...register('notes')}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="perplexity-card">
            <h2 className="text-2xl font-bold text-white mb-6">Follow Me</h2>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <Image src="/icons/x.svg" alt="X" width={28} height={28} className="brightness-0 invert" />
                <span className="text-sm font-medium text-white">X</span>
              </a>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={28} height={28} className="brightness-0 invert" />
                <span className="text-sm font-medium text-white">LinkedIn</span>
              </a>
              <a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={28} height={28} className="brightness-0 invert" />
                <span className="text-sm font-medium text-white">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}