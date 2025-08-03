/*
  # Fix user_id column type from UUID to TEXT
  
  1. Changes
    - Drop RLS policies that depend on user_id columns
    - Change user_id column type from UUID to TEXT in both tables
    - Recreate the RLS policies with the same functionality
    - Verify the changes were applied correctly
  
  2. Reason
    - Clerk user IDs are strings (like "user_2z0CJD5L1au7GGZpdGFG8N8AOEc")
    - The current schema expects UUID format for user_id columns
    - This causes errors when trying to query with Clerk user IDs
*/

-- Store existing policies to recreate them later
DO $$
DECLARE
  policy_record RECORD;
  policies_json JSONB := '[]'::JSONB;
BEGIN
  -- Collect user_preferences policies
  FOR policy_record IN
    SELECT 
      policyname AS name,
      tablename AS table_name,
      cmd AS operation,
      permissive,
      roles,
      qual AS using_expression,
      with_check AS with_check_expression
    FROM pg_policies
    WHERE tablename = 'user_preferences'
  LOOP
    policies_json := policies_json || jsonb_build_object(
      'name', policy_record.name,
      'table_name', policy_record.table_name,
      'operation', policy_record.operation,
      'permissive', policy_record.permissive,
      'roles', policy_record.roles,
      'using_expression', policy_record.using_expression,
      'with_check_expression', policy_record.with_check_expression
    );
  END LOOP;
  
  -- Collect resumes policies
  FOR policy_record IN
    SELECT 
      policyname AS name,
      tablename AS table_name,
      cmd AS operation,
      permissive,
      roles,
      qual AS using_expression,
      with_check AS with_check_expression
    FROM pg_policies
    WHERE tablename = 'resumes'
  LOOP
    policies_json := policies_json || jsonb_build_object(
      'name', policy_record.name,
      'table_name', policy_record.table_name,
      'operation', policy_record.operation,
      'permissive', policy_record.permissive,
      'roles', policy_record.roles,
      'using_expression', policy_record.using_expression,
      'with_check_expression', policy_record.with_check_expression
    );
  END LOOP;
  
  -- Store policies in a temporary table
  CREATE TEMPORARY TABLE temp_policies (
    policies JSONB
  );
  
  INSERT INTO temp_policies VALUES (policies_json);
END $$;

-- Drop all policies on user_preferences
DROP POLICY IF EXISTS "Users can create their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can view their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON user_preferences;

-- Drop all policies on resumes
DROP POLICY IF EXISTS "Users can create their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can view their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update their own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete their own resumes" ON resumes;

-- First, drop the foreign key constraints that reference the user_id columns
ALTER TABLE resumes DROP CONSTRAINT IF EXISTS resumes_user_id_fkey;
ALTER TABLE user_preferences DROP CONSTRAINT IF EXISTS user_preferences_user_id_fkey;

-- Change user_id column type in user_preferences table
ALTER TABLE user_preferences ALTER COLUMN user_id TYPE text;

-- Change user_id column type in resumes table  
ALTER TABLE resumes ALTER COLUMN user_id TYPE text;

-- Recreate policies for user_preferences
CREATE POLICY "Users can create their own preferences"
  ON user_preferences
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own preferences"
  ON user_preferences
  FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Recreate policies for resumes
CREATE POLICY "Users can create their own resumes"
  ON resumes
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Verify the changes by checking the column types
DO $$
BEGIN
  -- Check user_preferences table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_preferences' 
    AND column_name = 'user_id' 
    AND data_type = 'text'
  ) THEN
    RAISE EXCEPTION 'Failed to update user_preferences.user_id column type to text';
  END IF;
  
  -- Check resumes table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'resumes' 
    AND column_name = 'user_id' 
    AND data_type = 'text'
  ) THEN
    RAISE EXCEPTION 'Failed to update resumes.user_id column type to text';
  END IF;
  
  RAISE NOTICE 'Successfully updated user_id columns to text type';
END $$;

-- Drop temporary table
DROP TABLE IF EXISTS temp_policies;