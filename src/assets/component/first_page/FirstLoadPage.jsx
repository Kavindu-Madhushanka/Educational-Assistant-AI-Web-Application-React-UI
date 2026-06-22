import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaArrowsRotate } from "react-icons/fa6";

const FirstLoadPage = () => {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        const randomIncrement = Math.floor(Math.random() * 10) + 1;
        return Math.min(oldProgress + randomIncrement, 100);
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen max-h-screen bg-[#070c0e] text-[#2ecc71] font-sans flex flex-col items-center justify-between py-6 px-6 select-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2ecc71]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#2ecc71]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center mt-2 text-center">
        <img
          src="/logo.png"
          alt="EduAsst Logo"
          className="w-20 h-20 mb-2 object-contain drop-shadow-[0_0_20px_rgba(46,204,113,0.4)]"
        />
        <h1 className="text-3xl font-black tracking-wider text-[#2ecc71] uppercase drop-shadow-[0_0_10px_rgba(46,204,113,0.2)]">
          EduAsst AI
        </h1>
        <div className="h-[1px] w-12 bg-[#2ecc71]/30 mt-1 rounded-full"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-md my-2">
        <div className="relative flex items-center justify-center mb-2 w-52 h-52">
          <div className="absolute inset-0 border border-[#2ecc71]/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute inset-3 border border-dashed border-[#2ecc71]/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          <iframe
            src="/three.js.html"
            title="ThreeJS Animation"
            allowtransparency="true"
            className="z-10 w-full h-full bg-transparent border-none pointer-events-none"
            scrolling="no"
          />
        </div>

        <div className="flex items-center text-sm font-bold text-[#2ecc71] tracking-wide mb-4">
          <span>Preparing Your Smart Study Environment</span>
          <span className="w-6 text-left pl-0.5">{dots}</span>
        </div>

        <div className="w-full bg-[#0d161b] h-1.5 rounded-full p-[1px] border border-[#2ecc71]/20 shadow-inner mb-1 relative">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#2ecc71]/40 to-[#2ecc71] shadow-[0_0_10px_#2ecc71] rounded-full transition-all duration-300 ease-out"
          ></div>
        </div>

        <p className="text-[10px] text-[#2ecc71] font-mono tracking-widest font-bold">
          {progress}% COMPLETED
        </p>
      </div>

      <div className="z-10 grid w-full max-w-md grid-cols-2 gap-3 px-2">
        <div className="bg-[#0b1216]/80 border border-[#1a2e23] backdrop-blur-md p-3 rounded-xl flex items-center text-[10px] font-bold text-[#2ecc71]/90 tracking-wider">
          <span className="mr-2 text-[10px] bg-[#2ecc71]/10 text-[#2ecc71] w-4 h-4 flex items-center justify-center rounded-full border border-[#2ecc71]/20">
            <TiTick />
          </span>
          INITIALIZING AI ENGINE
        </div>

        <div className="bg-[#0b1216]/80 border border-[#1a2e23] backdrop-blur-md p-3 rounded-xl flex items-center text-[10px] font-bold text-[#2ecc71]/90 tracking-wider">
          <span className="mr-2 text-[10px] bg-[#2ecc71]/10 text-[#2ecc71] w-4 h-4 flex items-center justify-center rounded-full border border-[#2ecc71]/20">
            <TiTick />
          </span>
          LOADING SUBJECT DATA
        </div>

        <div className="bg-[#0b1216]/80 border border-[#1a2e23] backdrop-blur-md p-3 rounded-xl flex items-center text-[10px] font-bold text-[#2ecc71]/90 tracking-wider">
          <span className="mr-2 text-[10px] bg-[#2ecc71]/10 text-[#2ecc71] w-4 h-4 flex items-center justify-center rounded-full border border-[#2ecc71]/20">
            <TiTick />
          </span>
          PREPARING ASSISTANT
        </div>

        <div className="bg-[#0b1216]/30 border border-[#1c2d3a]/60 backdrop-blur-md p-3 rounded-xl flex items-center text-[10px] font-bold text-gray-500 tracking-wider">
          <span className="mr-2 text-xs animate-spin text-[#2ecc71] w-4 h-4 flex items-center justify-center">
            <FaArrowsRotate />
          </span>
          FINALIZING DASHBOARD
        </div>
      </div>

      <footer className="z-10 text-[9px] text-gray-600 font-mono tracking-widest uppercase opacity-50 mt-2">
        EduAsst AI • Created by l.k.madhushankha.
      </footer>
    </div>
  );
};

export default FirstLoadPage;
