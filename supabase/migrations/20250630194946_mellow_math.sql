/*
  # Fix RLS policy for resumes table

  1. Security Changes
    - Drop existing INSERT policy for resumes table
    - Create new INSERT policy using correct auth.uid() function
    - Ensure authenticated users can create resumes with their own user_id

  2. Policy Details
    - Policy allows INSERT operations for authenticated users
    - Validates that the user_id matches the authenticated user's ID
    - Uses auth.uid() instead of uid() for proper authentication check
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can create their own resumes" ON resumes;

-- Create a new INSERT policy with correct authentication check
CREATE POLICY "Users can create their own resumes"
  ON resumes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Also ensure the SELECT policy uses auth.uid() for consistency
DROP POLICY IF EXISTS "Users can view their own resumes" ON resumes;

CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Ensure UPDATE policy uses auth.uid() for consistency
DROP POLICY IF EXISTS "Users can update their own resumes" ON resumes;

CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Ensure DELETE policy uses auth.uid() for consistency
DROP POLICY IF EXISTS "Users can delete their own resumes" ON resumes;

CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);