import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, User, Globe, Plus, Trash2, Link as LinkIcon, X, Save, RotateCcw } from 'lucide-react';
import { PersonalInfo } from '../types/resume';

// Utility function to get the appropriate icon for a link
const getLinkIcon = (url: string, label: string) => {
  const lowerUrl = url.toLowerCase();
  const lowerLabel = label.toLowerCase();
  
  if (lowerUrl.includes('linkedin') || lowerLabel.includes('linkedin')) return LinkIcon;
  if (lowerUrl.includes('github') || lowerLabel.includes('github')) return LinkIcon;
  if (lowerUrl.includes('twitter') || lowerLabel.includes('twitter')) return LinkIcon;
  if (lowerUrl.includes('instagram') || lowerLabel.includes('instagram')) return LinkIcon;
  if (lowerUrl.includes('facebook') || lowerLabel.includes('facebook')) return LinkIcon;
  if (lowerUrl.includes('youtube') || lowerLabel.includes('youtube')) return LinkIcon;
  if (lowerUrl.includes('medium') || lowerLabel.includes('medium')) return LinkIcon;
  if (lowerUrl.includes('discord') || lowerLabel.includes('discord')) return LinkIcon;
  
  return LinkIcon; // Default icon
};

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onUpdate: (personalInfo: Partial<PersonalInfo>) => void;
}

