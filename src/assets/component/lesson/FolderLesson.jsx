import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LessonTable from "./LessonTable";
import axios from "axios";

const FolderLessonsPage = ({ folderId = 1, folderName = "ICT" }) => {
  const [lessons, setLessons] = useState([]);

  // Mock Data
  const initialLessons = [
    {
      lessonId: 1,
      lessonTitle: "Introduction to Computer Systems",
      uploadDate: "2024-05-10",
      duration: "42:15",
    },
    {
      lessonId: 2,
      lessonTitle: "Number Systems",
      uploadDate: "2024-05-12",
      duration: "35:40",
    },
    {
      lessonId: 3,
      lessonTitle: "Boolean Algebra",
      uploadDate: "2024-05-15",
      duration: "48:22",
    },
    {
      lessonId: 4,
      lessonTitle: "Logic Gates",
      uploadDate: "2024-05-18",
      duration: "31:10",
    },
    {
      lessonId: 5,
      lessonTitle: "Computer Networks Basics",
      uploadDate: "2024-05-20",
      duration: "55:30",
    },
  ];

  // 🔄 Fetch Lessons
  const fetchLessons = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/getalllessons",
        {
          folderId: folderId,
        },
      );
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setLessons(initialLessons);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [folderId]);

  // 🗑️ Delete Lesson
  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/deletelesson",
        {
          lessonId: lessonId,
          folderId: folderId,
        },
      );

      setLessons((prev) => prev.filter((l) => l.lessonId !== lessonId));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#04080a] text-white flex flex-col overflow-hidden relative select-none">
      {/* Top Navbar */}
      <Navbar totalLessons={lessons.length} />

      {/* Background Glow Effect - (LoginPage එකේ තියෙන විදිහටම) */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-6xl px-4 mx-auto mt-4 overflow-y-auto">
        <LessonTable
          folderName={folderName}
          lessons={lessons}
          onDeleteLesson={handleDeleteLesson}
        />
      </div>
    </div>
  );
};

export default FolderLessonsPage;
