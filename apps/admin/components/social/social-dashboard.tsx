'use client';

import { useState, useEffect } from 'react';
import { Button } from '@personal-app/ui';
import {
  Twitter,
  Linkedin,
  TrendingUp,
  MessageSquare,
  Heart,
  Share,
  Eye,
  Sparkles,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { trpc } from '@/components/providers';
import ContentGenerator from './content-generator';

interface SocialPost {
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
  sentiment?: 'positive' | 'negative' | 'neutral';
  relevanceScore?: number;
}

interface SocialAnalytics {
  totalPosts: number;
  totalLeads: number;
  avgEngagement: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export default function SocialDashboard() {
  const [activeTab, setActiveTab] = useState<'feed' | 'analytics' | 'content' | 'leads'>('feed');
  const [selectedPlatform, setSelectedPlatform] = useState<'twitter' | 'linkedin' | 'all'>('all');
  const [feedPosts, setFeedPosts] = useState<SocialPost[]>([]);
  const [analytics, setAnalytics] = useState<SocialAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContentGenerator, setShowContentGenerator] = useState(false);

  // Fetch connected social accounts
  const { data: accountsData } = trpc.social.getAccounts.useQuery();

  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'twitter',
      content:
        'PropTech is revolutionizing how we think about commercial real estate investments. AI-powered property analysis is reducing due diligence time by 80%. What trends are you seeing in your market? #PropTech #CRE #AI',
      author: {
        username: 'cre_investor',
        displayName: 'Alex Chen',
        profileImage: '/avatars/alex.jpg',
        followers: 15400,
      },
      engagement: {
        likes: 234,
        shares: 56,
        comments: 23,
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      url: 'https://twitter.com/cre_investor/status/123',
      sentiment: 'positive',
      relevanceScore: 0.92,
    },
    {
      id: '2',
      platform: 'linkedin',
      content:
        'Bitcoin-backed commercial real estate loans are becoming mainstream. Just closed a $50M deal using BTC as collateral at 6.5% interest. Traditional banks are scrambling to catch up.',
      author: {
        username: 'bitcoin-cre',
        displayName: 'Maria Rodriguez',
        profileImage: '/avatars/maria.jpg',
        followers: 8200,
      },
      engagement: {
        likes: 89,
        shares: 34,
        comments: 15,
      },
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      url: 'https://linkedin.com/posts/bitcoin-cre-123',
      sentiment: 'positive',
      relevanceScore: 0.88,
    },
    {
      id: '3',
      platform: 'twitter',
      content:
        'Tokenization of real estate is still early but showing promise. Fractional ownership through blockchain could democratize commercial property investment. Regulatory clarity needed.',
      author: {
        username: 'tokenized_re',
        displayName: 'David Kim',
        profileImage: '/avatars/david.jpg',
        followers: 12100,
      },
      engagement: {
        likes: 156,
        shares: 43,
        comments: 18,
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      url: 'https://twitter.com/tokenized_re/status/456',
      sentiment: 'neutral',
      relevanceScore: 0.85,
    },
  ];

  const mockAnalytics: SocialAnalytics = {
    totalPosts: 1247,
    totalLeads: 89,
    avgEngagement: 4.2,
    sentimentDistribution: {
      positive: 65,
      negative: 8,
      neutral: 27,
    },
  };

  const filteredPosts =
    selectedPlatform === 'all'
      ? mockPosts
      : mockPosts.filter((post) => post.platform === selectedPlatform);

  const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSentimentBg = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-400/20';
      case 'negative':
        return 'bg-red-400/20';
      default:
        return 'bg-gray-400/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Social Media Hub</h1>
          <p className="text-muted-foreground">
            Monitor feeds, generate content, and discover leads
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowContentGenerator(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Content
          </Button>
          <Button className="btn-primary">
            <Users className="mr-2 h-4 w-4" />
            Discover Leads
          </Button>
        </div>
      </div>

      {/* Connected Accounts */}
      {accountsData?.accounts && accountsData.accounts.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Connected Accounts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {accountsData.accounts.map((account: any) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {account.platform === 'twitter' ? (
                    <Twitter className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <a
                      href={account.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      @{account.username}
                    </a>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(account.followers)} followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="dashboard-stat">{formatNumber(mockAnalytics.totalPosts)}</div>
          <div className="dashboard-stat-label">Total Posts Analyzed</div>
        </div>

        <div className="metric-card">
          <div className="dashboard-stat">{mockAnalytics.totalLeads}</div>
          <div className="dashboard-stat-label">Leads Discovered</div>
        </div>

        <div className="metric-card">
          <div className="dashboard-stat">{mockAnalytics.avgEngagement}%</div>
          <div className="dashboard-stat-label">Avg Engagement</div>
        </div>

        <div className="metric-card">
          <div className="dashboard-stat">{mockAnalytics.sentimentDistribution.positive}%</div>
          <div className="dashboard-stat-label">Positive Sentiment</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'feed', label: 'Social Feed', icon: MessageSquare },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'content', label: 'Content Pipeline', icon: Sparkles },
            { id: 'leads', label: 'Lead Discovery', icon: Users },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Platform Filter */}
      {activeTab === 'feed' && (
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm">Platform:</span>
          {[
            { id: 'all', label: 'All Platforms' },
            { id: 'twitter', label: 'Twitter', icon: Twitter },
            { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedPlatform(id as any)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedPlatform === id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'feed' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedPlatform === 'all'
                  ? 'All Platforms'
                  : selectedPlatform === 'twitter'
                    ? 'Twitter'
                    : 'LinkedIn'}{' '}
                Feed
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh Feed'}
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="perplexity-card">
                  {/* Post Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      {post.platform === 'twitter' ? (
                        <Twitter className="w-5 h-5 text-primary" />
                      ) : (
                        <Linkedin className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">
                          {post.author.displayName}
                        </span>
                        <span className="text-muted-foreground">@{post.author.username}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground text-sm">
                          {formatNumber(post.author.followers)} followers
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.createdAt).toLocaleDateString()} at{' '}
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {post.relevanceScore && (
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2 py-1 rounded text-xs ${getSentimentBg(post.sentiment)} ${getSentimentColor(post.sentiment)}`}
                        >
                          {post.sentiment}
                        </div>
                        <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                          {Math.round(post.relevanceScore * 100)}% relevant
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                  {/* Engagement Metrics */}
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(post.engagement.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(post.engagement.shares)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(post.engagement.comments)}</span>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          View Original
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Social Media Analytics</h2>

            {/* Sentiment Distribution */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Distribution</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {mockAnalytics.sentimentDistribution.positive}%
                  </div>
                  <div className="text-muted-foreground text-sm">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {mockAnalytics.sentimentDistribution.neutral}%
                  </div>
                  <div className="text-muted-foreground text-sm">Neutral</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {mockAnalytics.sentimentDistribution.negative}%
                  </div>
                  <div className="text-muted-foreground text-sm">Negative</div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'PropTech',
                  'Bitcoin',
                  'Commercial Real Estate',
                  'AI',
                  'Tokenization',
                  'Smart Buildings',
                  'Investment',
                  'Blockchain',
                ].map((topic) => (
                  <span
                    key={topic}
                    className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Content Pipeline</h2>
              <Button className="btn-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate New Content
              </Button>
            </div>

            <div className="perplexity-card text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No pending content awaiting approval</p>
              <Button variant="outline">Generate AI Content</Button>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Lead Discovery</h2>
              <Button className="btn-primary">
                <Users className="mr-2 h-4 w-4" />
                Discover New Leads
              </Button>
            </div>

            <div className="perplexity-card text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Start discovering potential leads from social media
              </p>
              <Button variant="outline">Run Lead Discovery</Button>
            </div>
          </div>
        )}
      </div>

      {/* Content Generator Modal */}
      <ContentGenerator
        open={showContentGenerator}
        onOpenChange={setShowContentGenerator}
        onContentApproved={(content) => {
          console.log('Content approved:', content);
          // TODO: Handle approved content (e.g., add to pending posts)
        }}
      />
    </div>
  );
}
