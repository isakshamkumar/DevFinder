import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-4xl font-bold">404</h1>
          <div className="h-8 w-px bg-white"></div>
          <p className="text-xl">This page could not be found.</p>
        </div>
        <a
          href="/"
          className="inline-block mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}