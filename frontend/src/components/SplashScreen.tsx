import React from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">

        {/* Logo or Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          SolSoochy | ಸೊಲ್ಸೂಚಿ
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-8">
          A minimal Solana wallet tracker crafted for speed & clarity.
        </p>

        {/* Proceed Button */}
        <button
          onClick={onFinish}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Enter
        </button>

      </div>
    </div>
  );
}