import React, { useState } from "react";
import FileCard from "./FileCard";

const FileList = ({ folders, onCreateFolderClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <div className="flex items-center justify-between flex-shrink-0 w-full mb-4">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Your Subject Folders ({filteredFolders.length})
        </h3>

        <div className="flex items-center gap-3">
          {/*  Search Input */}
          <input
            type="text"
            placeholder="Search folder..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#12181d] border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 w-[160px] md:w-[180px] transition-all"
          />

          {/* Create Folder Button */}
          <button
            onClick={onCreateFolderClick}
            className="px-4 py-1.5 text-xs font-medium bg-[#1e293b] hover:bg-emerald-600 border border-gray-800 hover:border-emerald-500 rounded-lg text-gray-200 hover:text-white transition-all flex items-center gap-1.5 duration-200 flex-shrink-0"
          >
            <span>+</span> Create Folder
          </button>
        </div>
      </div>

      <div
        className="flex-1 min-h-0 pr-1 overflow-y-auto 
     [&::-webkit-scrollbar]:w-[5px] 
     [&::-webkit-scrollbar-thumb]:bg-gray-800 
     [&::-webkit-scrollbar-thumb]:rounded-full 
     hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500 
     [&::-webkit-scrollbar-track]:bg-transparent
      "
      >
        {filteredFolders.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
            {filteredFolders.map((folder) => (
              <FileCard key={folder.id} folder={folder} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-sm text-center text-gray-500">
            No folders found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;
