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

  const userId=localStorage.userId;

  const fetchFolder=async=()=>{
    try{
    const response=await axios.get(`http://localhost:5071/api/FolderLessonNotes/getallfolders/${userId}`);
    setFolders(response.data);
    }catch(err){
      console.error("Error fetching folders:",err);
    }
  }

  useEffect(()=>{
    fetchFolder();
  },[])

  

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
