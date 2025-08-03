import React from 'react';
import { Trash2, Phone, Mail, Building, User } from 'lucide-react';

interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship?: string;
}

interface ReferencesFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  // Convert string items to reference objects if needed
  const references: Reference[] = items.map(item => {
    if (typeof item === 'string') {
      return {
        name: item,
        position: '',
        company: '',
        email: '',
        phone: '',
        relationship: ''
      };
    }
    return item;
  });

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    onUpdateItems(updatedReferences);
  };

  const addReference = () => {
    const newReferences = [...references, { 
      name: '', 
      position: '', 
      company: '',
      email: '',
      phone: '',
      relationship: ''
    }];
    onUpdateItems(newReferences);
  };

  const removeReference = (index: number) => {
    const newReferences = references.filter((_, i) => i !== index);
    onUpdateItems(newReferences);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {references.map((reference, index) => (
          <div key={index} className="p-2 border border-gray-200 rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  <User className="w-3 h-3 inline mr-0.5" />
                  Reference Name *
                </label>
                <input
                  type="text"
                  value={reference.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Position/Title *
                </label>
                <input
                  type="text"
                  value={reference.position}
                  onChange={(e) => updateReference(index, 'position', e.target.value)}
                  placeholder="Senior Manager"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>
            
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-0.5">
                <Building className="w-3 h-3 inline mr-0.5" />
                Company/Organization *
              </label>
              <input
                type="text"
                value={reference.company}
                onChange={(e) => updateReference(index, 'company', e.target.value)}
                placeholder="ABC Corporation"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  <Mail className="w-3 h-3 inline mr-0.5" />
                  Email *
                </label>
                <input
                  type="email"
                  value={reference.email}
                  onChange={(e) => updateReference(index, 'email', e.target.value)}
                  placeholder="john.smith@example.com"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  <Phone className="w-3 h-3 inline mr-0.5" />
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={reference.phone || ''}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">
                Relationship (optional)
              </label>
              <input
                type="text"
                value={reference.relationship || ''}
                onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                placeholder="Former Manager, Colleague, etc."
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            </div>
            
            <div className="flex justify-end mt-2">
              <button
                onClick={() => removeReference(index)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-xs"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={addReference}
        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
      >
        + Add Reference
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Output Format:</strong> References will appear on your resume as:
        </p>
        <p className="text-xs text-blue-600 mt-0.5">
          <strong>John Smith</strong> - Senior Manager, ABC Corporation<br />
          Email: john.smith@example.com | Phone: +1 (555) 123-4567
        </p>
        <p className="text-xs text-blue-500 mt-0.5">
          <strong>Important:</strong> Always ask permission before listing someone as a reference
        </p>
      </div>
    </div>
  );
};

export default ReferencesForm;