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
  BarChart3
} from 'lucide-react';

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

  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'twitter',
      content: 'PropTech is revolutionizing how we think about commercial real estate investments. AI-powered property analysis is reducing due diligence time by 80%. What trends are you seeing in your market? #PropTech #CRE #AI',
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
      content: 'Bitcoin-backed commercial real estate loans are becoming mainstream. Just closed a $50M deal using BTC as collateral at 6.5% interest. Traditional banks are scrambling to catch up.',
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
      content: 'Tokenization of real estate is still early but showing promise. Fractional ownership through blockchain could democratize commercial property investment. Regulatory clarity needed.',
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

  const filteredPosts = selectedPlatform === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.platform === selectedPlatform);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSentimentBg = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-400/20';
      case 'negative': return 'bg-red-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Social Media Hub</h1>
          <p className="text-gray-400 mt-1">Monitor feeds, generate content, and discover leads</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Content
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Discover Leads
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 rounded-full p-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.totalPosts)}</p>
              <p className="text-gray-400 text-sm">Total Posts Analyzed</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 rounded-full p-2">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockAnalytics.totalLeads}</p>
              <p className="text-gray-400 text-sm">Leads Discovered</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 rounded-full p-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockAnalytics.avgEngagement}%</p>
              <p className="text-gray-400 text-sm">Avg Engagement</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 rounded-full p-2">
              <BarChart3 className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockAnalytics.sentimentDistribution.positive}%</p>
              <p className="text-gray-400 text-sm">Positive Sentiment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-700">
        {[
          { id: 'feed', label: 'Social Feed', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'content', label: 'Content Pipeline', icon: Sparkles },
          { id: 'leads', label: 'Lead Discovery', icon: Users },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors ${
              activeTab === id
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Platform Filter */}
      {activeTab === 'feed' && (
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Platform:</span>
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
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
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
              <h2 className="text-xl font-semibold text-white">
                {selectedPlatform === 'all' ? 'All Platforms' : selectedPlatform === 'twitter' ? 'Twitter' : 'LinkedIn'} Feed
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
                <div key={post.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  {/* Post Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      {post.platform === 'twitter' ? (
                        <Twitter className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{post.author.displayName}</span>
                        <span className="text-gray-400">@{post.author.username}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">
                          {formatNumber(post.author.followers)} followers
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()} at{' '}
                        {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {post.relevanceScore && (
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded text-xs ${getSentimentBg(post.sentiment)} ${getSentimentColor(post.sentiment)}`}>
                          {post.sentiment}
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                          {Math.round(post.relevanceScore * 100)}% relevant
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>

                  {/* Engagement Metrics */}
                  <div className="flex items-center gap-6 text-gray-400">
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
            <h2 className="text-xl font-semibold text-white">Social Media Analytics</h2>
            
            {/* Sentiment Distribution */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Sentiment Distribution</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{mockAnalytics.sentimentDistribution.positive}%</div>
                  <div className="text-gray-400 text-sm">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{mockAnalytics.sentimentDistribution.neutral}%</div>
                  <div className="text-gray-400 text-sm">Neutral</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{mockAnalytics.sentimentDistribution.negative}%</div>
                  <div className="text-gray-400 text-sm">Negative</div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['PropTech', 'Bitcoin', 'Commercial Real Estate', 'AI', 'Tokenization', 'Smart Buildings', 'Investment', 'Blockchain'].map((topic) => (
                  <span key={topic} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
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
              <h2 className="text-xl font-semibold text-white">Content Pipeline</h2>
              <Button className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generate New Content
              </Button>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
              <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No pending content awaiting approval</p>
              <Button variant="outline">
                Generate AI Content
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Lead Discovery</h2>
              <Button className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Discover New Leads
              </Button>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Start discovering potential leads from social media</p>
              <Button variant="outline">
                Run Lead Discovery
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}