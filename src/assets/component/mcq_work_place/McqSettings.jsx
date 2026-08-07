import React, { useState } from "react";
import { FaSlidersH, FaBrain } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";

const McqSettings = ({ onGenerateQuiz, isGenerating }) => {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");

  const countOptions = [5, 10, 15, 20];
  const difficultyOptions = [
    { label: "Easy", desc: "Basic recall & concepts" },
    { label: "Medium", desc: "Application & analysis" },
    { label: "Hard", desc: "Deep logic & complex evaluation" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[550px] relative">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-lg bg-[#070e12]/90 border border-gray-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative z-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-800/80">
          <div className="p-3 bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-xl text-[#2ecc71]">
            <FaSlidersH className="w-5 h-5" />
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-100">
              Quiz Setup Configuration
            </h2>
            <p className="font-mono text-xs text-gray-400">
              Customize question parameters for AI generation
            </p>
          </div>
        </div>

        {/* 1. Question Count Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-400 uppercase">
            <FaBrain className="text-[#2ecc71] w-3.5 h-3.5" />
            Number of Questions
          </label>
          <div className="grid grid-cols-4 gap-3">
            {countOptions.map((count) => {
              const isSelected = questionCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`py-3.5 rounded-xl border text-sm font-mono font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#2ecc71] bg-[#2ecc71]/10 text-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.2)] scale-[1.02]"
                      : "border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Difficulty Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-400 uppercase">
            <FaBolt className="text-[#2ecc71] w-3.5 h-3.5" />
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((item) => {
              const isSelected = difficulty === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setDifficulty(item.label)}
                  className={`py-3.5 px-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "border-[#2ecc71] bg-[#2ecc71]/10 text-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.2)] scale-[1.02]"
                      : "border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => onGenerateQuiz({ count: questionCount, difficulty })}
          disabled={isGenerating}
          className="w-full py-4 bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(46,204,113,0.3)] hover:shadow-[0_0_30px_rgba(46,204,113,0.5)] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-black rounded-full border-t-transparent animate-spin" />
              <span>Generating AI Quiz...</span>
            </>
          ) : (
            <span>Generate Quiz</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default McqSettings;
