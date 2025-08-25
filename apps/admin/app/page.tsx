'use client';

import { Button } from '@personal-app/ui';
import { trpc } from '@/components/providers';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Target,
  Activity,
  BarChart3,
  PlusCircle,
  Send,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Eye,
  MessageSquare,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  change?: {
    value: number;
    positive: boolean;
  };
  icon: React.ComponentType<any>;
  isLoading?: boolean;
}

function MetricCard({ title, value, subtitle, change, icon: Icon, isLoading }: MetricCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              change.positive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(change.value)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold text-foreground">
          {isLoading ? <div className="animate-pulse bg-muted h-8 w-20 rounded" /> : value}
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

interface StatusBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  isLoading?: boolean;
}

function StatusBar({ label, value, total, color, isLoading }: StatusBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">
            {isLoading ? <div className="animate-pulse bg-dark-tertiary h-4 w-8 rounded" /> : value}
          </span>
          <span className="text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
        </div>
      </div>
      <div className="h-2 bg-dark-tertiary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: contactStats, isLoading: contactsLoading } = trpc.contact.getStats.useQuery();
  const { data: leadStats, isLoading: leadsLoading } = trpc.lead.getStats.useQuery();
  const { data: blogStats, isLoading: blogLoading } = trpc.blog.getStats.useQuery();

  // Calculate conversion rates and growth
  const totalContacts = contactStats?.total ?? 0;
  const conversionRate =
    totalContacts > 0
      ? (((contactStats?.byStatus?.converted ?? 0) / totalContacts) * 100).toFixed(1)
      : '0';
  const qualificationRate =
    totalContacts > 0
      ? (((contactStats?.byStatus?.qualified ?? 0) / totalContacts) * 100).toFixed(1)
      : '0';

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into Ethan Blumenthal</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-400">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contacts"
          value={totalContacts.toLocaleString()}
          subtitle="CRM database"
          change={{ value: 12, positive: true }}
          icon={Users}
          isLoading={contactsLoading}
        />

        <MetricCard
          title="Published Articles"
          value={blogStats?.byStatus?.published ?? 0}
          subtitle="Content published"
          change={{ value: 8, positive: true }}
          icon={FileText}
          isLoading={blogLoading}
        />

        <MetricCard
          title="Active Leads"
          value={leadStats?.total ?? 0}
          subtitle="Social media sourced"
          change={{ value: 15, positive: true }}
          icon={Target}
          isLoading={leadsLoading}
        />

        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Lead to customer"
          change={{ value: 3, positive: true }}
          icon={TrendingUp}
          isLoading={contactsLoading}
        />
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="perplexity-card">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <PlusCircle className="h-4 w-4" />
              Create Blog Post
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <Send className="h-4 w-4" />
              Send Email Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <Download className="h-4 w-4" />
              Export Contacts
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Contact Pipeline */}
        <div className="perplexity-card">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Contact Pipeline</h3>
          </div>
          <div className="space-y-4">
            <StatusBar
              label="Prospects"
              value={contactStats?.byStatus?.prospect ?? 0}
              total={totalContacts}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              isLoading={contactsLoading}
            />
            <StatusBar
              label="Qualified"
              value={contactStats?.byStatus?.qualified ?? 0}
              total={totalContacts}
              color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              isLoading={contactsLoading}
            />
            <StatusBar
              label="Engaged"
              value={contactStats?.byStatus?.engaged ?? 0}
              total={totalContacts}
              color="bg-gradient-to-r from-orange-500 to-orange-600"
              isLoading={contactsLoading}
            />
            <StatusBar
              label="Converted"
              value={contactStats?.byStatus?.converted ?? 0}
              total={totalContacts}
              color="bg-gradient-to-r from-green-500 to-green-600"
              isLoading={contactsLoading}
            />
          </div>
        </div>

        {/* Performance Overview */}
        <div className="perplexity-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Performance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Website Visitors</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">2,847</div>
                <div className="text-xs text-green-400">+12% this week</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Newsletter Opens</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">68.3%</div>
                <div className="text-xs text-green-400">+5% vs avg</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Pipeline Value</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">$124K</div>
                <div className="text-xs text-cyan-400">Active deals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="perplexity-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 hover:bg-dark-tertiary rounded-lg transition-colors">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-white">
                New contact added: John Smith from PropTech Ventures
              </p>
              <p className="text-xs text-gray-400">2 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-dark-tertiary rounded-lg transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-white">
                Blog post published: "AI in Commercial Real Estate"
              </p>
              <p className="text-xs text-gray-400">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-dark-tertiary rounded-lg transition-colors">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-white">Email campaign sent to 1,247 subscribers</p>
              <p className="text-xs text-gray-400">3 hours ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-dark-tertiary rounded-lg transition-colors">
            <div className="w-2 h-2 bg-purple-400 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-white">
                New lead discovered on LinkedIn: CRE Investment Fund
              </p>
              <p className="text-xs text-gray-400">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
