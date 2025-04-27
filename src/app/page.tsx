import React from 'react';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center tracking-tight text-gray-900">
        Welcome to <span className="text-blue-600">Empusa AI</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl">
        Your gateway to AI-powered content creation. Start exploring the future of intelligent content with Empusa AI.
      </p>
    </section>
  );
} 