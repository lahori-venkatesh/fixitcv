import { ResumeData, ATSScore, ATSSuggestion } from '../types/resume';

// ATS Keywords database by industry/role with premium institution focus
const ATS_KEYWORDS = {
  software: [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Kubernetes',
    'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API',
    'Microservices', 'DevOps', 'CI/CD', 'Agile', 'Scrum', 'TDD', 'Machine Learning', 'AI',
    'Data Structures', 'Algorithms', 'System Design', 'Cloud Computing', 'Cybersecurity'
  ],
  marketing: [
    'Digital Marketing', 'SEO', 'SEM', 'Google Analytics', 'Social Media', 'Content Marketing',
    'Email Marketing', 'PPC', 'Facebook Ads', 'Google Ads', 'Marketing Automation', 'CRM',
    'Lead Generation', 'Conversion Optimization', 'A/B Testing', 'Brand Management', 'ROI',
    'KPI', 'Campaign Management', 'Influencer Marketing', 'Growth Hacking', 'Marketing Strategy'
  ],
  finance: [
    'Financial Analysis', 'Excel', 'Financial Modeling', 'Valuation', 'Investment Banking',
    'Portfolio Management', 'Risk Management', 'Derivatives', 'Fixed Income', 'Equity Research',
    'M&A', 'Due Diligence', 'Financial Planning', 'Budgeting', 'Forecasting', 'GAAP', 'IFRS',
    'Bloomberg', 'Capital Markets', 'Private Equity', 'Venture Capital', 'Hedge Funds'
  ],
  consulting: [
    'Strategy Consulting', 'Management Consulting', 'Business Analysis', 'Process Improvement',
    'Change Management', 'Project Management', 'Stakeholder Management', 'Problem Solving',
    'Data Analysis', 'Market Research', 'Competitive Analysis', 'Business Development',
    'Client Management', 'Presentation Skills', 'McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC'
  ],
  data: [
    'Data Science', 'Machine Learning', 'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Pandas',
    'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Statistics', 'Data Visualization',
    'Big Data', 'Hadoop', 'Spark', 'ETL', 'Data Mining', 'Predictive Analytics', 'Deep Learning',
    'Natural Language Processing', 'Computer Vision', 'A/B Testing', 'Statistical Analysis'
  ],
  research: [
    'Research Methodology', 'Data Collection', 'Statistical Analysis', 'Literature Review',
    'Hypothesis Testing', 'Experimental Design', 'Qualitative Research', 'Quantitative Research',
    'Peer Review', 'Publication', 'Citation Analysis', 'Research Ethics', 'Grant Writing',
    'Collaborative Research', 'Interdisciplinary Research', 'Field Studies', 'Laboratory Research'
  ],
  engineering: [
    'Engineering Design', 'CAD', 'SolidWorks', 'AutoCAD', 'MATLAB', 'Simulation', 'Prototyping',
    'Quality Control', 'Six Sigma', 'Lean Manufacturing', 'Process Optimization', 'Thermal Analysis',
    'Structural Analysis', 'Fluid Dynamics', 'Control Systems', 'Robotics', 'Automation'
  ],
  business: [
    'Strategic Planning', 'Business Strategy', 'Market Analysis', 'Competitive Intelligence',
    'Business Development', 'Strategic Partnerships', 'Corporate Strategy', 'Growth Strategy',
    'Business Model Innovation', 'Strategic Consulting', 'Portfolio Strategy', 'Mergers & Acquisitions'
  ]
};

// Institution-specific keywords and scoring bonuses
const INSTITUTION_BONUSES = {
  IIT: {
    keywords: ['IIT', 'Indian Institute of Technology', 'Engineering', 'Research', 'Technical', 'Innovation'],
    bonus: 5,
    categories: ['software', 'engineering', 'research', 'data']
  },
  NIT: {
    keywords: ['NIT', 'National Institute of Technology', 'Engineering', 'Technical', 'Professional'],
    bonus: 3,
    categories: ['software', 'engineering', 'data']
  },
  IIM: {
    keywords: ['IIM', 'Indian Institute of Management', 'Business', 'Management', 'Strategy', 'Leadership'],
    bonus: 4,
    categories: ['business', 'consulting', 'finance', 'marketing']
  },
  IISc: {
    keywords: ['IISc', 'Indian Institute of Science', 'Research', 'Science', 'Academic', 'Publication'],
    bonus: 6,
    categories: ['research', 'data', 'engineering', 'software']
  }
};

