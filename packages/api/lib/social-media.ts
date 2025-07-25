import { TwitterApi, TweetV2 } from 'twitter-api-v2';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Lazy initialization to avoid build-time errors
let openaiClient: ReturnType<typeof createOpenAI> | null = null;
let twitterClientInstance: TwitterApi | null = null;

function getOpenAIClient() {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

function getTwitterClient() {
  if (!twitterClientInstance && process.env.TWITTER_API_KEY) {
    twitterClientInstance = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    });
  }
  return twitterClientInstance;
}

// LinkedIn client (simplified - would need proper OAuth flow)
interface LinkedInConfig {
  clientId: string;
  clientSecret: string;
  accessToken: string;
}

interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'linkedin';
  content: string;
  author: {
    username: string;
    displayName: string;
    profileImage: string;
    followers: number;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: Date;
  url: string;
  media?: string[];
}

interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  topics: string[];
  relevanceScore: number;
  insights: string[];
}

interface GeneratedPost {
  content: string;
  platform: 'twitter' | 'linkedin';
  hashtags: string[];
  callToAction?: string;
  mediaType?: 'image' | 'video' | 'article';
  scheduledFor?: Date;
}

interface LeadProfile {
  platform: 'twitter' | 'linkedin';
  username: string;
  displayName: string;
  bio: string;
  profileUrl: string;
  followers: number;
  engagement: number;
  topics: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  leadScore: number;
  relevantPosts: string[];
}

export class SocialMediaService {
  private getTwitterReadOnly() {
    const client = getTwitterClient();
    return client?.readOnly;
  }

  // ======================
  // FEED RETRIEVAL
  // ======================

  async getTwitterFeed(count: number = 50): Promise<SocialMediaPost[]> {
    try {
      const readOnlyClient = this.getTwitterReadOnly();
      if (!readOnlyClient) return [];
      const timeline = await readOnlyClient.v2.homeTimeline({
        max_results: count,
        'tweet.fields': ['created_at', 'author_id', 'public_metrics', 'context_annotations'],
        'user.fields': ['username', 'name', 'profile_image_url', 'public_metrics'],
        expansions: ['author_id'],
      });

      const posts: SocialMediaPost[] = [];
      
      for (const tweet of timeline.data.data || []) {
        const author = timeline.includes?.users?.find(u => u.id === tweet.author_id);
        if (!author) continue;

        posts.push({
          id: tweet.id,
          platform: 'twitter',
          content: tweet.text,
          author: {
            username: author.username,
            displayName: author.name,
            profileImage: author.profile_image_url || '',
            followers: author.public_metrics?.followers_count || 0,
          },
          engagement: {
            likes: tweet.public_metrics?.like_count || 0,
            shares: tweet.public_metrics?.retweet_count || 0,
            comments: tweet.public_metrics?.reply_count || 0,
          },
          createdAt: new Date(tweet.created_at || Date.now()),
          url: `https://twitter.com/${author.username}/status/${tweet.id}`,
        });
      }

      return posts;
    } catch (error) {
      console.error('Error fetching Twitter feed:', error);
      return [];
    }
  }

  async getLinkedInFeed(accessToken: string, count: number = 50): Promise<SocialMediaPost[]> {
    // LinkedIn API implementation would go here
    // For now, returning mock data as LinkedIn API requires complex OAuth
    return [
      {
        id: 'linkedin-1',
        platform: 'linkedin',
        content: 'Exciting developments in PropTech this quarter...',
        author: {
          username: 'john-doe',
          displayName: 'John Doe',
          profileImage: 'https://example.com/avatar.jpg',
          followers: 5000,
        },
        engagement: {
          likes: 45,
          shares: 12,
          comments: 8,
        },
        createdAt: new Date(),
        url: 'https://linkedin.com/posts/john-doe-123',
      },
    ];
  }

  // ======================
  // SENTIMENT ANALYSIS
  // ======================

  async analyzeSentiment(posts: SocialMediaPost[]): Promise<Map<string, SentimentAnalysis>> {
    const analyses = new Map<string, SentimentAnalysis>();

    for (const post of posts) {
      try {
        const openai = getOpenAIClient();
        if (!openai) throw new Error('OpenAI client not available');
        const { text } = await generateText({
          model: openai('gpt-4-turbo-preview'),
          prompt: `Analyze this social media post for sentiment and relevance to commercial real estate, PropTech, Bitcoin, and tokenization:

Post: "${post.content}"

Return a JSON response with:
{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": 0.0-1.0,
  "topics": ["list", "of", "relevant", "topics"],
  "relevanceScore": 0.0-1.0,
  "insights": ["key", "insights", "about", "the", "post"]
}

Focus on:
- Commercial real estate trends
- PropTech innovations
- Bitcoin/cryptocurrency applications
- Tokenization opportunities
- Market sentiment
- Investment opportunities`,
          maxTokens: 500,
          temperature: 0.3,
        });

        const analysis = JSON.parse(text);
        analyses.set(post.id, {
          sentiment: analysis.sentiment || 'neutral',
          confidence: analysis.confidence || 0.5,
          topics: analysis.topics || [],
          relevanceScore: analysis.relevanceScore || 0,
          insights: analysis.insights || [],
        });
      } catch (error) {
        console.error(`Error analyzing post ${post.id}:`, error);
        analyses.set(post.id, {
          sentiment: 'neutral',
          confidence: 0,
          topics: [],
          relevanceScore: 0,
          insights: [],
        });
      }
    }

    return analyses;
  }

