/*
  # Fix RLS policies for user_preferences table

  1. Security Updates
    - Drop existing RLS policies for user_preferences table
    - Create new policies that properly use auth.uid() function
    - Ensure authenticated users can manage their own preferences

  2. Policy Changes
    - Users can create their own preferences (INSERT)
    - Users can read their own preferences (SELECT)
    - Users can update their own preferences (UPDATE)
    - Users can delete their own preferences (DELETE)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can read their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can delete their own preferences" ON user_preferences;

-- Create new policies with correct auth.uid() function
CREATE POLICY "Users can create their own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read their own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON user_preferences
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);