// Common ATS-friendly action verbs
const ACTION_VERBS = [
  'Achieved', 'Implemented', 'Developed', 'Led', 'Managed', 'Created', 'Designed', 'Optimized',
  'Improved', 'Increased', 'Reduced', 'Streamlined', 'Collaborated', 'Coordinated', 'Executed',
  'Delivered', 'Built', 'Established', 'Launched', 'Spearheaded', 'Transformed', 'Enhanced',
  'Analyzed', 'Researched', 'Evaluated', 'Resolved', 'Negotiated', 'Facilitated', 'Mentored'
];

// ATS-unfriendly elements
const ATS_UNFRIENDLY = {
  fonts: ['Times New Roman', 'Comic Sans', 'Papyrus', 'Impact'],
  elements: ['tables', 'text boxes', 'headers', 'footers', 'graphics', 'images'],
  formatting: ['columns', 'fancy bullets', 'borders', 'shading']
};

export class ATSScorer {
  private resumeData: ResumeData;
  private detectedIndustry: string = 'software';
  private detectedInstitution: string | null = null;
  private isPremiumUser: boolean = false;

  constructor(resumeData: ResumeData, isPremiumUser: boolean = false) {
    this.resumeData = resumeData;
    this.isPremiumUser = isPremiumUser;
    this.detectedIndustry = this.detectIndustry();
    this.detectedInstitution = this.detectInstitution();
  }

  private detectIndustry(): string {
    const allText = this.getAllResumeText().toLowerCase();
    const industries = Object.keys(ATS_KEYWORDS);
    let maxScore = 0;
    let detectedIndustry = 'software';

    industries.forEach(industry => {
      const keywords = ATS_KEYWORDS[industry as keyof typeof ATS_KEYWORDS];
      const score = keywords.reduce((acc, keyword) => {
        return acc + (allText.includes(keyword.toLowerCase()) ? 1 : 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        detectedIndustry = industry;
      }
    });

    return detectedIndustry;
  }

  private detectInstitution(): string | null {
    const allText = this.getAllResumeText();
    const institutions = Object.keys(INSTITUTION_BONUSES);
    
    for (const institution of institutions) {
      const institutionData = INSTITUTION_BONUSES[institution as keyof typeof INSTITUTION_BONUSES];
      const hasKeywords = institutionData.keywords.some(keyword => 
        allText.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (hasKeywords) {
        return institution;
      }
    }
    
    return null;
  }

  private getAllResumeText(): string {
    const texts = [
      this.resumeData.personalInfo.summary || '',
      this.resumeData.personalInfo.jobTitle || '',
      ...this.resumeData.experience.flatMap(exp => [
        exp.company,
        exp.position,
        ...exp.description
      ]),
      ...this.resumeData.education.map(edu => `${edu.degree} ${edu.field} ${edu.institution}`),
      ...this.resumeData.skills.map(skill => skill.name),
      ...this.resumeData.customSections.flatMap(section => 
        typeof section.content === 'string' ? [section.content] : 
        Array.isArray(section.content) ? section.content : []
      )
    ];
    
    return texts.join(' ');
  }

  private hasMinimumContent(): boolean {
    // Check if user has filled at least 3 meaningful sections
    let filledSections = 0;
    
    // Personal Info (basic details)
    if (this.resumeData.personalInfo.firstName && this.resumeData.personalInfo.email) {
      filledSections++;
    }
    
    // Experience section
    if (this.resumeData.experience.length > 0) {
      filledSections++;
    }
    
    // Education section
    if (this.resumeData.education.length > 0) {
      filledSections++;
    }
    
    // Skills section
    if (this.resumeData.skills.length >= 3) {
      filledSections++;
    }
    
    // Projects section
    if (this.resumeData.projects && this.resumeData.projects.length > 0) {
      filledSections++;
    }
    
    // Custom sections
    if (this.resumeData.customSections.length > 0) {
      filledSections++;
    }
    
    // Certifications section
    if (this.resumeData.certifications && this.resumeData.certifications.length > 0) {
      filledSections++;
    }
    
    // Professional summary
    if (this.resumeData.personalInfo.summary && this.resumeData.personalInfo.summary.length > 30) {
      filledSections++;
    }
    
    return filledSections >= 3;
  }

  public calculateATSScore(): ATSScore | null {
    // Return null if resume doesn't have minimum content
    if (!this.hasMinimumContent()) {
      return null;
    }

    const formatting = this.calculateFormattingScore();
    const keywords = this.calculateKeywordScore();
    const sections = this.calculateSectionScore();
    const readability = this.calculateReadabilityScore();
    const atsCompatibility = this.calculateATSCompatibilityScore();

    // Apply institution bonus if detected
    let institutionBonus = 0;
    if (this.detectedInstitution && this.isPremiumUser) {
      const institutionData = INSTITUTION_BONUSES[this.detectedInstitution as keyof typeof INSTITUTION_BONUSES];
      if (institutionData.categories.includes(this.detectedIndustry)) {
        institutionBonus = institutionData.bonus;
      }
    }

    const overall = Math.round((formatting + keywords + sections + readability + atsCompatibility) / 5) + institutionBonus;

    const suggestions = this.generateSuggestions({
      formatting,
      keywords,
      sections,
      readability,
      atsCompatibility
    });

    return {
      overall: Math.min(100, overall),
      breakdown: {
        formatting,
        keywords,
        sections,
        readability,
        atsCompatibility
      },
      suggestions,
      lastUpdated: new Date().toISOString(),
      institution: this.detectedInstitution,
      industry: this.detectedIndustry
    };
  }

  private calculateFormattingScore(): number {
    let score = 85; // Start with a good base score
    const { personalInfo } = this.resumeData;

    // Essential contact information
    if (personalInfo.firstName && personalInfo.lastName) {
      score += 5; // Bonus for full name
    } else if (personalInfo.firstName || personalInfo.lastName) {
      score += 2; // Partial bonus for partial name
    } else {
      score -= 10; // Penalty for no name
    }

    if (personalInfo.email) {
      score += 5; // Bonus for email
      // Check for proper email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        score -= 3; // Small penalty for invalid format
      }
    } else {
      score -= 15; // Penalty for missing email
    }

    if (personalInfo.phone) {
      score += 3; // Bonus for phone
      // Check for proper phone format (more lenient)
      if (!/^[\+]?[\d\s\-\(\)]{8,}$/.test(personalInfo.phone)) {
        score -= 2; // Small penalty for inconsistent format
      }
    } else {
      score -= 5; // Small penalty for missing phone
    }

    if (personalInfo.location) {
      score += 2; // Small bonus for location
    }

    return Math.min(100, Math.max(70, score)); // Ensure minimum 70, max 100
  }

  private calculateKeywordScore(): number {
    const allText = this.getAllResumeText().toLowerCase();
    const relevantKeywords = ATS_KEYWORDS[this.detectedIndustry as keyof typeof ATS_KEYWORDS];
    
    let keywordCount = 0;
    
    relevantKeywords.forEach(keyword => {
      if (allText.includes(keyword.toLowerCase())) {
        keywordCount++;
      }
    });

    // Check for action verbs in experience descriptions
    let actionVerbCount = 0;
    let totalDescriptions = 0;
    this.resumeData.experience.forEach(exp => {
      exp.description.forEach(desc => {
        totalDescriptions++;
        ACTION_VERBS.forEach(verb => {
          if (desc.toLowerCase().includes(verb.toLowerCase())) {
            actionVerbCount++;
            return; // Count only once per description
          }
        });
      });
    });

    // More realistic scoring
    let score = 60; // Base score for having content
    
    // Keyword bonus (more generous)
    if (keywordCount >= 8) score += 25;
    else if (keywordCount >= 5) score += 20;
    else if (keywordCount >= 3) score += 15;
    else if (keywordCount >= 1) score += 10;
    
    // Action verb bonus (more realistic)
    if (totalDescriptions > 0) {
      const actionVerbRatio = actionVerbCount / totalDescriptions;
      if (actionVerbRatio >= 0.7) score += 15;
      else if (actionVerbRatio >= 0.5) score += 10;
      else if (actionVerbRatio >= 0.3) score += 5;
    }

    // Premium user bonus for keyword optimization
    if (this.isPremiumUser) {
      score += Math.min(5, keywordCount * 0.5); // Up to 5 bonus points
    }
    
    return Math.min(100, score);
  }

  private calculateSectionScore(): number {
    let score = 0;
    const maxScore = 100;

    // Essential sections
    if (this.resumeData.personalInfo.firstName && this.resumeData.personalInfo.email) {
      score += 20; // Contact info
    }
    
    if (this.resumeData.personalInfo.summary && this.resumeData.personalInfo.summary.length > 50) {
      score += 20; // Professional summary
    }
    
    if (this.resumeData.experience.length > 0) {
      score += 25; // Work experience
      
      // Check experience quality
      const hasQuantifiedResults = this.resumeData.experience.some(exp =>
        exp.description.some(desc => /\d+/.test(desc))
      );
      if (hasQuantifiedResults) score += 10;
    }
    
    if (this.resumeData.education.length > 0) {
      score += 15; // Education
    }
    
    if (this.resumeData.skills.length >= 5) {
      score += 10; // Skills
    }
    
    // Bonus sections
    if (this.resumeData.projects && this.resumeData.projects.length > 0) {
      score += 5;
    }
    
    if (this.resumeData.certifications && this.resumeData.certifications.length > 0) {
      score += 5;
    }

    return Math.min(maxScore, score);
  }

  private calculateReadabilityScore(): number {
    let score = 75; // Start with a good base score
    
    // Check summary length and quality
    const summary = this.resumeData.personalInfo.summary || '';
    if (summary.length >= 50 && summary.length <= 300) {
      score += 15; // Bonus for good summary
    } else if (summary.length > 0) {
      score += 5; // Small bonus for having any summary
    }

    // Check experience descriptions (more lenient)
    let goodDescriptions = 0;
    let totalDescriptions = 0;
    
    this.resumeData.experience.forEach(exp => {
      exp.description.forEach(desc => {
        totalDescriptions++;
        
        // Good length descriptions
        if (desc.length >= 20 && desc.length <= 250) {
          goodDescriptions++;
        }
        
        // Bonus for action verbs (but not penalty for missing them)
        const startsWithActionVerb = ACTION_VERBS.some(verb => 
          desc.toLowerCase().startsWith(verb.toLowerCase())
        );
        if (startsWithActionVerb) {
          score += 2;
        }
        
        // Bonus for quantified results
        if (/\d+/.test(desc)) {
          score += 3;
        }
      });
    });

    // Bonus for good description ratio
    if (totalDescriptions > 0) {
      const goodRatio = goodDescriptions / totalDescriptions;
      if (goodRatio >= 0.8) score += 10;
      else if (goodRatio >= 0.6) score += 5;
    }

    return Math.min(100, Math.max(60, score)); // Ensure minimum 60, max 100
  }

  private calculateATSCompatibilityScore(): number {
    let score = 80; // Start with a good base score

    // Bonus for having basic structure
    if (this.resumeData.personalInfo.firstName && this.resumeData.personalInfo.email) {
      score += 5; // Contact info
    }

    if (this.resumeData.experience.length > 0) {
      score += 10; // Has experience
    } else {
      score -= 15; // Penalty for no experience
    }

    if (this.resumeData.education.length > 0) {
      score += 5; // Has education
    }

    if (this.resumeData.skills.length >= 3) {
      score += 5; // Has skills
    }

    // Bonus for quantified achievements
    const hasQuantifiedAchievements = this.resumeData.experience.some(exp =>
      exp.description.some(desc => 
        /\d+%|\$\d+|\d+\+|increased|decreased|improved|reduced/i.test(desc)
      )
    );
    if (hasQuantifiedAchievements) {
      score += 10; // Bonus instead of penalty
    }

    // Bonus for having summary
    if (this.resumeData.personalInfo.summary && this.resumeData.personalInfo.summary.length > 30) {
      score += 5;
    }

    return Math.min(100, Math.max(65, score)); // Ensure minimum 65, max 100
  }

  private calculateKeywordDensity(): number {
    const allText = this.getAllResumeText().toLowerCase();
    const words = allText.split(' ').filter(word => word.length > 2);
    const relevantKeywords = ATS_KEYWORDS[this.detectedIndustry as keyof typeof ATS_KEYWORDS];
    
    let keywordOccurrences = 0;
    relevantKeywords.forEach(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = allText.match(regex);
      if (matches) {
        keywordOccurrences += matches.length;
      }
    });

    return (keywordOccurrences / words.length) * 100;
  }

  private generateSuggestions(scores: any): ATSSuggestion[] {
    const suggestions: ATSSuggestion[] = [];

    // Formatting suggestions (more lenient)
    if (scores.formatting < 85) {
      if (!this.resumeData.personalInfo.phone) {
        suggestions.push({
          id: 'phone-missing',
          type: 'warning',
          category: 'formatting',
          title: 'Add Phone Number',
          description: 'Your resume is missing a phone number',
          suggestion: 'Add a professional phone number to your contact information',
          impact: 'medium'
        });
      }

      if (!this.resumeData.personalInfo.location) {
        suggestions.push({
          id: 'location-missing',
          type: 'info',
          category: 'formatting',
          title: 'Add Location',
          description: 'Location information is missing',
          suggestion: 'Add your city and state to help with location-based job matching',
          impact: 'low'
        });
      }
    }

    // Keyword suggestions (more lenient)
    if (scores.keywords < 75) {
      suggestions.push({
        id: 'keywords-low',
        type: scores.keywords < 65 ? 'critical' : 'warning',
        category: 'keywords',
        title: 'Increase Relevant Keywords',
        description: `Your resume could benefit from more ${this.detectedIndustry}-related keywords`,
        suggestion: `Add more relevant ${this.detectedIndustry} keywords and technologies to improve ATS matching`,
        impact: scores.keywords < 65 ? 'high' : 'medium'
      });
    }

    // Content suggestions
    if (!this.resumeData.personalInfo.summary || this.resumeData.personalInfo.summary.length < 50) {
      suggestions.push({
        id: 'summary-missing',
        type: 'critical',
        category: 'content',
        title: 'Add Professional Summary',
        description: 'Your resume lacks a compelling professional summary',
        suggestion: 'Add a 2-3 sentence summary highlighting your key qualifications and career objectives',
        impact: 'high'
      });
    }

    if (this.resumeData.skills.length < 3) {
      suggestions.push({
        id: 'skills-insufficient',
        type: 'critical',
        category: 'keywords',
        title: 'Add Skills Section',
        description: 'Your resume needs more skills listed',
        suggestion: 'Add relevant technical and soft skills to improve keyword matching',
        impact: 'high'
      });
    } else if (this.resumeData.skills.length < 5) {
      suggestions.push({
        id: 'skills-few',
        type: 'info',
        category: 'keywords',
        title: 'Consider Adding More Skills',
        description: 'Adding more skills could improve your ATS score',
        suggestion: 'Consider adding 2-3 more relevant skills to strengthen your profile',
        impact: 'low'
      });
    }

    // Experience suggestions (only if user has experience)
    if (this.resumeData.experience.length > 0) {
      const hasQuantifiedResults = this.resumeData.experience.some(exp =>
        exp.description.some(desc => /\d+/.test(desc))
      );
      
      if (!hasQuantifiedResults) {
        suggestions.push({
          id: 'quantify-achievements',
          type: 'info',
          category: 'content',
          title: 'Consider Quantifying Achievements',
          description: 'Adding numbers and metrics can strengthen your experience',
          suggestion: 'Consider adding numbers, percentages, and metrics to demonstrate your impact',
          impact: 'medium'
        });
      }

      // Action verb suggestions (less strict)
      let actionVerbCount = 0;
      let totalDescriptions = 0;
      
      this.resumeData.experience.forEach(exp => {
        exp.description.forEach(desc => {
          totalDescriptions++;
          if (ACTION_VERBS.some(verb => desc.toLowerCase().startsWith(verb.toLowerCase()))) {
            actionVerbCount++;
          }
        });
      });

      if (totalDescriptions > 0 && actionVerbCount / totalDescriptions < 0.5) {
        suggestions.push({
          id: 'action-verbs',
          type: 'info',
          category: 'content',
          title: 'Consider Using More Action Verbs',
          description: 'Starting bullet points with action verbs can improve readability',
          suggestion: 'Consider beginning more bullet points with action verbs like "Achieved", "Implemented", "Led"',
          impact: 'low'
        });
      }
    }

    // Premium user suggestions
    if (this.isPremiumUser && this.detectedInstitution) {
      const institutionData = INSTITUTION_BONUSES[this.detectedInstitution as keyof typeof INSTITUTION_BONUSES];
      suggestions.push({
        id: 'institution-optimization',
        type: 'info',
        category: 'keywords',
        title: 'Institution-Specific Optimization',
        description: `You're using a ${this.detectedInstitution} template`,
        suggestion: `Consider adding more ${institutionData.categories.join(', ')} keywords to maximize your institution bonus`,
        impact: 'medium'
      });
    }

    return suggestions;
  }

  public getAutoFixSuggestions(): { [key: string]: any } {
    const fixes: { [key: string]: any } = {};

    // Only suggest fixes if user has started entering data
    const hasAnyData = this.resumeData.personalInfo.firstName || 
                      this.resumeData.personalInfo.lastName || 
                      this.resumeData.personalInfo.email ||
                      this.resumeData.experience.length > 0 ||
                      this.resumeData.education.length > 0 ||
                      this.resumeData.skills.length > 0;

    if (!hasAnyData) {
      return fixes; // Return empty fixes if no data exists
    }

    // Auto-fix missing contact info only if user has basic info
    if (!this.resumeData.personalInfo.phone && (this.resumeData.personalInfo.firstName || this.resumeData.personalInfo.email)) {
      fixes.phone = '+1 (555) 123-4567'; // Placeholder
    }

    if (!this.resumeData.personalInfo.location && (this.resumeData.personalInfo.firstName || this.resumeData.personalInfo.email)) {
      fixes.location = 'City, State'; // Placeholder
    }

    // Auto-fix missing summary - only if we have meaningful data and user has started filling the resume
    if ((!this.resumeData.personalInfo.summary || this.resumeData.personalInfo.summary.length < 50) && hasAnyData) {
      const jobTitle = this.resumeData.personalInfo.jobTitle;
      const experience = this.resumeData.experience.length;
      const skills = this.resumeData.skills.slice(0, 3).map(s => s.name).filter(Boolean);
      
      // Only generate summary if we have meaningful data (job title AND either experience or skills)
      if (jobTitle && jobTitle.trim() && (experience > 0 || skills.length >= 2)) {
        let summaryParts = [];
        
        if (experience > 0 && skills.length > 0) {
          summaryParts.push(`Experienced ${jobTitle} with ${experience}+ years of expertise in ${skills.join(', ')}`);
        } else if (jobTitle && skills.length >= 2) {
          summaryParts.push(`${jobTitle} with expertise in ${skills.join(', ')}`);
        } else if (jobTitle && experience > 0) {
          summaryParts.push(`Experienced ${jobTitle} with ${experience}+ years of professional experience`);
        }
        
        if (summaryParts.length > 0) {
          summaryParts.push('Proven track record of delivering high-quality results and driving business growth through innovative solutions and strategic thinking.');
          fixes.summary = summaryParts.join('. ');
        }
      }
    }

    // Auto-fix skills if insufficient and user has some data
    if (this.resumeData.skills.length < 5 && hasAnyData && (this.resumeData.personalInfo.jobTitle || this.resumeData.experience.length > 0)) {
      const industryKeywords = ATS_KEYWORDS[this.detectedIndustry as keyof typeof ATS_KEYWORDS];
      const suggestedSkills = industryKeywords.slice(0, Math.min(3, 8 - this.resumeData.skills.length)).map(skill => ({
        id: `auto-${Date.now()}-${Math.random()}`,
        name: skill,
        level: 'Intermediate' as const
      }));
      if (suggestedSkills.length > 0) {
        fixes.skills = suggestedSkills;
      }
    }

    // Auto-fix experience descriptions
    const improvedExperience = this.resumeData.experience.map(exp => ({
      ...exp,
      description: exp.description.map(desc => {
        // Add action verbs if missing
        const startsWithActionVerb = ACTION_VERBS.some(verb => 
          desc.toLowerCase().startsWith(verb.toLowerCase())
        );
        
        if (!startsWithActionVerb && desc.length > 10) {
          const randomActionVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
          return `${randomActionVerb} ${desc.toLowerCase()}`;
        }
        
        return desc;
      })
    }));

    if (JSON.stringify(improvedExperience) !== JSON.stringify(this.resumeData.experience)) {
      fixes.experience = improvedExperience;
    }

    return fixes;
  }

  // Premium features
  public getDetailedAnalysis(): any {
    if (!this.isPremiumUser) {
      return null;
    }

    return {
      keywordDensity: this.calculateKeywordDensity(),
      industryMatch: this.detectedIndustry,
      institutionBonus: this.detectedInstitution ? INSTITUTION_BONUSES[this.detectedInstitution as keyof typeof INSTITUTION_BONUSES].bonus : 0,
      keywordAnalysis: this.getKeywordAnalysis(),
      competitorBenchmark: this.getCompetitorBenchmark()
    };
  }

  private getKeywordAnalysis(): any {
    const allText = this.getAllResumeText().toLowerCase();
    const relevantKeywords = ATS_KEYWORDS[this.detectedIndustry as keyof typeof ATS_KEYWORDS];
    
    const foundKeywords = relevantKeywords.filter(keyword => 
      allText.includes(keyword.toLowerCase())
    );
    
    const missingKeywords = relevantKeywords.filter(keyword => 
      !allText.includes(keyword.toLowerCase())
    ).slice(0, 10); // Top 10 missing keywords

    return {
      found: foundKeywords,
      missing: missingKeywords,
      total: relevantKeywords.length,
      coverage: (foundKeywords.length / relevantKeywords.length) * 100
    };
  }

  private getCompetitorBenchmark(): any {
    // Simulate competitor benchmark data
    const industryAverages = {
      software: { avgScore: 78, top25: 88, top10: 94 },
      business: { avgScore: 75, top25: 85, top10: 91 },
      research: { avgScore: 82, top25: 90, top10: 96 },
      engineering: { avgScore: 80, top25: 88, top10: 93 }
    };

    const currentScore = this.calculateATSScore()?.overall || 0;
    const industryData = industryAverages[this.detectedIndustry as keyof typeof industryAverages] || industryAverages.software;

    return {
      currentScore,
      industryAverage: industryData.avgScore,
      top25Percentile: industryData.top25,
      top10Percentile: industryData.top10,
      percentile: this.calculatePercentile(currentScore, industryData)
    };
  }

  private calculatePercentile(score: number, industryData: any): string {
    if (score >= industryData.top10) return 'Top 10%';
    if (score >= industryData.top25) return 'Top 25%';
    if (score >= industryData.avgScore) return 'Above Average';
    return 'Below Average';
  }
}

export const calculateATSScore = (resumeData: ResumeData, isPremiumUser: boolean = false): ATSScore | null => {
  const scorer = new ATSScorer(resumeData, isPremiumUser);
  return scorer.calculateATSScore();
};

export const getAutoFixes = (resumeData: ResumeData, isPremiumUser: boolean = false): { [key: string]: any } => {
  const scorer = new ATSScorer(resumeData, isPremiumUser);
  return scorer.getAutoFixSuggestions();
};

export const getDetailedAnalysis = (resumeData: ResumeData, isPremiumUser: boolean = false): any => {
  const scorer = new ATSScorer(resumeData, isPremiumUser);
  return scorer.getDetailedAnalysis();
};