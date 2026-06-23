import { FaRegUser } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="w-full backdrop-blur-md border-b border-[#2ecc71]/10 px-8 py-2 flex items-center justify-between z-20 bg-[#04080a]">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 relative p-1 rounded-full bg-[#2ecc71]/5 border border-[#2ecc71]/10 mb-1">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="space-x-2 font-black tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(46,204,113,0.2)]">
          <span className="text-[#2ecc71]">EduAsst</span>
          <span className="text-white">AI</span>
        </div>
      </div>

      {/* Navigation Links with Green Blur Hover Effect */}
      <div className="items-center hidden space-x-8 text-xs font-medium tracking-wider text-gray-400 md:flex">
        {[
          "Dashboard",
          "Subject Folder",
          "PDF Quiz Gen",
          "AI Planner",
          "Study Analytics",
        ].map((link) => (
          <a
            key={link}
            className="relative cursor-pointer transition-all duration-300 ease-in-out hover:text-[#2ecc71] hover:drop-shadow-[0_0_12px_rgba(46,204,113,0.6)] group py-2 w-fit hover:scale-110 transform origin-center"
          >
            {link}
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2ecc71] transition-all duration-300 ease-in-out -translate-x-1/2 group-hover:w-1/2 drop-shadow-[0_0_8px_rgba(46,204,113,0.8)]" />
          </a>
        ))}
      </div>

      {/* User Profile Icon with Hover Effect */}
      <div className="w-8 h-8 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/30 flex items-center justify-center text-[#2ecc71] cursor-pointer transition-all duration-300 hover:bg-[#2ecc71]/20 hover:drop-shadow-[0_0_8px_rgba(46,204,113,0.4)]">
        <FaRegUser />
      </div>
    </nav>
  );
};

export default NavBar;
