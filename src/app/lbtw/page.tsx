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

        <div className="flex justify-between items-center mt-4">
          <Link href="/" className="px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition duration-300">
            ← Back
          </Link>
          
          <div className="flex gap-4">
            <a 
              href="https://apps.apple.com/us/app/land-before-the-war/id6446962942" 
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Download on the App Store"
            >
              <FaApple className="w-6 h-6" />
            </a>

            <a 
              href="https://play.google.com/store/apps/details?id=com.valeriagames.landbeforethewar" 
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Get it on Google Play"
            >
              <FaAndroid className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Simplified Links Section */}
        <nav className="py-4 sm:py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <Link href="/lbtw/team-builder" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Team Builder
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
                <Link href="/lbtw/compare" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Compare
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Trending Section Component */}
        <TrendingSection />

      </div>
    </div>
  );
};

export default LBTWHub;