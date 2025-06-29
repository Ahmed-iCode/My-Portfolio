/*
  # Create Portfolio CMS Tables

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `title` (text)
      - `issuer` (text)
      - `date` (text)
      - `image` (text)
      - `certificate_url` (text)
      - `skills` (text array)
      - `featured` (boolean)
      - `category` (text)
      - `tags` (text array)
      - `description` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image` (text)
      - `tech_stack` (text array)
      - `demo_link` (text)
      - `github_link` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `published_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_name` (text)
      - `author_avatar` (text, optional)
      - `tags` (text array)
      - `category` (text)
      - `featured` (boolean)
      - `reading_time` (integer)
      - `image` (text, optional)
      - `meta_title` (text, optional)
      - `meta_description` (text, optional)
      - `keywords` (text array, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  date text NOT NULL,
  image text NOT NULL,
  certificate_url text NOT NULL,
  skills text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  demo_link text NOT NULL,
  github_link text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_name text NOT NULL DEFAULT 'Ahmed Samir',
  author_avatar text,
  tags text[] DEFAULT '{}',
  category text NOT NULL,
  featured boolean DEFAULT false,
  reading_time integer DEFAULT 5,
  image text,
  meta_title text,
  meta_description text,
  keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Certificates are publicly readable"
  ON certificates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Projects are publicly readable"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Articles are publicly readable"
  ON articles
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS certificates_category_idx ON certificates(category);
CREATE INDEX IF NOT EXISTS certificates_featured_idx ON certificates(featured);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
CREATE INDEX IF NOT EXISTS articles_featured_idx ON articles(featured);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles(published_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();