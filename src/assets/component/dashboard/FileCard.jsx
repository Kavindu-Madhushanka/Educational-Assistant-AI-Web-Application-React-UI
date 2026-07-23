import React from "react";
import { IoFolderOutline } from "react-icons/io5";

const FileCard = ({ folder }) => {
  // Safe extraction of values from C# Backend or Frontend Fallback
  const folderName = folder?.folderName || folder?.name || "Untitled Folder";
  const lessonCount = folder?.lessonCount ?? folder?.lessonsCount ?? 0;
  const progressValue = folder?.progress ?? 50;

  return (
    <div className="w-full bg-[#070c0e] border border-gray-800/60 rounded-xl p-3.5 hover:border-[#27ae60] transition-all duration-200 group flex flex-col justify-between h-[105px]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#27ae60] rounded-lg text-[#070c0e] group-hover:scale-105 transition-transform">
          <IoFolderOutline />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 transition-colors group-hover:text-white line-clamp-1">
            {folderName}
          </h4>
          <p className="text-[11px] text-gray-500">{lessonCount} Lessons</p>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>Progress</span>
          <span className="font-medium text-gray-400">{progressValue}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full bg-[#27ae60]"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