interface CustomLink {
  id: string;
  label: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
  isLiked: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, onUpdate }) => {
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(
    personalInfo.customLinks?.map(link => ({ ...link, isLiked: false })) || []
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [customLabel, setCustomLabel] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');
  const [activeFields, setActiveFields] = useState<{ [key: string]: boolean }>({
    dateOfBirth: !!personalInfo.dateOfBirth,
    nationality: !!personalInfo.nationality,
    passportOrId: !!personalInfo.passportOrId,
    maritalStatus: !!personalInfo.maritalStatus,
    militaryService: !!personalInfo.militaryService,
    drivingLicense: !!personalInfo.drivingLicense,
    gender: !!personalInfo.gender,
    visa: !!personalInfo.visa,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically save to backend/localStorage
      localStorage.setItem('resumePersonalInfo', JSON.stringify(personalInfo));
      
      setSaveMessage('Personal information saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all personal information? This action cannot be undone.')) {
      onUpdate({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        jobTitle: '',
        dateOfBirth: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        passportOrId: '',
        militaryService: '',
        drivingLicense: '',
        visa: '',
        summary: '',
        customLinks: []
      });
      setCustomLinks([]);
      setActiveFields({
        dateOfBirth: false,
        nationality: false,
        passportOrId: false,
        maritalStatus: false,
        militaryService: false,
        drivingLicense: false,
        gender: false,
        visa: false,
      });
      setSaveMessage('All personal information cleared.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const toggleLike = (id: string) => {
    const updatedLinks = customLinks.map(link =>
      link.id === id ? { ...link, isLiked: !link.isLiked } : link
    );
    setCustomLinks(updatedLinks);
    onUpdate({ customLinks: updatedLinks });
  };

  const handleEditLink = (link: CustomLink) => {
    setEditingLinkId(link.id);
    setEditLabel(link.label);
    setEditUrl(link.url);
  };

  const handleUpdateLink = (id: string) => {
    const updatedLinks = customLinks.map(link =>
      link.id === id ? { ...link, label: editLabel, url: editUrl } : link
    );
    setCustomLinks(updatedLinks);
    onUpdate({ customLinks: updatedLinks });
    setEditingLinkId(null);
    setEditLabel('');
    setEditUrl('');
  };

  const availablePlatforms = [
    { id: 'linkedin', label: 'LinkedIn', icon: LinkIcon, placeholder: 'linkedin.com/in/yourname' },
    { id: 'github', label: 'GitHub', icon: LinkIcon, placeholder: 'github.com/yourusername' },
    { id: 'twitter', label: 'Twitter/X', icon: LinkIcon, placeholder: 'twitter.com/yourusername' },
    { id: 'instagram', label: 'Instagram', icon: LinkIcon, placeholder: 'instagram.com/yourusername' },
    { id: 'facebook', label: 'Facebook', icon: LinkIcon, placeholder: 'facebook.com/yourname' },
    { id: 'youtube', label: 'YouTube', icon: LinkIcon, placeholder: 'youtube.com/@yourchannel' },
    { id: 'website', label: 'Website', icon: LinkIcon, placeholder: 'yourportfolio.com' },
    { id: 'portfolio', label: 'Portfolio', icon: LinkIcon, placeholder: 'yourportfolio.com' },
    { id: 'medium', label: 'Medium', icon: LinkIcon, placeholder: 'medium.com/@yourusername' },
    { id: 'discord', label: 'Discord', icon: LinkIcon, placeholder: 'yourdiscordtag' },
    { id: 'custom', label: 'Custom Link', icon: LinkIcon, placeholder: 'Enter custom URL' }
  ];

  const addCustomLink = () => {
    if (!selectedPlatform || !customUrl.trim()) return;

    const platform = availablePlatforms.find(p => p.id === selectedPlatform);
    if (!platform) return;

    const newLink: CustomLink = {
      id: Date.now().toString(),
      label: customLabel.trim() || platform.label,
      url: customUrl.trim(),
      icon: platform.icon,
      isActive: true,
      isLiked: false
    };

    const updatedLinks = [...customLinks, newLink];
    setCustomLinks(updatedLinks);
    onUpdate({ customLinks: updatedLinks });
    
    setSelectedPlatform('');
    setCustomLabel('');
    setCustomUrl('');
  };

  const removeCustomLink = (id: string) => {
    const updatedLinks = customLinks.filter(link => link.id !== id);
    setCustomLinks(updatedLinks);
    onUpdate({ customLinks: updatedLinks });
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    const platform = availablePlatforms.find(p => p.id === platformId);
    if (platform && platformId !== 'custom') {
      setCustomLabel(platform.label);
    } else {
      setCustomLabel('');
    }
    setCustomUrl('');
  };

  const toggleField = (field: string) => {
    setActiveFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const resetField = (field: string) => {
    handleChange(field as keyof PersonalInfo, '');
    setActiveFields(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="space-y-5">
      {/* Personal Details Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Personal Details</h3>
            <p className="text-gray-600 text-xs">Basic information about yourself</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={`${personalInfo.firstName} ${personalInfo.lastName}`.trim()}
              onChange={(e) => {
                const names = e.target.value.split(' ');
                const firstName = names[0] || '';
                const lastName = names.slice(1).join(' ') || '';
                onUpdate({ firstName, lastName });
              }}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g., Software Engineer, Marketing Manager"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                value={personalInfo.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={personalInfo.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, State/Country"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons for Personal Details */}
        <div className="flex justify-end items-center space-x-3 mt-4">
          {saveMessage && (
            <span className={`text-xs font-medium ${
              saveMessage.includes('success') ? 'text-green-600' : 
              saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-xs disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
            <p className="text-gray-600 text-xs">Additional personal details (optional)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {['dateOfBirth', 'nationality', 'passportOrId', 'maritalStatus', 'militaryService', 'drivingLicense', 'gender', 'visa'].map((field) => (
            <React.Fragment key={field}>
              {!activeFields[field] ? (
                <button
                  onClick={() => toggleField(field)}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-200 text-xs font-medium"
                >
                  <Plus className="w-3 h-3" />
                  <span>
                    {field === 'dateOfBirth' ? 'Date of Birth' :
                     field === 'passportOrId' ? 'Passport or Id' :
                     field === 'maritalStatus' ? 'Marital Status' :
                     field === 'militaryService' ? 'Military Service' :
                     field === 'drivingLicense' ? 'Driving License' :
                     field === 'gender' ? 'Gender/Pronoun' : 
                     field === 'nationality' ? 'Nationality' : 'Visa'}
                  </span>
                </button>
              ) : (
                <div className="flex items-center space-x-1.5 w-full mb-3">
                  {field === 'dateOfBirth' && (
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth || ''}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                  {field === 'nationality' && (
                    <input
                      type="text"
                      value={personalInfo.nationality || ''}
                      onChange={(e) => handleChange('nationality', e.target.value)}
                      placeholder="Enter nationality"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                  {field === 'passportOrId' && (
                    <input
                      type="text"
                      value={personalInfo.passportOrId || ''}
                      onChange={(e) => handleChange('passportOrId', e.target.value)}
                      placeholder="Enter passport or ID"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                {field === 'maritalStatus' && (
                    <select
                      value={personalInfo.maritalStatus || ''}
                      onChange={(e) => handleChange('maritalStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 text-sm"
                    >
                      <option value="">Select marital status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  )}
                  {field === 'militaryService' && (
                    <input
                      type="text"
                      value={personalInfo.militaryService || ''}
                      onChange={(e) => handleChange('militaryService', e.target.value)}
                      placeholder="Enter military service details"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                  {field === 'drivingLicense' && (
                    <input
                      type="text"
                      value={personalInfo.drivingLicense || ''}
                      onChange={(e) => handleChange('drivingLicense', e.target.value)}
                      placeholder="Enter driving license number"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                  {field === 'gender' && (
                    <select
                      value={personalInfo.gender || ''}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 text-sm"
                    >
                      <option value="">Select gender/pronoun</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="He/Him">He/Him</option>
                      <option value="She/Her">She/Her</option>
                      <option value="They/Them">They/Them</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  )}
                  {field === 'visa' && (
                    <input
                      type="text"
                      value={personalInfo.visa || ''}
                      onChange={(e) => handleChange('visa', e.target.value)}
                      placeholder="Enter visa details"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                    />
                  )}
                  <button
                    onClick={() => resetField(field)}
                    className="p-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action Buttons for Personal Information */}
        <div className="flex justify-end items-center space-x-3 mt-4">
          {saveMessage && (
            <span className={`text-xs font-medium ${
              saveMessage.includes('success') ? 'text-green-600' : 
              saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-xs disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Links</h3>
            <p className="text-gray-600 text-xs">Add your professional and social media profiles</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Select Platform
          </label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {availablePlatforms.map((platform) => {
              const Icon = platform.icon;
              const existingLink = customLinks.find(link => link.label === platform.label);
              return (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className={`flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-200 text-xs font-medium ${
                    selectedPlatform === platform.id ? 'border-purple-500 bg-purple-50 text-purple-700' : ''
                  } ${existingLink ? 'bg-green-100 border-green-300 text-green-700' : ''}`}
                  disabled={!!existingLink}
                >
                  <Icon className="w-3 h-3" />
                  <span>{platform.label}</span>
                </button>
              );
            })}
          </div>

          {selectedPlatform && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Display Label
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder={selectedPlatform === 'custom' ? 'e.g., My Portfolio' : availablePlatforms.find(p => p.id === selectedPlatform)?.label}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder={availablePlatforms.find(p => p.id === selectedPlatform)?.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => { setSelectedPlatform(''); setCustomLabel(''); setCustomUrl(''); }}
                  className="px-3 py-1.5 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomLink}
                  disabled={!customUrl.trim()}
                  className="px-3 py-1.5 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {customLinks.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Added Links</h4>
            <div className="space-y-2">
              {customLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div key={link.id} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    {editingLinkId === link.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Display Label
                            </label>
                            <input
                              type="text"
                              value={editLabel}
                              onChange={(e) => setEditLabel(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Link URL
                            </label>
                            <input
                              type="url"
                              value={editUrl}
                              onChange={(e) => setEditUrl(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingLinkId(null)}
                            className="px-3 py-1.5 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateLink(link.id)}
                            disabled={!editUrl.trim()}
                            className="px-3 py-1.5 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-xs"
                          >
                            <Save className="w-3 h-3" />
                            <span>Update</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const IconComponent = getLinkIcon(link.url, link.label);
                            return <IconComponent className="w-4 h-4 text-gray-600" />;
                          })()}
                          <div>
                            <div className="font-medium text-sm text-gray-900">{link.label}</div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">{link.url}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleLike(link.id)}
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              link.isLiked ? 'bg-green-300 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } transition-colors`}
                          >
                            Like
                          </button>
                          <button
                            onClick={() => handleEditLink(link)}
                            className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
                            title="Edit link"
                          >
                            <LinkIcon className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeCustomLink(link.id)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Delete link"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons for Links */}
        <div className="flex justify-end items-center space-x-3 mt-4">
          {saveMessage && (
            <span className={`text-xs font-medium ${
              saveMessage.includes('success') ? 'text-green-600' : 
              saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-xs disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;