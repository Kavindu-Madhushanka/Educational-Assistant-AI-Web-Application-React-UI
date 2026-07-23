import React from "react";
import { ArrowLeft, Bell } from "lucide-react";

const Navbar = ({ totalLessons = 24, userImage }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-[#04080a] border-b border-gray-900/40 text-white select-none">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-xs font-mono tracking-wide text-gray-400 hover:text-[#2ecc71] transition duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>// Back to Dashboard</span>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        <div className="text-xs font-medium text-gray-400">
          Total Lessons:{" "}
          <span className="font-bold text-[#2ecc71]">{totalLessons}</span>
        </div>

        {/* Bell Icon */}
        <button className="text-gray-400 hover:text-[#2ecc71] transition duration-200">
          <Bell className="w-5 h-5" />
        </button>

        {/* Premium Badge */}
        <div className="px-3 py-1 border border-[#2ecc71]/40 rounded-xl text-[#2ecc71] text-xs font-semibold bg-[#2ecc71]/10 shadow-[0_0_12px_rgba(46,204,113,0.2)]">
          Premium User
        </div>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2ecc71]/30">
          <img
            src={userImage || "https://i.pravatar.cc/100"}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
