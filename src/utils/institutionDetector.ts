import { ResumeData } from '../types/resume';

export interface DetectedInstitution {
  type: 'IIT' | 'NIT' | 'IIM' | 'IISc' | null;
  name: string;
  confidence: number;
}

const PREMIUM_INSTITUTIONS = {
  IIT: [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT Mandi',
    'IIT Ropar', 'IIT Bhubaneswar', 'IIT Gandhinagar', 'IIT Jodhpur', 'IIT Patna',
    'IIT Varanasi', 'IIT BHU', 'IIT Dhanbad', 'IIT Bhilai', 'IIT Goa', 'IIT Jammu',
    'IIT Dharwad', 'IIT Palakkad', 'IIT Tirupati',
    // Common variations
    'Indian Institute of Technology',
    'IIT-B', 'IIT-D', 'IIT-M', 'IIT-K', 'IIT-KGP'
  ],
  NIT: [
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Durgapur',
    'NIT Rourkela', 'NIT Kurukshetra', 'NIT Jaipur', 'NIT Nagpur', 'NIT Allahabad',
    'NIT Bhopal', 'NIT Jalandhar', 'NIT Patna', 'NIT Raipur', 'NIT Hamirpur',
    'NIT Srinagar', 'NIT Silchar', 'NIT Jamshedpur', 'NIT Agartala', 'NIT Arunachal Pradesh',
    'NIT Delhi', 'NIT Goa', 'NIT Manipur', 'NIT Meghalaya', 'NIT Mizoram',
    'NIT Nagaland', 'NIT Puducherry', 'NIT Sikkim', 'NIT Uttarakhand', 'NIT Andhra Pradesh',
    // Common variations
    'National Institute of Technology',
    'NITK', 'NITT', 'NITW', 'NITC'
  ],
  IIM: [
    'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode',
    'IIM Indore', 'IIM Shillong', 'IIM Rohtak', 'IIM Ranchi', 'IIM Raipur',
    'IIM Trichy', 'IIM Udaipur', 'IIM Kashipur', 'IIM Amritsar', 'IIM Bodh Gaya',
    'IIM Nagpur', 'IIM Visakhapatnam', 'IIM Sirmaur', 'IIM Jammu', 'IIM Sambalpur',
    // Common variations
    'Indian Institute of Management',
    'IIM-A', 'IIM-B', 'IIM-C', 'IIM-L', 'IIM-K', 'IIM-I'
  ],
  IISc: [
    'Indian Institute of Science',
    'IISc Bangalore',
    'IISc',
    'Indian Institute of Science, Bangalore'
  ]
};

const INSTITUTION_KEYWORDS = {
  IIT: ['iit', 'indian institute of technology'],
  NIT: ['nit', 'national institute of technology'],
  IIM: ['iim', 'indian institute of management'],
  IISc: ['iisc', 'indian institute of science']
};

export const detectPremiumInstitution = (resumeData: ResumeData): DetectedInstitution => {
  let bestMatch: DetectedInstitution = {
    type: null,
    name: '',
    confidence: 0
  };

  // Check education section
  for (const education of resumeData.education) {
    const institutionName = education.institution.toLowerCase();
    
    // Check each institution type
    for (const [type, institutions] of Object.entries(PREMIUM_INSTITUTIONS)) {
      for (const institution of institutions) {
        const institutionLower = institution.toLowerCase();
        
        // Exact match
        if (institutionName === institutionLower) {
          return {
            type: type as 'IIT' | 'NIT' | 'IIM' | 'IISc',
            name: education.institution,
            confidence: 1.0
          };
        }
        
        // Partial match
        if (institutionName.includes(institutionLower) || institutionLower.includes(institutionName)) {
          const confidence = Math.max(
            institutionName.length / institutionLower.length,
            institutionLower.length / institutionName.length
          ) * 0.8;
          
          if (confidence > bestMatch.confidence) {
            bestMatch = {
              type: type as 'IIT' | 'NIT' | 'IIM' | 'IISc',
              name: education.institution,
              confidence
            };
          }
        }
      }
      
      // Check keywords
      const keywords = INSTITUTION_KEYWORDS[type as keyof typeof INSTITUTION_KEYWORDS];
      for (const keyword of keywords) {
        if (institutionName.includes(keyword)) {
          const confidence = 0.6;
          if (confidence > bestMatch.confidence) {
            bestMatch = {
              type: type as 'IIT' | 'NIT' | 'IIM' | 'IISc',
              name: education.institution,
              confidence
            };
          }
        }
      }
    }
  }

  // Only return if confidence is above threshold
  if (bestMatch.confidence >= 0.6) {
    return bestMatch;
  }

  return {
    type: null,
    name: '',
    confidence: 0
  };
};

export const isPremiumInstitution = (resumeData: ResumeData): boolean => {
  const detection = detectPremiumInstitution(resumeData);
  return detection.type !== null && detection.confidence >= 0.6;
};