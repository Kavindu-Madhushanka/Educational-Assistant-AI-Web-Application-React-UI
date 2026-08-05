import React, { useState } from "react";
import { Send, User, Bot, HelpCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const ChatWorkspace = ({ generatedNote }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I have reviewed this lecture's notes. What questions do you have?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:5071/api/FolderLessonNotes/ask-ai",
        {
          question: userQuery,
          lessonNote: generatedNote || "",
        },
      );

      const aiReply =
        response.data?.aireply || response.data?.aireply || response.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: typeof aiReply === "string" ? aiReply : JSON.stringify(aiReply),
        },
      ]);
    } catch (error) {
      console.error("Error asking AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I couldn't process your question right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full lg:w-[420px] bg-[#04080a]/90 border border-gray-800/80 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800/80 bg-[#04080a]/50 px-4 pt-3 shrink-0">
        <button
          onClick={() => setActiveTab("chat")}
          className={`pb-3 text-sm font-semibold transition-all relative px-2 ${
            activeTab === "chat"
              ? "text-[#2ecc71]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Ask Lecture AI
          {activeTab === "chat" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2ecc71] shadow-[0_0_8px_#2ecc71]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("flashcards")}
          className={`pb-3 text-sm font-semibold transition-all relative px-4 ${
            activeTab === "flashcards"
              ? "text-[#2ecc71]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          AI Flashcards
          {activeTab === "flashcards" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2ecc71] shadow-[0_0_8px_#2ecc71]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "chat" ? (
        <div className="flex flex-col justify-between flex-1 p-4 space-y-4 overflow-hidden">
          {/* Message List */}
          <div className="flex-1 pr-1 space-y-4 overflow-y-auto custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#2ecc71]" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gray-800/80 text-gray-200 border border-gray-700/50 rounded-tr-none"
                      : "bg-[#04080a] text-gray-300 border border-[#2ecc71]/30 rounded-tl-none shadow-[0_0_15px_rgba(46,204,113,0.05)]"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-[#2ecc71] text-base font-bold my-1"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-[#2ecc71] text-sm font-bold my-1"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="my-1 text-xs font-bold text-white"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="pl-4 my-1 space-y-1 list-disc list-inside"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="pl-4 my-1 space-y-1 list-decimal list-inside"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-semibold text-white"
                              {...props}
                            />
                          ),
                          code: ({ node, inline, ...props }) =>
                            inline ? (
                              <code
                                className="bg-gray-900 text-[#2ecc71] px-1 py-0.5 rounded font-mono text-xs border border-gray-800"
                                {...props}
                              />
                            ) : (
                              <code
                                className="block p-2 my-1 overflow-x-auto font-mono text-xs text-gray-200 border border-gray-800 rounded bg-gray-950"
                                {...props}
                              />
                            ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-full shrink-0">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing State (Loading Indicator) */}
            {isTyping && (
              <div className="flex items-center justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#2ecc71]" />
                </div>
                <div className="bg-[#04080a] border border-[#2ecc71]/30 rounded-2xl rounded-tl-none p-3 text-xs text-[#2ecc71] flex items-center space-x-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing lecture notes...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box සහ Send Button */}
          <div className="relative flex items-center shrink-0">
            <input
              type="text"
              placeholder="Ask something about this lecture..."
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full bg-[#04080a] text-sm text-gray-200 border border-gray-800 rounded-full pl-4 pr-12 py-3 outline-none focus:border-[#2ecc71]/60 transition-all placeholder:text-gray-600 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-1.5 p-2 bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] rounded-full transition-all shadow-[0_0_10px_rgba(46,204,113,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 p-6 text-center text-gray-400">
          <HelpCircle className="w-12 h-12 text-[#2ecc71] mb-2 animate-pulse" />
          <p className="text-sm">Flashcards component will load here!</p>
        </div>
      )}
    </div>
  );
};

export default ChatWorkspace;
