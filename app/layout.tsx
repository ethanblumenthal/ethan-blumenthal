import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import MobileNav from '@/components/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CTO Portfolio',
  description: 'Portfolio website for a technology CTO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
