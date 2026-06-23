import React from "react";

const SignInForm = ({ onToggleForm }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold tracking-wide text-gray-200">
        Sign In to Your Account
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
            Email or Username
          </label>
          <input
            type="text"
            placeholder="Enter your email or username"
            className="w-full bg-[#070c0e] border border-[#2ecc71]/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2ecc71] transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#070c0e] border border-[#2ecc71]/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2ecc71] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#2ecc71]">
              👁️
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-xs">
          <label className="flex items-center text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mr-2 accent-[#2ecc71] bg-[#070c0e] border-[#2ecc71]/20 rounded"
            />
            Remember me
          </label>
          <a
            href="#forgot"
            className="text-gray-400 hover:text-[#2ecc71] transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        <button className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-[#04080a] font-bold text-sm py-3 rounded-lg shadow-[0_0_20px_rgba(46,204,113,0.3)] transition-all">
          Sign In
        </button>
      </div>

      <div className="relative flex items-center py-2 font-mono text-xs text-gray-600">
        <div className="flex-grow border-t border-gray-900"></div>
        <span className="flex-shrink mx-4">or</span>
        <div className="flex-grow border-t border-gray-900"></div>
      </div>

      <button className="w-full bg-transparent border border-gray-800 hover:border-[#2ecc71]/40 text-white font-medium text-sm py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all">
        <img src="/google.png" alt="Google" className="w-4 h-4" />
        <span>Sign in with Google</span>
      </button>

      <p className="pt-2 font-mono text-xs text-center text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={onToggleForm}
          className="text-[#2ecc71] font-bold hover:underline bg-transparent border-none cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
