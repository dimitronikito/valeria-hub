// components/PixelatedStar.tsx

import React from 'react';

interface PixelatedStarProps {
  className?: string;
}

const PixelatedStar: React.FC<PixelatedStarProps> = ({ className = '' }) => (
  <div className={`w-4 h-4 sm:w-5 sm:h-5 relative inline-block mx-0.5 ${className}`}>
    <div className="absolute inset-0 bg-yellow-400" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
    <div className="absolute inset-1 bg-indigo-900" style={{ clipPath: 'polygon(50% 15%, 57% 35%, 80% 35%, 62% 48%, 69% 70%, 50% 57%, 31% 70%, 38% 48%, 20% 35%, 43% 35%)' }}></div>
  </div>
);

export default PixelatedStar;