import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using fallback values for development.');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'public-anon-key'
);

// Function to get templates from Supabase
export const getTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('ats_score', { ascending: false });
    
    if (error) {
      console.error('Error fetching templates:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return null;
  }
};

// Function to get user's resumes
export const getUserResumes = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user resumes:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    return null;
  }
};

// Function to get a specific resume
export const getResume = async (resumeId: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching resume:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching resume:', error);
    return null;
  }
};

// Function to save a resume
export const saveResume = async (resumeData: any, userId: string, resumeId?: string) => {
  try {
    if (resumeId) {
      // Update existing resume
      const { data, error } = await supabase
        .from('resumes')
        .update({
          data: resumeData.data,
          name: resumeData.name,
          template_id: resumeData.template_id,
          customization: resumeData.customization,
          section_order: resumeData.sectionOrder,
          updated_at: new Date().toISOString()
        })
        .eq('id', resumeId)
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating resume:', error);
        throw new Error(`Failed to update resume: ${error.message}`);
      }
      
      return data;
    } else {
      // Create new resume
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: userId,
          name: resumeData.name,
          data: resumeData.data,
          template_id: resumeData.template_id,
          customization: resumeData.customization,
          section_order: resumeData.sectionOrder
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating resume:', error);
        throw new Error(`Failed to create resume: ${error.message}`);
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error; // Re-throw to let the calling code handle it
  }
};

// Function to delete a resume
export const deleteResume = async (resumeId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error deleting resume:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
};

// Function to get user preferences
export const getUserPreferences = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No preferences found, create default preferences
        return createUserPreferences(userId);
      }
      console.error('Error fetching user preferences:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
};

// Function to create default user preferences
export const createUserPreferences = async (userId: string) => {
  try {
    // Get the first free template as default
    const { data: templates } = await supabase
      .from('templates')
      .select('id')
      .eq('tier', 'free')
      .limit(1);
    
    const defaultTemplateId = templates && templates.length > 0 ? templates[0].id : null;
    
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({
        user_id: userId,
        theme: 'light',
        default_template: defaultTemplateId,
        customization: {
          fontFamily: 'Inter',
          fontSize: {
            name: 32,
            heading: 20,
            body: 14,
            small: 12
          },
          fontWeight: {
            name: 700,
            heading: 600,
            body: 400
          },
          lineHeight: {
            heading: 1.2,
            body: 1.5
          },
          colors: {
            primary: '#2563EB',
            secondary: '#64748B',
            accent: '#10B981',
            text: '#1F2937',
            textLight: '#6B7280',
            background: '#FFFFFF',
            border: '#E5E7EB'
          },
          spacing: {
            page: 32,
            section: 24,
            item: 16,
            line: 8
          },
          layout: {
            pageWidth: 8.27,
            pageHeight: 11.69,
            columns: 1,
            headerAlignment: 'center',
            sectionSpacing: 32,
            pageFormat: 'A4',
            orientation: 'portrait',
            maxPages: 3,
            pageBreakBehavior: 'auto',
            showPageNumbers: false,
            pageNumberPosition: 'bottom-center',
            headerOnAllPages: false,
            footerText: ''
          },
          borders: {
            sectionBorder: true,
            sectionBorderWidth: 2,
            sectionBorderStyle: 'solid',
            headerBorder: true,
            headerBorderWidth: 2,
            pageBorder: false,
            pageBorderWidth: 1,
            pageBorderColor: '#E5E7EB'
          },
          shadows: false,
          roundedCorners: 0,
          bulletStyle: 'disc'
        }
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user preferences:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating user preferences:', error);
    return null;
  }
};

// Function to update user preferences
export const updateUserPreferences = async (userId: string, preferences: any) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .update(preferences)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user preferences:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return null;
  }
};

// Function to sync Clerk user with Supabase
export const syncUserWithSupabase = async (userId: string, userMetadata: any) => {
  try {
    // Check if user exists in user_preferences
    const { data: existingUser, error: fetchError } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking if user exists:', fetchError);
      return null;
    }
    
    if (!existingUser) {
      // Create user preferences if they don't exist
      return await createUserPreferences(userId);
    }
    
    return existingUser;
  } catch (error) {
    console.error('Error syncing user with Supabase:', error);
    return null;
  }
};

// Function to get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    // Get user preferences
    const preferences = await getUserPreferences(userId);
    
    // Get user resumes
    const resumes = await getUserResumes(userId);
    
    return {
      preferences,
      resumes,
      resumeCount: resumes?.length || 0
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};