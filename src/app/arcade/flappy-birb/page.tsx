"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, getDocs, where, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const FlappyBirbGame = dynamic(() => import('./FlappyBirbGame'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px] bg-indigo-900 rounded-lg">
      <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
    </div>
  ),
});

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

const FlappyBirb: React.FC = () => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [username, setUsername] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [scoreHash, setScoreHash] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [restartKey, setRestartKey] = useState(0);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leaderboardEntries: LeaderboardEntry[] = [];
      querySnapshot.forEach((doc) => {
        leaderboardEntries.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
      });
      setLeaderboard(leaderboardEntries);
    });

    return () => unsubscribe();
  }, []);

const handleSetScore = (score: number, hash: string) => {
    console.log(`Setting score: ${score}, hash: ${hash}`);
    setCurrentScore(score);
    setScoreHash(hash);
  };

const handleSubmitScore = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submit score button clicked");
  setSubmitError(null);
  setDebugInfo('');

  try {
    if (!username.trim()) {
      throw new Error("Username is empty");
    }

    if (currentScore < 0 || currentScore > 1000) {
      throw new Error(`Invalid score: ${currentScore}`);
    }

    console.log(`Submitting score: ${currentScore} for user: ${username}`);

    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, where('name', '==', username.trim()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Creating new leaderboard entry");
      await addDoc(leaderboardRef, {
        name: username.slice(0, 20),
        score: currentScore,
        timestamp: serverTimestamp()
      });
    } else {
      console.log("Updating existing leaderboard entry");
      const doc = querySnapshot.docs[0];
      const existingScore = doc.data().score;
      if (currentScore > existingScore) {
        await updateDoc(doc.ref, {
          score: currentScore,
          timestamp: serverTimestamp()
        });
      } else {
        console.log("New score not higher than existing score, not updating");
      }
    }

    console.log("Score submitted successfully");
    setShowSubmitForm(false);
    setUsername('');
    restartGame();
  } catch (error) {
    console.error("Error in handleSubmitScore:", error);
    setSubmitError(error instanceof Error ? error.message : "An unknown error occurred");
    setDebugInfo(JSON.stringify({ currentScore, scoreHash, username }, null, 2));
  }
};

  const restartGame = () => {
    setRestartKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <header className="bg-indigo-900 py-4 mb-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
              Flappy Birb
            </h1>
          </div>
        </header>
        <Link href="/arcade" className="inline-block mb-4 px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Arcade
        </Link>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <FlappyBirbGame 
              key={restartKey}
              setCurrentScore={handleSetScore} 
              setShowSubmitForm={setShowSubmitForm} 
            />
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <h2 className="text-2xl mb-4 text-yellow-400">Leaderboard</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-indigo-800 p-6 rounded-lg relative">
              <h2 className="text-2xl mb-4">Game Over! Your Score: {currentScore}</h2>
              <form onSubmit={handleSubmitScore}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 mb-4 text-black"
                />
                <button 
                  type="submit" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitScore(e);
                  }}
                  className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded mr-2"
                >
                  Submit Score
                </button>
                <button 
                  type="button" 
                  className="bg-indigo-600 text-yellow-400 px-4 py-2 rounded"
                  onClick={() => {
                    setShowSubmitForm(false);
                    restartGame();
                  }}
                >
                  Play Again
                </button>
              </form>
              {submitError && (
                <p className="text-red-500 mt-2">{submitError}</p>
              )}
              {/* {debugInfo && (
                <pre className="mt-4 p-2 bg-gray-800 text-xs overflow-auto">
                  {debugInfo}
                </pre>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlappyBirb;