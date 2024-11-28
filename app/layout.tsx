import './globals.css';
import { Kanit } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';

const kanit = Kanit({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Ethan Blumenthal',
  description: 'Portfolio website for a technology CTO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 pl-[250px]">
              <div className="container mx-auto px-4 py-8">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
