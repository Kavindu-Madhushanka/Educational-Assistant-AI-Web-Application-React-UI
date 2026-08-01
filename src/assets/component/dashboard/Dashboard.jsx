import React, { useEffect, useState } from "react";
import SmartVideoUpload from "./SmartVideoUpload";
import RecentActivity from "./RecentActivity";
import FileList from "./FileList";
import FolderCreator from "./FolderCreator";
import UploadPopup from "./UploadPopup";
import NavBar from "../NavBar";
import axios from "axios";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(""); //Video URL state

  const rawUserId = localStorage.getItem("userid") || localStorage.userid;
  const userId = rawUserId ? parseInt(rawUserId, 10) : null;

  const fetchFolder = async () => {
    if (!userId) {
      console.warn("User ID not found in localStorage!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/getallfolders",
        {
          userId: userId,
        },
      );

      setFolders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching folders:", err);
      setFolders([]);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const handleUploadClick = (url) => {
    setSelectedVideoUrl(url);
    setIsUploadOpen(true);
  };

  const handleCreateFolder = async (folderName) => {
    if (!userId) {
      alert("User ID not found. Please log in again!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/foldercreate",
        {
          userId: userId,
          folderName: folderName,
        },
      );

      if (response.data && response.data.folder) {
        setFolders((prevFolders) => [...prevFolders, response.data.folder]);
      } else {
        fetchFolder();
      }

      setIsCreateFolderOpen(false);
    } catch (err) {
      console.error("Error creating folder:", err);
      alert(
        err.response?.data?.message || "Something went wrong creating folder!",
      );
    }
  };

  return (
    <div className="h-screen w-full bg-[#04080a] text-white flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex flex-col flex-1 min-h-0 p-6 pb-2 space-y-4">
        <div className="grid flex-shrink-0 grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SmartVideoUpload onUploadClick={handleUploadClick} />
          </div>

          <div>
            <RecentActivity />
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full min-h-0">
          <FileList
            folders={folders}
            onCreateFolderClick={() => setIsCreateFolderOpen(true)}
          />
        </div>
      </div>

      {isUploadOpen && (
        <UploadPopup
          folders={folders}
          videoUrl={selectedVideoUrl} // 🎯 URL එක Popup එකට Pass කරනවා
          onClose={() => setIsUploadOpen(false)}
          onSetupComplete={() => {
            fetchFolder(); // Lesson එක හදලා ඉවර වුණාම Folders/Data refresh කරගන්න
          }}
        />
      )}

      {isCreateFolderOpen && (
        <FolderCreator
          onCreate={handleCreateFolder}
          onClose={() => setIsCreateFolderOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
