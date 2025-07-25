-- Lead scoring trigger function
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score for contact creation
    score := 10;
    
    -- Add points for each completed field
    IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
        score := score + 5;
    END IF;
    
    IF NEW.company IS NOT NULL AND NEW.company != '' THEN
        score := score + 10;
    END IF;
    
    IF NEW.website IS NOT NULL AND NEW.website != '' THEN
        score := score + 5;
    END IF;
    
    IF NEW.notes IS NOT NULL AND NEW.notes != '' THEN
        score := score + 3;
    END IF;
    
    -- Add points for professional profiles
    IF NEW.linkedin_profile IS NOT NULL AND NEW.linkedin_profile != '' THEN
        score := score + 8;
    END IF;
    
    IF NEW.x_profile IS NOT NULL AND NEW.x_profile != '' THEN
        score := score + 5;
    END IF;
    
    -- Add points based on labels (industry focus)
    IF array_length(NEW.labels, 1) > 0 THEN
        score := score + (array_length(NEW.labels, 1) * 2);
    END IF;
    
    -- Bonus points for high-value groups
    IF NEW.group_type IN ('venture_capital', 'private_equity') THEN
        score := score + 15;
    ELSIF NEW.group_type IN ('angel_investor', 'lender') THEN
        score := score + 10;
    ELSIF NEW.group_type = 'broker' THEN
        score := score + 5;
    END IF;
    
    -- Cap the maximum score
    IF score > 100 THEN
        score := 100;
    END IF;
    
    NEW.lead_score := score;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new contacts
CREATE TRIGGER trigger_calculate_lead_score_insert
    BEFORE INSERT ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION calculate_lead_score();

-- Create trigger for contact updates
CREATE TRIGGER trigger_calculate_lead_score_update
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION calculate_lead_score();

-- Function to update lead scores for existing contacts
CREATE OR REPLACE FUNCTION update_all_lead_scores()
RETURNS INTEGER AS $$
DECLARE
    contact_record RECORD;
    updated_count INTEGER := 0;
BEGIN
    FOR contact_record IN SELECT * FROM contacts LOOP
        UPDATE contacts 
        SET updated_at = NOW()
        WHERE id = contact_record.id;
        updated_count := updated_count + 1;
    END LOOP;
    
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Add lead scoring for leads table as well
CREATE OR REPLACE FUNCTION calculate_lead_engagement_score()
RETURNS TRIGGER AS $$
BEGIN
    -- Basic engagement score calculation
    -- This can be enhanced with real social media metrics
    IF NEW.follower_count IS NOT NULL THEN
        -- Score based on follower count (normalized)
        NEW.engagement_score := LEAST(NEW.follower_count / 10000.0, 1.0);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for lead engagement scoring
CREATE TRIGGER trigger_calculate_lead_engagement_score
    BEFORE INSERT OR UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION calculate_lead_engagement_score();