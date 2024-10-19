"use client"
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Wheel } from 'react-custom-roulette';

const BreedingAltar = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const data = [
    { option: '1x', style: { backgroundColor: '#8000A9', textColor: '#ffffff' } },
    { option: '2x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '3x', style: { backgroundColor: '#8000A9', textColor: '#ffffff' } },
    { option: '4x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '5x', style: { backgroundColor: '#8000A9', textColor: '#ffffff' } },
    { option: '6x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '8x', style: { backgroundColor: '#8000A9', textColor: '#ffffff' } },
    { option: '10x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
  ];

  const sliceProbabilities = [0.30, 0.25, 0.20, 0.10, 0.08, 0.05, 0.015, 0.005];


  const handleSpinClick = () => {
    if (!mustSpin) {
      const random = Math.random();
      let cumulativeProbability = 0;
      let selectedSlice = 0;

      for (let i = 0; i < sliceProbabilities.length; i++) {
        cumulativeProbability += sliceProbabilities[i];
        if (random < cumulativeProbability) {
          selectedSlice = i;
          break;
        }
      }

      setPrizeNumber(selectedSlice);
      setMustSpin(true);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white">
      <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/stars-background.png')] opacity-30"></div>
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <header className="bg-indigo-900 bg-opacity-80 py-4 mb-8 rounded-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
            Breeding Altar
          </h1>
        </header>
        <Link href="/arcade" className="inline-block mb-8 px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Arcade
        </Link>
        <div className="flex flex-col items-center">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img src="/valerians/kuuko_no_bg.png" alt="Kuuko" className="w-1/4 h-1/4 object-contain" />
            </div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={['#87CEEB', '#800080']}
              textColors={['#ffffff']}
              innerRadius={25}
              radiusLineColor={"transparent"}
              radiusLineWidth={0}
              fontSize={28}
              perpendicularText={true}
              textDistance={80}
              fontWeight={"normal"}
              pointerProps={{
                style: {
                  filter: 'brightness(0) saturate(90%) invert(91%) sepia(50%) saturate(1013%) hue-rotate(329deg) brightness(103%) contrast(101%)'
                }
              }}
              onStopSpinning={() => {
                setMustSpin(false);
                setResult(prizeNumber + 1);
              }}
            />
          </div>
          <button
            onClick={handleSpinClick}
            disabled={mustSpin}
            className="px-8 py-4 bg-indigo-700 text-yellow-400 rounded-full font-bold text-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {mustSpin ? 'Spinning...' : 'Spin'}
          </button>
          {result !== null && (
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-4">
                You won: {result}x
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[...Array(result)].map((_, index) => (
                  <img 
                    key={index}
                    src="/valerians/kuuko_no_bg.png" 
                    alt="Kuuko" 
                    className="w-16 h-16 object-contain animate-bounce"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: '1s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedingAltar;