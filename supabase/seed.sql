-- Seed data for CRE Platform
-- This file populates the database with initial data for development and testing

-- Insert sample blog posts
INSERT INTO blog_posts (
  title,
  slug,
  content,
  excerpt,
  author,
  status,
  tags,
  featured_image,
  published_at,
  created_at,
  updated_at
) VALUES 
(
  'The Future of Commercial Real Estate: AI and Automation',
  'future-cre-ai-automation',
  '# The Future of Commercial Real Estate: AI and Automation

Commercial real estate is undergoing a digital transformation that promises to revolutionize how we buy, sell, and manage properties. From AI-powered property valuations to automated tenant screening, technology is reshaping every aspect of the industry.

## AI-Powered Property Analysis

Artificial intelligence is becoming increasingly sophisticated in analyzing property data. Machine learning algorithms can now:

- Predict property values with remarkable accuracy
- Identify emerging market trends before they become obvious
- Optimize property management operations
- Automate lease negotiations

## The Role of Automation

Automation is streamlining many traditional CRE processes:

### Property Management
- Automated rent collection
- Predictive maintenance scheduling
- Energy optimization systems
- Tenant communication platforms

### Investment Analysis
- Real-time market data analysis
- Automated due diligence reports
- Risk assessment algorithms
- Portfolio optimization tools

## Looking Ahead

The integration of AI and automation in commercial real estate is not just a trend—it''s the future. Companies that embrace these technologies now will have a significant competitive advantage in the years to come.

As we move forward, we can expect to see even more innovative applications of technology in CRE, from virtual property tours powered by AR/VR to blockchain-based property transactions.',
  'Exploring how AI and automation are revolutionizing commercial real estate operations, from property analysis to investment strategies.',
  'Ethan Blumenthal',
  'published',
  ARRAY['AI', 'PropTech', 'Automation', 'Commercial Real Estate'],
  '/blog/ai-cre-future.jpg',
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days'
),
(
  'Bitcoin in Commercial Real Estate: A New Investment Paradigm',
  'bitcoin-commercial-real-estate-revolution',
  '# Bitcoin in Commercial Real Estate: A New Investment Paradigm

The intersection of Bitcoin and commercial real estate represents one of the most exciting developments in modern finance. As institutional adoption of Bitcoin grows, forward-thinking CRE professionals are exploring how cryptocurrency can enhance traditional real estate investments.

## Why Bitcoin Matters for CRE

Bitcoin offers several advantages for commercial real estate:

### Portfolio Diversification
- Uncorrelated asset class
- Hedge against inflation
- 24/7 global market access
- High liquidity compared to real estate

### Transaction Efficiency
- Faster cross-border transactions
- Reduced settlement times
- Lower transaction costs
- Elimination of currency conversion fees

## Real-World Applications

Several pioneering companies are already integrating Bitcoin into their CRE operations:

### Treasury Management
- Holding Bitcoin as a treasury asset
- Using Bitcoin for international transactions
- Accepting Bitcoin payments from tenants
- Offering Bitcoin-backed loans

### Investment Strategies
- Bitcoin-backed real estate investments
- Cryptocurrency-funded property acquisitions
- Tokenized real estate offerings
- DeFi protocols for real estate financing

## The Future Landscape

As regulatory clarity improves and institutional infrastructure matures, we expect to see:

- More REITs adding Bitcoin to their portfolios
- Property transactions settled in cryptocurrency
- Bitcoin-collateralized commercial mortgages
- Tokenized ownership of commercial properties

The convergence of Bitcoin and commercial real estate is creating new opportunities for investors who understand both markets.',
  'Discovering how Bitcoin is creating new investment opportunities in commercial real estate, from treasury management to tokenized properties.',
  'Ethan Blumenthal',
  'published',
  ARRAY['Bitcoin', 'Cryptocurrency', 'Commercial Real Estate', 'Investment', 'Tokenization'],
  '/blog/bitcoin-cre.jpg',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),
