"use client";
import React from 'react';
import Link from 'next/link';

const ArcadePage = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
              Arcade
            </h1>
          </div>
        </header>
        <Link href="/" className="inline-block mb-4 px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Home
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-8">
          <Link href="/arcade/flappy-birb" passHref>
            <div className="bg-indigo-800 p-4 rounded-lg shadow-md border-2 border-indigo-600 cursor-pointer hover:bg-indigo-700 transition-all duration-300">
              <h2 className="text-sm sm:text-base font-bold leading-tight uppercase text-center mb-2 text-yellow-400">
                Flappy Sheep
              </h2>
              <div className="relative w-full pb-[100%] border-2 border-indigo-400">
                <img
                  src="/flappy_birb.png"
                  alt="Flappy Sheep"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
          <Link href="/arcade/breeding-altar" passHref>
            <div className="bg-indigo-800 p-4 rounded-lg shadow-md border-2 border-indigo-600 cursor-pointer hover:bg-indigo-700 transition-all duration-300">
              <h2 className="text-sm sm:text-base font-bold leading-tight uppercase text-center mb-2 text-yellow-400">
                Breeding Altar
              </h2>
              <div className="relative w-full pb-[100%] border-2 border-indigo-400">
                <img
                  src="/breeding_altar.jpg"
                  alt="Breeding Altar"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
          {/* You can add more game links here */}
        </div>
      </div>
    </div>
  );
};

export default ArcadePage;