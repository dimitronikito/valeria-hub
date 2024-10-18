import React from 'react';
import { Zap, Droplet, Mountain, Wind, Cog, Sparkles, Moon, Sun, Flame, Leaf } from 'lucide-react';

interface ElementIconProps {
  type: string;
  className?: string;
}

const elementIcons: { [key: string]: React.ReactNode } = {
  Fire: <Flame />,
  Electric: <Zap />,
  Water: <Droplet />,
  Grass: <Leaf />,
  Rock: <Mountain />,
  Air: <Wind />,
  Metal: <Cog />,
  Pixie: <Sparkles />,
  Dark: <Moon />,
  Light: <Sun />
};

export const elementColors: { [key: string]: string } = {
  Fire: 'text-red-400',
  Electric: 'text-yellow-300',
  Water: 'text-blue-400',
  Grass: 'text-green-400',
  Rock: 'text-amber-700',
  Air: 'text-blue-200',
  Metal: 'text-gray-300',
  Pixie: 'text-pink-300',
  Dark: 'text-purple-500',
  Light: 'text-yellow-100'
};


const ElementIcon: React.FC<ElementIconProps> = ({ type, className = '' }) => {
  const IconComponent = elementIcons[type];
  const colorClass = elementColors[type] || 'text-white';

  if (!IconComponent) {
    return null;
  }

  return (
    <span className={`${colorClass} ${className}`}>
      {IconComponent}
    </span>
  );
};

export default ElementIcon;