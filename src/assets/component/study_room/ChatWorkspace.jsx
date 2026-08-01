import React, { useState } from "react";
import { Send, User, Bot, HelpCircle } from "lucide-react";

const ChatWorkspace = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "What is the base of binary number system?",
    },
    {
      sender: "ai",
      text: "The base of binary number system is 2. It uses only two digits: 0 and 1.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="w-full lg:w-[420px] bg-[#04080a]/90 border border-gray-800/80 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800/80 bg-[#04080a]/50 px-4 pt-3">
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

      {/* Tab Contents */}
      {activeTab === "chat" ? (
        <div className="flex flex-col justify-between flex-1 p-4 space-y-4 overflow-hidden">
          {/* Message List */}
          <div className="flex-1 pr-1 space-y-4 overflow-y-auto">
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

                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gray-800/80 text-gray-200 border border-gray-700/50 rounded-tr-none"
                      : "bg-[#04080a] text-gray-300 border border-[#2ecc71]/30 rounded-tl-none shadow-[0_0_15px_rgba(46,204,113,0.05)]"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-full shrink-0">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask something about this lecture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full bg-[#04080a] text-sm text-gray-200 border border-gray-800 rounded-full pl-4 pr-12 py-3 outline-none focus:border-[#2ecc71]/60 transition-all placeholder:text-gray-600"
            />
            <button
              onClick={handleSend}
              className="absolute right-1.5 p-2 bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] rounded-full transition-all shadow-[0_0_10px_rgba(46,204,113,0.4)]"
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
