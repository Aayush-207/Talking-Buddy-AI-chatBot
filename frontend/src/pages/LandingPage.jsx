// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-300 text-gray-900 p-12 rounded-2xl text-center max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">
          Welcome to <span className="text-blue-600">Talking buddy</span>
        </h1>
        <p className="mb-6">
          Feeling lonely? No one to talk to? Feel free to chat and share your problems.
          Sometimes sharing or talking with someone can also relieve your stress.
        </p>
        <Link to="/signup" className="w-full flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2">
            Get Started <span>➡️</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
