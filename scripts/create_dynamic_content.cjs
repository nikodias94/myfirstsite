// Run: node scripts/create_dynamic_content.cjs
const https = require('https');

const SUPABASE_URL = 'tgvsvqhioltwbujnvkwa.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndnN2cWhpb2x0d2J1am52a3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzUxODksImV4cCI6MjA4ODgxMTE4OX0.cuwpyA7Fh-67rqD_2056Ol0GckZXzHiP3NKQ3KNu-Qg';

// First, let's just test if we can reach the table
// If it doesn't exist yet, user needs to create it via Supabase Dashboard SQL Editor

const sql = `
-- Run this in Supabase Dashboard > SQL Editor:

CREATE TABLE IF NOT EXISTS public.dynamic_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_path TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  date DATE,
  slug TEXT UNIQUE,
  media_urls JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dynamic_content_section_path 
  ON public.dynamic_content(section_path);

ALTER TABLE public.dynamic_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on dynamic_content"
  ON public.dynamic_content FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on dynamic_content"
  ON public.dynamic_content FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on dynamic_content"
  ON public.dynamic_content FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on dynamic_content"
  ON public.dynamic_content FOR DELETE
  USING (auth.role() = 'authenticated');
`;

console.log('=== dynamic_content Migration SQL ===');
console.log(sql);
console.log('=====================================');
console.log('');
console.log('Please go to: https://supabase.com/dashboard/project/tgvsvqhioltwbujnvkwa/sql');
console.log('Paste the above SQL and click "Run"');
console.log('');

// Test if table already exists by trying a SELECT
const options = {
  hostname: SUPABASE_URL,
  path: '/rest/v1/dynamic_content?select=id&limit=1',
  method: 'GET',
  headers: {
    'apikey': ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`,
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Table "dynamic_content" already exists!');
    } else {
      console.log(`⚠️  Table not found (status ${res.statusCode}). Please run the SQL above.`);
    }
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.end();
