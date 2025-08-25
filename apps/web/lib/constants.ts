import { Home, FolderKanban, User2, Mail, FileText } from 'lucide-react';

export enum SOCIAL_LINKS {
  TWITTER = 'https://x.com/ethanblumenthal',
  LINKEDIN = 'https://www.linkedin.com/in/ethanblumenthal/',
  GITHUB = 'https://github.com/ethanblumenthal',
}

export const NAV_ITEMS = [
  { name: 'Home', slug: '/', icon: Home },
  // { name: 'Projects', slug: '/projects', icon: FolderKanban },
  // { name: 'Blog', slug: '/blog', icon: FileText },
  { name: 'About', slug: '/about', icon: User2 },
  { name: 'Contact', slug: '/contact', icon: Mail },
];

export const PROJECTS = [
  {
    title: 'Flow AI',
    category: 'Agentic CRE Workflows',
    image: '/flow.jpg',
    slug: 'flow',
    gradient: 'from-primary/20',
    description:
      'Flow AI is revolutionizing commercial real estate with its agentic workforce. Designed to streamline the formulaic yet human-dependent processes of private equity firms, Flow replaces investor relations and financial modeling teams by answering complex queries, analyzing deal data, and enabling a unique "Vibe Modeling" experience. Flow AI addresses inefficiencies in a historically opaque market, reducing costs, closing times, and errors while unlocking untapped data potential.',
    year: '2024-2025',
    position: 'Co-Founder, CTO',
    location: 'Austin, TX',
    stage: 'Early Stage',
    customer: 'B2B',
    previewUrl: 'https://flowcre.ai',
    desktopImages: [
      '/liquid/flow-1.png',
      '/liquid/flow-2.png',
      '/liquid/flow-3.png',
      '/liquid/flow-4.png',
    ],
  },
  {
    title: 'Cityfunds',
    category: 'Home Equity Originations',
    image: '/cityfunds.webp',
    slug: 'cityfunds',
    gradient: 'from-blue-500/20',
    description:
      "Nada is an award-winning fintech and investment platform on a mission to unlock the wealth trapped within the $30 trillion home equity market for homeowners and investors. As the first company qualified by the SEC to issue city-specific shares of home equity, Nada’s Cityfunds product provides investors with direct access to the home equity market. By investing in the equity of homes, Nada is providing homeowners with immediate liquidity without the burden of added debt or monthly payments. Nada's innovative platform aligns individual investors with homeowners to build and preserve their wealth through the power of home equity.",
    year: '2023-2024',
    position: 'VP of Engineering',
    location: 'Austin, TX',
    stage: 'Growth Stage',
    customer: 'B2C',
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
    position: 'Founding Engineer',
    location: 'Austin, TX',
    stage: 'Early Stage',
    customer: 'B2C',
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

export const TECHNOLOGIES = {
  Languages: [
    {
      name: 'TypeScript',
      iconName: 'typescript',
    },
    {
      name: 'Python',
      iconName: 'python',
    },
    {
      name: 'Golang',
      iconName: 'go',
    },
    {
      name: 'Rust',
      iconName: 'rust',
      variant: 'dark',
    },
    {
      name: 'Solidity',
      iconName: 'solidity',
      variant: 'dark',
    },
  ],
  'Web Dev': [
    {
      name: 'Next.js',
      iconName: 'nextjs2',
    },
    {
      name: 'React',
      iconName: 'react',
    },
    {
      name: 'Node.js',
      iconName: 'nodejs',
    },
    {
      name: 'Express',
      iconName: 'expressjs',
      variant: 'dark',
    },
    {
      name: 'GraphQL',
      iconName: 'graphql',
    },
  ],
  Databases: [
    {
      name: 'PostgreSQL',
      iconName: 'postgresql',
    },
    {
      name: 'MongoDB',
      iconName: 'mongodb',
    },
    {
      name: 'Redis',
      iconName: 'redis',
    },
    {
      name: 'Neo4j',
      iconName: 'neo4j',
      customIcon: '/icons/neo4j.svg',
    },
    {
      name: 'GitHub Actions',
      iconName: 'github',
    },
  ],
  DevOps: [
    {
      name: 'Vercel',
      iconName: 'vercel',
    },
    {
      name: 'Docker',
      iconName: 'docker',
    },
    {
      name: 'Kubernetes',
      iconName: 'kubernetes',
    },
    {
      name: 'Amazon AWS',
      iconName: 'aws',
      variant: 'dark',
    },
    {
      name: 'Google Cloud',
      iconName: 'gcloud',
    },
  ],
  'AI & Crypto': [
    {
      name: 'OpenAI',
      iconName: 'openai',
      variant: 'dark',
    },
    {
      name: 'Claude',
      iconName: 'claude',
    },
    {
      name: 'Bitcoin',
      iconName: 'bitcoin',
      customIcon: '/icons/bitcoin.svg',
    },
    {
      name: 'Ethereum',
      iconName: 'ethereum',
      customIcon: '/icons/ethereum.svg',
    },
    {
      name: 'Solana',
      iconName: 'solana',
      customIcon: '/icons/solana.svg',
    },
  ],
};

export interface WorkExperience {
  company: string;
  tagline?: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  title: string;
  bullets: string[];
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: 'Flow AI',
    tagline: 'Agentic workflows for commercial real estate',
    location: 'Austin, TX',
    period: 'Nov 2024 - Jul 2025',
    startDate: 'Nov 2024',
    endDate: 'Jul 2025',
    title: 'Co-Founder, CTO',
    bullets: [
      'Created AI powered underwriting and diligence tools for 15+ private equity firms',
      'Built RAG pipelines and chatbot interface allowing firms to interact with their deals',
      'Architected first of its kind context management system for large Excel workbooks',
      'Executed go-to-market strategy bringing product and business from zero to one',
      'Setup funnels and event tracking for marketing conversions and product analytics',
    ],
  },
  {
    company: 'Nada Finance',
    tagline: 'Home equity origination and investment platform',
    location: 'Austin, TX',
    period: 'Apr 2023 - Oct 2024',
    startDate: 'Apr 2023',
    endDate: 'Oct 2024',
    title: 'VP of Engineering',
    bullets: [
      'Originated $10M in home equity investments funded by 20,000 investors',
      'Built web app, mobile app, and APIs for the Cityfunds investment platform',
      'Integrated CRM and AI powered tools to scale origination processing',
      'Made 2200+ contributions including pull requests, commits, and code reviews',
      'Managed a cross-functional engineering team of three individuals',
    ],
  },
  {
    company: 'OwnProp',
    tagline: 'Tokenized commercial real estate investment platform',
    location: 'Austin, TX',
    period: 'Aug 2021 - Mar 2023',
    startDate: 'Aug 2021',
    endDate: 'Mar 2023',
    title: 'Founding Engineer',
    bullets: [
      'Tokenized $850k in institutional grade commercial real estate assets',
      'Grew user base to 3500+ investors and signed up five private equity clients',
      'Architected ERC-1404 standard security token offerings on Arbitrum',
      "Designed automated market maker based on SushiSwap's Trident framework",
      'Pitched potential investors and spoke at conferences to evangelize business',
    ],
  },
  {
    company: 'Rightpoint',
    tagline: 'Technology consulting serving Fortune 500 companies',
    location: 'Chicago, IL',
    period: 'Jul 2019 - Jun 2021',
    startDate: 'Jul 2019',
    endDate: 'Jun 2021',
    title: 'Software Developer',
    bullets: [
      'Architected scalable production systems using microservices and containers',
      'Performed code reviews and oversaw documentation & deployment pipelines',
      'Implemented credit and ACH payments using Stripe billing APIs for Verizon',
      'Integrated a CMS with transit readerboards for Outfront Media in Miami',
      'Led frontend development for an Intranet build for Southwest Airlines',
    ],
  },
  {
    company: 'Zeitgeist Artist Management',
    tagline: 'Touring and recording for indie rock bands',
    location: 'San Francisco, CA',
    period: 'Sep 2015 - Aug 2018',
    startDate: 'Sep 2015',
    endDate: 'Aug 2018',
    title: 'Marketing Coordinator',
    bullets: [
      'Launched publicity and marketing campaigns earning 10M+ impressions',
      'Created content strategies for social media, advertising, and newsletters',
      'Oversaw the design and development of artist websites and stores',
    ],
  },
];
