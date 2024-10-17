"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { valerians, Valerian } from '@/data/valerians';

export default function ComparePage() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStar, setSelectedStar] = useState<number | ''>('');
  
  const classes = useMemo(() => Array.from(new Set(valerians.map(v => v.class))), []);
  const stars = [1, 2, 3, 4];
  
  const filteredValerians = useMemo(() => 
    valerians.filter(v => 
      (selectedClass === '' || v.class === selectedClass) &&
      (selectedStar === '' || v.stars === selectedStar)
    ).sort((a, b) => b.stars - a.stars),
    [selectedClass, selectedStar]
  );

  const StatBar: React.FC<{ value: number, max: number, color: string }> = ({ value, max, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  );

  const ValerianCard: React.FC<{ valerian: Valerian }> = React.memo(({ valerian }) => (
    <div className="bg-indigo-800 p-4 rounded-lg shadow-md border-2 border-indigo-600 flex flex-col items-center">
      <h2 className="text-sm sm:text-base font-bold leading-tight uppercase text-center mb-2">{valerian.name}</h2>
      <div className="flex justify-center items-center mb-2">
        {[...Array(valerian.stars)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-xs sm:text-sm">★</span>
        ))}
      </div>
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-indigo-400 mb-2">
        <Image
          src={valerian.image}
          alt={valerian.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="text-xs sm:text-sm uppercase text-center mb-2">{valerian.type}</p>
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs">HP</span>
          <span className="text-xs">{valerian.stats.hp}</span>
        </div>
        <StatBar value={valerian.stats.hp} max={250} color="bg-green-600" />
        <div className="flex justify-between items-center">
          <span className="text-xs">Attack</span>
          <span className="text-xs">{valerian.stats.attack}</span>
        </div>
        <StatBar value={valerian.stats.attack} max={200} color="bg-red-600" />
        <div className="flex justify-between items-center">
          <span className="text-xs">Speed</span>
          <span className="text-xs">{valerian.stats.speed}</span>
        </div>
        <StatBar value={valerian.stats.speed} max={150} color="bg-blue-600" />
        <div className="flex justify-between items-center">
          <span className="text-xs">Defense</span>
          <span className="text-xs">{valerian.stats.defense}</span>
        </div>
        <StatBar value={valerian.stats.defense} max={150} color="bg-yellow-600" />
        <div className="flex justify-between items-center">
          <span className="text-xs">M. Def</span>
          <span className="text-xs">{valerian.stats.magicDefense}</span>
        </div>
        <StatBar value={valerian.stats.magicDefense} max={150} color="bg-purple-600" />
      </div>
    </div>
  ));

  const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h3 className="text-xl font-semibold text-indigo-200 mb-2">No Valerians Found</h3>
      <p className="text-indigo-400">Try adjusting your class or star filters to see more Valerians!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">           
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">Compare Tool</h1>
          </div>
        </header>
        <Link href="/" className="inline-block mb-4 px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Home
        </Link>
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="sm:w-3/4">
              <label htmlFor="class-select" className="block mb-2 text-sm font-medium text-white">Select Valerian Class:</label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-indigo-700 border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              >
                <option value="">All classes</option>
                {classes.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-1/4">
              <label htmlFor="star-select" className="block mb-2 text-sm font-medium text-white">Select Stars:</label>
              <select
                id="star-select"
                value={selectedStar}
                onChange={(e) => setSelectedStar(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-indigo-700 border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              >
                <option value="">All stars</option>
                {stars.map(s => (
                  <option key={s} value={s}>{s} Star{s > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredValerians.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredValerians.map(valerian => (
                <ValerianCard key={valerian.id} valerian={valerian} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}