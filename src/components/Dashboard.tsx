import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Download,
  Eye,
  Palette,
  FileText,
  Save,
  Trash2,
  Edit,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import { ResumeData, SectionOrder, ResumeCustomization } from "../types/resume";
import { useUser } from "@clerk/clerk-react";
import { getUserResumes, deleteResume, saveResume } from "../lib/supabase";

interface DashboardProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateCustomization: (customization: any) => void;
  setSelectedTemplate: (templateId: string) => void;
  sectionOrder: SectionOrder[];
  onSectionOrderChange: (newOrder: SectionOrder[]) => void;
  onSectionChange: (section: string) => void;
  onExport: () => void;
  selectedTemplate: string;
  saveResumeToSupabase?: (name: string) => Promise<any>;
  onResumeLoad: (resume: any) => void;
  currentResumeId?: string | null;
  isEditingExistingResume?: boolean;
  hasUnsavedChanges?: boolean;
  lastSaved?: Date | null;
  autoSaveEnabled?: boolean;
  onToggleAutoSave?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  resumeData,
  setResumeData,
  updateCustomization,
  setSelectedTemplate,
  onResumeLoad,
  currentResumeId,
  isEditingExistingResume,
  hasUnsavedChanges = false,
  lastSaved = null,
  autoSaveEnabled = true,
  onToggleAutoSave = () => {},
  onSectionOrderChange,
  onSectionChange,
  onExport,
  selectedTemplate,
  saveResumeToSupabase,
}) => {
  const [existingResumes, setExistingResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isLoaded } = useUser();
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Fetch user's resumes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!isLoaded || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const resumes = await getUserResumes(user.id);
        if (resumes) {
          setExistingResumes(resumes);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setError("Failed to load your resumes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [isLoaded, user]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If the clicked element is not inside a menu wrapper, close
      if (!target.closest(".menu-wrapper")) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const quickActions = [
    {
      icon: Palette,
      label: "Change Template",
      action: () => onSectionChange("templates"),
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: Eye,
      label: "Preview Resume",
      action: () => onSectionChange("preview"),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Download,
      label: "Download PDF",
      action: onExport,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: Save,
      label: "Save Resume",
      action: () => {
        if (saveResumeToSupabase) {
          setShowSaveModal(true);
          setResumeName(
            `${resumeData.personalInfo.firstName || "My"} ${
              resumeData.personalInfo.jobTitle || ""
            } Resume`.trim()
          );
        } else {
          // Fallback to localStorage if no Supabase function
          localStorage.setItem("resumeData", JSON.stringify(resumeData));

          // Show success message
          const successDiv = document.createElement("div");
          successDiv.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span style="font-weight: 600;">Resume saved successfully!</span>
              </div>
            </div>
          `;
          document.body.appendChild(successDiv);
          setTimeout(() => {
            if (document.body.contains(successDiv)) {
              document.body.removeChild(successDiv);
            }
          }, 3000);
        }
      },
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  const handleSaveResume = async () => {
    if (!saveResumeToSupabase || !resumeName.trim()) return;

    try {
      setIsSaving(true);
      setSaveError(null);

      const savedResume = await saveResumeToSupabase(resumeName);

      if (savedResume) {
        // Update the list of resumes
        const resumes = await getUserResumes(user!.id);
        if (resumes) {
          setExistingResumes(resumes);
        }

        setShowSaveModal(false);

        // Show success message
        const successDiv = document.createElement("div");
        successDiv.innerHTML = `
          <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span style="font-weight: 600;">Resume saved successfully!</span>
            </div>
          </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 3000);
      } else {
        setSaveError("Failed to save resume. Please try again.");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      setSaveError("An error occurred while saving your resume.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!user) return;

    try {
      setIsDeleting(true);

      const success = await deleteResume(resumeId, user.id);

      if (success) {
        // Update the list of resumes
        setExistingResumes(
          existingResumes.filter((resume) => resume.id !== resumeId)
        );

        // Show success message
        const successDiv = document.createElement("div");
        successDiv.innerHTML = `
          <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              <span style="font-weight: 600;">Resume deleted successfully</span>
            </div>
          </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 3000);
      } else {
        // Show error message
        setError("Failed to delete resume");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      setError("An error occurred while deleting your resume");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return "just now";
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const handleLoadResume = (resume: any) => {
    // Load the resume data into the current editor
    if (resume && resume.data) {
      // Set the current resume ID for editing
      if (onResumeLoad) {
        onResumeLoad(resume);
      }

      // Set the resume data
      setResumeData(resume.data);

      // Set customization if available
      if (resume.customization) {
        updateCustomization(resume.customization);
      }

      // Set template if available
      if (resume.template_id) {
        setSelectedTemplate(resume.template_id);
      }

      // Navigate to personal section to allow editing
      onSectionChange("personal");

      // Show success message
      const successDiv = document.createElement("div");
      successDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span style="font-weight: 600;">Resume loaded for editing! Save will update this resume.</span>
          </div>
        </div>
      `;
      document.body.appendChild(successDiv);
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
      }, 4000);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-12 flex flex-col justify-between items-center lg:flex-row"
        >
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-1">
              Welcome back,{" "}
              {resumeData.personalInfo.firstName || user?.firstName || "User"}!
              👋
            </h1>
            <p className="text-xl text-gray-600">
              Let's create an amazing resume together
            </p>
          </div>

          {/* Auto-save status */}
          {isEditingExistingResume && (
            <div className="mt-4 flex items-center justify-center space-x-4">
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Last saved:{" "}
                  {lastSaved.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-save:</span>
                <button
                  onClick={onToggleAutoSave}
                  className={`relative w-8 h-4 rounded-full transition-colors ${
                    autoSaveEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      autoSaveEnabled ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Create Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          
          <div className="w-full max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl transition-colors duration-200 cursor-pointer hover:border-black">
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Plus className="h-8 w-8 text-gray-600" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Create New Resume
                </h2>

                <p className="text-gray-500 mb-8 max-w-md">
                  Start building your professional resume from scratch or choose
                  from our curated templates.
                </p>

                <div className="flex flex-col lg:flex-row gap-4 w-full max-w-sm">
                  <div
                    onClick={() => onSectionChange("blank-editor")}
                    className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center p-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors duration-200 text-nowrap"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Start from Blank
                  </div>

                  <div
                    onClick={() => onSectionChange("templates")}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 flex items-center justify-center p-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200 text-nowrap"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Choose Template
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{action.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* My Resumes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Resumes ({existingResumes.length}){" "}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Resumes
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Retry
              </button>
            </div>
          ) : existingResumes.length > 0 ? (
            <div className="flex flex-wrap items-center gap-4">
              {existingResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group relative p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >

                  <div onClick={() => handleLoadResume(resume)} className="p-4">
                    <div className="h-3 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-56 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-44 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between relative">
                    <div onClick={() => handleLoadResume(resume)}>
                      <p className="text-sm font-medium text-gray-800">
                        {resume.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(resume.updated_at)} <span>•</span>{" "}
                        {resume.template_id
                          ? "Custom Template"
                          : "Default Template"}
                      </p>
                    </div>

                    <div className="relative menu-wrapper">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId((prev) =>
                            prev === resume.id ? null : resume.id
                          );
                        }}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </div>

                      {menuOpenId === resume.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                        >
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoadResume(resume);
                            }}
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(resume.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resumes yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first resume to get started
              </p>
              <button
                onClick={() => onSectionChange("blank-editor")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Your First Resume
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Save Resume Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Save Resume
            </h3>

            {saveError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {saveError}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume Name
              </label>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="e.g., Software Engineer Resume"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResume}
                disabled={isSaving || !resumeName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Resume</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Resume
            </h3>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this resume? This action cannot be
              undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteResume(showDeleteConfirm)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
