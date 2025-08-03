import React, { useState } from 'react';
import { Trash2, Heart, Plus } from 'lucide-react';

interface InterestsFormProps {
  sectionId: string;
  content: string;
  onUpdateContent: (content: string) => void;
}

const InterestsForm: React.FC<InterestsFormProps> = ({
  sectionId,
  content,
  onUpdateContent
}) => {
  // Parse interests from content
  const [interests, setInterests] = useState<string[]>(
    content ? content.split(',').map(interest => interest.trim()) : []
  );
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (!newInterest.trim()) return;
    const updatedInterests = [...interests, newInterest.trim()];
    setInterests(updatedInterests);
    onUpdateContent(updatedInterests.join(', '));
    setNewInterest('');
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    onUpdateContent(updatedInterests.join(', '));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  // Common interest suggestions
  const interestSuggestions = [
    'Reading', 'Photography', 'Traveling', 'Cooking', 'Hiking',
    'Painting', 'Music', 'Gaming', 'Blogging', 'Yoga',
    'Running', 'Swimming', 'Cycling', 'Chess', 'Volunteering',
    'Gardening', 'Coding', 'Podcasting', 'Meditation', 'Dancing'
  ];

  // Filter out suggestions that are already in interests
  const filteredSuggestions = interestSuggestions.filter(suggestion => 
    !interests.some(interest => 
      interest.toLowerCase() === suggestion.toLowerCase()
    )
  );

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-0.5">
          <Heart className="w-3 h-3 inline mr-0.5" />
          Add New Interest
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an interest (e.g., Photography)"
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
          />
          <button
            onClick={addInterest}
            className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors text-xs"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Current Interests
        </label>
        <div className="flex flex-wrap gap-1">
          {interests.map((interest, index) => (
            interest.trim() && (
              <div 
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
              >
                <span>{interest}</span>
                <button
                  onClick={() => removeInterest(index)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            )
          ))}
          {interests.length === 0 && (
            <p className="text-xs text-gray-500 italic">No interests added yet</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Suggestions
        </label>
        <div className="flex flex-wrap gap-1">
          {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                const updatedInterests = [...interests, suggestion];
                setInterests(updatedInterests);
                onUpdateContent(updatedInterests.join(', '));
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs transition-colors"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Output Format:</strong> Interests will appear on your resume as:
        </p>
        <p className="text-xs text-blue-600 mt-0.5">
          <strong>Interests:</strong> Reading, Photography, Traveling, Cooking, Hiking
        </p>
        <p className="text-xs text-blue-500 mt-0.5">
          Tip: Include interests that align with your career goals or showcase transferable skills
        </p>
      </div>
    </div>
  );
};

export default InterestsForm;