'use client';

import { useState } from 'react';
import { 
  Sheet,
  SheetContent,
  Button,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Badge,
  Checkbox,
} from '@personal-app/ui';
import { 
  Sparkles, 
  Twitter, 
  Linkedin, 
  Loader2, 
  Send,
  Calendar,
  Eye,
  Copy,
  RefreshCw,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Hash,
  MessageSquare,
  Target
} from 'lucide-react';
import { trpc } from '@/components/providers';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ContentGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContentApproved?: (content: any) => void;
}

interface GeneratedContent {
  id: string;
  platform: 'twitter' | 'linkedin';
  content: string;
  hashtags: string[];
  callToAction?: string;
  estimatedEngagement: number;
  tone: string;
  focus: string;
}

export default function ContentGenerator({ open, onOpenChange, onContentApproved }: ContentGeneratorProps) {
  const [activeView, setActiveView] = useState<'generate' | 'preview' | 'schedule'>('generate');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter');
  const [tone, setTone] = useState<'professional' | 'casual' | 'thought-leadership'>('professional');
  const [focus, setFocus] = useState<'proptech' | 'bitcoin' | 'tokenization' | 'cre-trends'>('proptech');
  const [includeData, setIncludeData] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [customTopic, setCustomTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  // Generate content mutation
  const generateContent = trpc.social.generateContent.useMutation({
    onSuccess: (data) => {
      if (data.success && data.post) {
        setGeneratedContent({
          id: data.post.id,
          platform: data.post.platform,
          content: data.post.content,
          hashtags: data.post.hashtags || [],
          callToAction: data.post.callToAction,
          estimatedEngagement: data.post.estimatedEngagement || 0,
          tone: data.post.tone,
          focus: data.post.focus,
        });
        setActiveView('preview');
        toast.success('Content generated successfully!');
      } else {
        toast.error('error' in data ? data.error : 'Failed to generate content');
      }
    },
    onError: (error) => {
      toast.error('Failed to generate content: ' + error.message);
    },
  });

  // Approve post mutation
  const approvePost = trpc.social.reviewPost.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(scheduledDate ? 'Post scheduled successfully!' : 'Post approved!');
        if (onContentApproved) {
          onContentApproved(generatedContent);
        }
        handleReset();
        onOpenChange(false);
      } else {
        toast.error('error' in data ? data.error : 'Failed to approve post');
      }
    },
    onError: (error) => {
      toast.error('Failed to approve post: ' + error.message);
    },
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateContent.mutateAsync({
        platform,
        tone,
        focus,
        includeData,
        includeCTA,
        inspirationCount: 5,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleApprove = async () => {
    if (!generatedContent) return;
    
    setIsScheduling(true);
    try {
      await approvePost.mutateAsync({
        id: generatedContent.id,
        approved: true,
        scheduledFor: scheduledDate || undefined,
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setActiveView('generate');
    setScheduledDate(null);
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
      toast.success('Content copied to clipboard!');
    }
  };

  const characterCount = generatedContent?.content.length || 0;
  const characterLimit = platform === 'twitter' ? 280 : 3000;
  const isOverLimit = characterCount > characterLimit;

  const toneOptions = {
    professional: { label: 'Professional', description: 'Formal, data-driven, industry-focused' },
    casual: { label: 'Casual', description: 'Conversational, relatable, engaging' },
    'thought-leadership': { label: 'Thought Leadership', description: 'Insightful, forward-thinking, authoritative' },
  };

  const focusOptions = {
    proptech: { label: 'PropTech', icon: TrendingUp, color: 'text-blue-500' },
    bitcoin: { label: 'Bitcoin & CRE', icon: Hash, color: 'text-orange-500' },
    tokenization: { label: 'Tokenization', icon: Target, color: 'text-purple-500' },
    'cre-trends': { label: 'CRE Trends', icon: MessageSquare, color: 'text-green-500' },
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>AI Content Generator</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Generate engaging social media content using AI based on trending topics
            </p>
          </div>

          {/* View Navigation */}
          <div className="flex space-x-2 border-b">
            <button
              onClick={() => setActiveView('generate')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeView === 'generate'
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => setActiveView('preview')}
              disabled={!generatedContent}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeView === 'preview'
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground disabled:opacity-50'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveView('schedule')}
              disabled={!generatedContent}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeView === 'schedule'
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground disabled:opacity-50'
              }`}
            >
              Schedule
            </button>
          </div>

          {/* Content */}
          {activeView === 'generate' && (
            <div className="space-y-6">
              {/* Platform Selection */}
              <div className="space-y-2">
                <Label>Platform</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlatform('twitter')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      platform === 'twitter'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Twitter className="h-5 w-5" />
                    <span>Twitter/X</span>
                  </button>
                  <button
                    onClick={() => setPlatform('linkedin')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      platform === 'linkedin'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Content Focus */}
              <div className="space-y-2">
                <Label>Content Focus</Label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(focusOptions).map(([key, { label, icon: Icon, color }]) => (
                    <button
                      key={key}
                      onClick={() => setFocus(key as any)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        focus === key
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(toneOptions).map(([key, { label, description }]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="text-xs text-muted-foreground">{description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-data">Include Data & Statistics</Label>
                    <p className="text-xs text-muted-foreground">Add relevant metrics and numbers</p>
                  </div>
                  <Checkbox
                    id="include-data"
                    checked={includeData}
                    onCheckedChange={(checked) => setIncludeData(checked as boolean)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-cta">Include Call-to-Action</Label>
                    <p className="text-xs text-muted-foreground">Add engagement prompts</p>
                  </div>
                  <Checkbox
                    id="include-cta"
                    checked={includeCTA}
                    onCheckedChange={(checked) => setIncludeCTA(checked as boolean)}
                  />
                </div>
              </div>

              {/* Custom Topic (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="custom-topic">Custom Topic (Optional)</Label>
                <Textarea
                  id="custom-topic"
                  placeholder="Specify a particular angle or topic you'd like to focus on..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate} 
                className="w-full btn-primary"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          )}

          {activeView === 'preview' && generatedContent && (
            <div className="space-y-6">
              {/* Platform Badge */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  {generatedContent.platform === 'twitter' ? (
                    <Twitter className="h-3 w-3" />
                  ) : (
                    <Linkedin className="h-3 w-3" />
                  )}
                  <span>{generatedContent.platform === 'twitter' ? 'Twitter/X' : 'LinkedIn'}</span>
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleRegenerate}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                
                {generatedContent.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Character Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className={`${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {characterCount} / {characterLimit} characters
                  </span>
                  {isOverLimit && (
                    <span className="text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Over limit
                    </span>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tone</p>
                  <p className="text-sm font-medium capitalize">{generatedContent.tone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Focus</p>
                  <p className="text-sm font-medium">{focusOptions[generatedContent.focus as keyof typeof focusOptions]?.label}</p>
                </div>
              </div>

              {/* Estimated Engagement */}
              {generatedContent.estimatedEngagement > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Engagement</span>
                    <span className="text-lg font-bold text-primary">
                      {generatedContent.estimatedEngagement}%
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveView('generate')}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Discard
                </Button>
                <Button
                  onClick={() => setActiveView('schedule')}
                  className="flex-1 btn-primary"
                  disabled={isOverLimit}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          )}

          {activeView === 'schedule' && generatedContent && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">When should this be posted?</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setScheduledDate(null)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      !scheduledDate
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Send className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Post Now</p>
                    <p className="text-xs text-muted-foreground">Immediately publish</p>
                  </button>
                  
                  <button
                    onClick={() => setScheduledDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      scheduledDate
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-xs text-muted-foreground">Pick date & time</p>
                  </button>
                </div>

                {scheduledDate && (
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date">Schedule Date & Time</Label>
                    <Input
                      id="schedule-date"
                      type="datetime-local"
                      value={format(scheduledDate, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setScheduledDate(new Date(e.target.value))}
                      min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                    />
                    <p className="text-xs text-muted-foreground">
                      Post will be published on {format(scheduledDate, 'MMMM dd, yyyy at h:mm a')}
                    </p>
                  </div>
                )}
              </div>

              {/* Final Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveView('preview')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleApprove}
                  className="flex-1 btn-primary"
                  disabled={isScheduling}
                >
                  {isScheduling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {scheduledDate ? 'Schedule Post' : 'Publish Now'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}