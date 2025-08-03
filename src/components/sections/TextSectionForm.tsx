import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ListIcon, ListOrdered, BoldIcon, Link as LinkIcon } from 'lucide-react';

interface TextSectionFormProps {
  sectionId: string;
  content: string;
  onUpdateContent: (content: string) => void;
  isDescription?: boolean;
  showLinkInput: { id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null;
  setShowLinkInput: React.Dispatch<React.SetStateAction<{ id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null>>;
  activeFormat: string | null;
  setActiveFormat: React.Dispatch<React.SetStateAction<string | null>>;
  handleTextFormatting: (sectionId: string, action: string, isDescription?: boolean) => void;
  handleEnterKey: (sectionId: string, e: React.KeyboardEvent<HTMLTextAreaElement>, isDescription?: boolean) => void;
  addLink: (sectionId: string, url: string, isDescription?: boolean) => void;
}

const TextSectionForm: React.FC<TextSectionFormProps> = ({
  sectionId,
  content,
  onUpdateContent,
  isDescription = false,
  showLinkInput,
  setShowLinkInput,
  activeFormat,
  setActiveFormat,
  handleTextFormatting,
  handleEnterKey,
  addLink
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={content || ''}
        onChange={(e) => onUpdateContent(e.target.value)}
        onKeyDown={(e) => handleEnterKey(sectionId, e, isDescription)}
        placeholder={isDescription ? "Enter description here..." : "Enter your content here..."}
        rows={3}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
      />
      <div className="flex items-center space-x-0.5 mt-1 bg-gray-100 p-0.5 rounded-md">
        <button
          onClick={() => handleTextFormatting(sectionId, 'bullet', isDescription)}
          title="Add Bullet Points"
          className={`flex items-center justify-center w-5 h-5 rounded ${activeFormat === 'bullet' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <ListIcon className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleTextFormatting(sectionId, 'number', isDescription)}
          title="Add Numbered List"
          className={`flex items-center justify-center w-5 h-5 rounded ${activeFormat === 'number' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <ListOrdered className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleTextFormatting(sectionId, 'diamondBold', isDescription)}
          title="Add Diamond Points"
          className={`flex items-center justify-center w-5 h-5 rounded ${activeFormat === 'diamondBold' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <span className="text-xs">◆</span>
        </button>
        <button
          onClick={() => handleTextFormatting(sectionId, 'bold', isDescription)}
          title="Add Bold Text"
          className={`flex items-center justify-center w-5 h-5 rounded ${activeFormat === 'bold' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <BoldIcon className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleTextFormatting(sectionId, 'link', isDescription)}
          title="Add Link"
          className={`flex items-center justify-center w-5 h-5 rounded ${activeFormat === 'link' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <LinkIcon className="w-3 h-3" />
        </button>
      </div>
      {showLinkInput && showLinkInput.id === sectionId && showLinkInput.isDescription === isDescription && (
        <div className="mt-1 p-1.5 bg-white border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Enter URL (e.g., https://example.com)"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addLink(sectionId, (e.target as HTMLInputElement).value || 'https://example.com', isDescription);
              }
            }}
          />
          <button
            onClick={() => addLink(sectionId, (document.querySelector('input') as HTMLInputElement)?.value || 'https://example.com', isDescription)}
            className="mt-1 bg-blue-600 text-white px-2 py-0.5 rounded-md hover:bg-blue-700 text-xs"
          >
            Add Link
          </button>
        </div>
      )}
    </div>
  );
};

export default TextSectionForm;