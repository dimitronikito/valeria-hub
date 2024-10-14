"use client";
import React from 'react';
import Link from 'next/link';
import { valerians, Valerian } from '@/data/valerians';

interface PageProps {
  params: {
    name: string;
  };
}

const StatBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  </div>
);

const ValerianDetail: React.FC<PageProps> = ({ params }) => {
  const { name } = params;
  const valerian = valerians.find(v => v.name === decodeURIComponent(name));

  if (!valerian) {
    return (
      <div className="min-h-screen bg-indigo-950 text-white p-4 flex items-center justify-center">
        <p className="text-xl">Valerian not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">     
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
          <Link href="/" className="w-full sm:w-auto text-center sm:text-left inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm transition duration-300">
            ← Back
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
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative w-full pb-[100%]">
                <img
                  src={valerian.image}
                  alt={valerian.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
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
                  <StatBar label="HP" value={valerian.stats.hp} max={150} color="bg-green-600" />
                  <StatBar label="Attack" value={valerian.stats.attack} max={150} color="bg-red-600" />
                  <StatBar label="Speed" value={valerian.stats.speed} max={150} color="bg-blue-600" />
                  <StatBar label="Defense" value={valerian.stats.defense} max={150} color="bg-yellow-600" />
                  <StatBar label="Magic Defense" value={valerian.stats.magicDefense} max={150} color="bg-purple-600" />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValerianDetail;