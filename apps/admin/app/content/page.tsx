'use client';

import { ColumnDef } from '@tanstack/react-table';
import { 
  MoreHorizontal, 
  Plus, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { 
  DataTable, 
  createSelectColumn, 
  Button, 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Badge 
} from '@personal-app/ui';
import { trpc } from '@/components/providers';

// Types
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Status configuration
const statusConfig = {
  draft: { label: 'Draft', color: 'bg-yellow-500', icon: Clock },
  published: { label: 'Published', color: 'bg-green-500', icon: CheckCircle },
  archived: { label: 'Archived', color: 'bg-gray-500', icon: XCircle },
};

// Content Actions Component
function ContentActions({ post }: { post: BlogPost }) {
  const router = useRouter();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.slug)}>
          Copy slug
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/content/${post.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit post
        </DropdownMenuItem>
        {post.status === 'draft' && (
          <DropdownMenuItem>
            <CheckCircle className="mr-2 h-4 w-4" />
            Publish
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Reading Time Calculator
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Column Definitions
const columns: ColumnDef<BlogPost>[] = [
  createSelectColumn<BlogPost>(),
  {
    accessorKey: 'title',
    header: 'Post',
    cell: ({ row }) => {
      const post = row.original;
      const StatusIcon = statusConfig[post.status].icon;
      const router = useRouter();
      return (
        <div 
          className="flex items-start space-x-3 cursor-pointer hover:opacity-80"
          onClick={() => router.push(`/content/${post.id}`)}
        >
          <div className="flex-shrink-0 mt-1">
            {post.featuredImage ? (
              <img 
                src={post.featuredImage} 
                alt="" 
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium text-primary line-clamp-1">
              {post.title}
            </div>
            {post.excerpt && (
              <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {post.excerpt}
              </div>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <StatusIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {calculateReadingTime(post.content)} min read
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusConfig;
      const config = statusConfig[status];
      return (
        <Badge variant="secondary" className={`${config.color} text-white`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      if (!tags || tags.length === 0) return null;
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const author = row.getValue('author') as string;
      return <span className="text-sm">{author}</span>;
    },
  },
  {
    accessorKey: 'publishedAt',
    header: 'Published',
    cell: ({ row }) => {
      const publishedAt = row.getValue('publishedAt') as Date | null;
      const createdAt = row.original.createdAt;
      
      if (publishedAt) {
        return (
          <div className="text-sm">
            <div>{format(new Date(publishedAt), 'MMM dd, yyyy')}</div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(publishedAt), 'h:mm a')}
            </div>
          </div>
        );
      }
      
      return (
        <div className="text-sm text-muted-foreground">
          <div>Draft</div>
          <div className="text-xs">
            Created {format(new Date(createdAt), 'MMM dd')}
          </div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ContentActions post={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

// Quick Stats Component
function ContentStats({ posts }: { posts: BlogPost[] }) {
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p: BlogPost) => p.status === 'published').length;
  const draftPosts = posts.filter((p: BlogPost) => p.status === 'draft').length;
  const totalWords = posts.reduce((sum: number, post: BlogPost) => sum + post.content.split(/\s+/).length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="metric-card">
        <div className="dashboard-stat">{totalPosts}</div>
        <div className="dashboard-stat-label">Total Posts</div>
      </div>
      <div className="metric-card">
        <div className="dashboard-stat">{publishedPosts}</div>
        <div className="dashboard-stat-label">Published</div>
      </div>
      <div className="metric-card">
        <div className="dashboard-stat">{draftPosts}</div>
        <div className="dashboard-stat-label">Drafts</div>
      </div>
      <div className="metric-card">
        <div className="dashboard-stat">{Math.round(totalWords / 1000)}K</div>
        <div className="dashboard-stat-label">Total Words</div>
      </div>
    </div>
  );
}

// Content Calendar Component (simplified)
function ContentCalendar({ posts }: { posts: BlogPost[] }) {
  const publishedPosts = posts.filter((p: BlogPost) => p.status === 'published' && p.publishedAt);
  const upcomingPosts = posts.filter((p: BlogPost) => p.status === 'draft');

  return (
    <div className="perplexity-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary">Content Calendar</h3>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Full Calendar
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Recently Published</h4>
          <div className="space-y-2">
            {publishedPosts.slice(0, 3).map((post: BlogPost) => (
              <div key={post.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{post.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {post.publishedAt && format(new Date(post.publishedAt), 'MMM dd')}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Drafts in Progress</h4>
          <div className="space-y-2">
            {upcomingPosts.slice(0, 3).map((post: BlogPost) => (
              <div key={post.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{post.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(post.updatedAt), 'MMM dd')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  const router = useRouter();
  const [selectedPosts, setSelectedPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts data
  const { data: blogData, isLoading, refetch } = trpc.blog.getAll.useQuery({
    limit: 1000,
    offset: 0,
  });

  const posts = blogData?.posts || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Content Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and publish your blog content
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
          <Button className="btn-primary" onClick={() => router.push('/content/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ContentStats posts={posts} />

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="perplexity-card p-0">
            <DataTable
              columns={columns}
              data={posts}
              searchKey="title"
              searchPlaceholder="Search posts..."
              onRefresh={refetch}
              isLoading={isLoading}
              showToolbar={true}
              showPagination={true}
              showColumnToggle={true}
              pageSize={20}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContentCalendar posts={posts} />
          
          {/* Quick Actions */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/content/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Draft
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Import Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Content Calendar
              </Button>
            </div>
          </div>

          {/* Content Insights */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Content Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. Reading Time</span>
                <span className="font-medium">
                  {Math.round(posts.reduce((sum: number, p: BlogPost) => sum + calculateReadingTime(p.content), 0) / posts.length || 0)} min
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Most Used Tag</span>
                <span className="font-medium">PropTech</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-medium">
                  {posts.filter((p: BlogPost) => {
                    const publishedAt = p.publishedAt;
                    if (!publishedAt) return false;
                    const month = new Date().getMonth();
                    const year = new Date().getFullYear();
                    const postDate = new Date(publishedAt);
                    return postDate.getMonth() === month && postDate.getFullYear() === year;
                  }).length} published
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}