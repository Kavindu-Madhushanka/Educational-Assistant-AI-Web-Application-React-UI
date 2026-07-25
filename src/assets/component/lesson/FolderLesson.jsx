import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LessonNavbar from "./LessonNavbar";
import LessonTable from "./LessonTable";
import axios from "axios";

const FolderLessonsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const folderId = id;
  const folderName = location.state?.folderName || "Folder";

  const [loadlesson, setLoadlesson] = useState([]);

  const handelFetchLesson = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/getalllesson",
        {
          folderId: id,
        },
      );
      setLoadlesson(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching lessonss:", err);
      setLoadlesson([]);
    }
  };

  const handleDeleteFolder = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the "${folderName}" folder?`,
      )
    ) {
      console.log("Deleting Folder ID:", folderId);

      // 🎯 පස්සේ මෙතනට Delete API Call එක දාන්න පුළුවන්
      // await axios.post("...", { folderId });

      navigate("/dashboard");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/deletelesson",
        {
          lessonId: lessonId,
          folderId: folderId,
        },
      );

      if (response.status === 200 || response.data) {
        // 🎯 Delete වුණු ගමන් UI එකේ State එකෙන් ඒ Lesson එක අයින් කරනවා (Page refresh ඕන නෑ)
        setLoadlesson((prevLessons) =>
          prevLessons.filter(
            (lesson) => (lesson.lessonId || lesson.id) !== lessonId,
          ),
        );
      }
    } catch (err) {
      console.error("Error deleting lesson:", err);
      alert("Failed to delete the lesson. Please try again.");
    }
  };

  useEffect(() => {
    handelFetchLesson();
  }, []);

  return (
    <div className="w-full h-screen bg-[#04080a] text-white flex flex-col overflow-hidden relative select-none">
      {/* Top Navbar */}
      <LessonNavbar totalLessons={loadlesson.length} />

      {/* Background Glow Effect */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-6xl px-4 mx-auto mt-4 overflow-y-auto">
        <LessonTable
          folderId={folderId}
          folderName={folderName}
          lessons={loadlesson}
          onDeleteFolder={handleDeleteFolder}
          onDeleteLesson={handleDeleteLesson}
        />
      </div>
    </div>
  );
};

export default FolderLessonsPage;