(
  'PropTech Trends 2024: Technology Reshaping Real Estate',
  'proptech-trends-2024',
  '# PropTech Trends 2024: Technology Reshaping Real Estate

The PropTech industry continues to evolve at breakneck speed, with 2024 bringing exciting innovations that are fundamentally changing how we interact with real estate. From AI-powered analytics to blockchain-based transactions, technology is creating new possibilities for efficiency, transparency, and value creation.

## Key PropTech Trends for 2024

### 1. AI-Powered Property Management
Artificial intelligence is revolutionizing property management operations:

- **Predictive Maintenance**: AI algorithms analyze sensor data to predict equipment failures before they occur
- **Smart Energy Management**: Machine learning optimizes HVAC systems and lighting for maximum efficiency
- **Automated Tenant Services**: Chatbots and virtual assistants handle routine tenant inquiries 24/7
- **Dynamic Pricing**: AI adjusts rental rates in real-time based on market conditions and demand

### 2. Blockchain and Tokenization
Blockchain technology is creating new investment opportunities:

- **Fractional Ownership**: Properties can be tokenized and sold in smaller, more accessible portions
- **Smart Contracts**: Automated lease agreements and payment processing
- **Transparent Transactions**: Immutable records of ownership and transaction history
- **Global Investment Access**: International investors can easily participate in local markets

### 3. Virtual and Augmented Reality
Immersive technologies are transforming property experiences:

- **Virtual Property Tours**: High-quality 3D walkthroughs reduce the need for physical visits
- **Augmented Reality Design**: Visualize renovations and furniture placement before making changes
- **Remote Property Management**: Conduct inspections and maintenance checks virtually
- **Enhanced Marketing**: Create compelling property presentations that stand out

### 4. IoT and Smart Building Technology
Internet of Things devices are making buildings more intelligent:

- **Environmental Monitoring**: Track air quality, temperature, and humidity in real-time
- **Security Systems**: Advanced access control and surveillance with facial recognition
- **Space Utilization**: Monitor how spaces are used to optimize layouts and resources
- **Automated Systems**: Smart elevators, lighting, and climate control that adapt to usage patterns

## Investment Opportunities

The PropTech sector presents significant investment opportunities:

- **Growing Market**: The global PropTech market is expected to reach $86.5 billion by 2032
- **Efficiency Gains**: Technology solutions can reduce operational costs by 20-30%
- **New Revenue Streams**: Data analytics and platform services create additional income sources
- **Competitive Advantage**: Early adopters gain significant market advantages

## Challenges and Considerations

While PropTech offers tremendous potential, there are challenges to consider:

- **Data Privacy**: Ensuring tenant and user data is properly protected
- **Integration Complexity**: Combining new technologies with legacy systems
- **Regulatory Compliance**: Navigating evolving regulations around data and technology
- **User Adoption**: Training staff and tenants to effectively use new technologies

## Looking Forward

The PropTech revolution is just beginning. As we move through 2024 and beyond, we can expect to see:

- More sophisticated AI applications in property management
- Increased adoption of blockchain for real estate transactions
- Greater integration between physical and digital property experiences
- New financing models enabled by cryptocurrency and DeFi protocols

The companies and investors who embrace these technologies now will be best positioned to thrive in the digital future of real estate.',
  'Comprehensive overview of the latest PropTech trends for 2024, covering AI, blockchain, VR/AR, and IoT innovations transforming real estate.',
  'Ethan Blumenthal',
  'published',
  ARRAY['PropTech', 'Technology', 'Real Estate', 'AI', 'Blockchain', 'IoT'],
  '/blog/proptech-trends.jpg',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  'Building the Future: Smart Cities and Commercial Real Estate',
  'smart-cities-commercial-real-estate',
  '# Building the Future: Smart Cities and Commercial Real Estate

Smart cities represent the convergence of urban planning, technology, and sustainability. As cities worldwide embrace smart infrastructure, commercial real estate professionals must understand how these developments will reshape property values, tenant demands, and investment opportunities.

## What Makes a City "Smart"?

Smart cities leverage technology and data to improve:
- Energy efficiency and sustainability
- Transportation and mobility
- Public safety and security
- Economic development and innovation
- Quality of life for residents

## Impact on Commercial Real Estate

Smart city initiatives create new opportunities and requirements for CRE:

### Enhanced Property Values
- Properties in smart districts command premium rents
- Improved infrastructure increases accessibility and desirability
- Sustainable buildings attract environmentally conscious tenants
- Technology integration becomes a competitive necessity

### New Tenant Demands
- High-speed connectivity and 5G infrastructure
- Smart building features and automation
- Sustainability certifications and green technology
- Flexible spaces that adapt to changing work patterns

## Investment Strategies

Successful CRE investors in smart cities focus on:

### Technology-Forward Properties
- Buildings with integrated IoT systems
- Advanced energy management capabilities
- Flexible infrastructure for future upgrades
- High-quality connectivity and data infrastructure

### Strategic Locations
- Proximity to innovation districts and tech hubs
- Access to smart transportation networks
- Areas with planned smart infrastructure investments
- Mixed-use developments that support smart city goals

## Case Studies

Several cities are leading the smart city revolution:

### Singapore
- Comprehensive smart nation initiative
- Advanced urban sensing and data analytics
- Integrated transportation and energy systems
- Strong government support for innovation

### Barcelona
- Extensive IoT sensor network
- Smart lighting and traffic management
- Citizen-centric digital services
- Focus on sustainability and efficiency

### Toronto
- Waterfront smart city development
- Public-private partnerships for innovation
- Focus on climate change mitigation
- Integration of digital and physical infrastructure

The future of commercial real estate is inextricably linked to the development of smart cities. Properties that embrace smart technology and sustainable practices will not only attract premium tenants but also contribute to the creation of more livable, efficient urban environments.',
  'Exploring how smart city development is creating new opportunities and requirements in commercial real estate investment and management.',
  'Ethan Blumenthal',
  'draft',
  ARRAY['Smart Cities', 'Urban Planning', 'Technology', 'Sustainability', 'Commercial Real Estate'],
  '/blog/smart-cities.jpg',
  NOW(),
  NOW(),
  NOW()
);

