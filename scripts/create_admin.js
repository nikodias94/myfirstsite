import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const lines = envFile.split('\n');
const supabaseUrl = lines.find(l => l.startsWith('VITE_SUPABASE_URL='))?.split('=')[1]?.trim();
const supabaseAnonKey = lines.find(l => l.startsWith('VITE_SUPABASE_ANON_KEY='))?.split('=')[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'zhana1993@admin.com',
    password: 'lusia013',
  });

  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('User created successfully:', data.user?.id);
  }
}

createAdmin();
