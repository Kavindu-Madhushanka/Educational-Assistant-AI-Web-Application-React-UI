import React from "react";

const RecentActivity = () => {
  const activities = [
    { id: 1, icon: "📄", title: "AI Notes Generated", time: "2m ago" },
    { id: 2, icon: "📝", title: "Quiz Completed", time: "15m ago" },
    { id: 3, icon: "🎴", title: "Flashcards Created", time: "1h ago" },
  ];

  return (
    <div className="bg-[#070c0e] border border-gray-800 rounded-2xl p-5 h-full">
      <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-200 text-md">
        <span>⏱️</span> Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3 bg-[#070c0e] rounded-xl border border-gray-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg bg-[#1e2933] p-1.5 rounded-lg">
                {act.icon}
              </span>
              <span className="text-xs font-medium text-gray-300">
                {act.title}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
