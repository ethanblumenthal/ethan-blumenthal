'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@personal-app/ui';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-accent transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />}

      {/* Slide-out Menu */}
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 h-full w-[280px] bg-background border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-full flex-col">
          {/* Profile Section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-lg overflow-hidden">
                <AvatarImage src="/ethan-profile.jpg" alt="Ethan" className="object-cover" />
                <AvatarFallback>ET</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Ethan</h2>
                <p className="text-sm text-muted-foreground">Founding Engineer</p>
              </div>
            </div>
          </div>

          <div className="mt-2 border-t border-gray-800" />

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                onClick={closeMenu}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === item.slug && 'bg-accent text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="border-t border-gray-800 p-6">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Follow Me</h3>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/icons/x.svg"
                  alt="X"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </a>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </a>
              <a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
