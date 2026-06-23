import { useState } from "react";
import NavBar from "../NavBar";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const LoginPage = () => {
  const [isSignIn, setIsSingIn] = useState(true);
  return (
    <div className="w-full h-screen max-h-screen bg-[#04080a] text-white flex flex-col overflow-hidden relative select-none">
      <NavBar />

      <div className="z-10 flex flex-col flex-1 w-full h-full overflow-hidden md:flex-row">
        <div className="relative flex-1 md:flex-[0.55] h-full flex flex-col justify-center px-12 md:px-20 bg-[#04080a]">
          <div className="absolute inset-0 z-0 w-full h-full">
            <img
              src="/leftsideimage.png"
              alt="AI Study Space"
              className="object-cover w-full h-full transition-all duration-500 opacity-50"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#04080a] via-[#04080a]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04080a]/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-lg space-y-5">
            <h3 className="text-gray-500 font-mono tracking-widest text-xs uppercase transition-all duration-300 hover:text-[#2ecc71] hover:drop-shadow-[0_0_8px_rgba(46,204,113,0.5)] cursor-pointer inline-block">
              // System Access Portal
            </h3>

            <div className="space-y-2">
              <h2 className="text-sm font-medium tracking-wide text-gray-400 md:text-base">
                Welcome Back to
              </h2>
              <h1 className="text-[#2ecc71] text-5xl md:text-6xl font-black tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(46,204,113,0.35)]">
                EduAsst AI
              </h1>
            </div>

            <div className="pt-2 space-y-1">
              <p className="text-xl font-bold leading-tight text-gray-100 md:text-2xl">
                Your Ultimate
              </p>
              <p className="text-xl font-bold leading-tight text-gray-400 md:text-2xl">
                AI Study Companion.
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-[150px] pointer-events-none z-0" />
        </div>

        <div className="flex-1 md:flex-[0.45] h-full flex items-center justify-center bg-[#04080a] px-8 border-l border-gray-900/30">
          <div className="w-full max-w-md p-5 text-xs text-gray-600 border border-[#2ecc71]/30  rounded-xl">
            {isSignIn ? (
              <SignInForm onToggleForm={() => setIsSingIn(false)} />
            ) : (
              <SignUpForm onToggleForm={() => setIsSingIn(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
