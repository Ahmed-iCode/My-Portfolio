import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  certificate_url: string;
  skills: string[];
  featured: boolean;
  category: string;
  tags: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech_stack: string[];
  demo_link: string;
  github_link: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published_at: string;
  updated_at: string;
  author_name: string;
  author_avatar?: string;
  tags: string[];
  category: string;
  featured: boolean;
  reading_time: number;
  image?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}