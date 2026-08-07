import React, { useState } from "react";
import McqSettings from "./McqSettings";
import McqQuestionView from "./McqQuestionView";
import axios from "axios";
import { useParams } from "react-router-dom";

// Testing Mock Questions
const mockQuestions = [];

const McqMainWorkspace = () => {
  const [step, setStep] = useState("SETTINGS");
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { mcqLessonId } = useParams();

  const handleGenerateQuiz = async ({ count, difficulty }) => {
    setIsGenerating(true);

    const response = await axios.post(
      "http://localhost:5071/api/FolderLessonNotes/generate-mcq",
      {
        lessonId: mcqLessonId,
        questionCount: count,
        difficulty: difficulty,
      },
    );

    const mockQuestions = response.data || response.data?.data;
    setTimeout(() => {
      setQuestions(mockQuestions);
      setStep("QUIZ");
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#04080a] text-white p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#2ecc71]/5 rounded-full blur-[180px] pointer-events-none" />

      {step === "SETTINGS" && (
        <McqSettings
          onGenerateQuiz={handleGenerateQuiz}
          isGenerating={isGenerating}
        />
      )}

      {step === "QUIZ" && (
        <McqQuestionView
          questions={questions}
          title="Number Systems"
          onReset={() => setStep("SETTINGS")}
        />
      )}
    </div>
  );
};

export default McqMainWorkspace;
