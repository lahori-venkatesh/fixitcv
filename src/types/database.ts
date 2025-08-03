export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string
          user_id: string
          name: string
          data: Json
          template_id: string | null
          customization: Json | null
          section_order: Json | null  // Add this line
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          data: Json
          template_id?: string | null
          customization?: Json | null
          section_order?: Json | null  // Add this line
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          data?: Json
          template_id?: string | null
          customization?: Json | null
          section_order?: Json | null  // Add this line
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resumes_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
      templates: {
        Row: {
          id: string
          name: string
          preview: string
          type: string
          country: string
          colors: Json
          description: string
          features: string[]
          layout: string
          style: string
          tier: string
          ats_score: number
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          preview: string
          type: string
          country: string
          colors: Json
          description: string
          features: string[]
          layout: string
          style: string
          tier: string
          ats_score: number
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          preview?: string
          type?: string
          country?: string
          colors?: Json
          description?: string
          features?: string[]
          layout?: string
          style?: string
          tier?: string
          ats_score?: number
          category?: string
          created_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme: string
          default_template: string | null
          customization: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          default_template?: string | null
          customization?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          default_template?: string | null
          customization?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_default_template_fkey"
            columns: ["default_template"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
