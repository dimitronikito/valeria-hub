"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { valerians, Valerian } from '@/data/valerians';
import ValerianCommentSection from '@/components/ValerianCommentSection';
import { motion } from 'framer-motion';
import { Zap, Droplet, Mountain, Wind, Cog, Sparkles, Moon, Sun, Flame, Leaf } from 'lucide-react';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max, color }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
    <div className="w-full bg-indigo-800 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  </div>
);

const elementIcons: { [key: string]: React.ReactNode } = {
  Fire: <Flame className="text-red-500" />,
  Electric: <Zap className="text-yellow-400" />,
  Water: <Droplet className="text-blue-500" />,
  Grass: <Leaf className="text-green-500" />,
  Rock: <Mountain className="text-gray-500" />,
  Air: <Wind className="text-blue-300" />,
  Metal: <Cog className="text-gray-400" />,
  Pixie: <Sparkles className="text-pink-400" />,
  Dark: <Moon className="text-purple-600" />,
  Light: <Sun className="text-yellow-300" />
};

interface ValerianDetailProps {
  params: { name: string };
}

const ValerianDetail: React.FC<ValerianDetailProps> = ({ params }) => {
  const router = useRouter();
  const { name } = params;
  const valerian = valerians.find(v => v.name === decodeURIComponent(name));
  const [rating, setRating] = useState<'up' | 'down' | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleRating = (newRating: 'up' | 'down') => {
    setRating(newRating);
    // Here you would typically send this rating to your backend
  };

  if (!valerian) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white p-4 flex items-center justify-center">
        <p className="text-xl">Valerian not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="container mx-auto max-w-7xl">     
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10 space-y-4 sm:space-y-0">
          <button
            onClick={handleBack}
            className="inline-block px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition duration-300"
          >
            ← Back
          </button>
          <div className="text-right">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {valerian.name}
            </h1>
            <div className="flex justify-end items-center mt-1">
              {[...Array(valerian.stars)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-lg sm:text-xl">★</span>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
              <div className="md:w-2/5 mb-6 md:mb-0">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-full pb-[100%]"
                >
                  <Image
                    src={valerian.image}
                    alt={valerian.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
              <div className="md:w-3/5">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl">
                    <span className="font-semibold">Type:</span> 
                    <span className="ml-2">{valerian.type}</span>
                  </div>
                  <div className="text-lg sm:text-xl">
                    <span className="font-semibold">Class:</span> 
                    <span className="ml-2">{valerian.class}</span>
                  </div>
                </div>
                
                <section className="mb-6">
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
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-indigo-900 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg"
        >
          <ValerianCommentSection valerianId={valerian.id} />
        </motion.div>
      </div>
    </div>
  );
}

export default ValerianDetail;