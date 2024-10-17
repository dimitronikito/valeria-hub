"use client"

import React from 'react';
import { motion } from 'framer-motion';

const LbtwValerianDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10 space-y-4 sm:space-y-0">
          <div className="w-24 h-10 bg-indigo-700 rounded animate-pulse"></div>
          <div className="text-right">
            <div className="h-8 w-64 bg-yellow-400 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-yellow-400 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
        
        <motion.div 
          className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
              <div className="md:w-2/5 mb-6 md:mb-0">
                <div className="w-full pb-[133.33%] relative bg-indigo-800 rounded animate-pulse"></div>
              </div>
              <div className="md:w-3/5">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="w-32 h-8 bg-indigo-800 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-indigo-800 rounded animate-pulse"></div>
                </div>
                
                <div className="h-8 w-48 bg-indigo-800 rounded mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-indigo-800 p-4 rounded-lg animate-pulse">
                      <div className="h-6 w-24 bg-indigo-700 rounded mb-2"></div>
                      <div className="h-6 w-32 bg-indigo-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8 bg-indigo-800">
            <div className="h-8 w-48 bg-indigo-700 rounded mb-4 animate-pulse"></div>
            <div className="h-64 bg-indigo-700 rounded animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LbtwValerianDetailSkeleton;