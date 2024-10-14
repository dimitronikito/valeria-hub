"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { valerians, Valerian } from '@/data/valerians';

const ITEMS_PER_LOAD = 25;

const ValeriaHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredValerians = valerians.filter((valerian) =>
    valerian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valerian.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valerian.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMoreItems = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => 
        Math.min(prevVisibleItems + ITEMS_PER_LOAD, filteredValerians.length)
      );
      setIsLoading(false);
    }, 500);
  }, [filteredValerians.length, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreItems, isLoading]);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_LOAD);
  }, [searchTerm]);

  const ValerianCard: React.FC<{ valerian: Valerian }> = React.memo(({ valerian }) => {
    return (
      <Link href={`/valerian/${valerian.name}`}>
        <div className="bg-indigo-800 p-3 sm:p-3 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-all duration-300 border-2 border-indigo-600">
          <div className="mb-2">
            <h2 className="text-xs sm:text-sm md:text-base font-bold leading-tight uppercase text-center truncate" title={valerian.name}>{valerian.name}</h2>
            <div className="flex justify-center items-center">
              {[...Array(valerian.stars)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-xs sm:text-sm">★</span>
              ))}
            </div>
          </div>
          <div className="relative w-full pb-[100%] border-2 border-indigo-400">
            <img
              src={valerian.image}
              alt={valerian.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-[8px] sm:text-[10px] md:text-xs uppercase text-center truncate" title={`${valerian.type} ${valerian.class}`}>{valerian.type} {valerian.class}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">Valeria Hub</h1>
          </div>
        </header>
        <nav className="py-4 sm:py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <Link href="/compare" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Compare
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-yellow-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link href="/minigame" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Minigame
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-yellow-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link href="/socials" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Links
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wide">
            {filteredValerians.length} Valerians
          </h2>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3 sm:px-4 py-2 pl-8 sm:pl-10 rounded-lg bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs uppercase tracking-wide"
              aria-label="Search Valerians"
            />
            <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-indigo-300">🔍</span>
          </div>
        </div>
        {filteredValerians.length === 0 ? (
          <p className="text-center text-indigo-300 mt-4 sm:mt-8 text-xs sm:text-sm uppercase tracking-wide">No Valerians found. Try a different search term.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {filteredValerians.slice(0, visibleItems).map((valerian) => (
              <ValerianCard key={valerian.id} valerian={valerian} />
            ))}
          </div>
        )}
        {visibleItems < filteredValerians.length && (
          <div ref={loaderRef} className="text-center mt-4 sm:mt-6 p-2 sm:p-4 text-xs sm:text-sm uppercase tracking-wide">
            {isLoading ? 'Loading more...' : 'Scroll for more'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ValeriaHub;