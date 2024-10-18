"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Droplet, Mountain, Wind, Cog, Sparkles, Moon, Sun, Flame, Leaf, ThumbsUp, ThumbsDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { NFT } from '@/types/nft';

const PriceChart = dynamic(() => import('@/components/PriceChart'), { ssr: false });

interface LbtwValerianDetailPageProps {
  nft: NFT;
}

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

const LbtwValerianDetailPage: React.FC<LbtwValerianDetailPageProps> = ({ nft }) => {
  const [rating, setRating] = useState<'up' | 'down' | null>(null);

  const handleRating = (newRating: 'up' | 'down') => {
    setRating(newRating);
    // Here you would typically send this rating to your backend
  };

  const getModifiedNameAndLevel = () => {
    let fullName = nft.metadata?.name || '';
    const shinyAttribute = nft.metadata?.attributes?.find(attr => attr.trait_type === 'Shiny' && attr.value === 'Yes');
    const uniqueAttribute = nft.metadata?.attributes?.find(attr => attr.trait_type === 'Unique' && attr.value === 'Yes');

    // Extract level from the name
    const levelMatch = fullName.match(/\(LVL (\d+)\)$/);
    let name = fullName.replace(/\(LVL \d+\)$/, '').trim();
    let level = levelMatch ? levelMatch[1] : '';

    if (shinyAttribute) {
      name = `Shiny ${name}`;
    } else if (uniqueAttribute) {
      name = `Unique ${name}`;
    }

    return { name, level };
  };

  const { name, level } = getModifiedNameAndLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10 space-y-4 sm:space-y-0">
          <Link href="/inventory" className="inline-block px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition duration-300">
            ← Back
          </Link>
          <div className="text-right">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {name}
            </h1>
            {level && (
              <p className="text-lg sm:text-xl text-yellow-400 mt-1">
                LVL {level}
              </p>
            )}
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
                  className="relative w-full pb-[133.33%]"
                >
                  <Image 
                    src={nft.metadata?.image || '/placeholder-image.png'} 
                    alt={nft.metadata?.name || 'NFT'} 
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
              <div className="md:w-3/5">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl">
                    <span className="font-semibold">ID:</span> 
                    <span className="font-mono bg-indigo-800 px-2 sm:px-3 py-1 rounded ml-2">#{nft.id}</span>
                  </div>
                  <div className="text-lg sm:text-xl">
                    <span className="font-semibold">QTY:</span> 
                    <span className="font-bold text-yellow-400 ml-2">{nft.balance}</span>
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Attributes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {nft.metadata?.attributes?.map((attr, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-indigo-800 p-3 sm:p-4 rounded-lg shadow-md"
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center mb-1 sm:mb-2">
                        <p className="font-semibold text-base sm:text-lg">{attr.trait_type}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="text-yellow-300 text-base mr-2 sm:text-lg">{attr.value}</p>
                        {elementIcons[attr.value] || null}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8">
                  <div className="flex justify-center space-x-8">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRating('up')}
                      className={`p-2 rounded-full ${rating === 'up' ? 'bg-green-500' : 'bg-indigo-800'}`}
                    >
                      <ThumbsUp size={32} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRating('down')}
                      className={`p-2 rounded-full ${rating === 'down' ? 'bg-red-500' : 'bg-indigo-800'}`}
                    >
                      <ThumbsDown size={32} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8 bg-indigo-800">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Market</h2>
            <PriceChart />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LbtwValerianDetailPage;