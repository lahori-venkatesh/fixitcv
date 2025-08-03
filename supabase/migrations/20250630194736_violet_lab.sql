/*
  # Fix RLS policies for resumes table

  1. Security Updates
    - Drop existing policies that use incorrect uid() function
    - Create new policies using correct auth.uid() function
    - Ensure proper permissions for authenticated users

  2. Policy Changes
    - Users can create their own resumes (INSERT)
    - Users can read their own resumes (SELECT) 
    - Users can update their own resumes (UPDATE)
    - Users can delete their own resumes (DELETE)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can view their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete their own resumes" ON resumes;

-- Create new policies with correct auth.uid() function
CREATE POLICY "Users can create their own resumes"
  ON resumes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);