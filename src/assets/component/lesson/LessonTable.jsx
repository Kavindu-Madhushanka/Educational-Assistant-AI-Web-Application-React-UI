import React, { useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

const LessonTable = ({
  folderName,
  lessons = [],
  onDeleteFolder,
  onDeleteLesson,
}) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleNavigate = (id) => {
    navigate(`/lesson_to_studyroom/${id}`);
  };

  return (
    <div className="flex flex-col w-full p-2 select-none md:p-6">
      {/* Folder Header & Delete Button */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📁</span>
          <h1 className="text-2xl md:text-3xl font-black text-[#2ecc71] tracking-tight drop-shadow-[0_2px_10px_rgba(46,204,113,0.3)]">
            {folderName}
          </h1>
        </div>

        {/* Delete Folder Button */}
        <button
          type="button"
          onClick={onDeleteFolder}
          className="flex items-center gap-2 px-3.5 py-2 border border-red-500/40 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500 transition duration-200 text-xs font-semibold shadow-[0_0_12px_rgba(239,68,68,0.15)] cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Folder</span>
        </button>
      </div>

      {/* FIXED HEIGHT TABLE CONTAINER (h-[500px] & Inner Scroll) */}
      <div className="bg-[#04080a] border border-[#2ecc71]/30 rounded-xl overflow-hidden h-[500px] flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.8)] relative">
        <table className="w-full text-xs text-left border-collapse">
          {/* Table Header (Fixed Top) */}
          <thead className="bg-[#070e12] block w-full border-b border-gray-900/80">
            <tr className="text-gray-400 uppercase tracking-widest font-mono text-[11px] flex w-full">
              <th className="w-16 px-6 py-4 shrink-0">#</th>
              <th className="flex-1 px-6 py-4">Lecture Title</th>
              <th className="w-48 px-6 py-4">Upload Date</th>
              <th className="w-64 px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
        </table>

        {/* Table Body - Internal Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-xs text-left border-collapse">
            <tbody className="text-gray-200 divide-y divide-gray-900/50">
              {lessons.map((lesson, index) => {
                const curentLessonId = lesson.lessonId || index;

                return (
                  <tr
                    key={curentLessonId}
                    className="hover:bg-[#2ecc71]/5 transition duration-200 flex w-full items-center"
                  >
                    <td className="w-16 px-6 py-4 font-mono text-gray-500 shrink-0">
                      {index + 1}
                    </td>
                    <td className="flex-1 px-6 py-4 font-medium text-gray-100 truncate">
                      {lesson.lessonTitle}
                    </td>
                    <td className="w-48 py-4 px-6 text-gray-400 font-mono text-[11px] shrink-0">
                      {lesson.uploadDate || "2024-05-10"}
                    </td>

                    <td className="relative w-64 px-6 py-4 text-right shrink-0">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleNavigate(curentLessonId)}
                          className="px-4 py-1.5 border border-[#2ecc71]/50 rounded-lg text-[#2ecc71] hover:bg-[#2ecc71] hover:text-black font-semibold transition duration-200 shadow-[0_0_10px_rgba(46,204,113,0.15)] cursor-pointer"
                        >
                          Enter Study Room
                        </button>

                        <button
                          onClick={() => toggleMenu(curentLessonId)}
                          className="p-1 text-gray-400 transition rounded-md cursor-pointer hover:text-white hover:bg-gray-800/60"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {activeMenuId === curentLessonId && (
                        <div className="absolute right-6 top-12 z-20 bg-[#070e12] border border-gray-800 rounded-xl shadow-2xl py-1 w-32 backdrop-blur-md">
                          <button
                            type="button"
                            onClick={() => {
                              if (onDeleteLesson)
                                onDeleteLesson(curentLessonId);
                              setActiveMenuId(null);
                            }}
                            className="flex items-center w-full gap-2 px-3 py-2 text-xs text-red-400 transition cursor-pointer hover:bg-red-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Lesson</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LessonTable;
