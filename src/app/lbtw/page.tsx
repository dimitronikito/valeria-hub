import React from 'react';
import Link from 'next/link';
import { FaApple, FaAndroid } from 'react-icons/fa';
import TrendingSection from '@/components/TrendingCardsPreview';

const LBTWHub = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-slate-300">
      <header className="relative h-64 md:h-96 mb-8">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/lbtw_home.png')",
            backgroundPosition: "center 25%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950"></div>
        </div>
        
        {/* Top Navigation Row */}
        <div className="absolute top-4 w-full px-4">
          <div className="container mx-auto max-w-6xl flex justify-between items-center">
            <Link 
              href="/" 
              className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-600 transition-all duration-300 hover:scale-105 font-medium"
            >
              ← Back
            </Link>
            <div className="flex gap-3">
              <a
                href="https://apps.apple.com/us/app/land-before-the-war/id6446962942"
                className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/60 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-medium"
                aria-label="Download on the App Store"
              >
                <FaApple className="w-6 h-6" />
                <span className="text-sm hidden sm:inline text-white">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.valeriagames.landbeforethewar"
                className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/60 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-medium"
                aria-label="Get it on Google Play"
              >
                <FaAndroid className="w-6 h-6" />
                <span className="text-sm hidden sm:inline text-white">Play Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Centered Title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-widest text-yellow-400 text-shadow-sm">
            Land Before The War
          </h1>
        </div>

        {/* Bottom Links */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-950/90 to-transparent py-4">
          <nav className="container mx-auto max-w-6xl">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <Link 
                  href="/lbtw/team-builder" 
                  className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-105 font-medium border-b-2 border-transparent hover:border-yellow-300 py-1 text-sm"
                >
                  Team Builder
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-slate-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link 
                  href="/lbtw/inventory" 
                  className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-105 font-medium border-b-2 border-transparent hover:border-yellow-300 py-1 text-sm"
                >
                  Inventory
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-slate-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link 
                  href="/lbtw/compare" 
                  className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-105 font-medium border-b-2 border-transparent hover:border-yellow-300 py-1 text-sm"
                >
                  Compare
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-2 sm:px-4">
        <TrendingSection />
      </div>
    </div>
  );
};

export default LBTWHub;