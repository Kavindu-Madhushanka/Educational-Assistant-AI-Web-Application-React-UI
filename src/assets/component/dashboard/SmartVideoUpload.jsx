import React from "react";

const SmartVideoUpload = ({ onUploadClick }) => {
  return (
    <div className="bg-[#070c0e] border border-gray-800 rounded-2xl p-6 h-full flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📹</span>
        <h3 className="font-semibold text-gray-200 text-md">
          Smart Video Upload Hub
        </h3>
      </div>

      <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center bg-[#070c0e]">
        <div className="mb-2 text-4xl text-gray-400">☁️</div>
        <p className="mb-1 text-sm font-medium text-gray-300">
          Drag & Drop your video (MP4 / Zoom)
        </p>
        <span className="mb-4 text-xs text-gray-500">or</span>

        <div className="w-full flex max-w-md bg-[#070c0e] rounded-lg overflow-hidden border border-gray-800">
          <input
            type="text"
            placeholder="Paste YouTube Link here..."
            className="w-full px-4 py-2 text-xs text-gray-200 bg-transparent focus:outline-none"
          />
          <button
            onClick={onUploadClick}
            className="px-6 py-2 text-xs font-bold text-black transition bg-[#27ae60] hover:bg-[#2ecc71]"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartVideoUpload;
