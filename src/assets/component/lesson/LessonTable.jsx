import React, { useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

const LessonTable = ({ folderName, lessons = [], onDeleteLesson }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="p-2 select-none md:p-6">
      {/* Folder Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📁</span>
        <h1 className="text-2xl md:text-3xl font-black text-[#2ecc71] tracking-tight drop-shadow-[0_2px_10px_rgba(46,204,113,0.3)]">
          {folderName}
        </h1>
      </div>

      {/* Table Container */}
      <div className="bg-[#04080a] border border-[#2ecc71]/30 rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.8)] relative">
        <table className="w-full text-xs text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-900/80 text-gray-400 uppercase tracking-widest font-mono text-[11px] bg-[#070e12]">
              <th className="w-16 px-6 py-4">#</th>
              <th className="px-6 py-4">Lecture Title</th>
              <th className="px-6 py-4">Upload Date</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-200 divide-y divide-gray-900/50">
            {lessons.map((lesson, index) => (
              <tr
                key={lesson.lessonId || index}
                className="hover:bg-[#2ecc71]/5 transition duration-200"
              >
                <td className="px-6 py-4 font-mono text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-100">
                  {lesson.lessonTitle}
                </td>
                <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">
                  {lesson.uploadDate || "2024-05-10"}
                </td>
                <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">
                  {lesson.duration || "42:15"}
                </td>

                {/* Action Buttons */}
                <td className="relative px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="px-4 py-1.5 border border-[#2ecc71]/50 rounded-lg text-[#2ecc71] hover:bg-[#2ecc71] hover:text-black font-semibold transition duration-200 shadow-[0_0_10px_rgba(46,204,113,0.15)]">
                      Enter Study Room
                    </button>

                    {/* Three Dots Button */}
                    <button
                      onClick={() => toggleMenu(lesson.lessonId || index)}
                      className="p-1 text-gray-400 transition rounded-md hover:text-white hover:bg-gray-800/60"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dropdown Menu for Delete */}
                  {activeMenuId === (lesson.lessonId || index) && (
                    <div className="absolute right-6 top-12 z-20 bg-[#070e12] border border-gray-800 rounded-xl shadow-2xl py-1 w-32 backdrop-blur-md">
                      <button
                        onClick={() => {
                          onDeleteLesson(lesson.lessonId);
                          setActiveMenuId(null);
                        }}
                        className="flex items-center w-full gap-2 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonTable;
