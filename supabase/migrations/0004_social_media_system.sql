-- Migration: Social Media Integration System
-- Description: Adds comprehensive social media management, content generation, and lead discovery
-- Date: 2024-07-24

-- Create enums for social media functionality
CREATE TYPE social_platform AS ENUM ('twitter', 'linkedin', 'facebook', 'instagram');
CREATE TYPE post_status AS ENUM ('pending_approval', 'approved', 'rejected', 'scheduled', 'posted', 'failed');
CREATE TYPE sentiment AS ENUM ('positive', 'negative', 'neutral');

-- Social media accounts table (for connecting user accounts)
CREATE TABLE social_accounts (
    id SERIAL PRIMARY KEY,
    platform social_platform NOT NULL,
    username TEXT NOT NULL,
    display_name TEXT NOT NULL,
    profile_url TEXT NOT NULL,
    access_token TEXT, -- Encrypted access token
    refresh_token TEXT, -- Encrypted refresh token
    token_expires_at TIMESTAMPTZ,
    followers INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(platform, username)
);

-- Pending social media posts awaiting approval
CREATE TABLE pending_social_posts (
    id SERIAL PRIMARY KEY,
    platform social_platform NOT NULL,
    content TEXT NOT NULL,
    hashtags TEXT[] DEFAULT '{}' NOT NULL,
    call_to_action TEXT,
    media_type TEXT,
    media_url TEXT,
    status post_status DEFAULT 'pending_approval' NOT NULL,
    scheduled_for TIMESTAMPTZ,
    posted_at TIMESTAMPTZ,
    posted_id TEXT, -- ID from the social platform
    tone TEXT NOT NULL,
    focus TEXT NOT NULL,
    inspiration_posts JSONB,
    estimated_engagement INTEGER DEFAULT 0,
    actual_engagement INTEGER,
    modifications TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Social media feed cache (to avoid excessive API calls)
CREATE TABLE social_feed_cache (
    id SERIAL PRIMARY KEY,
    platform social_platform NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    author_username TEXT NOT NULL,
    author_display_name TEXT NOT NULL,
    author_profile_image TEXT,
    author_followers INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    post_url TEXT NOT NULL,
    media_urls TEXT[] DEFAULT '{}',
    published_at TIMESTAMPTZ NOT NULL,
    cache_expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(platform, post_id)
);

-- Sentiment analysis results for social media posts
CREATE TABLE sentiment_analysis (
    id SERIAL PRIMARY KEY,
    post_id TEXT NOT NULL,
    platform social_platform NOT NULL,
    sentiment sentiment NOT NULL,
    confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
    relevance_score INTEGER NOT NULL CHECK (relevance_score >= 0 AND relevance_score <= 100),
    topics TEXT[] DEFAULT '{}' NOT NULL,
    insights TEXT[] DEFAULT '{}' NOT NULL,
    analysis_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(post_id, platform)
);

-- Discovered leads from social media
CREATE TABLE discovered_leads (
    id SERIAL PRIMARY KEY,
    platform social_platform NOT NULL,
    username TEXT NOT NULL,
    display_name TEXT NOT NULL,
    bio TEXT,
    profile_url TEXT NOT NULL,
    profile_image TEXT,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    posts INTEGER DEFAULT 0,
    avg_engagement INTEGER DEFAULT 0,
    lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    topics TEXT[] DEFAULT '{}' NOT NULL,
    sentiment sentiment DEFAULT 'neutral',
    relevant_posts JSONB,
    discovery_keywords TEXT[] DEFAULT '{}' NOT NULL,
    last_analyzed TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    converted_to_contact BOOLEAN DEFAULT false,
    contact_id INTEGER REFERENCES contacts(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(platform, username)
);

-- Content performance tracking
CREATE TABLE content_performance (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES pending_social_posts(id),
    platform social_platform NOT NULL,
    platform_post_id TEXT NOT NULL,
    impressions INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    engagement_rate INTEGER DEFAULT 0, -- Percentage * 100
    best_performing_time TIMESTAMPTZ,
    demographics JSONB,
    last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(platform, platform_post_id)
);

-- Social media insights and trends
CREATE TABLE social_insights (
    id SERIAL PRIMARY KEY,
    platform social_platform NOT NULL,
    date_range TEXT NOT NULL,
    trending_topics TEXT[] DEFAULT '{}' NOT NULL,
    sentiment_distribution JSONB,
    avg_engagement_rate INTEGER DEFAULT 0,
    best_posting_times JSONB,
    top_performing_content JSONB,
    competitor_analysis JSONB,
    generated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_social_accounts_active ON social_accounts(is_active) WHERE is_active = true;

CREATE INDEX idx_pending_posts_status ON pending_social_posts(status);
CREATE INDEX idx_pending_posts_platform ON pending_social_posts(platform);
CREATE INDEX idx_pending_posts_scheduled ON pending_social_posts(scheduled_for) WHERE scheduled_for IS NOT NULL;

CREATE INDEX idx_feed_cache_platform ON social_feed_cache(platform);
CREATE INDEX idx_feed_cache_expires ON social_feed_cache(cache_expires_at);
CREATE INDEX idx_feed_cache_published ON social_feed_cache(published_at);

CREATE INDEX idx_sentiment_platform ON sentiment_analysis(platform);
CREATE INDEX idx_sentiment_score ON sentiment_analysis(relevance_score);

CREATE INDEX idx_discovered_leads_score ON discovered_leads(lead_score);
CREATE INDEX idx_discovered_leads_platform ON discovered_leads(platform);
CREATE INDEX idx_discovered_leads_unconverted ON discovered_leads(converted_to_contact) WHERE converted_to_contact = false;

CREATE INDEX idx_performance_platform ON content_performance(platform);
CREATE INDEX idx_performance_engagement ON content_performance(engagement_rate);

-- Unique constraint for social_insights 
CREATE UNIQUE INDEX idx_social_insights_unique ON social_insights(platform, date_range);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pending_posts_updated_at BEFORE UPDATE ON pending_social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discovered_leads_updated_at BEFORE UPDATE ON discovered_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired feed cache
CREATE OR REPLACE FUNCTION cleanup_expired_feed_cache()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM social_feed_cache WHERE cache_expires_at < NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate lead scores based on social media metrics
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_followers INTEGER,
    p_engagement INTEGER,
    p_topic_relevance INTEGER,
    p_sentiment sentiment
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score from followers (max 30 points)
    score := score + LEAST(30, (p_followers / 1000));
    
    -- Engagement score (max 25 points)
    score := score + LEAST(25, p_engagement);
    
    -- Topic relevance (max 25 points)
    score := score + LEAST(25, p_topic_relevance);
    
    -- Sentiment bonus (max 20 points)
    CASE p_sentiment
        WHEN 'positive' THEN score := score + 20;
        WHEN 'neutral' THEN score := score + 10;
        WHEN 'negative' THEN score := score + 0;
    END CASE;
    
    RETURN LEAST(100, score);
END;
$$ LANGUAGE plpgsql;

-- View for high-value leads
CREATE VIEW high_value_leads AS
SELECT 
    dl.*,
    CASE 
        WHEN dl.lead_score >= 80 THEN 'hot'
        WHEN dl.lead_score >= 60 THEN 'warm'
        WHEN dl.lead_score >= 40 THEN 'cool'
        ELSE 'cold'
    END as lead_temperature,
    EXTRACT(DAYS FROM (NOW() - dl.last_analyzed)) as days_since_analysis
FROM discovered_leads dl
WHERE dl.converted_to_contact = false
ORDER BY dl.lead_score DESC, dl.last_analyzed DESC;

-- View for content performance summary
CREATE VIEW content_performance_summary AS
SELECT 
    psp.id,
    psp.platform,
    psp.content,
    psp.status,
    psp.created_at,
    cp.impressions,
    cp.reach,
    cp.likes + cp.shares + cp.comments as total_engagement,
    cp.engagement_rate,
    CASE 
        WHEN cp.engagement_rate >= 500 THEN 'excellent'
        WHEN cp.engagement_rate >= 300 THEN 'good'
        WHEN cp.engagement_rate >= 150 THEN 'average'
        ELSE 'poor'
    END as performance_rating
FROM pending_social_posts psp
LEFT JOIN content_performance cp ON psp.id = cp.post_id
WHERE psp.status IN ('posted', 'scheduled')
ORDER BY cp.engagement_rate DESC NULLS LAST;

COMMENT ON TABLE social_accounts IS 'Connected social media accounts for the platform';
COMMENT ON TABLE pending_social_posts IS 'Generated social media posts awaiting approval and posting';
COMMENT ON TABLE social_feed_cache IS 'Cached social media feed data to reduce API calls';
COMMENT ON TABLE sentiment_analysis IS 'AI-powered sentiment analysis of social media posts';
COMMENT ON TABLE discovered_leads IS 'Potential leads discovered through social media analysis';
COMMENT ON TABLE content_performance IS 'Performance metrics for posted social media content';
COMMENT ON TABLE social_insights IS 'Aggregated insights and trends from social media data';