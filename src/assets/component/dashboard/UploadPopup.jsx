import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPopup = ({ folders, videoUrl, onClose, onSetupComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [lessonName, setLessonName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    setStep(2);
  };

  const handleSetup = async () => {
    if (!lessonName.trim()) {
      alert("Please enter a lesson name!");
      return;
    }

    try {
      setLoading(true);

      // C# Backend DTO structure: { folderId, lessonTitle, videoUrl }
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/createlesson",
        {
          folderId: selectedFolder.folderID,
          lessonTitle: lessonName,
          videoUrl: videoUrl || "",
        },
      );

      //alert(`Lesson "${lessonName}" created successfully!`);

      if (onSetupComplete) {
        onSetupComplete(response.data);
      }
      onClose();
      const lessonId = response.data.lessons.lessonId;
      navigate(`/studyroom/${lessonId}`);
    } catch (err) {
      console.error("Error creating lesson:", err);
      alert(
        err.response?.data?.message ||
          "Failed to create lesson. Please try again!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#12181d] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
        {/* HEADER AREA */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-md">
            {step === 1 ? "Select a Subject Folder" : "Lesson Setup"}
          </h3>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* --- STEP 1: FOLDER LIST --- */}
        {step === 1 && (
          <>
            <p className="mb-3 text-xs text-gray-400">
              Choose where you want to save this video:
            </p>

            <div className="pr-1 space-y-2 overflow-y-auto max-h-48 custom-scrollbar">
              {folders.map((folder) => (
                <button
                  key={folder.folderID || folder.id}
                  onClick={() => handleFolderSelect(folder)}
                  className="w-full flex items-center justify-between p-3 bg-[#161f26] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/40 rounded-lg text-left transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-yellow-400">📁</span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-emerald-400">
                      {folder.folderName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {folder.lessonsCount || 0} Lessons
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 mt-4 border-t border-gray-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs text-gray-300 transition bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* --- STEP 2: LESSON NAME INPUT & SETUP --- */}
        {step === 2 && (
          <>
            <p className="mb-4 text-xs text-gray-400">
              Selected Folder:{" "}
              <span className="font-medium text-emerald-400">
                {selectedFolder?.folderName}
              </span>
            </p>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">
                Lesson Name / Lecture Title
              </label>
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                placeholder="e.g., Introduction to Neural Networks"
                className="w-full px-3 py-2 text-sm bg-[#161f26] border border-gray-800 focus:border-emerald-500/50 rounded-lg text-white focus:outline-none transition"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 mt-5 border-t border-gray-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-gray-400 transition hover:text-white"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={handleSetup}
                disabled={loading}
                className="px-5 py-2 text-xs font-semibold text-black transition rounded-lg shadow-lg bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Setup & Go Study Room"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPopup;
