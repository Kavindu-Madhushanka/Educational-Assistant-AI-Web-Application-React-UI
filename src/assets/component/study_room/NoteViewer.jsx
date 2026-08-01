import React from "react";
import ReactMarkdown from "react-markdown";

const NoteViewer = ({ noteText, isLoadingFromBackend }) => {
  return (
    <div className="flex-1 bg-[#04080a]/90 border border-gray-800/80 rounded-2xl p-6 overflow-y-auto space-y-6 shadow-xl backdrop-blur-md custom-scrollbar">
      <h3 className="text-[#2ecc71] text-xs font-mono tracking-widest uppercase border-b border-gray-800 pb-2">
        // AI Generated Lecture Notes
      </h3>

      {/* Section 1 */}
      {isLoadingFromBackend ? (
        <div className="pt-2 space-y-4 animate-pulse">
          <div className="w-1/3 h-6 rounded-md bg-gray-800/60"></div>
          <div className="w-3/4 h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-full h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-5/6 h-4 rounded-md bg-gray-800/40"></div>
          <div className="w-1/4 h-6 mt-6 rounded-md bg-gray-800/60"></div>
          <div className="w-2/3 h-4 rounded-md bg-gray-800/40"></div>
        </div>
      ) : noteText ? (
        <div className="space-y-4 text-sm leading-relaxed prose text-gray-300 prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Main Headings (# Heading)
              h1: ({ node, ...props }) => (
                <h1
                  className="text-[#2ecc71] text-xl font-bold border-b border-gray-800 pb-2 mb-3"
                  {...props}
                />
              ),
              // Sub Headings (## Heading)
              h2: ({ node, ...props }) => (
                <h2
                  className="text-[#2ecc71] text-lg font-bold mt-4 mb-2"
                  {...props}
                />
              ),
              // Sub-sub Headings (### Heading)
              h3: ({ node, ...props }) => (
                <h3
                  className="mt-3 mb-1 font-semibold text-white text-md"
                  {...props}
                />
              ),
              // Unordered Lists (* or -)
              ul: ({ node, ...props }) => (
                <ul
                  className="pl-4 space-y-1.5 list-disc list-inside text-gray-300"
                  {...props}
                />
              ),
              // Ordered Lists (1. 2.)
              ol: ({ node, ...props }) => (
                <ol
                  className="pl-4 space-y-1.5 list-decimal list-inside text-gray-300"
                  {...props}
                />
              ),
              // Bold Text
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-white" {...props} />
              ),
              // Code Blocks / Inline Code
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
            {noteText}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="font-mono text-sm italic text-gray-500">
          No note content available for this lesson.
        </p>
      )}
    </div>
  );
};

export default NoteViewer;
