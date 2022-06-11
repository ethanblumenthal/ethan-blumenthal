import { IProject, IHeader, ISkill, IQualification } from './models';

export const PAGES = [
  { title: 'Home', slug: '/' },
  { title: 'Blog', slug: '/blog' },
  { title: 'About', slug: '/about' },
  { title: 'Work', slug: '/work' },
];

export const BIO = {
  title: "Hi, I'm Ethan!",
  description:
    'I am a software engineer specializing in smart contract development and blockchain architecture. I have extensive experience working with peer-to-peer networking, cryptography, and game theory. My mission is to contribute to the development of a more decentralized, transparent, and secure Internet. Together, we can create a more equitable future where everyone can participate in the new global token economy enabled by Web3.',
  image: '/ethanblumenthal.jpg',
};

export const HEADER: IHeader = {
  title: "Hi, I'm Ethan!",
  image: '/logo.svg',
  summary:
    'The Internet was originally designed to be the ultimate economic leveler as everyone had an equal opportunity to access the world of digital information and commerce through their devices. However, this utopian vision was quickly corrupted when big technology companies realized that they could monopolize the most important resource of the internet age, data, and sell it to the highest bidder. The crypto revolution promises to return the Internet to its original roots by reimagining how humans interact with each other in a trustless environment enabled by blockchain technology. Crypto will be the largest disrupter of this decade, redistributing the concentration of wealth and power to the masses. Come join me in exploring and building the infinite frontier!',
};

export const EXPERIENCE = [
  {
    title: `OwnProp`,
    position: `Co-Founder, Engineering Lead`,
    description: `Blockchain-based platform to buy and sell property with ease, transparency and low cost. The NYSE of real estate. Real estate investing has high capital requirements, knowledge barriers and complex tax issues that make it painful for accredited investors and inaccessible to the 100M US retail investors. Even if you are able to invest in real estate, you are left with an asset that is costly to maintain and difficult to sell. We launched OwnProp to open up real estate investing to everyone and provide liquidity to homeowners and current investors. OwnProp is starting with properties available to accredited investors, and plans to open up to retail investors within 18 - 24 months.`,
    link: `https://www.ownprop.com/`,
  },
  {
    title: `Rex`,
    position: `Blockchain Engineer`,
    description: `Rex is an ecosystem that incubates, launches and operates tech startups across a number of sectors at the intersection of technology and real estate: Services, FinTech, InsureTech, Data Services, and more. We are creating the Future of Real Estate by building and launching multiple tech companies committed to serving and empowering people everywhere. We are launching synergistic tech startups that will scale via real estate into numerous industries creating a flywheel effect where each launch strengthens the value of the network, increases the talent density, accelerates cross-pollination of ideas, and creates mutually beneficial corporate and technical infrastructure.`,
    link: `https://www.rex.com/`,
  },
];

export const QUALIFICATIONS: IQualification[] = [
  {
    title: 'MS, Computer Science',
    description: 'University of Texas',
    link: `https://www.cs.utexas.edu/`,
    icon: 'book',
  },
  {
    title: 'BA, Economics',
    description: 'University of Illinois',
    link: `https://economics.illinois.edu/`,
    icon: 'book',
  },
  {
    title: 'Solutions Architect',
    description: 'Amazon Web Services',
    link: `https://www.youracclaim.com/badges/8a0ce950-5147-4836-b4ea-094199021f76`,
    icon: 'code',
  },
  {
    title: 'Cloud Engineer',
    description: 'Google Cloud Platform',
    link: `https://www.credential.net/7ddf36bf-5464-4a7b-b4e1-c8a03f2cb105?key=f97cb02161d2387c668949d990c541bb9a2f39430c128c10c81b835718b9864d&_ga=2.143835574.26271270.1610596323-764528462.1610596323`,
    icon: 'code',
  },
];

