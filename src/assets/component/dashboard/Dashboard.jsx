import React, { useState } from "react";
import SmartVideoUpload from "./SmartVideoUpload";
import RecentActivity from "./RecentActivity";
import FileList from "./FileList";
import FolderCreator from "./FolderCreator";
import UploadPopup from "./UploadPopup";
import NavBar from "../NavBar";

const Dashboard = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "ICT", lessons: 24, progress: 78 },
    { id: 2, name: "Physics", lessons: 18, progress: 64 },
    { id: 3, name: "Maths", lessons: 30, progress: 85 },
    { id: 4, name: "Chemistry", lessons: 12, progress: 45 },
    { id: 5, name: "Biology", lessons: 40, progress: 90 },
    { id: 6, name: "History", lessons: 15, progress: 30 },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  const handleCreateFolder = (folderName) => {
    setFolders([
      ...folders,
      {
        id: Date.now(),
        name: folderName,
        lessons: 0,
        progress: 0,
      },
    ]);
  };

  return (
    <div className="h-screen w-full bg-[#04080a] text-white flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex flex-col flex-1 min-h-0 p-6 pb-2 space-y-4">
        <div className="grid flex-shrink-0 grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SmartVideoUpload onUploadClick={() => setIsUploadOpen(true)} />
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
        <UploadPopup folders={folders} onClose={() => setIsUploadOpen(false)} />
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
