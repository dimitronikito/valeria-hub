"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const FlappyBirbGame = dynamic(() => import('./FlappyBirbGame'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px] bg-indigo-900 rounded-lg">
      <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
    </div>
  ),
});

const FlappyBirb: React.FC = () => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [username, setUsername] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Array<{name: string, score: number}>>([]);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem('flappyBirbLeaderboard');
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const newLeaderboard = updateLeaderboard(username, currentScore);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('flappyBirbLeaderboard', JSON.stringify(newLeaderboard));
      setShowSubmitForm(false);
      setUsername('');
      restartGame();
    }
  };

  const updateLeaderboard = (name: string, score: number): Array<{name: string, score: number}> => {
    const newLeaderboard = [...leaderboard];
    const existingEntryIndex = newLeaderboard.findIndex(entry => entry.name.toLowerCase() === name.toLowerCase());

    if (existingEntryIndex !== -1) {
      if (score > newLeaderboard[existingEntryIndex].score) {
        newLeaderboard[existingEntryIndex].score = score;
      }
    } else {
      newLeaderboard.push({ name, score });
    }

    return newLeaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
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
              setCurrentScore={setCurrentScore} 
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
                  <tr key={index}>
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
                <button type="submit" className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded mr-2">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlappyBirb;