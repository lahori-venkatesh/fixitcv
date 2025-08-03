/*
  # Create resume and user preferences tables
  
  1. New Tables
    - `resumes` - Stores user resume data
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `data` (jsonb)
      - `template_id` (uuid, references templates)
      - `customization` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_preferences` - Stores user preferences
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `theme` (text)
      - `default_template` (uuid, references templates)
      - `customization` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  template_id UUID REFERENCES templates(id),
  customization JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light',
  default_template UUID REFERENCES templates(id),
  customization JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT unique_user_preferences UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for resumes table
CREATE POLICY "Users can create their own resumes"
  ON resumes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for user_preferences table
CREATE POLICY "Users can create their own preferences"
  ON user_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own preferences"
  ON user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for resumes table
CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for user_preferences table
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON user_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();