  // ======================
  // CONTENT GENERATION
  // ======================

  async generateSocialContent(
    inspiration: SocialMediaPost[],
    platform: 'twitter' | 'linkedin',
    options: {
      tone: 'professional' | 'casual' | 'thought-leadership';
      focus: 'proptech' | 'bitcoin' | 'tokenization' | 'cre-trends';
      includeData: boolean;
      includeCTA: boolean;
    }
  ): Promise<GeneratedPost> {
    const platformLimits = {
      twitter: 280,
      linkedin: 3000,
    };

    const inspirationText = inspiration
      .slice(0, 5)
      .map(p => p.content)
      .join('\n---\n');

    const prompt = `Based on these trending social media posts about commercial real estate and PropTech, create an engaging ${platform} post:

INSPIRATION POSTS:
${inspirationText}

REQUIREMENTS:
- Platform: ${platform} (max ${platformLimits[platform]} characters)
- Tone: ${options.tone}
- Focus: ${options.focus}
- Include data/statistics: ${options.includeData}
- Include call-to-action: ${options.includeCTA}

FOCUS AREAS:
- Commercial real estate trends and insights
- PropTech innovations and their impact
- Bitcoin/cryptocurrency in real estate
- Tokenization opportunities
- Market analysis and predictions

Return JSON with:
{
  "content": "The post content",
  "hashtags": ["relevant", "hashtags"],
  "callToAction": "Optional CTA text",
  "mediaType": "image" | "video" | "article" | null,
  "reasoning": "Why this content will perform well"
}

Make it engaging, informative, and optimized for ${platform}'s audience.`;

    try {
      const openai = getOpenAIClient();
      if (!openai) throw new Error('OpenAI client not available');
      const { text } = await generateText({
        model: openai('gpt-4-turbo-preview'),
        prompt,
        maxTokens: 800,
        temperature: 0.7,
      });

      const generated = JSON.parse(text);
      
      return {
        content: generated.content,
        platform,
        hashtags: generated.hashtags || [],
        callToAction: generated.callToAction,
        mediaType: generated.mediaType,
      };
    } catch (error) {
      console.error('Error generating social content:', error);
      return {
        content: `Exciting developments in ${options.focus.replace('-', ' ')} are reshaping commercial real estate. What trends are you watching? #PropTech #CRE`,
        platform,
        hashtags: ['PropTech', 'CRE', 'Innovation'],
      };
    }
  }

  // ======================
  // LEAD DISCOVERY
  // ======================

  async discoverLeads(
    keywords: string[],
    platform: 'twitter' | 'linkedin',
    limit: number = 20
  ): Promise<LeadProfile[]> {
    if (platform === 'twitter') {
      return this.discoverTwitterLeads(keywords, limit);
    } else {
      return this.discoverLinkedInLeads(keywords, limit);
    }
  }

  private async discoverTwitterLeads(keywords: string[], limit: number): Promise<LeadProfile[]> {
    try {
      const searchQuery = keywords.join(' OR ') + ' -is:retweet';
      const readOnlyClient = this.getTwitterReadOnly();
      if (!readOnlyClient) return [];
      const searchResults = await readOnlyClient.v2.search(searchQuery, {
        max_results: limit,
        'tweet.fields': ['created_at', 'author_id', 'public_metrics', 'context_annotations'],
        'user.fields': ['username', 'name', 'description', 'profile_image_url', 'public_metrics'],
        expansions: ['author_id'],
      });

      const leads: LeadProfile[] = [];
      const processedUsers = new Set<string>();

      for (const tweet of searchResults.data.data || []) {
        const author = searchResults.includes?.users?.find(u => u.id === tweet.author_id);
        if (!author || processedUsers.has(author.id)) continue;
        
        processedUsers.add(author.id);

        // Use AI to analyze the user's profile and recent content
        const analysis = await this.analyzeLeadProfile(author, [tweet.text]);
        
        leads.push({
          platform: 'twitter',
          username: author.username,
          displayName: author.name,
          bio: author.description || '',
          profileUrl: `https://twitter.com/${author.username}`,
          followers: author.public_metrics?.followers_count || 0,
          engagement: tweet.public_metrics?.like_count || 0,
          topics: analysis.topics,
          sentiment: analysis.sentiment,
          leadScore: analysis.leadScore,
          relevantPosts: [tweet.text],
        });
      }

      return leads.sort((a, b) => b.leadScore - a.leadScore);
    } catch (error) {
      console.error('Error discovering Twitter leads:', error);
      return [];
    }
  }

