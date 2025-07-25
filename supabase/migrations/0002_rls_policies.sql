-- Enable Row Level Security
ALTER TABLE "contacts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "blog_posts" ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
-- Allow authenticated users to read all contacts
CREATE POLICY "Allow authenticated users to read contacts" ON "contacts"
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert contacts
CREATE POLICY "Allow authenticated users to create contacts" ON "contacts"
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update contacts
CREATE POLICY "Allow authenticated users to update contacts" ON "contacts"
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete contacts
CREATE POLICY "Allow authenticated users to delete contacts" ON "contacts"
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for leads table
-- Allow authenticated users to read all leads
CREATE POLICY "Allow authenticated users to read leads" ON "leads"
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert leads
CREATE POLICY "Allow authenticated users to create leads" ON "leads"
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update leads
CREATE POLICY "Allow authenticated users to update leads" ON "leads"
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete leads
CREATE POLICY "Allow authenticated users to delete leads" ON "leads"
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for blog_posts table
-- Allow anyone to read published blog posts
CREATE POLICY "Allow anyone to read published blog posts" ON "blog_posts"
    FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

-- Allow authenticated users to create blog posts
CREATE POLICY "Allow authenticated users to create blog posts" ON "blog_posts"
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blog posts
CREATE POLICY "Allow authenticated users to update blog posts" ON "blog_posts"
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts
CREATE POLICY "Allow authenticated users to delete blog posts" ON "blog_posts"
    FOR DELETE USING (auth.role() = 'authenticated');