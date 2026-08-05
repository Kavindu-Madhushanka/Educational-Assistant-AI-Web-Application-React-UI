import React from "react";
import ReactMarkdown from "react-markdown";

const NoteViewer = ({ noteData, isLoadingFromBackend }) => {
  const generatedNotes =
    noteData?.generatedNotes || (typeof noteData === "string" ? noteData : "");
  const summary = noteData?.summary || "";

  return (
    <div
      id="note-viewer-content"
      className="flex-1 bg-[#04080a]/90 border border-gray-800/80 rounded-2xl p-6 overflow-y-auto space-y-6 shadow-xl backdrop-blur-md custom-scrollbar"
    >
      <h3 className="text-[#2ecc71] text-xs font-mono tracking-widest uppercase border-b border-gray-800 pb-2">
        // AI Generated Lecture Notes
      </h3>

      {isLoadingFromBackend ? (
        /* Loading Skeleton */
        <div className="pt-2 space-y-4 animate-pulse">
          <div className="w-1/3 h-6 rounded-md bg-gray-800/60"></div>
          <div className="w-3/4 h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-full h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-5/6 h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-1/4 h-6 mt-6 rounded-md bg-gray-800/60"></div>
          <div className="w-2/3 h-4 rounded-md bg-gray-800/40"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {summary && (
            <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(46,204,113,0.05)]">
              <div className="flex items-center space-x-2 mb-2 text-[#2ecc71] font-mono text-xs tracking-wider uppercase font-bold">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Executive Summary</span>
              </div>
              <p className="font-sans text-sm leading-relaxed text-gray-300">
                {summary}
              </p>
            </div>
          )}

          {/* DETAILED GENERATED NOTES (MARKDOWN) */}
          {generatedNotes ? (
            <div className="space-y-4 text-sm leading-relaxed prose text-gray-300 prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-[#2ecc71] text-xl font-bold border-b border-gray-800 pb-2 mb-3"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-[#2ecc71] text-lg font-bold mt-4 mb-2"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="mt-3 mb-1 font-semibold text-white text-md"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="pl-4 space-y-1.5 list-disc list-inside text-gray-300"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="pl-4 space-y-1.5 list-decimal list-inside text-gray-300"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code
                        className="bg-gray-900 text-[#2ecc71] px-1.5 py-0.5 rounded font-mono text-xs border border-gray-800"
                        {...props}
                      />
                    ) : (
                      <code
                        className="block p-3 my-2 overflow-x-auto font-mono text-xs text-gray-200 border border-gray-800 rounded-lg bg-gray-950"
                        {...props}
                      />
                    ),
                }}
              >
                {generatedNotes}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="font-mono text-sm italic text-gray-500">
              No note content available for this lesson.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteViewer;