-- Insert sample contacts for CRM testing
INSERT INTO contacts (
  first_name,
  last_name,
  email,
  phone,
  company,
  website,
  status,
  group_type,
  labels,
  notes,
  x_profile,
  linkedin_profile,
  source,
  lead_score,
  created_at,
  updated_at
) VALUES 
(
  'Sarah',
  'Johnson',
  'sarah.johnson@realtytech.com',
  '+1-555-0123',
  'RealtyTech Solutions',
  'https://realtytech.com',
  'qualified',
  'venture_capital',
  ARRAY['PropTech', 'Series A', 'Hot Lead'],
  'Interested in PropTech investments. Has portfolio of $50M+ in real estate technology. Looking for AI-powered property management solutions.',
  '@sarahjohnsonvc',
  'https://linkedin.com/in/sarahjohnsonvc',
  'website',
  85,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '2 days'
),
(
  'Michael',
  'Chen',
  'mchen@propinvest.com',
  '+1-555-0456',
  'PropInvest Capital',
  'https://propinvest.com',
  'engaged',
  'private_equity',
  ARRAY['Commercial Real Estate', 'Bitcoin', 'Institutional'],
  'Private equity firm focused on commercial real estate. Exploring Bitcoin treasury strategy. Manages $200M+ in CRE assets.',
  '@michaelchenprop',
  'https://linkedin.com/in/michaelchenprop',
  'linkedin',
  92,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '1 day'
),
(
  'Emily',
  'Rodriguez',
  'emily@innovatetech.io',
  '+1-555-0789',
  'InnovateTech Fund',
  'https://innovatetech.io',
  'prospect',
  'angel_investor',
  ARRAY['Early Stage', 'Technology', 'PropTech'],
  'Angel investor with background in technology. Interested in early-stage PropTech startups. Has invested in 15+ tech companies.',
  '@emilyrodrigueztech',
  'https://linkedin.com/in/emilyrodrigueztech',
  'website',
  68,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  'David',
  'Thompson',
  'dthompson@capitallending.com',
  '+1-555-0321',
  'Capital Lending Group',
  'https://capitallending.com',
  'converted',
  'lender',
  ARRAY['Commercial Lending', 'CRE Finance', 'Client'],
  'Commercial real estate lender. Provides financing for office, retail, and industrial properties. Current client - closed $5M loan last month.',
  NULL,
  'https://linkedin.com/in/davidthompsonlending',
  'manual',
  95,
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '15 days'
),
(
  'Jessica',
  'Park',
  'jpark@commercialbrokers.net',
  '+1-555-0654',
  'Commercial Brokers Network',
  'https://commercialbrokers.net',
  'qualified',
  'broker',
  ARRAY['Commercial Brokerage', 'Deal Flow', 'Partnership'],
  'Commercial real estate broker specializing in office properties. Handles 20+ transactions per year. Potential partnership opportunity.',
  '@jessicaparkbre',
  'https://linkedin.com/in/jessicaparkbroker',
  'website',
  78,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '1 day'
);

