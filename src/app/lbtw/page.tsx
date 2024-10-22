import React from 'react';
import Link from 'next/link';
import { FaApple, FaAndroid } from 'react-icons/fa';
import TrendingSection from '@/components/TrendingCardsPreview';

const LBTWHub = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
              Land Before The War
            </h1>
          </div>
        </header>

        <Link href="/" className="inline-block px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition duration-300">
          ← Back
        </Link>

        {/* Simplified Links Section */}
        <nav className="py-4 sm:py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <Link href="/lbtw/compare" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Compare
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-yellow-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link href="/lbtw/inventory" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Inventory
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-yellow-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link href="/lbtw/team-builder" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Team Builder
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile App Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a 
            href="https://apps.apple.com/us/app/land-before-the-war/id6446962942" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors group"
          >
            <FaApple className="w-6 h-6 group-hover:text-yellow-400 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xs">Download on the</span>
              <span className="text-lg font-semibold">App Store</span>
            </div>
          </a>

          <a 
            href="https://play.google.com/store/apps/details?id=com.valeriagames.landbeforethewar" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors group"
          >
            <FaAndroid className="w-6 h-6 group-hover:text-yellow-400 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xs">Get it on</span>
              <span className="text-lg font-semibold">Google Play</span>
            </div>
          </a>
        </div>

        {/* Trending Section Component */}
        <TrendingSection />

      </div>
    </div>
  );
};

export default LBTWHub;