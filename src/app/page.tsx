"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ElementIcon from '@/components/ElementIcons';
import { valerians, Valerian } from '@/data/valerians';
import TrendingSection from '@/components/TrendingCardsPreview';
import { play } from '@/lib/fonts';

const ValeriaHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredValerians = valerians.filter((valerian) =>
    valerian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valerian.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valerian.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  type StarRating = 1 | 2 | 3 | 4;

  const groupedValerians: Record<StarRating, Valerian[]> = {
    1: filteredValerians.filter(v => v.stars === 1),
    2: filteredValerians.filter(v => v.stars === 2),
    3: filteredValerians.filter(v => v.stars === 3),
    4: filteredValerians.filter(v => v.stars === 4)
  };

  const evolutionHeaders: Record<StarRating, string> = {
    1: "Starters",
    2: "Second Evolutions",
    3: "Third Evolutions",
    4: "Legendaries"
  };

  const starRatings: StarRating[] = [1, 2, 3, 4];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 50 
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeNextCharacter = (): void => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, delay);
      } else {
        setIsTyping(false);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return (
    <div className="relative">
      <p className={`${play.className} text-xl sm:text-2xl md:text-3xl text-indigo-900 tracking-wide leading-relaxed`}>
        <span className="">{displayedText}</span>
        {isTyping && (
          <span className="inline-block w-[2px] h-[1em] bg-indigo-900 ml-1 animate-pulse" />
        )}
      </p>
    </div>
  );
};

interface FavianGreetingProps {
  mascotImageSrc?: string;
  welcomeText?: string;
  className?: string;
}

const FavianGreeting: React.FC<FavianGreetingProps> = ({
  mascotImageSrc = "/chibi_favian.png",
  welcomeText = "Hi! Welcome to the Valeria Community Hub!",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`max-w-4xl mx-auto mb-8 px-4 ${className}`.trim()}>
      <div 
        className={`
          relative bg-indigo-900/90 rounded-2xl p-4 shadow-xl 
          transition-opacity duration-500 
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/** Image Container **/}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0">
            <Image
              src={mascotImageSrc}
              alt="Valeria Mascot"
              width={256}
              height={256}
              className="object-contain w-full h-full"
              priority={true}
            />
          </div>
          {/** Text Bubble with Updated Typography **/}
          <div className="relative bg-white rounded-xl p-2 sm:p-4 w-full">
            {/** Speech Bubble Triangle **/}
            <div className="hidden sm:block absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-r-[16px] border-r-white" />
            </div>
            {/** Text Content with Enhanced Typography **/}
            <div className="relative shadow-sm">
              <TypewriterText text={welcomeText} delay={75} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


  const ValerianCard: React.FC<{ valerian: Valerian; index: number }> = React.memo(({ valerian, index }) => {
    return (
      <Link href={`/valerian/${valerian.name}`}>
        <div 
          className={`bg-indigo-800 p-3 sm:p-3 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-all duration-300 border-2 border-indigo-600 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} 
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="mb-2">
            <h2 className="text-xs sm:text-sm md:text-base font-bold leading-tight uppercase text-center truncate" title={valerian.name}>{valerian.name}</h2>
            <div className="flex justify-center items-center">
              {[...Array(valerian.stars)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-xs sm:text-sm">★</span>
              ))}
            </div>
          </div>
          <div className="relative w-full pb-[100%] border-2 border-indigo-400 rounded-lg">
            <Image
              src={valerian.image}
              alt={valerian.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2">          
            <ElementIcon type={valerian.type}/>
            <p className="text-[10px] uppercase truncate flex items-center">
              <span className="text-gray-200 mr-1">{valerian.class}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
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
        
        <header className="bg-indigo-900 py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">Valeria Community Hub</h1>
          </div>
        </header>
        
        <nav className="py-4 sm:py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <Link href="/lbtw" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  LBTW
                </Link>
              </li>
              <li className="mb-2 sm:mb-0 text-yellow-400">•</li>
              <li className="mb-2 sm:mb-0">
                <Link href="/arcade" className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                  Arcade
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
        
        <FavianGreeting />
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="SEARCH CARDS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm uppercase tracking-wide"
              aria-label="Search Valerians"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300">🔍</span>
          </div>
        </div>
        
        {/* Conditional Trending Section */}
        {searchTerm === '' && <TrendingSection />}
        
        {/* Valerians List */}
        <div className="mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wide">
            {filteredValerians.length} Valerians
          </h2>
        </div>
        {filteredValerians.length === 0 ? (
          <p className="text-center text-indigo-300 mt-4 sm:mt-8 text-xs sm:text-sm uppercase tracking-wide">No Valerians found. Try a different search term.</p>
        ) : (
          starRatings.map((stars) => (
            groupedValerians[stars].length > 0 && (
              <div key={stars} className="mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-yellow-400">
                  {evolutionHeaders[stars]}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
                  {groupedValerians[stars].map((valerian, index) => (
                    <ValerianCard key={valerian.id} valerian={valerian} index={index} />
                  ))}
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default ValeriaHub;