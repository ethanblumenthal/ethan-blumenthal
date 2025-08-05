'use client';

import { useState } from 'react';
import { Input } from '@personal-app/ui';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-12">
      <div className="rounded-lg border border-dashed border-gray-800 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Sign Up For Updates</h2>
          <p className="text-gray-400 mb-8">
            Stay up to date with my latest blog posts, project releases, and
            personal news.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="email@gmail.com"
              className="bg-gray-900/50 border-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
