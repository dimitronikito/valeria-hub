"use client"

import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const BlurredCard: React.FC = () => (
  <div className="bg-indigo-800 p-2 blur-sm rounded-lg shadow-md border-2 border-indigo-600 opacity-50">
    <div className="mb-2">
      <div className="h-3 bg-indigo-600 rounded w-3/4 mx-auto"></div>
      <div className="mt-1 flex justify-center">
        <div className="h-2 w-12 bg-yellow-400 rounded"></div>
      </div>
    </div>
    <div className="relative w-full pb-[100%] bg-indigo-700 rounded-lg"></div>
    <div className="mt-2 flex items-center justify-center space-x-1">
      <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
      <div className="h-2 w-12 bg-indigo-600 rounded"></div>
    </div>
  </div>
);

const TrendingSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="mb-8">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
      
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-yellow-400 flex items-center">
        <span className="mr-2">Trending</span>
        <TrendingUp className="w-6 h-6 text-green-400" />
      </h3>
      <div className="relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
          <div className="contents sm:hidden">
            {[...Array(3)].map((_, index) => (
              <BlurredCard key={`mobile-${index}`} />
            ))}
          </div>
          <div className="hidden sm:contents md:hidden">
            {[...Array(4)].map((_, index) => (
              <BlurredCard key={`sm-${index}`} />
            ))}
          </div>
          <div className="hidden md:contents lg:hidden">
            {[...Array(5)].map((_, index) => (
              <BlurredCard key={`md-${index}`} />
            ))}
          </div>
          <div className="hidden lg:contents">
            {[...Array(6)].map((_, index) => (
              <BlurredCard key={`lg-${index}`} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl font-bold text-yellow-400 uppercase">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;