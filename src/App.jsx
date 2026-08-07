import { useEffect, useState } from "react";
import FirstLoadPage from "./assets/component/first_page/FirstLoadPage";
import LoginPage from "./assets/component/log_page/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./assets/component/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FolderLessonsPage from "./assets/component/lesson/FolderLesson";
import StudyRoom from "./assets/component/study_room/StudyRoom";
import ChatWorkspace from "./assets/component/study_room/ChatWorkspace";
import McqMainWorkspace from "./assets/component/mcq_work_place/McqMainWorkspace";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      navigate("/loading");
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate("/loginpage");
  };
  return (
    <>
      <Routes>
        <Route
          path="/loading"
          element={<FirstLoadPage onComplete={handleLoadingComplete} />}
        />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/folder/:id" element={<FolderLessonsPage />} />
        <Route path="/studyroom/:lessonId" element={<StudyRoom />} />
        <Route
          path="/lesson_to_studyroom/:createdLessonId"
          element={<StudyRoom />}
        />
        <Route path="/mcq_area/:mcqLessonId" element={<McqMainWorkspace />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </>
  );
}

export default App;
