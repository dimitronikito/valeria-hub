"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { valerians, Valerian } from '@/data/valerians';
import { ThumbsUp, ThumbsDown, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';
import CreateTeamModal from './CreateTeamModal';
import { play } from '@/lib/fonts';

const CommentSection = dynamic(() => import('@/components/CommentSection'), {
  loading: () => <div className="animate-pulse h-32 bg-indigo-800 rounded-lg"></div>
});

const levelRanges = [
  { id: 1, label: "Lvl 1-3", stars: [1, 4] },
  { id: 2, label: "Lvl 4-6", stars: [2, 4] },
  { id: 3, label: "Lvl 7+", stars: [3, 4] }
];

const TeamBuilder: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [currentLevelRange, setCurrentLevelRange] = useState<typeof levelRanges[0]>(levelRanges[0]);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [userVotes, setUserVotes] = useState<Record<string, 'upvote' | 'downvote'>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchTeams();
    const initialExpandedState = levelRanges.reduce((acc, range) => {
      acc[range.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setExpandedSections(initialExpandedState);

    // Load user votes from local storage
    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      setUserVotes(JSON.parse(storedVotes));
    }
  }, []);

  const fetchTeams = async () => {
    const teamsRef = collection(db, 'teams');
    const q = query(teamsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedTeams = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTeams(fetchedTeams);
  };

  const isTeamDuplicate = (newTeam: number[]) => {
    return teams.some(team => {
      const teamValerians = team.valerians as number[];
      return teamValerians.length === newTeam.length && 
             newTeam.every(v => teamValerians.includes(v));
    });
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team);
  };

  const handleVote = debounce(async (teamId: string, isUpvote: boolean) => {
  const currentVote = userVotes[teamId];
  
  if (currentVote === 'upvote' && isUpvote) return;
  if (currentVote === 'downvote' && !isUpvote) return;

  const teamRef = doc(db, 'teams', teamId);
  const teamDoc = await getDoc(teamRef);
  
  if (teamDoc.exists()) {
    const upvoteField = 'upvotes';
    const downvoteField = 'downvotes';
    const currentUpvotes = teamDoc.data()[upvoteField] || 0;
    const currentDownvotes = teamDoc.data()[downvoteField] || 0;
    
    let updatedUpvotes = currentUpvotes;
    let updatedDownvotes = currentDownvotes;

    if (currentVote) {
      // Remove previous vote
      if (currentVote === 'upvote') updatedUpvotes--;
      if (currentVote === 'downvote') updatedDownvotes--;
    }

    // Add new vote
    if (isUpvote) updatedUpvotes++;
    else updatedDownvotes++;

    await updateDoc(teamRef, {
      [upvoteField]: updatedUpvotes,
      [downvoteField]: updatedDownvotes,
    });

    // Update local storage and state with correct typing
    const newUserVotes: Record<string, 'upvote' | 'downvote'> = { 
      ...userVotes, 
      [teamId]: isUpvote ? 'upvote' : 'downvote' 
    };
    setUserVotes(newUserVotes);
    localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    
    fetchTeams();
  }
}, 300);

  const toggleSection = (rangeId: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [rangeId]: !prev[rangeId]
    }));
  };

  const BackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center mb-6"
      onClick={onClick}
    >
      ← Back
    </motion.button>
  );

  const TeamList: React.FC<{ levelRange: typeof levelRanges[0], onTeamSelect: (team: any) => void }> = ({ levelRange, onTeamSelect }) => {
    const filteredTeams = useMemo(() => {
      return teams
        .filter(team => team.levelRange === levelRange.id)
        .sort((a, b) => b.upvotes - a.upvotes);
    }, [teams, levelRange.id]);

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
                    <div key={valerian.id} className={`w-12 md:w-20 h-18 md:h-24 ${
                      valerian.stars === 4 ? 'bg-purple-700' : 'bg-indigo-700'
                    } rounded-lg p-1 md:p-2 flex flex-col items-center justify-between shadow-md`}>
                      <div className="w-10 h-10 md:w-16 md:h-16 relative overflow-hidden rounded-full">
                        <Image
                          src={valerian.image}
                          alt={valerian.name}
                          fill
                          sizes="(max-width: 768px) 48px, 80px"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <p className={`text-[10px] md:text-sm text-center w-full overflow-hidden font-semibold pixel-font ${play.className}`}>
                        {valerian.name}
                      </p>
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
                  fill
                  sizes="(max-width: 768px) 48px, 80px"
                  className="rounded-full object-cover"
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
          className={`bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
            userVotes[selectedTeam.id] === 'upvote' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={userVotes[selectedTeam.id] === 'upvote'}
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
          className={`bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
            userVotes[selectedTeam.id] === 'downvote' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={userVotes[selectedTeam.id] === 'downvote'}
        >
          <ThumbsDown size={20} />
          <span className="pixel-font">{selectedTeam.downvotes}</span>
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
    <div className="min-h-screen bg-indigo-950 text-white px-4 py-4">
      <div className="container mx-auto max-w-2xl">
        {selectedTeam ? (
          <BackButton onClick={() => setSelectedTeam(null)} />
        ) : (
          <Link href="/lbtw">
            <BackButton />
          </Link>
        )}
        
        {!selectedTeam ? (
          <>
            {levelRanges.map(range => (
              <div key={range.id} className="mb-8 md:mb-16">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSection(range.id)}
                      className="mr-2 text-yellow-400"
                    >
                      {expandedSections[range.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </motion.button>
                    <h2 className="text-lg font-bold text-yellow-400">{range.label} Teams</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentLevelRange(range);
                      setIsModalOpen(true);
                    }}
                    className="bg-yellow-400 text-indigo-900 p-2 md:px-6 md:py-3 rounded-full md:rounded-lg font-bold text-sm md:text-lg hover:bg-yellow-300 flex items-center"
                  >
                    <Plus size={20} className="md:mr-2" />
                    <span className="hidden md:inline">Create Team</span>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {expandedSections[range.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TeamList levelRange={range} onTeamSelect={handleTeamSelect} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </>
        ) : (
          <SelectedTeamView />
        )}

        <CreateTeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentLevelRange={currentLevelRange}
          valerians={valerians}
          onCreateTeam={async (selectedValerians: Valerian[]) => {
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
              fetchTeams();
            } catch (error) {
              console.error('Error creating team:', error);
            }
          }}
        />
        </div>
    </div>
  );
};

export default TeamBuilder;