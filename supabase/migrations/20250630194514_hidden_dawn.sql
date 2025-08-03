/*
  # Fix RLS policies for Clerk authentication

  1. Security Updates
    - Update RLS policies to work with Clerk user IDs
    - Ensure proper authentication checks for all operations
    - Fix INSERT policy that was causing the violation

  2. Changes Made
    - Updated all RLS policies to use proper Clerk user ID comparison
    - Fixed INSERT policy to allow authenticated users to create resumes
    - Ensured consistent user_id handling across all policies
*/

-- Drop existing policies for resumes table
DROP POLICY IF EXISTS "Users can create their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can view their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete their own resumes" ON resumes;

-- Create new policies that work with Clerk authentication
CREATE POLICY "Users can create their own resumes"
  ON resumes
  FOR INSERT
  TO public
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  TO public
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  TO public
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  TO public
  USING (auth.uid()::text = user_id);

-- Also update user_preferences policies to be more specific
DROP POLICY IF EXISTS "Allow authenticated users to create preferences" ON user_preferences;
DROP POLICY IF EXISTS "Allow users to read own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Allow users to update own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Allow users to delete own preferences" ON user_preferences;

CREATE POLICY "Users can create their own preferences"
  ON user_preferences
  FOR INSERT
  TO public
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read their own preferences"
  ON user_preferences
  FOR SELECT
  TO public
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR UPDATE
  TO public
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON user_preferences
  FOR DELETE
  TO public
  USING (auth.uid()::text = user_id);