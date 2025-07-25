'use client';

import { useState } from 'react';
import { Button } from '@personal-app/ui';
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt?: string;
  className?: string;
}

export default function SocialShare({ title, url, excerpt, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedExcerpt = encodeURIComponent(excerpt || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=ethanblumenthal`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share menu */}
          <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
            <div className="p-3">
              <h4 className="text-sm font-medium text-white mb-3">Share this article</h4>
              <div className="space-y-2">
                {/* Twitter */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Share on Twitter
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  Share on LinkedIn
                </button>

                {/* Facebook */}
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-500" />
                  Share on Facebook
                </button>

                {/* Copy Link */}
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Link copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 text-gray-400" />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}