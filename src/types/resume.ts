export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  jobTitle?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  maritalStatus?: string;
  passportOrId?: string;
  militaryService?: string;
  drivingLicense?: string;
  visa?: string;
  summary: string;
  customLinks?: CustomLink[];
}

export interface CustomLink {
  id: string;
  label: string;
  url: string;
  platform?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  customFields?: { [key: string]: string };
  visible?: boolean; // Add visibility control for individual experiences
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  customFields?: { [key: string]: string };
  visible?: boolean; // Add visibility control for individual education items
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name?: string;
  description: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  githubUrl?: string;
  highlights?: string[];
  status?: 'completed' | 'in-progress' | 'on-hold';
  visible?: boolean;
  role?: string;
  category?: string;
  linkLabels?: {
    github?: { label: string; color: string; underline: boolean };
    live?: { label: string; color: string; underline: boolean };
  };
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  description?: string[];
  visible?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string[] | string;
  date?: string;
  category?: string;
  issuer?: string;
  url?: string;
  visible?: boolean;
  displayFormat?: 'detailed' | 'compact' | 'grouped';
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list' | 'achievements';
  content: any;
  description?: string;
  customFields?: { [key: string]: string };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
  projects?: Project[];
  certifications?: Certification[];
  achievements?: Achievement[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  preview: string;
  type: 'tech' | 'professional' | 'creative' | 'executive' | 'academic' | 'healthcare' | 'minimal' | 'startup';
  country: 'US' | 'UK' | 'DE' | 'FR' | 'JP' | 'IN' | 'AU' | 'CA' | 'SG' | 'AE' | 'BR' | 'ZA' | 'SE' | 'EU' | 'INTL';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  features: string[];
  layout: 'single-column' | 'two-column' | 'minimal' | 'german-standard' | 'japanese-standard' | 'europass';
  style: 'modern' | 'traditional' | 'creative' | 'professional' | 'scholarly' | 'clinical' | 'elegant' | 'academic' | 'classic';
  tier: 'free' | 'premium' | 'elite';
  atsScore: number;
  category: string;
  institution?: 'IIT' | 'NIT' | 'IIM' | 'IISc' | 'Other';
  institutionName?: string;
  creatorProfile?: {
    name: string;
    batch: string;
    branch?: string;
    company?: string;
    position?: string;
    verified: boolean;
  };
  downloadCount: number;
  rating: number;
  price: number;
  isVerified: boolean;
  createdAt: string;
}

export interface ATSScore {
  overall: number;
  breakdown: {
    formatting: number;
    keywords: number;
    sections: number;
    readability: number;
    atsCompatibility: number;
  };
  suggestions: ATSSuggestion[];
  lastUpdated: string;
  institution?: string | null;
  industry?: string;
}

export interface ATSSuggestion {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'formatting' | 'content' | 'keywords' | 'structure';
  title: string;
  description: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  downloadLimit: number;
  atsReports: boolean;
  premiumTemplates: boolean;
  priority: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  downloadsUsed: number;
  expiresAt: string;
  createdAt: string;
}

export interface SectionOrder {
  id: string;
  title: string;
  component: string;
  visible: boolean;
  icon?: any;
  customSectionId?: string;
}

export interface ResumeCustomization {
  fontFamily: string;
  fontSize: {
    name: number;
    heading: number;
    body: number;
    small: number;
  };
  fontWeight: {
    name: number;
    heading: number;
    body: number;
  };
  lineHeight: {
    heading: number;
    body: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    page: number;
    section: number;
    item: number;
    line: number;
  };
  layout: {
    pageWidth: number;
    pageHeight: number;
    columns: number;
    headerAlignment: 'left' | 'center' | 'right';
    contentAlignment: 'left' | 'center' | 'right';
    sectionHeadingAlignment: 'left' | 'center' | 'right';
    sectionSpacing: number;
    pageFormat: 'A4' | 'Letter' | 'Legal' | 'Custom';
    orientation: 'portrait' | 'landscape';
    maxPages: number;
    pageBreakBehavior: 'auto' | 'manual' | 'avoid';
    showPageNumbers: boolean;
    pageNumberPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    headerOnAllPages: boolean;
    footerText: string;
  };
  borders: {
    sectionBorder: boolean;
    sectionBorderWidth: number;
    sectionBorderStyle: 'solid' | 'dashed' | 'dotted';
    headerBorder: boolean;
    headerBorderWidth: number;
    pageBorder: boolean;
    pageBorderWidth: number;
    pageBorderColor: string;
  };
  shadows: boolean;
  roundedCorners: number;
  bulletStyle: 'disc' | 'circle' | 'square' | 'dash' | 'arrow' | 'diamond';
}

export interface CountryFormat {
  dateFormat: string;
  phoneFormat: string;
  addressFormat: string;
  photoRequired: boolean;
  personalDetailsLevel: 'minimal' | 'moderate' | 'detailed' | 'comprehensive';
  preferredLength: string;
  commonSections: string[];
}