import { Home, FolderKanban, User2, Mail } from 'lucide-react';

export enum SOCIAL_LINKS {
  TWITTER = 'https://x.com/ethanblumenthal',
  LINKEDIN = 'https://www.linkedin.com/in/ethanblumenthal/',
  GITHUB = 'https://github.com/ethanblumenthal',
}

export const NAV_ITEMS = [
  { name: 'Home', slug: '/', icon: Home },
  { name: 'Projects', slug: '/projects', icon: FolderKanban },
  // { name: 'Blog', slug: '/blog', icon: FileText },
  { name: 'About', slug: '/about', icon: User2 },
  { name: 'Contact', slug: '/contact', icon: Mail },
];

export const PROJECTS = [
  //   {
  //     title: 'Liquid Finance',
  //     category: 'BTC-backed CRE Loans',
  //     image: '/placeholder.svg',
  //     slug: 'liquid-finance',
  //     gradient: 'from-blue-500/20',
  //     description:
  //       'Liquid is an autonomous lending protocol that shrinks commercial real estate (CRE) financing timelines from 2-3 months to days. We leverage large language models (LLMs) to analyze deal materials (e.g., pro formas, pitch decks) and instantly generate actionable loan terms. Our terms provide borrowers with unmatched transparency, showing precisely how interest rates, collateral requirements, and repayment schedules are calculated.',
  //     year: '2024-Present',
  //     position: 'Co-Founder, CTO',
  //     location: 'Austin, TX',
  //     previewUrl: 'https://liquid.finance',
  //     images: ['/liquid-1.png', '/liquid-2.png', '/liquid-3.png'],
  //   },
  {
    title: 'Cityfunds',
    category: 'Home Equity Investments',
    image: '/cityfunds.webp',
    slug: 'cityfunds',
    gradient: 'from-blue-500/20',
    description:
      "Nada is an award-winning fintech and investment platform on a mission to unlock the wealth trapped within the $30 trillion home equity market for homeowners and investors. As the first company qualified by the SEC to issue city-specific shares of home equity, Nada’s Cityfunds product provides investors with direct access to the home equity market. By investing in the equity of homes, Nada is providing homeowners with immediate liquidity without the burden of added debt or monthly payments. Nada's innovative platform aligns individual investors with homeowners to build and preserve their wealth through the power of home equity.",
    year: '2023-2024',
    position: 'VP of Engineering',
    location: 'Austin, TX',
    previewUrl: 'https://www.app.cityfunds.com/',
    mobileImages: [],
    desktopImages: [
      '/cityfunds/desktop-1.png',
      '/cityfunds/desktop-2.png',
      '/cityfunds/desktop-3.png',
      '/cityfunds/desktop-4.png',
    ],
  },
  {
    title: 'OwnProp',
    category: 'Tokenized CRE Investments',
    image: '/ownprop.png',
    slug: 'ownprop',
    gradient: 'from-blue-500/20',
    description:
      'OwnProp is democratizing access to commercial real estate investing, enabling new economic opportunities for all to a once inaccessible market. Real estate yields the highest and most stable returns of any asset class, yet has previously only been available to the wealthy due to high minimums, low liquidity, and a significant knowledge gap. OwnProp is solving these problems by using blockchain technology to reduce overhead costs, increase transparency, and speed up the settlement of transactions. OwnProp’s tokenized investment opportunities include iconic properties that provide predictable appreciation as well as cash flow. The OwnProp platform is currently available to accredited investors as we work towards opening up to retail investors in summer of 2023.',
    year: '2021-2023',
    position: 'Co-Founder, Engineering Lead',
    location: 'Austin, TX',
    previewUrl: 'https://app.ownprop.com/',
    mobileImages: [
      '/ownprop/ownprop-1.webp',
      '/ownprop/ownprop-2.webp',
      '/ownprop/ownprop-3.webp',
      '/ownprop/ownprop-4.webp',
    ],
    desktopImages: [],
  },
];
