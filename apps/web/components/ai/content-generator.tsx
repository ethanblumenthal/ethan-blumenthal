'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@personal-app/ui';
import { trpc } from '@/components/providers';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

const contentGenSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  keywords: z.string().optional(),
  tone: z.enum(['professional', 'casual', 'technical']).default('professional'),
  length: z.enum(['short', 'medium', 'long']).default('medium'),
  audience: z.enum(['investors', 'developers', 'general']).default('investors'),
  includeStats: z.boolean().default(true),
  includeExamples: z.boolean().default(true),
});

type ContentGenData = z.infer<typeof contentGenSchema>;

export default function ContentGenerator() {
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState('');

  const generatePost = trpc.blog.generatePost.useMutation();
  const generateIdeas = trpc.blog.generateIdeas.useMutation();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContentGenData>({
    resolver: zodResolver(contentGenSchema),
    defaultValues: {
      tone: 'professional',
      length: 'medium',
      audience: 'investors',
      includeStats: true,
      includeExamples: true,
    },
  });

  const onSubmit = async (data: ContentGenData) => {
    setIsGenerating(true);
    try {
      const keywords = data.keywords ? data.keywords.split(',').map(k => k.trim()) : [];
      const result = await generatePost.mutateAsync({
        ...data,
        keywords,
      });
      setGeneratedPost(result);
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBlogIdeas = async () => {
    try {
      const result = await generateIdeas.mutateAsync({
        industry: 'PropTech',
        audience: 'investors',
        count: 5,
      });
      
      if (result.ideas && result.ideas.length > 0) {
        const randomIdea = result.ideas[Math.floor(Math.random() * result.ideas.length)];
        setValue('topic', randomIdea);
      }
    } catch (error) {
      console.error('Idea generation failed:', error);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">AI Content Generator</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Topic Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="topic" className="text-gray-300">Blog Post Topic *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateBlogIdeas}
                  disabled={generateIdeas.isLoading}
                  className="text-xs"
                >
                  {generateIdeas.isLoading ? (
                    <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-3 h-3 mr-1" />
                  )}
                  Get Ideas
                </Button>
              </div>
              <Input
                id="topic"
                {...register('topic')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., The Future of PropTech in Commercial Real Estate"
              />
              {errors.topic && (
                <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>
              )}
            </div>

            {/* Keywords */}
            <div>
              <Label htmlFor="keywords" className="text-gray-300 mb-2 block">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                {...register('keywords')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="proptech, AI, automation, commercial real estate"
              />
            </div>

            {/* Settings Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Tone</Label>
                <Select onValueChange={(value) => setValue('tone', value as any)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Professional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Length</Label>
                <Select onValueChange={(value) => setValue('length', value as any)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (800-1200 words)</SelectItem>
                    <SelectItem value="medium">Medium (1500-2500 words)</SelectItem>
                    <SelectItem value="long">Long (3000+ words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Audience */}
            <div>
              <Label className="text-gray-300 mb-2 block">Target Audience</Label>
              <Select onValueChange={(value) => setValue('audience', value as any)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Investors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investors">Investors</SelectItem>
                  <SelectItem value="developers">Developers</SelectItem>
                  <SelectItem value="general">General Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeStats"
                  {...register('includeStats')}
                  className="rounded border-gray-700 bg-gray-800"
                />
                <Label htmlFor="includeStats" className="text-gray-300">Include statistics and data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeExamples"
                  {...register('includeExamples')}
                  className="rounded border-gray-700 bg-gray-800"
                />
                <Label htmlFor="includeExamples" className="text-gray-300">Include examples and case studies</Label>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Blog Post
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Generated Content */}
        <div className="space-y-6">
          {generatedPost ? (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Generated Content</h3>
              
              {/* Title */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-300">Title</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedPost.title, 'title')}
                  >
                    {copied === 'title' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-gray-800 p-3 rounded border text-white">
                  {generatedPost.title}
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-300">Excerpt</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedPost.excerpt, 'excerpt')}
                  >
                    {copied === 'excerpt' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-gray-800 p-3 rounded border text-gray-300 text-sm">
                  {generatedPost.excerpt}
                </div>
              </div>

              {/* Content Preview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-300">Content (First 500 characters)</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedPost.content, 'content')}
                  >
                    {copied === 'content' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Textarea
                  value={generatedPost.content.substring(0, 500) + '...'}
                  readOnly
                  className="bg-gray-800 border-gray-700 text-gray-300 min-h-[200px]"
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <Label className="text-gray-300 mb-2 block">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {generatedPost.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              {generatedPost.generationMetadata && (
                <div className="text-xs text-gray-500 pt-4 border-t border-gray-800">
                  <p>Word Count: {generatedPost.generationMetadata.wordCount}</p>
                  <p>Reading Time: {generatedPost.generationMetadata.readingTime}</p>
                  <p>Status: Draft (saved to database)</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-center">
              <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Fill out the form and click "Generate Blog Post" to create AI-powered content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}