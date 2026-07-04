import React from "react";

const UploadPopup = ({ folders, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#12181d] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-md">
            Select a Subject Folder
          </h3>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="mb-3 text-xs text-gray-400">
          Choose where you want to save this video:
        </p>

        {/* Scrollable Folder Area */}
        <div className="pr-1 space-y-2 overflow-y-auto max-h-48 custom-scrollbar">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => {
                alert(`Uploaded to ${folder.name}!`);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 bg-[#161f26] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/40 rounded-lg text-left transition group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-yellow-400">📁</span>
                <span className="text-sm font-medium text-gray-200 group-hover:text-emerald-400">
                  {folder.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {folder.lessons} Lessons
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
      </div>
    </div>
  );
};

export default UploadPopup;
