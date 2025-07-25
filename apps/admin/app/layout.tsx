import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { TRPCProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal App Admin | CRE Platform Dashboard',
  description: 'Advanced admin dashboard for commercial real estate platform management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TRPCProvider>
          <div className="min-h-screen bg-background">
            {/* Modern Header */}
            <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-primary/95 backdrop-blur supports-[backdrop-filter]:bg-dark-primary/60">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo and Title */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-white">
                          Personal App
                        </h1>
                        <p className="text-xs text-gray-400">
                          Admin Dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Dashboard
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Contacts
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Content
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Analytics
                    </a>
                  </nav>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-dark-secondary border border-dark-border rounded-full">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-green-400">All Systems Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main Content */}
            <main className="relative">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
            
            {/* Footer */}
            <footer className="border-t border-dark-border bg-dark-secondary/50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>© 2024 Personal App. All rights reserved.</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">Powered by AI & Modern Tech</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Analytics />
        </TRPCProvider>
      </body>
    </html>
  );
}