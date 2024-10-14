"use client";

import React from 'react';
import Link from 'next/link';
import { valerians, Valerian } from '@/data/valerians';

interface PageProps {
  params: {
    name: string;
  };
}

const ValerianDetail: React.FC<PageProps> = ({ params }) => {
  const { name } = params;
  const valerian = valerians.find(v => v.name === name);

  if (!valerian) {
    return (
      <div className="min-h-screen bg-indigo-950 text-white p-4 flex items-center justify-center">
        <p className="text-xl">Valerian not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-950 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
          <Link href="/" className="w-full sm:w-auto text-center sm:text-left inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm transition duration-300">
            ← All
          </Link>
          <div className="text-center sm:text-right">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{valerian.name}</h1>
            <div className="flex justify-center sm:justify-end items-center">
              {[...Array(valerian.stars)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-lg sm:text-xl">★</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-900 rounded-lg shadow-xl overflow-hidden">
          <div className="relative w-full pb-[100%]">
            <img
              src={valerian.image}
              alt={valerian.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="bg-indigo-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-base sm:text-lg md:text-xl text-center font-semibold">
                {valerian.type} • {valerian.class}
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-yellow-400">Passive Ability</h2>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{valerian.passive}</h3>
                <p className="text-sm sm:text-base leading-relaxed">{valerian.passiveDescription}</p>
              </section>
              
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-yellow-400">Stats</h2>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>Attack: {valerian.attack}</li>
                  <li>Defense: {valerian.defense}</li>
                  <li>Speed: {valerian.speed}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValerianDetail;