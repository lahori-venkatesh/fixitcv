import React, { useState } from 'react';
import { Zap, Sparkles, User } from 'lucide-react';
import TextSectionForm from './TextSectionForm';

interface ProfessionalSummaryFormProps {
  sectionId: string;
  content: string;
  onUpdateContent: (content: string) => void;
  showLinkInput: { id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null;
  setShowLinkInput: React.Dispatch<React.SetStateAction<{ id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null>>;
  activeFormat: string | null;
  setActiveFormat: React.Dispatch<React.SetStateAction<string | null>>;
  handleTextFormatting: (sectionId: string, action: string, isDescription?: boolean) => void;
  handleEnterKey: (sectionId: string, e: React.KeyboardEvent<HTMLTextAreaElement>, isDescription?: boolean) => void;
  addLink: (sectionId: string, url: string, isDescription?: boolean) => void;
}

const ProfessionalSummaryForm: React.FC<ProfessionalSummaryFormProps> = ({
  sectionId,
  content,
  onUpdateContent,
  showLinkInput,
  setShowLinkInput,
  activeFormat,
  setActiveFormat,
  handleTextFormatting,
  handleEnterKey,
  addLink
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Templates for professional summaries
  const summaryTemplates = [
    "Results-driven [Job Title] with [X] years of experience in [Industry/Field]. Proven track record of [Key Achievement] and [Key Skill]. Adept at [Relevant Skill] and [Relevant Skill], resulting in [Positive Outcome]. Seeking to leverage expertise in [Area of Expertise] to drive success at [Target Company/Role].",
    
    "Detail-oriented [Job Title] with expertise in [Skill] and [Skill]. Demonstrated success in [Achievement] and [Achievement]. Passionate about [Industry/Field] with a focus on [Specialty Area]. Committed to [Value Proposition] while delivering [Benefit to Employer].",
    
    "Innovative [Job Title] with [X]+ years specializing in [Specialty]. Consistently [Achievement] through implementing [Strategy/Approach]. Recognized for [Recognition/Award] and ability to [Key Strength]. Eager to apply [Skill] and [Skill] to help [Target Company] achieve [Company Goal]."
  ];

  const generateAISummary = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random professional summary based on templates
      const template = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
      const generatedSummary = template
        .replace('[Job Title]', 'Software Engineer')
        .replace('[X]', '5')
        .replace('[Industry/Field]', 'web application development')
        .replace('[Key Achievement]', 'reducing system latency by 40%')
        .replace('[Key Skill]', 'optimizing database performance')
        .replace('[Relevant Skill]', 'implementing microservices architecture')
        .replace('[Relevant Skill]', 'leading cross-functional teams')
        .replace('[Positive Outcome]', 'improved user experience and system scalability')
        .replace('[Area of Expertise]', 'full-stack development')
        .replace('[Target Company/Role]', 'innovative tech companies')
        .replace('[Specialty]', 'React and Node.js')
        .replace('[Achievement]', 'delivered high-quality applications')
        .replace('[Strategy/Approach]', 'agile methodologies')
        .replace('[Recognition/Award]', 'being a top contributor')
        .replace('[Key Strength]', 'solve complex technical challenges')
        .replace('[Skill]', 'JavaScript expertise')
        .replace('[Skill]', 'system architecture design')
        .replace('[Target Company]', 'your organization')
        .replace('[Company Goal]', 'technical excellence and business growth');
      
      onUpdateContent(generatedSummary);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <User className="w-3 h-3 text-blue-600 mr-1" />
          <h4 className="text-sm font-medium text-gray-900">Professional Summary</h4>
        </div>
        <button
          onClick={generateAISummary}
          disabled={isGenerating}
          className="flex items-center space-x-1 bg-purple-600 text-white px-2 py-1 rounded-md hover:bg-purple-700 transition-colors text-xs disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Zap className="w-3 h-3" />
              <span>AI Generate</span>
            </>
          )}
        </button>
      </div>
      
      <TextSectionForm
        sectionId={sectionId}
        content={content}
        onUpdateContent={onUpdateContent}
        showLinkInput={showLinkInput}
        setShowLinkInput={setShowLinkInput}
        activeFormat={activeFormat}
        setActiveFormat={setActiveFormat}
        handleTextFormatting={handleTextFormatting}
        handleEnterKey={handleEnterKey}
        addLink={addLink}
      />
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Tips for an effective professional summary:</strong>
        </p>
        <ul className="text-xs text-blue-600 mt-0.5 space-y-0.5 list-disc list-inside">
          <li>Keep it concise (3-5 sentences)</li>
          <li>Highlight your most relevant skills and achievements</li>
          <li>Tailor it to the specific job you're applying for</li>
          <li>Use strong action verbs and quantify results when possible</li>
          <li>Avoid first-person pronouns (I, me, my)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;