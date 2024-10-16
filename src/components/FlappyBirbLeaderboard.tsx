import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leaderboardEntries: LeaderboardEntry[] = [];
      querySnapshot.forEach((doc) => {
        leaderboardEntries.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
      });
      setEntries(leaderboardEntries);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newScore) {
      await addDoc(collection(db, 'leaderboard'), {
        name: newName,
        score: Number(newScore),
      });
      setNewName('');
      setNewScore('');
    }
  };

  return (
    <div>
      <h2>Global Leaderboard</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            {index + 1}. {entry.name} - {entry.score}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          placeholder="Score"
          required
        />
        <button type="submit">Add Score</button>
      </form>
    </div>
  );
};

export default Leaderboard;