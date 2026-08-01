import { useParams, Link } from "react-router-dom";
import ChatWorkspace from "./ChatWorkspace";
import NoteViewer from "./NoteViewer";
import { FaArrowLeft } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const StudyRoom = () => {
  const { lessonId } = useParams();
  const [noteContent, setNoteContent] = useState({
    generatedNotes: "",
    summary: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessonNote = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5071/api/FolderLessonNotes/generate-note",
          {
            lessonId: lessonId,
          },
        );
        const noteData = response.data?.data || response.data;
        setNoteContent({
          generatedNotes: noteData.generatedNotes || "",
          summary: noteData.summary || "",
        });
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (lessonId) {
      fetchLessonNote();
    }
  }, [lessonId]);

  return (
    <div className="w-full h-screen max-h-screen bg-[#04080a] text-white flex flex-col overflow-hidden p-4 md:p-6 relative select-none">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ecc71]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="z-10 flex flex-col justify-between gap-4 pb-4 border-b md:flex-row md:items-center border-gray-800/60">
        {/* Left Side Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#2ecc71] transition-all bg-gray-900/50 hover:bg-gray-800/80 px-3 py-2 rounded-lg border border-gray-800"
          >
            <FaArrowLeft className="w-4 h-4" /> Go to Dashboard
          </Link>

          <div className="h-6 w-[1px] bg-gray-800 hidden md:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-ping" />
              <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-100">
                AI Study Room Workspace{lessonId}
                <span className="font-mono text-xs font-normal text-gray-500">
                  (Split View)
                </span>
              </h1>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Lecture: <span className="text-gray-200">Number Systems</span>
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 px-4 py-2.5 rounded-xl transition-all">
            <FaDownload className="w-3.5 h-3.5 text-gray-400" /> Export to PDF
          </button>

          {/* MCQ Knowledge Check Button */}
          <button
            onClick={() => navigate("/mcq-test")}
            className="flex items-center gap-2 text-xs font-bold bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_rgba(46,204,113,0.5)]"
          >
            <FaRegCheckCircle className="w-4 h-4" /> Check Knowledge (MCQ)
          </button>
        </div>
      </div>

      {/* Main Split Content Area */}
      <div className="z-10 flex flex-col flex-1 gap-4 pt-4 overflow-hidden lg:flex-row">
        <NoteViewer noteText={noteContent} isLoadingFromBackend={isLoading} />
        <ChatWorkspace />
      </div>
    </div>
  );
};

export default StudyRoom;
