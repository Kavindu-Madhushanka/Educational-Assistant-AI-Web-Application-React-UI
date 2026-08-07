import React, { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaChevronUp,
  FaChevronDown,
  FaArrowLeft,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa";

const McqQuestionView = ({
  questions = [],
  title = "Number Systems",
  onReset,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(true);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex];
  const isAnswered = selectedOption !== undefined;

  const correctCount = Object.keys(userAnswers).filter(
    (idx) => userAnswers[idx] === questions[idx].correctAnswer,
  ).length;

  const incorrectCount = Object.keys(userAnswers).filter(
    (idx) => userAnswers[idx] !== questions[idx].correctAnswer,
  ).length;

  const scorePercentage = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  const handleSelectOption = (optionKey) => {
    if (isAnswered) return;
    setUserAnswers({
      ...userAnswers,
      [currentIndex]: optionKey,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none">
      {/* Top Navigation Header */}
      <div className="flex flex-col justify-between gap-4 pb-4 border-b md:flex-row md:items-center border-gray-800/80">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-[#2ecc71] border border-gray-800 rounded-xl transition-all cursor-pointer font-mono text-xs"
          >
            <FaArrowLeft className="w-3 h-3" /> Back to Settings
          </button>
          <div className="h-6 w-[1px] bg-gray-800 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-ping" />
            <h2 className="text-lg font-bold tracking-tight text-gray-100">
              Quiz: <span className="text-[#2ecc71]">{title}</span>
            </h2>
          </div>
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center justify-between gap-5 md:justify-end">
          <span className="font-mono text-xs text-gray-400">
            Question{" "}
            <span className="text-[#2ecc71] font-bold text-sm">
              {currentIndex + 1}
            </span>{" "}
            of {questions.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-2.5 text-gray-400 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 rounded-xl hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(questions.length - 1, prev + 1),
                )
              }
              disabled={currentIndex === questions.length - 1}
              className="p-2.5 text-gray-400 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 rounded-xl hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <FaArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Question + Options + Explanation */}
        <div className="space-y-4 lg:col-span-2">
          <div className="bg-[#070e12]/90 border border-gray-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-md relative overflow-hidden">
            <h3 className="text-lg font-semibold leading-snug text-gray-100 md:text-xl">
              {currentQ.questionText}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {Object.entries(currentQ.options).map(([key, value]) => {
                const isSelected = selectedOption === key;
                const isCorrect = key === currentQ.correctAnswer;

                let btnStyle =
                  "border-gray-800/80 bg-gray-900/40 text-gray-300 hover:border-gray-700 hover:bg-gray-800/40";
                let badgeStyle =
                  "bg-gray-800/80 text-gray-400 border-gray-700/80";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      "border-[#2ecc71] bg-[#2ecc71]/10 text-white shadow-[0_0_15px_rgba(46,204,113,0.15)]";
                    badgeStyle =
                      "bg-[#2ecc71] text-[#04080a] border-[#2ecc71] font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      "border-red-500/80 bg-red-500/10 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]";
                    badgeStyle =
                      "bg-red-500 text-white border-red-500 font-bold";
                  }
                }

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectOption(key)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border font-mono text-xs font-bold shrink-0 transition-all ${badgeStyle}`}
                      >
                        {key}
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <FaCheck className="w-4 h-4 text-[#2ecc71] shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <FaTimes className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="bg-[#070e12]/90 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3 transition-all duration-300">
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#2ecc71] cursor-pointer"
              >
                <div className="flex items-center gap-2 font-bold">
                  <FaLightbulb className="w-3.5 h-3.5" />
                  <span>Explanation</span>
                </div>
                {showExplanation ? (
                  <FaChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <FaChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>

              {showExplanation && (
                <p className="pt-3 font-sans text-sm leading-relaxed text-gray-300 border-t border-gray-800/60">
                  {currentQ.explanation}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Live Score Card */}
        <div className="bg-[#070e12]/90 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center justify-between min-h-[380px]">
          <h4 className="w-full pb-3 font-mono text-xs tracking-widest text-center text-gray-400 uppercase border-b border-gray-800/80">
            Your Live Score
          </h4>

          {/* Radial Progress */}
          <div className="relative flex items-center justify-center my-4 w-44 h-44">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-gray-800/80"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#2ecc71] transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]"
                strokeDasharray={`${scorePercentage}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black tracking-tight text-white">
                {scorePercentage}%
              </span>
              <span className="mt-1 font-mono text-xs text-gray-400">
                {correctCount} / {questions.length} Correct
              </span>
            </div>
          </div>

          {/* Counters */}
          <div className="w-full pt-4 space-y-3 border-t border-gray-800/80">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2ecc71] shadow-[0_0_8px_rgba(46,204,113,0.5)]" />
                <span className="text-gray-400">Correct</span>
              </div>
              <span className="font-bold text-white">{correctCount}</span>
            </div>

            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-gray-400">Incorrect</span>
              </div>
              <span className="font-bold text-white">{incorrectCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqQuestionView;
