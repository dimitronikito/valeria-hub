"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { valerians, Valerian } from '@/data/valerians';
import CommentSection from '@/components/CommentSection';
import { CheckCircle, ThumbsUp, ThumbsDown, Plus, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link'

const levelRanges = [
  { id: 1, label: "Level 1-3", stars: [1, 4] },
  { id: 2, label: "Level 4-6", stars: [2, 4] },
  { id: 3, label: "Level 7+", stars: [3, 4] }
];

const TeamBuilder: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedValerians, setSelectedValerians] = useState<Valerian[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [currentLevelRange, setCurrentLevelRange] = useState<typeof levelRanges[0]>(levelRanges[0]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const teamsRef = collection(db, 'teams');
    const q = query(teamsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedTeams = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTeams(fetchedTeams);
  };

  const handleValerianSelection = (valerian: Valerian) => {
    if (selectedValerians.some(v => v.id === valerian.id)) {
      setSelectedValerians(prev => prev.filter(v => v.id !== valerian.id));
    } else if (selectedValerians.length < 5) {
      setSelectedValerians(prev => [...prev, valerian]);
    }
  };

  const isTeamDuplicate = (newTeam: number[]) => {
    return teams.some(team => {
      const teamValerians = team.valerians as number[];
      return teamValerians.length === newTeam.length && 
             newTeam.every(v => teamValerians.includes(v));
    });
  };

  const handleCreateTeam = async () => {
    if (selectedValerians.length !== 5) return;

    const newTeamValerians = selectedValerians.map(v => v.id);
    if (isTeamDuplicate(newTeamValerians)) {
      alert('This team already exists!');
      return;
    }

    const teamData = {
      valerians: newTeamValerians,
      levelRange: currentLevelRange.id,
      createdAt: Timestamp.now(),
      upvotes: 0,
      downvotes: 0,
    };

    try {
      await addDoc(collection(db, 'teams'), teamData);
      setSelectedValerians([]);
      setCreatingTeam(false);
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team);
  };

  const handleVote = async (teamId: string, isUpvote: boolean) => {
    const teamRef = doc(db, 'teams', teamId);
    const teamDoc = await getDoc(teamRef);
    
    if (teamDoc.exists()) {
      const voteField = isUpvote ? 'upvotes' : 'downvotes';
      const currentVotes = teamDoc.data()[voteField] || 0;
      
      await updateDoc(teamRef, {
        [voteField]: currentVotes + 1,
      });
      
      fetchTeams();
    } else {
      console.error('Team document not found');
    }
  };

  const ValerianSelector: React.FC = () => (
    <div className="mb-6">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">Select Valerians ({selectedValerians.length}/5)</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-4">
        {valerians.filter(v => currentLevelRange.stars.includes(v.stars)).map(valerian => {
          const isSelected = selectedValerians.some(v => v.id === valerian.id);
          const isFourStar = valerian.stars === 4;
          return (
            <motion.div
              key={valerian.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative cursor-pointer ${
                isFourStar ? 'bg-purple-800' : 'bg-indigo-800'
              } rounded-lg p-2 md:p-3 transition-all ${
                isSelected ? 'ring-2 ring-yellow-400' : 'hover:bg-opacity-80'
              }`}
              onClick={() => handleValerianSelection(valerian)}
            >
              <div className="w-full pb-[100%] relative rounded-full overflow-hidden">
                <Image
                  src={valerian.image}
                  alt={valerian.name}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="rounded-full"
                />
              </div>
              <p className="text-xs md:text-sm text-center mt-2 font-semibold truncate">{valerian.name}</p>
              {isSelected && (
                <div className="absolute top-1 right-1 bg-yellow-400 rounded-full p-0.5 md:p-1">
                  <CheckCircle size={12} className="text-indigo-900" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const TeamDisplay: React.FC = () => (
    <div className="mb-6 bg-indigo-800 p-4 md:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">Selected Team</h3>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 justify-center">
        {selectedValerians.map(valerian => (
          <motion.div
            key={valerian.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer overflow-hidden ${
              valerian.stars === 4 ? 'bg-purple-700' : 'bg-indigo-700'
            } rounded-lg p-2 md:p-3 w-16 md:w-24 h-24 md:h-36 flex flex-col items-center justify-between shadow-md`}
            onClick={() => handleValerianSelection(valerian)}
          >
            <div className="w-12 h-12 md:w-20 md:h-20 relative overflow-hidden rounded-full">
              <Image
                src={valerian.image}
                alt={valerian.name}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 48px, 80px"
                className="rounded-full"
              />
            </div>
            <p className="text-xs md:text-sm text-center mt-1 w-full font-semibold truncate">{valerian.name}</p>
          </motion.div>
        ))}
        {[...Array(5 - selectedValerians.length)].map((_, index) => (
          <div key={index} className="w-16 md:w-24 h-24 md:h-36 bg-indigo-700 rounded-lg opacity-50 flex items-center justify-center shadow-md">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-indigo-600 rounded-full"></div>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreateTeam}
        disabled={selectedValerians.length !== 5}
        className={`w-full bg-yellow-400 text-indigo-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-lg ${
          selectedValerians.length !== 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'
        }`}
      >
        Create Team
      </motion.button>
    </div>
  );

const TeamList: React.FC<{ levelRange: typeof levelRanges[0], onTeamSelect: (team: any) => void }> = ({ levelRange, onTeamSelect }) => {
  const filteredTeams = teams
    .filter(team => team.levelRange === levelRange.id)
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-4 md:space-y-6">
      {filteredTeams.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-indigo-800 p-4 md:p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => onTeamSelect(team)}
        >
          <div className="flex items-center">
            <div className="flex flex-col items-center mr-4 md:mr-6">
              <div className="text-yellow-400 font-bold text-lg md:text-xl pixel-font">
                #{index + 1}
              </div>
              <div className="flex items-center text-yellow-400 text-sm md:text-base mt-1">
                <ThumbsUp size={16} className="mr-1" />
                <span className="pixel-font">{team.upvotes}</span>
              </div>
            </div>
            <div className="flex-1 flex justify-center space-x-2 md:space-x-4">
              {team.valerians.map((valerianId: number) => {
                const valerian = valerians.find(v => v.id === valerianId);
                return valerian ? (
                  <div key={valerian.id} className={`w-12 md:w-20 h-16 md:h-28 ${
                    valerian.stars === 4 ? 'bg-purple-700' : 'bg-indigo-700'
                  } rounded-lg p-1 md:p-2 flex flex-col items-center justify-between shadow-md`}>
                    <div className="w-10 h-10 md:w-16 md:h-16 relative overflow-hidden rounded-full">
                      <Image
                        src={valerian.image}
                        alt={valerian.name}
                        layout="fill"
                        objectFit="cover"
                        sizes="(max-width: 768px) 40px, 64px"
                        className="rounded-full"
                      />
                    </div>
                    <p className="text-[8px] md:text-xs text-center mt-0.5 md:mt-1 w-full truncate font-semibold pixel-font">{valerian.name}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


const SelectedTeamView: React.FC = () => (
  <div className="bg-indigo-800 p-4 md:p-6 rounded-lg shadow-lg">
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
      {selectedTeam.valerians.map((valerianId: number) => {
        const valerian = valerians.find(v => v.id === valerianId);
        return valerian ? (
          <motion.div 
            key={valerian.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-20 md:w-32 h-28 md:h-44 ${
              valerian.stars === 4 ? 'bg-purple-700' : 'bg-indigo-700'
            } rounded-lg p-2 md:p-4 flex flex-col items-center justify-between shadow-md`}
          >
            <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden rounded-full">
              <Image
                src={valerian.image}
                alt={valerian.name}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 64px, 96px"
                className="rounded-full"
              />
            </div>
            <p className="text-xs md:text-sm text-center mt-1 md:mt-2 w-full font-semibold truncate">{valerian.name}</p>
          </motion.div>
        ) : null;
      })}
    </div>
    <div className="flex justify-center space-x-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handleVote(selectedTeam.id, true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <ThumbsUp size={20} />
        <span className="pixel-font">{selectedTeam.upvotes}</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handleVote(selectedTeam.id, false);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <ThumbsDown size={20} />
        <span className="pixel-font">{selectedTeam.downvotes}</span>
      </motion.button>
    </div>
    <div className="flex justify-center mb-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedTeam(null)}
        className="bg-yellow-400 text-indigo-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-lg hover:bg-yellow-300 flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Teams
      </motion.button>
    </div>
    <CommentSection 
      entityId={selectedTeam.id} 
      collectionPath="teams"
      customStyles={{
        input: "bg-indigo-700",
        textarea: "bg-indigo-700"
      }}
    />
  </div>
);


  return (
    <div className="min-h-screen bg-indigo-950 text-white px-4 md:px-6 py-6 md:py-12">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-12 text-center text-yellow-400">Team Builder</h1>
        {!selectedTeam ? (
          <>
            {levelRanges.map(range => (
              <div key={range.id} className="mb-8 md:mb-16">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl md:text-3xl font-bold text-yellow-400">{range.label} Teams</h2>
                  {!creatingTeam && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCreatingTeam(true);
                        setCurrentLevelRange(range);
                        setSelectedValerians([]);
                      }}
                      className="bg-yellow-400 text-indigo-900 p-2 md:px-6 md:py-3 rounded-full md:rounded-lg font-bold text-sm md:text-lg hover:bg-yellow-300 flex items-center"
                    >
                      <Plus size={20} className="md:mr-2" />
                      <span className="hidden md:inline">Create Team</span>
                    </motion.button>
                  )}
                </div>
                {creatingTeam && currentLevelRange.id === range.id && (
                  <>
                    <ValerianSelector />
                    <TeamDisplay />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCreatingTeam(false)}
                      className="bg-red-500 text-white p-2 md:px-6 md:py-3 rounded-full md:rounded-lg font-bold text-sm md:text-lg hover:bg-red-400 mb-4 md:mb-6 flex items-center"
                    >
                      <X size={20} className="md:mr-2" />
                      <span className="hidden md:inline">Cancel</span>
                    </motion.button>
                  </>
                )}
                <TeamList levelRange={range} onTeamSelect={handleTeamSelect} />
              </div>
            ))}
          </>
        ) : (
          <SelectedTeamView />
        )}
      </div>
    </div>
  );
};

export default TeamBuilder;