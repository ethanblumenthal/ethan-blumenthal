import { Metadata } from 'next';
import ContentGenerator from '@/components/ai/content-generator';

export const metadata: Metadata = {
  title: 'AI Content Generator | Ethan Blumenthal',
  description: 'Generate high-quality PropTech and commercial real estate content using AI',
  robots: 'noindex, nofollow', // Keep this private for now
};

export default function AIGeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 py-12">
      <ContentGenerator />
    </div>
  );
}