/*
  # Create templates table and insert template data
  
  1. New Tables
    - `templates` - Stores resume template information
      - `id` (uuid, primary key)
      - `name` (text)
      - `preview` (text)
      - `type` (text)
      - `country` (text)
      - `colors` (jsonb)
      - `description` (text)
      - `features` (text[])
      - `layout` (text)
      - `style` (text)
      - `tier` (text)
      - `ats_score` (integer)
      - `category` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `templates` table
    - Add policy for authenticated users to read templates
*/

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  preview TEXT NOT NULL,
  type TEXT NOT NULL,
  country TEXT NOT NULL,
  colors JSONB NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  layout TEXT NOT NULL,
  style TEXT NOT NULL,
  tier TEXT NOT NULL,
  ats_score INTEGER NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policy for reading templates
CREATE POLICY "Anyone can read templates" 
  ON templates
  FOR SELECT
  USING (true);

-- Insert template data
INSERT INTO templates (
  name, preview, type, country, colors, description, features, layout, style, tier, ats_score, category
) VALUES 
(
  'Harvard Classic',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
  'professional',
  'US',
  '{"primary": "#000000", "secondary": "#333333", "accent": "#666666"}',
  'Classic · Sans Serif',
  ARRAY['ATS-Optimized', 'Clean Layout', 'Professional Design', 'Harvard Style'],
  'single-column',
  'classic',
  'free',
  98,
  'classic'
),
(
  'Modern Minimal',
  'https://images.unsplash.com/photo-1512626120412-faf41adb4874?w=400&h=500&fit=crop',
  'professional',
  'US',
  '{"primary": "#3B82F6", "secondary": "#64748B", "accent": "#10B981"}',
  'Modern · Clean · Minimal',
  ARRAY['ATS-Optimized', 'Clean Layout', 'Modern Design', 'Customizable Colors'],
  'single-column',
  'modern',
  'free',
  95,
  'modern'
),
(
  'Executive Pro',
  'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=400&h=500&fit=crop',
  'executive',
  'US',
  '{"primary": "#1E3A8A", "secondary": "#475569", "accent": "#059669"}',
  'Professional · Executive · Bold',
  ARRAY['ATS-Optimized', 'Executive Layout', 'Professional Design', 'Bold Typography'],
  'single-column',
  'professional',
  'premium',
  97,
  'professional'
),
(
  'Creative Portfolio',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop',
  'creative',
  'US',
  '{"primary": "#8B5CF6", "secondary": "#6B7280", "accent": "#F59E0B"}',
  'Creative · Unique · Colorful',
  ARRAY['Creative Layout', 'Unique Design', 'Colorful Accents', 'Portfolio Focused'],
  'two-column',
  'creative',
  'premium',
  85,
  'creative'
),
(
  'Tech Specialist',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=500&fit=crop',
  'tech',
  'US',
  '{"primary": "#0D9488", "secondary": "#64748B", "accent": "#3B82F6"}',
  'Technical · Modern · Structured',
  ARRAY['ATS-Optimized', 'Technical Focus', 'Skills Highlight', 'Clean Structure'],
  'two-column',
  'modern',
  'free',
  96,
  'professional'
),
(
  'Elegant Serif',
  'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&h=500&fit=crop',
  'professional',
  'UK',
  '{"primary": "#BE185D", "secondary": "#64748B", "accent": "#8B5CF6"}',
  'Elegant · Serif · Traditional',
  ARRAY['ATS-Optimized', 'Elegant Design', 'Serif Typography', 'Traditional Layout'],
  'single-column',
  'elegant',
  'premium',
  94,
  'classic'
),
(
  'Minimal Swiss',
  'https://images.unsplash.com/photo-1586282023358-9bfaa12e2382?w=400&h=500&fit=crop',
  'minimal',
  'EU',
  '{"primary": "#374151", "secondary": "#9CA3AF", "accent": "#EF4444"}',
  'Minimal · Swiss Design · Clean',
  ARRAY['ATS-Optimized', 'Minimal Design', 'Swiss Typography', 'Clean Layout'],
  'single-column',
  'minimal',
  'free',
  92,
  'modern'
),
(
  'Academic CV',
  'https://images.unsplash.com/photo-1586282391137-ddd4202e6f74?w=400&h=500&fit=crop',
  'academic',
  'INTL',
  '{"primary": "#1E40AF", "secondary": "#475569", "accent": "#0369A1"}',
  'Academic · Detailed · Structured',
  ARRAY['Academic Focus', 'Publications Section', 'Research Highlight', 'Comprehensive'],
  'single-column',
  'academic',
  'premium',
  90,
  'professional'
),
(
  'Healthcare Professional',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=500&fit=crop',
  'healthcare',
  'US',
  '{"primary": "#0891B2", "secondary": "#64748B", "accent": "#059669"}',
  'Healthcare · Professional · Clean',
  ARRAY['ATS-Optimized', 'Healthcare Focus', 'Certifications Section', 'Clean Design'],
  'single-column',
  'clinical',
  'premium',
  96,
  'professional'
);