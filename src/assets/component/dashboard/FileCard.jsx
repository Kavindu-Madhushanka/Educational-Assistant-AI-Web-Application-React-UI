import React from "react";
import { IoFolderOutline } from "react-icons/io5";

const FileCard = ({ folder }) => {
  return (
    <div className="w-full bg-[#070c0e] border border-gray-800/60 rounded-xl p-3.5 hover:border-[#27ae60] transition-all duration-200 group flex flex-col justify-between h-[105px]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#27ae60] rounded-lg text-[#070c0e] group-hover:scale-105 transition-transform">
          <IoFolderOutline />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 transition-colors group-hover:text-white line-clamp-1">
            {folder.name}
          </h4>
          <p className="text-[11px] text-gray-500">{folder.lessons} Lessons</p>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>Progress</span>
          <span className="font-medium text-gray-400">{folder.progress}%</span>
        </div>
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full bg-[#27ae60]"
            style={{ width: `${folder.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
