"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

const Wheel = dynamic<React.ComponentProps<typeof import('react-custom-roulette')['Wheel']>>(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  { ssr: false }
);

const ClientOnlyWheel: React.FC<React.ComponentProps<typeof Wheel>> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-[400px] w-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return <Wheel {...props} />;
};

const BreedingAltar: React.FC = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data: WheelData[] = [
    { option: '1x', style: { backgroundColor: '#8000BA', textColor: '#ffffff' } },
    { option: '2x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '3x', style: { backgroundColor: '#8000BA', textColor: '#ffffff' } },
    { option: '4x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '5x', style: { backgroundColor: '#8000BA', textColor: '#ffffff' } },
    { option: '6x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
    { option: '8x', style: { backgroundColor: '#8000BA', textColor: '#ffffff' } },
    { option: '10x', style: { backgroundColor: '#87CEEB', textColor: '#ffffff' } },
  ];

  const sliceProbabilities = [0.25, 0.22, 0.20, 0.14, 0.09, 0.06, 0.025, 0.015];

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

const getResultMessage = (result: number): string => {
    const optionString = data[result - 1]?.option;
    if (!optionString) {
      console.error('Invalid result:', result);
      return 'An error occurred';
    }
    const multiplier = parseInt(optionString);
    if (isNaN(multiplier)) {
      console.error('Invalid multiplier:', optionString);
      return 'An error occurred';
    }
    if (multiplier >= 4) {
      return `${multiplier}x! Too bad it's the fake wheel...`;
    } else if (multiplier <= 2) {
      return `${multiplier}x... Get the bad spins out now...`;
    } else {
      return `You won: ${multiplier}x 🥱`;
    }
  };


  return (
    <div className="min-h-screen bg-indigo-950 text-white">
      <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/stars-background.png')] opacity-30"></div>
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
              Breeding Altar
            </h1>
          </div>
        </header>
        <Link href="/arcade" className="inline-block mb-4 px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Arcade
        </Link>
      <div className="flex flex-col items-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img src="/valerians/kuuko_no_bg.png" alt="Kuuko" className="w-1/4 h-1/4 object-contain" />
          </div>
          <ClientOnlyWheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={['#87CEEB', '#8000BA']}
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
          {isMounted && (
            <button
              onClick={handleSpinClick}
              disabled={mustSpin}
              className="px-8 py-4 bg-indigo-700 text-yellow-400 rounded-full font-bold text-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {mustSpin ? 'Spinning...' : 'Spin'}
            </button>
          )}
          {result !== null && (
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-4">
                {getResultMessage(result)}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {(() => {
                  const optionString = data[result - 1]?.option;
                  if (!optionString) return null;
                  const multiplier = parseInt(optionString);
                  if (isNaN(multiplier)) return null;
                  return [...Array(multiplier)].map((_, index) => (
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
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedingAltar;