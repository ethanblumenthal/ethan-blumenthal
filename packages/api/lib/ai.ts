import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Create mock OpenAI client when API key is not available
const createMockOpenAI = () => {
  return () => ({
    doGenerate: async () => {
      console.warn('AI generation attempted without OPENAI_API_KEY');
      return { text: '{}', usage: {} };
    },
  });
};

const openai = process.env.OPENAI_API_KEY
  ? createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : (createMockOpenAI() as any);

interface BlogGenerationInput {
  topic: string;
  keywords: string[];
  tone: 'professional' | 'casual' | 'technical';
  length: 'short' | 'medium' | 'long';
  audience: 'investors' | 'developers' | 'general';
  includeStats: boolean;
  includeExamples: boolean;
}

interface GeneratedBlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  featuredImage?: string;
  prompt: string;
  wordCount: number;
}

export async function generateBlogPost(input: BlogGenerationInput): Promise<GeneratedBlogPost> {
  // Construct the AI prompt based on input parameters
  const prompt = buildBlogPrompt(input);

  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo-preview'),
      prompt,
      maxTokens: getMaxTokens(input.length),
      temperature: 0.7,
    });

    // Parse the generated content
    const parsedContent = parseBlogContent(text);

    return {
      ...parsedContent,
      prompt,
      wordCount: countWords(parsedContent.content),
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content using AI');
  }
}

function buildBlogPrompt(input: BlogGenerationInput): string {
  const lengthGuidance = {
    short: '800-1200 words',
    medium: '1500-2500 words',
    long: '3000-5000 words',
  };

  const toneGuidance = {
    professional: 'professional, authoritative, and insightful',
    casual: 'conversational, approachable, and engaging',
    technical: 'detailed, technical, and analytical',
  };

  const audienceGuidance = {
    investors: 'experienced investors and financial professionals',
    developers: 'software developers and technical professionals',
    general: 'general business audience with varying technical backgrounds',
  };

  return `You are an expert content writer specializing in PropTech, commercial real estate, and Bitcoin/cryptocurrency. Write a comprehensive blog post about "${input.topic}".

**Requirements:**
- Target audience: ${audienceGuidance[input.audience]}
- Tone: ${toneGuidance[input.tone]}
- Length: ${lengthGuidance[input.length]}
- Keywords to incorporate naturally: ${input.keywords.join(', ')}
${input.includeStats ? '- Include relevant statistics, data points, and market insights' : ''}
${input.includeExamples ? '- Include real-world examples, case studies, or scenarios' : ''}

**Format your response as JSON with the following structure:**
{
  "title": "Compelling, SEO-optimized title (60-70 characters)",
  "excerpt": "Engaging excerpt/description (150-160 characters)",
  "content": "Full blog post content in Markdown format with proper headings, subheadings, bullet points, and formatting",
  "tags": ["relevant", "tags", "for", "seo"],
  "featuredImage": "Suggest a relevant stock photo search term or URL"
}

**Content Guidelines:**
- Start with a compelling introduction that hooks the reader
- Use clear, scannable headings and subheadings (H2, H3)
- Include actionable insights and takeaways
- End with a strong conclusion and call-to-action
- Naturally incorporate the specified keywords
- Ensure content is factually accurate and up-to-date
- Include relevant internal linking opportunities (mention other PropTech or Bitcoin topics)

**Topic Focus:** ${input.topic}

Write the blog post now:`;
}

function parseBlogContent(generatedText: string): Omit<GeneratedBlogPost, 'prompt' | 'wordCount'> {
  try {
    // Try to parse as JSON first
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || 'Untitled Post',
        content: parsed.content || 'Content generation failed.',
        excerpt: parsed.excerpt || 'No excerpt available.',
        tags: Array.isArray(parsed.tags) ? parsed.tags : ['proptech'],
        featuredImage: parsed.featuredImage,
      };
    }

    // Fallback: try to extract content manually
    const lines = generatedText.split('\n');
    let title = 'AI Generated Post';
    let content = generatedText;
    let excerpt = generatedText.substring(0, 160) + '...';

    // Try to find title in first few lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim();
      if (line.startsWith('#') || line.length > 20) {
        title = line.replace(/^#+\s*/, '').trim();
        break;
      }
    }

    return {
      title,
      content,
      excerpt,
      tags: ['proptech', 'ai-generated'],
      featuredImage: undefined,
    };
  } catch (error) {
    console.error('Failed to parse AI generated content:', error);
    return {
      title: 'AI Generated Post',
      content: generatedText,
      excerpt: 'AI generated content about PropTech and commercial real estate.',
      tags: ['proptech', 'ai-generated'],
      featuredImage: undefined,
    };
  }
}

function getMaxTokens(length: string): number {
  switch (length) {
    case 'short':
      return 2000;
    case 'medium':
      return 4000;
    case 'long':
      return 6000;
    default:
      return 4000;
  }
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

// Generate blog post ideas based on trending topics
export async function generateBlogIdeas(input: {
  industry: string;
  audience: string;
  count: number;
}): Promise<string[]> {
  const prompt = `Generate ${input.count} compelling blog post ideas for ${input.industry} content targeting ${input.audience}. 

Focus on:
- PropTech innovations and trends
- Commercial real estate investment strategies  
- Bitcoin and cryptocurrency in real estate
- Market analysis and insights
- Technology adoption in CRE

Return only a JSON array of blog post titles, nothing else.`;

  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo-preview'),
      prompt,
      maxTokens: 1000,
      temperature: 0.8,
    });

    const ideas = JSON.parse(text);
    return Array.isArray(ideas) ? ideas : [];
  } catch (error) {
    console.error('Failed to generate blog ideas:', error);
    return [
      'The Future of PropTech: 5 Technologies Reshaping Commercial Real Estate',
      'Bitcoin-Backed Real Estate Lending: A New Frontier for Investors',
      'AI in Commercial Real Estate: From Valuation to Property Management',
      'Tokenizing Commercial Properties: Benefits and Challenges',
      'The Rise of Smart Buildings: IoT and CRE Investment Returns',
    ];
  }
}

// Generate email subject lines for campaigns
export async function generateEmailSubjects(input: {
  topic: string;
  audience: string;
  count: number;
}): Promise<string[]> {
  const prompt = `Generate ${input.count} compelling email subject lines for a ${input.topic} campaign targeting ${input.audience}.

Requirements:
- 50 characters or less
- Create urgency and curiosity
- Avoid spam trigger words
- Focus on value proposition
- Professional tone

Return only a JSON array of subject lines, nothing else.`;

  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo-preview'),
      prompt,
      maxTokens: 500,
      temperature: 0.9,
    });

    const subjects = JSON.parse(text);
    return Array.isArray(subjects) ? subjects : [];
  } catch (error) {
    console.error('Failed to generate email subjects:', error);
    return [
      'Exclusive PropTech Deal Inside 🚀',
      'Your CRE Portfolio Needs This',
      'Bitcoin + Real Estate = 23% Returns?',
      '48hrs Left: Premium CRE Access',
      'Why Smart Money Moved to PropTech',
    ];
  }
}
