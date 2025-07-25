'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Twitter, Linkedin, Github, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage, Button, Sheet, SheetContent, SheetTrigger } from '@personal-app/ui';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 bg-background">
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
                onClick={closeSheet}
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
                className="text-muted-foreground hover:text-accent-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
