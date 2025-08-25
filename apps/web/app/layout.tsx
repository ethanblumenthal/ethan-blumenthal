import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { TRPCProvider } from '@/components/providers';
import Navigation from '@/components/navigation';
import MobileNav from '@/components/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ethan Blumenthal',
  description: 'Portfolio website for a Ethan Blumenthal, Co-Founder and CTO',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen">
              <Navigation />
              <main className="flex-1 md:pl-[250px]">
                <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-gray-800 p-4">
                  <div className="flex justify-between items-center">
                    <MobileNav />
                    <Link
                      href="/"
                      className="text-xl font-semibold hover:text-primary transition-colors"
                    >
                      Ethan Blumenthal
                    </Link>
                  </div>
                </div>
                <div className="container mx-auto px-4 py-8 mt-16 md:mt-0">
                  {children}
                  <Analytics />
                </div>
              </main>
            </div>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
