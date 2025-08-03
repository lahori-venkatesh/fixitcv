import React from 'react';
import { Trash2 } from 'lucide-react';
import TextSectionForm from './TextSectionForm';

interface ListSectionFormProps {
  sectionId: string;
  items: string[];
  description: string;
  onUpdateItems: (items: string[]) => void;
  onUpdateDescription: (description: string) => void;
  showLinkInput: { id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null;
  setShowLinkInput: React.Dispatch<React.SetStateAction<{ id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null>>;
  activeFormat: string | null;
  setActiveFormat: React.Dispatch<React.SetStateAction<string | null>>;
  handleTextFormatting: (sectionId: string, action: string, isDescription?: boolean) => void;
  handleEnterKey: (sectionId: string, e: React.KeyboardEvent<HTMLTextAreaElement>, isDescription?: boolean) => void;
  addLink: (sectionId: string, url: string, isDescription?: boolean) => void;
  descTextareaRef: React.RefObject<HTMLTextAreaElement>;
}

const ListSectionForm: React.FC<ListSectionFormProps> = ({
  sectionId,
  items,
  description,
  onUpdateItems,
  onUpdateDescription,
  showLinkInput,
  setShowLinkInput,
  activeFormat,
  setActiveFormat,
  handleTextFormatting,
  handleEnterKey,
  addLink,
  descTextareaRef
}) => {
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onUpdateItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdateItems(newItems);
  };

  const addItem = () => {
    const newItems = [...items, ''];
    onUpdateItems(newItems);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
        >
          + Add Item
        </button>
      </div>
      <div className="relative">
        <label className="block text-xs font-medium text-gray-700 mb-0.5">Description</label>
        <TextSectionForm
          sectionId={sectionId}
          content={description}
          onUpdateContent={onUpdateDescription}
          isDescription={true}
          showLinkInput={showLinkInput}
          setShowLinkInput={setShowLinkInput}
          activeFormat={activeFormat}
          setActiveFormat={setActiveFormat}
          handleTextFormatting={handleTextFormatting}
          handleEnterKey={handleEnterKey}
          addLink={addLink}
        />
      </div>
    </div>
  );
};

export default ListSectionForm;