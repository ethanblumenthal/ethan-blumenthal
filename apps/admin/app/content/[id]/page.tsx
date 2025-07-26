'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  Edit2,
  X,
  Trash2,
  Calendar,
  Image,
  Tag,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Undo,
  Redo
} from 'lucide-react';

import { 
  Button, 
  Input, 
  Label, 
  Textarea, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  Separator
} from '@personal-app/ui';
import { trpc } from '@/components/providers';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

// Types
interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage: string | null;
  publishedAt: Date | null;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

// Status configuration
const statusConfig = {
  draft: { label: 'Draft', color: 'bg-yellow-500', icon: Clock },
  published: { label: 'Published', color: 'bg-green-500', icon: CheckCircle },
  archived: { label: 'Archived', color: 'bg-gray-500', icon: X },
};

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Simple Markdown Editor Toolbar
function MarkdownToolbar({ onAction }: { onAction: (action: string, value?: string) => void }) {
  return (
    <div className="flex items-center space-x-1 p-2 border-b">
      <Toggle size="sm" onClick={() => onAction('bold')}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('italic')}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6" />
      <Toggle size="sm" onClick={() => onAction('heading1')}>
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('heading2')}>
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6" />
      <Toggle size="sm" onClick={() => onAction('list')}>
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('orderedList')}>
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('quote')}>
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('code')}>
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => onAction('link')}>
        <Link className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default function ContentEditorPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id === 'new' ? null : parseInt(params.id as string);
  
  const [isEditing, setIsEditing] = useState(!postId);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    status: 'draft',
    tags: [],
    featuredImage: null,
    publishedAt: null,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  });
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Fetch post data if editing existing post
  const { data: post, isLoading, refetch } = trpc.blog.getById.useQuery(
    { id: postId! },
    { 
      enabled: !!postId,
      onSuccess: (data) => {
        if (data) {
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            content: data.content,
            author: data.author,
            status: data.status,
            tags: data.tags || [],
            featuredImage: data.featuredImage,
            publishedAt: data.publishedAt,
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || [],
          });
        }
      }
    }
  );

  // Create post mutation
  const createPost = trpc.blog.create.useMutation({
    onSuccess: (data) => {
      toast.success('Post created successfully');
      router.push(`/content/${data.id}`);
    },
    onError: (error) => {
      toast.error('Failed to create post: ' + error.message);
    },
  });

  // Update post mutation
  const updatePost = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success('Post updated successfully');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error('Failed to update post: ' + error.message);
    },
  });

  // Delete post mutation
  const deletePost = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success('Post deleted successfully');
      router.push('/content');
    },
    onError: (error) => {
      toast.error('Failed to delete post: ' + error.message);
    },
  });

  // Publish post mutation
  const publishPost = trpc.blog.publish.useMutation({
    onSuccess: () => {
      toast.success('Post published successfully');
      refetch();
    },
    onError: (error) => {
      toast.error('Failed to publish post: ' + error.message);
    },
  });

  // Archive post mutation
  const archivePost = trpc.blog.archive.useMutation({
    onSuccess: () => {
      toast.success('Post archived successfully');
      refetch();
    },
    onError: (error) => {
      toast.error('Failed to archive post: ' + error.message);
    },
  });

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (postId) {
      updatePost.mutate({
        id: postId,
        ...formData,
      });
    } else {
      createPost.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePost.mutate({ id: postId! });
    }
  };

  const handlePublish = () => {
    if (postId) {
      publishPost.mutate({ id: postId });
    }
  };

  const handleArchive = () => {
    if (postId) {
      archivePost.mutate({ id: postId });
    }
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const addKeyword = () => {
    if (newKeyword && !formData.metaKeywords.includes(newKeyword)) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, newKeyword],
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      metaKeywords: formData.metaKeywords.filter(k => k !== keyword),
    });
  };

  const handleMarkdownAction = (action: string, value?: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let replacement = '';

    switch (action) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'heading1':
        replacement = `# ${selectedText}`;
        break;
      case 'heading2':
        replacement = `## ${selectedText}`;
        break;
      case 'list':
        replacement = `- ${selectedText}`;
        break;
      case 'orderedList':
        replacement = `1. ${selectedText}`;
        break;
      case 'quote':
        replacement = `> ${selectedText}`;
        break;
      case 'code':
        replacement = `\`${selectedText}\``;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          replacement = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
    }

    const newContent = formData.content.substring(0, start) + replacement + formData.content.substring(end);
    setFormData({ ...formData, content: newContent });
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (!postId && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [formData.title, postId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (postId && !post && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold">Post not found</p>
          <Button onClick={() => router.push('/content')} className="mt-4">
            Back to Content
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = post ? statusConfig[post.status].icon : Clock;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/content')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {postId ? (isEditing ? 'Edit Post' : formData.title) : 'New Post'}
            </h1>
            {post && (
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={`${statusConfig[post.status].color} text-white`}>
                  {statusConfig[post.status].label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last updated: {format(new Date(post.updatedAt), 'MMM dd, yyyy h:mm a')}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {postId && !isEditing && (
            <>
              {post?.status === 'draft' && (
                <Button variant="outline" onClick={handlePublish}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              )}
              {post?.status === 'published' && (
                <Button variant="outline" onClick={handleArchive}>
                  <X className="mr-2 h-4 w-4" />
                  Archive
                </Button>
              )}
            </>
          )}
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => postId ? setIsEditing(false) : router.push('/content')}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="btn-primary">
                <Save className="mr-2 h-4 w-4" />
                {postId ? 'Save Changes' : 'Create Post'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)} className="btn-primary">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Post
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      {isEditing ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="perplexity-card">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter post title..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="post-url-slug"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="mt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <MarkdownToolbar onAction={handleMarkdownAction} />
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          placeholder="Write your post content in Markdown..."
                          rows={20}
                          className="min-h-[500px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-0">
                      <div className="border rounded-lg p-6 min-h-[500px] prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{formData.content || '*No content yet...*'}</ReactMarkdown>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add a keyword"
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    />
                    <Button onClick={addKeyword} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.metaKeywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="flex items-center space-x-1">
                        <span>{keyword}</span>
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">Publishing</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as BlogPostFormData['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([value, config]) => (
                        <SelectItem key={value} value={value}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt ? format(new Date(formData.publishedAt), "yyyy-MM-dd'T'HH:mm") : ''}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value ? new Date(e.target.value) : null })}
                  />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">Featured Image</h3>
              <div className="space-y-4">
                {formData.featuredImage ? (
                  <div className="relative">
                    <img 
                      src={formData.featuredImage} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, featuredImage: null })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No image selected</p>
                  </div>
                )}
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="perplexity-card">
              {formData.featuredImage && (
                <img 
                  src={formData.featuredImage} 
                  alt={formData.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h1>{formData.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground not-prose mb-6">
                  <span>By {formData.author}</span>
                  {post?.publishedAt && (
                    <>
                      <span>•</span>
                      <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
                    </>
                  )}
                </div>
                {formData.excerpt && (
                  <p className="lead text-xl text-muted-foreground mb-6">{formData.excerpt}</p>
                )}
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Post Info */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">Post Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary" className={`${post ? statusConfig[post.status].color : ''} text-white`}>
                    {post ? statusConfig[post.status].label : 'Draft'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Author</span>
                  <span className="text-sm">{formData.author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">{post ? format(new Date(post.createdAt), 'MMM dd, yyyy') : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Updated</span>
                  <span className="text-sm">{post ? format(new Date(post.updatedAt), 'MMM dd, yyyy') : 'N/A'}</span>
                </div>
                {post?.publishedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Published</span>
                    <span className="text-sm">{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="perplexity-card">
              <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}>
                  <Eye className="mr-2 h-4 w-4" />
                  View on Site
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditing(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Post
                </Button>
                {post?.status === 'draft' && (
                  <Button variant="outline" className="w-full justify-start" onClick={handlePublish}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Post
                  </Button>
                )}
                {post?.status === 'published' && (
                  <Button variant="outline" className="w-full justify-start" onClick={handleArchive}>
                    <X className="mr-2 h-4 w-4" />
                    Archive Post
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}