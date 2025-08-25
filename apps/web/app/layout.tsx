import './globals.css';
import { Inter } from 'next/font/google';
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
                <div className="container mx-auto px-4 py-8">
                  <div className="flex justify-between items-center mb-8">
                    <MobileNav />
                    {/* <ThemeToggle /> */}
                  </div>
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
