import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface Declaration {
  text: string;
  place?: string;
  date?: string;
  signature?: string;
}

interface DeclarationSectionFormProps {
  sectionId: string;
  content: string;
  onUpdateContent: (content: string) => void;
  customFields: { [key: string]: string };
  onUpdateCustomField: (field: string, value: string) => void;
}

const DeclarationSectionForm: React.FC<DeclarationSectionFormProps> = ({
  sectionId,
  content,
  onUpdateContent,
  customFields,
  onUpdateCustomField
}) => {
  // Parse declaration from content if it's a string
  let declaration: Declaration = {
    text: content || 'I hereby declare that all the information mentioned above is true to the best of my knowledge.'
  };
  
  // Get place and date from custom fields
  const place = customFields['Place'] || '';
  const date = customFields['Date'] || '';
  const signature = customFields['Signature'] || '';

  // Templates for declaration text
  const declarationTemplates = [
    'I hereby declare that all the information mentioned above is true to the best of my knowledge.',
    'I declare that the information provided in this resume is accurate and true to the best of my knowledge and belief.',
    'I certify that the information provided above is true and correct to the best of my knowledge.',
    'I solemnly declare that the information furnished above is free from any misrepresentation or false statement.'
  ];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-0.5">
          Declaration Text *
        </label>
        <select
          value={declarationTemplates.includes(declaration.text) ? declaration.text : 'custom'}
          onChange={(e) => {
            if (e.target.value !== 'custom') {
              onUpdateContent(e.target.value);
            }
          }}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2 text-xs"
        >
          {declarationTemplates.map((template, index) => (
            <option key={index} value={template}>
              Template {index + 1}
            </option>
          ))}
          <option value="custom">Custom Declaration</option>
        </select>
        
        <textarea
          value={declaration.text}
          onChange={(e) => onUpdateContent(e.target.value)}
          rows={2}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            <MapPin className="w-3 h-3 inline mr-0.5" />
            Place
          </label>
          <input
            type="text"
            value={place}
            onChange={(e) => onUpdateCustomField('Place', e.target.value)}
            placeholder="Vijayawada"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            <Calendar className="w-3 h-3 inline mr-0.5" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => onUpdateCustomField('Date', e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-0.5">
          Signature (text)
        </label>
        <input
          type="text"
          value={signature}
          onChange={(e) => onUpdateCustomField('Signature', e.target.value)}
          placeholder="Your Name"
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
        />
      </div>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Output Format:</strong> Declaration will appear on your resume as:
        </p>
        <p className="text-xs text-blue-600 mt-0.5">
          I hereby declare that all the information mentioned above is true to the best of my knowledge.<br />
          Place: Vijayawada<br />
          Date: 28 June 2025
        </p>
      </div>
    </div>
  );
};

export default DeclarationSectionForm;