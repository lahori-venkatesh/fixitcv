/*
  # Add section_order column to resumes table

  1. Changes
    - Add `section_order` column to `resumes` table
    - Column type: JSONB (stores section order configuration)
    - Default value: empty JSON array []
    - Nullable: allows null values for existing records

  2. Purpose
    - Store user's custom section ordering preferences
    - Enable drag-and-drop section reordering functionality
    - Maintain section visibility settings
*/

-- Add section_order column to resumes table
ALTER TABLE resumes 
ADD COLUMN IF NOT EXISTS section_order JSONB DEFAULT '[]'::jsonb;