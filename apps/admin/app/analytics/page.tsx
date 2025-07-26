'use client';

import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  FileText, 
  Target, 
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageSquare,
  Share2,
  Mail,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

import { 
  Button, 
  BarChart, 
  LineChart, 
  ProgressRing,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge
} from '@personal-app/ui';
import { trpc } from '@/components/providers';

// Types for analytics data
interface MetricCardProps {
  title: string;
  value: number | string;
  change: {
    value: number;
    positive: boolean;
    period: string;
  };
  icon: React.ComponentType<any>;
  format?: 'number' | 'percentage' | 'currency';
}

function AnalyticsMetricCard({ title, value, change, icon: Icon, format = 'number' }: MetricCardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          change.positive ? 'text-green-400' : 'text-red-400'
        }`}>
          {change.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change.value)}%
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold text-foreground">
          {formatValue(value)}
        </div>
        <p className="text-xs text-muted-foreground">
          {change.positive ? '+' : '-'}{Math.abs(change.value)}% from {change.period}
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch analytics data
  const { data: contactStats, isLoading: contactsLoading } = trpc.contact.getStats.useQuery();
  const { data: leadStats, isLoading: leadsLoading } = trpc.lead.getStats.useQuery();
  const { data: blogStats, isLoading: blogLoading } = trpc.blog.getStats.useQuery();

  // Generate mock time series data for charts
  const generateTimeSeriesData = (baseValue: number, days: number = 7) => {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
      const value = Math.max(0, Math.round(baseValue * (1 + variation)));
      data.push({
        label: format(date, 'MMM dd'),
        value,
      });
    }
    return data;
  };

  const contactGrowthData = generateTimeSeriesData(contactStats?.total ?? 25);
  const blogViewsData = generateTimeSeriesData(1200);
  
  const contactsByTypeData = [
    { label: 'Investor', value: 12, color: 'bg-purple-500' },
    { label: 'Developer', value: 8, color: 'bg-orange-500' },
    { label: 'Broker', value: contactStats?.byGroup?.broker ?? 15, color: 'bg-teal-500' },
    { label: 'Lender', value: contactStats?.byGroup?.lender ?? 6, color: 'bg-indigo-500' },
    { label: 'VC', value: contactStats?.byGroup?.venture_capital ?? 4, color: 'bg-pink-500' },
    { label: 'PE', value: contactStats?.byGroup?.private_equity ?? 3, color: 'bg-gray-500' },
  ];

  const totalContacts = contactStats?.total ?? 0;
  const qualifiedContacts = contactStats?.byStatus?.qualified ?? 0;
  const convertedContacts = contactStats?.byStatus?.converted ?? 0;
  const conversionRate = totalContacts > 0 ? (convertedContacts / totalContacts) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your platform performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsMetricCard
          title="Total Contacts"
          value={totalContacts}
          change={{ value: 15, positive: true, period: 'last month' }}
          icon={Users}
        />
        <AnalyticsMetricCard
          title="Conversion Rate"
          value={conversionRate.toFixed(1)}
          change={{ value: 8, positive: true, period: 'last month' }}
          icon={TrendingUp}
          format="percentage"
        />
        <AnalyticsMetricCard
          title="Blog Views"
          value={8420}
          change={{ value: 23, positive: true, period: 'last month' }}
          icon={Eye}
        />
        <AnalyticsMetricCard
          title="Pipeline Value"
          value={124000}
          change={{ value: 12, positive: true, period: 'last month' }}
          icon={Target}
          format="currency"
        />
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'contacts', label: 'Contacts', icon: Users },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'campaigns', label: 'Campaigns', icon: Mail },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Growth Chart */}
          <div className="lg:col-span-2 perplexity-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Contact Growth</h3>
              <Badge variant="secondary">Last 7 days</Badge>
            </div>
            <LineChart data={contactGrowthData} height={250} />
          </div>

          {/* Conversion Funnel */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              <div className="text-center">
                <ProgressRing value={convertedContacts} max={totalContacts} size={120}>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{conversionRate.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Conversion</div>
                  </div>
                </ProgressRing>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prospects</span>
                  <span className="font-medium">{contactStats?.byStatus?.prospect ?? 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Qualified</span>
                  <span className="font-medium">{qualifiedContacts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engaged</span>
                  <span className="font-medium">{contactStats?.byStatus?.engaged ?? 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Converted</span>
                  <span className="font-medium text-green-500">{convertedContacts}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Performance */}
          <div className="lg:col-span-2 perplexity-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Blog Performance</h3>
              <Badge variant="secondary">Views</Badge>
            </div>
            <LineChart data={blogViewsData} height={250} />
          </div>

          {/* Contact Distribution */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Types</h3>
            <BarChart data={contactsByTypeData} height={200} />
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Sources */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Sources</h3>
            <div className="space-y-4">
              {[
                { source: 'Website', count: totalContacts * 0.4, color: 'bg-blue-500' },
                { source: 'LinkedIn', count: totalContacts * 0.3, color: 'bg-indigo-500' },
                { source: 'Twitter', count: totalContacts * 0.2, color: 'bg-cyan-500' },
                { source: 'Manual', count: totalContacts * 0.1, color: 'bg-gray-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{Math.round(item.count)}</div>
                    <div className="text-xs text-muted-foreground">
                      {((item.count / totalContacts) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Scoring Distribution */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Lead Score Distribution</h3>
            <BarChart 
              data={[
                { label: '0-20', value: Math.round(totalContacts * 0.1), color: 'bg-red-500' },
                { label: '21-40', value: Math.round(totalContacts * 0.2), color: 'bg-orange-500' },
                { label: '41-60', value: Math.round(totalContacts * 0.3), color: 'bg-yellow-500' },
                { label: '61-80', value: Math.round(totalContacts * 0.25), color: 'bg-blue-500' },
                { label: '81-100', value: Math.round(totalContacts * 0.15), color: 'bg-green-500' },
              ]}
              height={200}
            />
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Performance */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Content Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Posts</span>
                </div>
                <span className="font-semibold">{blogStats?.total ?? 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Views</span>
                </div>
                <span className="font-semibold">24,680</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Social Shares</span>
                </div>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Comments</span>
                </div>
                <span className="font-semibold">89</span>
              </div>
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Top Performing Posts</h3>
            <div className="space-y-3">
              {[
                { title: 'Future of CRE: AI and Automation', views: 3200, engagement: 89 },
                { title: 'Bitcoin in Commercial Real Estate', views: 2800, engagement: 76 },
                { title: 'PropTech Trends 2024', views: 2400, engagement: 65 },
                { title: 'Smart Cities and CRE', views: 1900, engagement: 52 },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {post.views} views • {post.engagement}% engagement
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Campaign Performance */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Email Campaigns</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Sent</span>
                <span className="font-semibold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open Rate</span>
                <span className="font-semibold text-green-500">68.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Click Rate</span>
                <span className="font-semibold text-blue-500">24.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unsubscribe Rate</span>
                <span className="font-semibold text-red-500">1.2%</span>
              </div>
            </div>
          </div>

          {/* Social Media Performance */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Social Media</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Posts Published</span>
                <span className="font-semibold">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Engagement</span>
                <span className="font-semibold text-purple-500">2,340</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Leads Generated</span>
                <span className="font-semibold text-orange-500">{leadStats?.total ?? 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Engagement Rate</span>
                <span className="font-semibold text-cyan-500">4.8%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}