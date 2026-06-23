import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaArrowsRotate } from "react-icons/fa6";

const FirstLoadPage = ({ onComplete }) => {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({ latency: "14ms", mem: "42%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      setMetrics({
        latency: `${Math.floor(Math.random() * 10) + 8}ms`,
        mem: `${Math.floor(Math.random() * 5) + 40}%`,
      });
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
        const randomIncrement = Math.floor(Math.random() * 12) + 2;
        return Math.min(oldProgress + randomIncrement, 100);
      });
    }, 350);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      const redirecTimer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(redirecTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className="relative w-full h-screen max-h-screen bg-[#04080a] text-[#2ecc71] font-sans flex flex-col items-center justify-between pt-4 pb-2 px-6 select-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2ecc7105_1px,transparent_1px),linear-gradient(to_bottom,#2ecc7105_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2ecc71]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2ecc71]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="absolute top-4 left-6 font-mono text-[9px] text-[#2ecc71]/30 hidden md:block space-y-0.5">
        <p>// SYS_CORE: ACTIVE</p>
        <p>NET_LATENCY: {metrics.latency}</p>
        <p>MEM_USAGE: {metrics.mem}</p>
      </div>
      <div className="absolute top-4 right-6 font-mono text-[9px] text-[#2ecc71]/30 text-right hidden md:block space-y-0.5">
        <p>FRAME_RENDER: 3D_WEBGL</p>
        <p>AUTH_STAGE: INITIALIZING</p>
        <p>HOST: LOCALHOST:5173</p>
      </div>

      <div className="z-10 flex flex-col items-center mt-1 text-center">
        <div className="relative p-1 rounded-full bg-[#2ecc71]/5 border border-[#2ecc71]/10 mb-1">
          <img
            src="/logo.png"
            alt="EduAsst Logo"
            className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(46,204,113,0.4)]"
          />
        </div>
        <h1 className="text-2xl font-black tracking-[0.2em] text-white uppercase drop-shadow-[0_0_10px_rgba(46,204,113,0.2)]">
          EduAsst AI
        </h1>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#2ecc71]/40 to-transparent mt-1"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-sm my-1">
        <div className="relative flex items-center justify-center mb-2 rounded-full w-44 h-44">
          <div className="absolute inset-0 border border-[#2ecc71]/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute inset-2 border border-dashed border-[#2ecc71]/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="absolute w-24 h-24 bg-[#2ecc71]/5 rounded-full blur-2xl pointer-events-none"></div>

          <iframe
            src="/three.js.html"
            title="ThreeJS Animation"
            allowtransparency="true"
            className="z-10 w-full h-full bg-transparent border-none pointer-events-none"
            scrolling="no"
          />
        </div>

        <div className="flex items-center text-[11px] font-bold text-[#2ecc71] tracking-widest uppercase mb-3 bg-[#2ecc71]/5 px-3 py-1 rounded-full border border-[#2ecc71]/10 backdrop-blur-sm">
          <span>Preparing Your Smart Study Environment</span>
          <span className="w-5 text-left pl-0.5 text-white">{dots}</span>
        </div>

        <div className="w-full bg-[#081014] h-1.5 rounded-full p-[1px] border border-[#2ecc71]/20 mb-1 relative overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#2ecc71]/30 via-[#2ecc71] to-white shadow-[0_0_12px_#2ecc71] rounded-full transition-all duration-300 ease-out"
          />
        </div>

        <p className="text-[9px] text-white font-mono tracking-[0.2em] font-bold bg-[#0d161b] px-2.5 py-0.5 rounded border border-[#2ecc71]/10">
          {progress}% <span className="text-[#2ecc71]">LOADED</span>
        </p>
      </div>

      <div className="z-10 grid w-full max-w-lg grid-cols-2 gap-3 px-2 mb-2">
        <div
          className={`backdrop-blur-md p-2.5 rounded-xl flex items-center text-[9px] font-mono font-bold tracking-wider transition-all duration-300 ${progress >= 25 ? "bg-[#0b1216]/90 border border-[#2ecc71]/30 text-white" : "bg-[#0b1216]/40 border border-[#1a2e23]/50 text-gray-500"}`}
        >
          <span
            className={`mr-2 text-[9px] w-4 h-4 flex items-center justify-center rounded border transition-all ${progress >= 25 ? "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/30" : "bg-transparent text-gray-600 border-gray-800"}`}
          >
            <TiTick />
          </span>
          INITIALIZING AI ENGINE
        </div>

        <div
          className={`backdrop-blur-md p-2.5 rounded-xl flex items-center text-[9px] font-mono font-bold tracking-wider transition-all duration-300 ${progress >= 50 ? "bg-[#0b1216]/90 border border-[#2ecc71]/30 text-white" : "bg-[#0b1216]/40 border border-[#1a2e23]/50 text-gray-500"}`}
        >
          <span
            className={`mr-2 text-[9px] w-4 h-4 flex items-center justify-center rounded border transition-all ${progress >= 50 ? "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/30" : "bg-transparent text-gray-600 border-gray-800"}`}
          >
            <TiTick />
          </span>
          LOADING SUBJECT DATA
        </div>

        <div
          className={`backdrop-blur-md p-2.5 rounded-xl flex items-center text-[9px] font-mono font-bold tracking-wider transition-all duration-300 ${progress >= 75 ? "bg-[#0b1216]/90 border border-[#2ecc71]/30 text-white" : "bg-[#0b1216]/40 border border-[#1a2e23]/50 text-gray-500"}`}
        >
          <span
            className={`mr-2 text-[9px] w-4 h-4 flex items-center justify-center rounded border transition-all ${progress >= 75 ? "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/30" : "bg-transparent text-gray-600 border-gray-800"}`}
          >
            <TiTick />
          </span>
          PREPARING ASSISTANT
        </div>

        <div
          className={`backdrop-blur-md p-2.5 rounded-xl flex items-center text-[9px] font-mono font-bold tracking-wider transition-all duration-300 ${progress < 100 ? "bg-[#0b1216]/90 border border-[#1c2d3a] text-gray-400" : "bg-[#0b1216]/90 border border-[#2ecc71]/30 text-white"}`}
        >
          <span
            className={`mr-2 text-xs w-4 h-4 flex items-center justify-center rounded ${progress < 100 ? "animate-spin text-[#2ecc71]" : "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/30"}`}
          >
            {progress < 100 ? <FaArrowsRotate /> : <TiTick />}
          </span>
          FINALIZING DASHBOARD
        </div>
      </div>

      <footer className="z-10 text-[8px] text-gray-600 font-mono tracking-[0.25em] uppercase opacity-40">
        EduAsst AI • Created by l.k.madhushankha
      </footer>
    </div>
  );
};

export default FirstLoadPage;