  private async discoverLinkedInLeads(keywords: string[], limit: number): Promise<LeadProfile[]> {
    // LinkedIn lead discovery would require LinkedIn API integration
    // For now, returning mock data
    return [
      {
        platform: 'linkedin',
        username: 'sarah-proptech',
        displayName: 'Sarah Johnson',
        bio: 'PropTech investor focused on commercial real estate innovation',
        profileUrl: 'https://linkedin.com/in/sarah-proptech',
        followers: 12000,
        engagement: 150,
        topics: ['proptech', 'commercial-real-estate', 'investment'],
        sentiment: 'positive',
        leadScore: 85,
        relevantPosts: ['Excited about the future of smart buildings...'],
      },
    ];
  }

  private async analyzeLeadProfile(user: any, recentPosts: string[]): Promise<{
    topics: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    leadScore: number;
  }> {
    try {
      const openai = getOpenAIClient();
      if (!openai) throw new Error('OpenAI client not available');
      const { text } = await generateText({
        model: openai('gpt-4-turbo-preview'),
        prompt: `Analyze this social media profile for lead potential in commercial real estate, PropTech, Bitcoin, and tokenization:

Profile:
- Name: ${user.name}
- Bio: ${user.description || 'No bio'}
- Followers: ${user.public_metrics?.followers_count || 0}
- Recent posts: ${recentPosts.join(' | ')}

Return JSON with:
{
  "topics": ["relevant", "topics", "they", "discuss"],
  "sentiment": "positive" | "negative" | "neutral",
  "leadScore": 0-100,
  "reasoning": "Why they are/aren't a good lead"
}

Lead scoring criteria:
- High followers in CRE space: +20 points
- Discusses PropTech/innovation: +25 points
- Mentions Bitcoin/crypto: +20 points
- Investment/business focus: +15 points
- Engagement quality: +20 points`,
        maxTokens: 400,
        temperature: 0.3,
      });

      const analysis = JSON.parse(text);
      return {
        topics: analysis.topics || [],
        sentiment: analysis.sentiment || 'neutral',
        leadScore: analysis.leadScore || 0,
      };
    } catch (error) {
      console.error('Error analyzing lead profile:', error);
      return {
        topics: [],
        sentiment: 'neutral',
        leadScore: 0,
      };
    }
  }

  // ======================
  // POSTING AND SCHEDULING
  // ======================

  async postToTwitter(content: string): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const client = getTwitterClient();
      if (!client) throw new Error('Twitter client not available');
      const tweet = await client.v2.tweet(content);
      return {
        success: true,
        id: tweet.data.id,
      };
    } catch (error: any) {
      console.error('Error posting to Twitter:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async postToLinkedIn(
    content: string,
    accessToken: string
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    // LinkedIn posting would be implemented here
    // For now, returning mock success
    return {
      success: true,
      id: 'linkedin-post-' + Date.now(),
    };
  }

  // ======================
  // CONTENT OPTIMIZATION
  // ======================

  async optimizeContentForEngagement(
    content: string,
    platform: 'twitter' | 'linkedin',
    targetAudience: 'investors' | 'developers' | 'general'
  ): Promise<{
    optimizedContent: string;
    improvements: string[];
    estimatedEngagement: number;
  }> {
    try {
      const openai = getOpenAIClient();
      if (!openai) throw new Error('OpenAI client not available');
      const { text } = await generateText({
        model: openai('gpt-4-turbo-preview'),
        prompt: `Optimize this ${platform} post for maximum engagement with ${targetAudience}:

Original: "${content}"

Requirements:
- Platform: ${platform}
- Audience: ${targetAudience}
- Focus: Commercial real estate, PropTech, Bitcoin, tokenization

Return JSON with:
{
  "optimizedContent": "The improved post",
  "improvements": ["list", "of", "specific", "improvements", "made"],
  "estimatedEngagement": 1-100,
  "reasoning": "Why these changes will improve performance"
}

Optimization strategies:
- Hook readers in first 10 words
- Include relevant data/statistics
- Add compelling call-to-action
- Use platform-specific best practices
- Optimize hashtags and mentions`,
        maxTokens: 600,
        temperature: 0.4,
      });

      const result = JSON.parse(text);
      return {
        optimizedContent: result.optimizedContent,
        improvements: result.improvements || [],
        estimatedEngagement: result.estimatedEngagement || 50,
      };
    } catch (error) {
      console.error('Error optimizing content:', error);
      return {
        optimizedContent: content,
        improvements: [],
        estimatedEngagement: 50,
      };
    }
  }
}

export const socialMediaService = new SocialMediaService();