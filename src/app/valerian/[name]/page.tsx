"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { valerians } from '@/data/valerians';
import ValerianCommentSection from '@/components/ValerianCommentSection';
import ElementIcon, { elementColors } from '@/components/ElementIcons';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max, color }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span className="text-xs sm:text-sm w-24 sm:w-28">{label}</span>
    <div className="flex-grow bg-indigo-800 rounded-full h-2 sm:h-3 overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
    <span className="text-xs sm:text-sm w-10 sm:w-12 text-right">{value}</span>
  </div>
);

interface ValerianDetailProps {
  params: { name: string };
}

const ValerianDetail: React.FC<ValerianDetailProps> = ({ params }) => {
  const router = useRouter();
  const { name } = params;
  const valerian = valerians.find(v => v.name === decodeURIComponent(name));
  const [statsVisible, setStatsVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const toggleStats = () => {
    setStatsVisible(!statsVisible);
  };

  if (!valerian) {
    return (
      <div className="min-h-screen bg-indigo-950 text-white p-4 flex items-center justify-center">
        <p className="text-xl">Valerian not found</p>
      </div>
    );
  }

  const typeColorClass = elementColors[valerian.type] || 'text-white';

  return (
    <div className="min-h-screen bg-indigo-950 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-4 px-3 py-1 bg-indigo-700 text-yellow-400 rounded text-sm sm:text-base transition-colors hover:bg-indigo-600 hover:scale-105 transform"
        >
          ← Back
        </button>
        
        <div className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2 sm:mb-0">{valerian.name}</h1>
              <div className="flex animate-pulse">
                {[...Array(valerian.stars)].map((_, index) => (
                  <span key={index} className="text-yellow-400 text-lg sm:text-xl">★</span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <div className="sm:w-1/3 mb-4 sm:mb-0">
                <div className="relative w-full pb-[100%] sm:pb-[133%] transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src={valerian.image}
                    alt={valerian.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded shadow-lg"
                  />
                </div>
              </div>
              
              <div className="sm:w-2/3">
                <div className="flex justify-between text-sm sm:text-base mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`${typeColorClass} font-semibold`}>{valerian.type}</span>
                    <ElementIcon type={valerian.type} />
                  </div>
                  <span className="bg-indigo-800 px-2 py-1 rounded">{valerian.class}</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-400">Passive Ability</h2>
                  <h3 className={`font-semibold mb-1 ${typeColorClass}`}>{valerian.passive}</h3>
                  <p className="text-sm sm:text-base">{valerian.passiveDescription}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-yellow-400">Stats</h2>
                    <button
                      onClick={toggleStats}
                      className="sm:hidden bg-indigo-700 text-yellow-400 px-3 py-1 rounded flex items-center transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs"
                    >
                      {statsVisible ? (
                        <>
                          Hide <ChevronUp className="ml-1 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show <ChevronDown className="ml-1 w-4 h-4 animate-bounce" />
                        </>
                      )}
                    </button>
                  </div>
                  <div 
                    className={`sm:block overflow-hidden transition-all duration-500 ease-in-out ${
                      statsVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-full sm:opacity-100'
                    }`}
                  >
                    <StatBar label="HP" value={valerian.stats.hp} max={150} color="bg-green-600" />
                    <StatBar label="Attack" value={valerian.stats.attack} max={150} color="bg-red-600" />
                    <StatBar label="Speed" value={valerian.stats.speed} max={150} color="bg-blue-600" />
                    <StatBar label="Defense" value={valerian.stats.defense} max={150} color="bg-yellow-600" />
                    <StatBar label="Magic Defense" value={valerian.stats.magicDefense} max={150} color="bg-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ValerianCommentSection valerianId={valerian.id} />
        </div>
      </div>
    </div>
  );
}

export default ValerianDetail;