import React, { useState } from "react";

const FolderCreator = ({ onCreate, onClose }) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    onCreate(folderName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-[#12181d] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl"
      >
        <h3 className="mb-2 font-semibold text-white text-md">
          Create New Subject Folder
        </h3>
        <p className="mb-4 text-xs text-gray-400">
          Enter folder name to structure your lessons:
        </p>

        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="e.g., Chemistry, Science"
          className="w-full bg-[#161f26] border border-gray-800 focus:border-emerald-500 text-sm text-gray-200 rounded-lg px-4 py-2.5 focus:outline-none mb-4 transition"
          required
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-gray-300 transition bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-bold text-black transition rounded-lg bg-emerald-500 hover:bg-emerald-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FolderCreator;