-- Insert sample leads for lead management testing
INSERT INTO leads (
  name,
  platform,
  profile_url,
  x_profile,
  linkedin_profile,
  follower_count,
  engagement_score,
  created_at
) VALUES 
(
  'Alex Wong - PropTech Investor',
  'twitter',
  'https://twitter.com/alexwongprop',
  '@alexwongprop',
  NULL,
  15000,
  0.85,
  NOW() - INTERVAL '2 days'
),
(
  'Maria Santos - CRE Developer',
  'linkedin',
  'https://linkedin.com/in/mariasantoscre',
  NULL,
  'https://linkedin.com/in/mariasantoscre',
  5000,
  0.72,
  NOW() - INTERVAL '1 day'
),
(
  'Robert Kim - Real Estate Tech',
  'twitter',
  'https://twitter.com/robertkimtech',
  '@robertkimtech',
  'https://linkedin.com/in/robertkimtech',
  8500,
  0.68,
  NOW() - INTERVAL '3 hours'
);

-- Insert sample social media posts (using pending_social_posts table)
INSERT INTO pending_social_posts (
  platform,
  content,
  hashtags,
  status,
  scheduled_for,
  tone,
  focus,
  created_at,
  updated_at
) VALUES 
(
  'twitter',
  'The future of commercial real estate is being written in code. AI-powered property management is reducing operational costs by 30% while improving tenant satisfaction. Are you ready for the PropTech revolution? 🏢💡',
  ARRAY['#PropTech', '#AI', '#CommercialRealEstate', '#Innovation'],
  'posted',
  NOW() - INTERVAL '2 hours',
  'professional',
  'AI Property Management',
  NOW() - INTERVAL '3 hours',
  NOW() - INTERVAL '2 hours'
),
(
  'linkedin',
  'Bitcoin adoption in commercial real estate treasury management is accelerating. Latest survey shows 23% of CRE firms are considering Bitcoin as a treasury asset. 

Key benefits driving adoption:
• Portfolio diversification
• Inflation hedge
• 24/7 liquidity
• Global transaction efficiency

The intersection of digital assets and real estate represents a fundamental shift in how we think about value storage and transfer. 

What''s your take on Bitcoin in CRE? Share your thoughts below. 👇',
  ARRAY['#Bitcoin', '#CRE', '#Treasury', '#DigitalAssets'],
  'pending_approval',
  NOW() + INTERVAL '1 day',
  'engaging',
  'Bitcoin in CRE',
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '1 hour'
),
(
  'twitter',
  'Smart buildings are no longer science fiction. IoT sensors monitoring air quality, energy consumption, and space utilization in real-time. The data insights are transforming how we manage commercial properties. 📊🏗️',
  ARRAY['#SmartBuildings', '#IoT', '#PropTech', '#DataAnalytics'],
  'scheduled',
  NOW() + INTERVAL '6 hours',
  'informative',
  'Smart Building Technology',
  NOW() - INTERVAL '30 minutes',
  NOW() - INTERVAL '30 minutes'
);

-- Update sequences to start from appropriate values
SELECT setval('blog_posts_id_seq', 100);
SELECT setval('contacts_id_seq', 100);
SELECT setval('leads_id_seq', 100);
SELECT setval('pending_social_posts_id_seq', 100);