import React from "react";

const SignUpForm = ({ onToggleForm }) => {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold tracking-wide text-gray-200">
        Create New Account
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full bg-[#070c0e] border border-[#2ecc71]/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2ecc71] transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-[#070c0e] border border-[#2ecc71]/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2ecc71] transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
            Password
          </label>
          <input
            type="password"
            placeholder="Create strong password"
            className="w-full bg-[#070c0e] border border-[#2ecc71]/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2ecc71] transition-all"
          />
        </div>

        <button className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-[#04080a] font-bold text-sm py-3 rounded-lg shadow-[0_0_20px_rgba(46,204,113,0.3)] transition-all mt-2">
          Get Started
        </button>
      </div>

      <div className="relative flex items-center py-2 font-mono text-xs text-gray-600">
        <div className="flex-grow border-t border-gray-900"></div>
        <span className="flex-shrink mx-4">or</span>
        <div className="flex-grow border-t border-gray-900"></div>
      </div>

      <p className="font-mono text-xs text-center text-gray-400">
        Already have an account?{" "}
        <button
          onClick={onToggleForm}
          className="text-[#2ecc71] font-bold hover:underline bg-transparent border-none cursor-pointer"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
