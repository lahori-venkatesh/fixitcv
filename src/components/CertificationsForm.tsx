import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Award, ExternalLink, Building } from 'lucide-react';
import { Certification } from '../types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onUpdate: (certifications: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ certifications, onUpdate }) => {
  const [expandedCertification, setExpandedCertification] = useState<number | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    onUpdate([...certifications, newCertification]);
    setExpandedCertification(certifications.length);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    onUpdate(updatedCertifications);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    onUpdate(updatedCertifications);
    if (expandedCertification === index) {
      setExpandedCertification(null);
    }
  };

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(now.getMonth() + 3);
    return expiry > now && expiry <= threeMonthsFromNow;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add your professional certifications and credentials
          </p>
        </div>
        <motion.button
          onClick={addCertification}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {certifications.map((certification, index) => (
          <motion.div
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Certification Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setExpandedCertification(expandedCertification === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {certification.name || `Certification ${index + 1}`}
                    </h4>
                    {certification.expiryDate && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isExpired(certification.expiryDate)
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : isExpiringSoon(certification.expiryDate)
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {isExpired(certification.expiryDate)
                          ? 'Expired'
                          : isExpiringSoon(certification.expiryDate)
                          ? 'Expiring Soon'
                          : 'Active'
                        }
                      </span>
                    )}
                  </div>
                  {certification.issuer && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Issued by {certification.issuer}
                    </p>
                  )}
                  {certification.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Obtained: {new Date(certification.date).toLocaleDateString()}
                      {certification.expiryDate && (
                        <span className="ml-2">
                          • Expires: {new Date(certification.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCertification(index);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Certification Form */}
            <AnimatePresence>
              {expandedCertification === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Certification Name *
                        </label>
                        <input
                          type="text"
                          value={certification.name}
                          onChange={(e) => updateCertification(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Building className="w-4 h-4 inline mr-1" />
                          Issuing Organization *
                        </label>
                        <input
                          type="text"
                          value={certification.issuer}
                          onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Amazon Web Services"
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          value={certification.date}
                          onChange={(e) => updateCertification(index, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Expiry Date (if applicable)
                        </label>
                        <input
                          type="date"
                          value={certification.expiryDate}
                          onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Credential Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Credential ID
                        </label>
                        <input
                          type="text"
                          value={certification.credentialId}
                          onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="ABC123DEF456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <ExternalLink className="w-4 h-4 inline mr-1" />
                          Verification URL
                        </label>
                        <input
                          type="url"
                          value={certification.url}
                          onChange={(e) => updateCertification(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="https://verify.certification.com/..."
                        />
                      </div>
                    </div>

                    {/* Status Indicators */}
                    {certification.expiryDate && (
                      <div className={`p-3 rounded-lg ${
                        isExpired(certification.expiryDate)
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                          : isExpiringSoon(certification.expiryDate)
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                          : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <Award className={`w-4 h-4 ${
                            isExpired(certification.expiryDate)
                              ? 'text-red-500'
                              : isExpiringSoon(certification.expiryDate)
                              ? 'text-yellow-500'
                              : 'text-green-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            isExpired(certification.expiryDate)
                              ? 'text-red-800 dark:text-red-200'
                              : isExpiringSoon(certification.expiryDate)
                              ? 'text-yellow-800 dark:text-yellow-200'
                              : 'text-green-800 dark:text-green-200'
                          }`}>
                            {isExpired(certification.expiryDate)
                              ? 'This certification has expired'
                              : isExpiringSoon(certification.expiryDate)
                              ? 'This certification expires within 3 months'
                              : 'This certification is currently active'
                            }
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {certifications.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No certifications yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your professional certifications to showcase your expertise and credentials.
          </p>
          <button
            onClick={addCertification}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Certification
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;