export const SKILLSET: ISkill[] = [
  {
    title: 'Languages',
    skills: [, 'Golang', 'Rust', 'TypeScript', 'Solidity'],
  },
  {
    title: 'Web',
    skills: ['Node', 'Express', 'GraphQL', 'React'],
  },
  {
    title: 'Blockchain',
    skills: ['Truffle', 'OpenZeppelin', 'Substrate', 'Cosmos'],
  },
  {
    title: 'DevOps',
    skills: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform'],
  },
];

export const PROJECTS: IProject[] = [
  {
    name: 'NFT Marketplace',
    description:
      'A decentralized application (dApp) based on the popular CryptoKitties app. Users can breed kittens as well as sell them to others on the open market. Each kitten is designed according to its verifiably unique encoded DNA string with earlier generation kittens being more valuable. The smart contract implements the ERC-721 token standard for NFTs as well as ERC-165 for interfacing with other contracts. Web3.js is used to communicate between the client and the blockchain. The project was developed locally using Ganache and tested on the Kovan test network.',
    image: '/projects/nft-marketplace.png',
    tags: ['Solidity', 'Ethereum', 'ERC-721'],
    githubURL: 'https://github.com/ethanblumenthal/nft-marketplace',
  },
  {
    name: 'Go Blockchain',
    description:
      'A fully decentralized peer-to-peer blockchain written in Go from scratch. The ledger is secured using a proof-of-work consensus mechanism while being fully transparent using a sync algorithm. The blockchain uses Ethereum’s cryptographic library to create pseudo-anonymous wallets allowing users to securely sign transactions. The implementation ensures an uncheatable audit is possible using a secure hashing function to make the database immutable. It also leverages a linked list to optimize database performance. The project contains two interfaces to interact with the blockchain nodes - a CLI and HTTP.',
    image: '/projects/go-blockchain.png',
    tags: ['Go', 'Blockchain', 'Cryptography'],
    githubURL: 'https://github.com/ethanblumenthal/go-blockchain',
  },
  {
    name: 'Rust Blockchain',
    description:
      'An unspent transaction output (UTXO) ledger model that enables a Bitcoin-like blockchain. The project uses the Substrate framework which is written in Rust and compiled to WebAssembly. Substrate was created by Parity Technologies, the creators of Polkadot. The chain is cryptographically secured against replay attacks using the FRAME pallet composed of blockchain primitives. I also updated the network transaction pool logic to avoid race conditions and configured the genesis block.',
    image: '/projects/rust-blockchain.png',
    tags: ['Rust', 'WebAssembly', 'Substrate'],
    githubURL: 'https://github.com/ethanblumenthal/rust-blockchain',
  },
  {
    name: 'Decentralized Exchange',
    description:
      'A simple decentralized exchange (DEX) implementation that enables trading of Ether (ETH) for ERC-20 tokens and vice versa. The DEX is based on the order book model and supports both market and limit orders. Bubble sort is used when creating a limit order to ensure proper matching based on price between buyers and sellers. The project uses the Truffle framework and OpenZeppelin library for building smart contracts.',
    image: '/projects/decentralized-exchange.png',
    tags: ['Solidity', 'Ethereum', 'ERC-20'],
    githubURL: 'https://github.com/ethanblumenthal/decentralized-exchange',
  },
  {
    name: 'Decentralized Lottery',
    description:
      'A decentralized lottery that allows users to pool together ETH and randomly selects a winner. Chainlink’s oracle service is used to bring information from the real world on-chain. The lottery consumes a Chainlink price feed to determine the price of ETH when entering the contest as the entry fee is fixed in USD. It also uses Chainlink’s verifiable random function (VRF) to ensure randomness on-chain in a deterministic setting.',
    image: '/projects/decentralized-lottery.png',
    tags: ['Solidity', 'Ethereum', 'Chainlink'],
    githubURL: 'https://github.com/ethanblumenthal/decentralized-lottery',
  },
];
