import { useParams, Link } from "react-router-dom";
import ChatWorkspace from "./ChatWorkspace";
import NoteViewer from "./NoteViewer";
import { FaArrowLeft } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

const StudyRoom = () => {
  const { lessonId, createdLessonId } = useParams();

  const [noteContent, setNoteContent] = useState({
    generatedNotes: "",
    summary: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handelNavigate = ({ id }) => {
    navigate(`/mcq_area/${id}`);
  };

  const handleExportPDF = () => {
    const element = document.getElementById("note-viewer-content");

    if (!element) {
      alert("No note content found to export!");
      return;
    }

    const clone = element.cloneNode(true);

    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#000000";
    clone.style.padding = "20px";
    clone.style.border = "none";

    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el) => {
      el.style.color = "#111827";
      el.style.borderColor = "#e5e7eb";

      if (["H1", "H2", "H3", "H4"].includes(el.tagName)) {
        el.style.color = "#059669";
        el.style.borderBottomColor = "#d1d5db";
      }

      if (el.tagName === "CODE") {
        el.style.backgroundColor = "#f3f4f6";
        el.style.color = "#1f2937";
        el.style.borderColor = "#e5e7eb";
      }

      if (el.classList.contains("bg-[#2ecc71]/10")) {
        el.style.backgroundColor = "#f0fdf4";
        el.style.borderColor = "#bbf7d0";
      }
    });

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Lecture_Note_${lessonId || createdLessonId || "AI_Notes"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        clone.remove();
      });
  };

  useEffect(() => {
    const fetchLessonNote = async () => {
      const cuttentID = lessonId || createdLessonId;

      if (!cuttentID) return;

      try {
        setIsLoading(true);
        if (lessonId) {
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
        } else if (createdLessonId) {
          const response = await axios.post(
            "http://localhost:5071/api/FolderLessonNotes/getnote",
            {
              lessonId: createdLessonId,
            },
          );

          const noteData = response.data || response.data?.data;
          setNoteContent({
            generatedNotes: noteData.generatedNotes || "",
            summary: noteData.summary || "",
          });
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (lessonId || createdLessonId) {
      fetchLessonNote();
    }
  }, [lessonId, createdLessonId]);

  return (
    <div className="w-full h-screen max-h-screen bg-[#04080a] text-white flex flex-col overflow-hidden p-4 md:p-6 relative select-none">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ecc71]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="z-10 flex flex-col justify-between gap-4 pb-4 border-b md:flex-row md:items-center border-gray-800/60">
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
                AI Study Room Workspace
                <span className="font-mono text-xs font-normal text-gray-500">
                  (Split View)
                </span>
              </h1>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Lecture ID:{" "}
              <span className="text-gray-200">
                {lessonId || createdLessonId}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-2 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:border-[#2ecc71]/50"
          >
            <FaDownload className="w-3.5 h-3.5 text-gray-400" /> Export to PDF
          </button>

          <button
            className="flex items-center gap-2 text-xs font-bold bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_rgba(46,204,113,0.5)] cursor-pointer"
            onClick={() => handelNavigate()}
          >
            <FaRegCheckCircle className="w-4 h-4" /> Check Knowledge (MCQ)
          </button>
        </div>
      </div>

      <div className="z-10 flex flex-col flex-1 gap-4 pt-4 overflow-hidden lg:flex-row">
        <NoteViewer noteData={noteContent} isLoadingFromBackend={isLoading} />
        <ChatWorkspace />
      </div>
    </div>
  );
};

export default StudyRoom;
