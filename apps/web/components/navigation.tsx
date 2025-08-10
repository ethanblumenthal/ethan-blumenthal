'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@personal-app/ui';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-[250px] border-r border-gray-800 bg-background text-gray-400 md:block">
      <div className="flex h-full flex-col">
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg overflow-hidden">
              <AvatarImage
                src="/ethan-profile.jpg"
                alt="Ethan"
                className="object-cover"
              />
              <AvatarFallback>ET</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Ethan</h2>
              <p className="text-sm text-muted-foreground">Co-Founder, CTO</p>
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
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
            Follow Me
          </h3>
          <div className="flex gap-4">
            <a
              href={SOCIAL_LINKS.TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/x.svg" alt="X" width={24} height={24} className="brightness-0 invert" />
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="brightness-0 invert" />
            </a>
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className="brightness-0 invert" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
