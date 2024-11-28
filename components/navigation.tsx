'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FolderKanban,
  User2,
  Mail,
  FileText,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SOCIAL_LINKS } from '@/lib/constants';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-[250px] border-r text-gray-400">
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
              <h2 className="text-xl font-semibold text-white">Ethan</h2>
              <p className="text-sm text-gray-400">Co-Founder, CTO</p>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-800" />

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
              pathname === '/' && 'bg-gray-800 text-white'
            )}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/projects"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
              pathname === '/projects' && 'bg-gray-800 text-white'
            )}
          >
            <FolderKanban className="h-5 w-5" />
            <span>Projects</span>
          </Link>
          <Link
            href="/blog"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
              pathname === '/blog' && 'bg-gray-800 text-white'
            )}
          >
            <FileText className="h-5 w-5" />
            <span>Blog</span>
          </Link>
          <Link
            href="/about"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
              pathname === '/about' && 'bg-gray-800 text-white'
            )}
          >
            <User2 className="h-5 w-5" />
            <span>About</span>
          </Link>
          <Link
            href="/contact"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
              pathname === '/contact' && 'bg-gray-800 text-white'
            )}
          >
            <Mail className="h-5 w-5" />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Social Links */}
        <div className="border-t border-gray-800 p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-400">
            Follow Me
          </h3>
          <div className="flex gap-4">
            <a
              href={SOCIAL_LINKS.TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
