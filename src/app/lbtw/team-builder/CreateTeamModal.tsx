import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, CheckCircle, Plus } from 'lucide-react';
import { Valerian } from '@/data/valerians';
import { play } from '@/lib/fonts';

interface LevelRange {
  id: number;
  label: string;
  stars: number[];
}

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelRange: LevelRange;
  valerians: Valerian[];
  onCreateTeam: (selectedValerians: Valerian[]) => Promise<void>;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ 
  isOpen, 
  onClose, 
  currentLevelRange, 
  valerians, 
  onCreateTeam 
}) => {
  const [selectedValerians, setSelectedValerians] = useState<Valerian[]>([]);

  const handleValerianSelection = useCallback((valerian: Valerian) => {
    if (selectedValerians.some(v => v.id === valerian.id)) {
      setSelectedValerians(prev => prev.filter(v => v.id !== valerian.id));
    } else if (selectedValerians.length < 5) {
      setSelectedValerians(prev => [...prev, valerian]);
    }
  }, [selectedValerians]);

  const clearAndClose = () => {
    setSelectedValerians([]);
    onClose();
  };

  const handleSubmit = async () => {
    if (selectedValerians.length === 5) {
      await onCreateTeam(selectedValerians);
      clearAndClose();
    }
  };

  const PreviewSlot = ({ valerian }: { valerian?: Valerian }) => {
    if (valerian) {
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`cursor-pointer ${
            valerian.stars === 4 ? 'bg-purple-700' : 'bg-indigo-700'
          } rounded-lg p-2 max-w-[90px]`}  // Changed from 120px to 90px
          onClick={() => handleValerianSelection(valerian)}
        >
          <div className="w-full pb-[100%] relative rounded-full overflow-hidden">
            <Image
              src={valerian.image}
              alt={valerian.name}
              fill
              sizes="(max-width: 768px) 20vw, 90px"  // Changed from 120px to 90px
              className="rounded-full object-cover"
            />
          </div>
          <p className={`text-xs sm:text-sm mt-1 w-full text-center truncate px-1 ${play.className}`}>
            {valerian.name}
          </p>
        </motion.div>
      );
    }

    return (
      <div className="bg-indigo-700 rounded-lg p-2 max-w-[90px]">  {/* Changed from 120px to 90px */}
        <div className="w-full pb-[100%] relative rounded-full overflow-hidden bg-indigo-600" />
        <div className="mt-1 h-5 w-full" />
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={clearAndClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-indigo-900 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl z-50"
          >
            {/* Sticky Header with Team Preview */}
            <div className="sticky top-0 bg-indigo-900 z-10 border-b border-indigo-800">
              <div className="p-4">
                {/* Title and Close Button */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg md:text-2xl font-bold text-yellow-400 pixel-font">
                    {currentLevelRange.label}
                  </h2>
                  <button
                    onClick={clearAndClose}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Team Preview */}
              <div className="bg-indigo-800 rounded-lg py-4">
                <div className="max-w-[800px] mx-auto px-4">
                  <div className="grid grid-cols-5 gap-3 md:gap-6">
                    {[...Array(5)].map((_, index) => (
                      <PreviewSlot
                        key={index}
                        valerian={selectedValerians[index]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Valerian Selection */}
            <div className="p-4 pb-20">
              <h3 className="text-lg font-bold mb-4 text-yellow-400">
                Select Valerians ({selectedValerians.length}/5)
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {valerians
                  .filter(v => currentLevelRange.stars.includes(v.stars))
                  .map(valerian => {
                    const isSelected = selectedValerians.some(v => v.id === valerian.id);
                    const isFourStar = valerian.stars === 4;
                    return (
                      <motion.div
                        key={valerian.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative cursor-pointer ${
                          isFourStar ? 'bg-purple-800' : 'bg-indigo-800'
                        } rounded-lg p-2 transition-all ${
                          isSelected ? 'ring-2 ring-yellow-400' : 'hover:bg-opacity-80'
                        }`}
                        onClick={() => handleValerianSelection(valerian)}
                      >
                        <div className="w-full pb-[100%] relative rounded-full overflow-hidden">
                          <Image
                            src={valerian.image}
                            alt={valerian.name}
                            fill
                            sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16.67vw, 12.5vw"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <p className={`text-xs sm:text-sm md:text-base mt-1 w-full text-center truncate px-1 ${play.className}`}>
                          {valerian.name}
                        </p>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-yellow-400 rounded-full p-0.5">
                            <CheckCircle size={12} className="text-indigo-900" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
              </div>
            </div>

            {/* Sticky Create Button */}
            <div className="sticky bottom-0 bg-indigo-900 p-4 border-t border-indigo-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={selectedValerians.length !== 5}
                className={`w-full bg-yellow-400 text-indigo-900 px-4 py-2 rounded-lg font-bold text-sm ${
                  selectedValerians.length !== 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'
                }`}
              >
                Create Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateTeamModal;