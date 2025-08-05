'use client';

import { useState } from 'react';
import { Input, Textarea } from '@personal-app/ui';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12">
        <div className="space-y-8">
          <div className="rounded-lg border border-dashed border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Project Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-white mb-2 block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Jane Smith"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="website" className="text-white mb-2 block">
                  Website (optional)
                </label>
                <Input
                  id="website"
                  placeholder="Website URL"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="details" className="text-white mb-2 block">
                  Project details
                </label>
                <Textarea
                  id="details"
                  placeholder="Web design..."
                  className="bg-gray-900/50 border-gray-800 min-h-[150px]"
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Let&apos;s Connect
            </h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a href="mailto:ethan.blumenthal@gmail.com">
                  <span className="truncate">Email Me</span>
                </a>
              </Button>
              {/* <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50"
              >
                Book a Call
              </Button> */}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Follow Me</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a
                  href={SOCIAL_LINKS.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  X/Twitter
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a
                  href={SOCIAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a
                  href={SOCIAL_LINKS.GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
