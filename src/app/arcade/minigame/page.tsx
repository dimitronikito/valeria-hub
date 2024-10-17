"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { valerians, Valerian } from '@/data/valerians';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/BattleSimulatorComponents';

interface BattleValerian extends Valerian {
  currentHp: number;
  isShaking: boolean;
  isDead: boolean;
}

interface LogEntry {
  message: string;
  type: 'attack' | 'defeat' | 'win';
}

const ValerianBattleSimulator: React.FC = () => {
  const [playerTeam, setPlayerTeam] = useState<BattleValerian[]>([]);
  const [computerTeam, setComputerTeam] = useState<BattleValerian[]>([]);
  const [battleLog, setBattleLog] = useState<LogEntry[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const battleLogRef = useRef<HTMLDivElement>(null);

  const selectRandomValerians = (count: number): BattleValerian[] => {
    const shuffled = [...valerians].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(v => ({ ...v, currentHp: v.stats.hp, isShaking: false, isDead: false }));
  };

  const initializeBattle = (): void => {
    setPlayerTeam(selectRandomValerians(3));
    setComputerTeam(selectRandomValerians(3));
    setBattleLog([]);
    setWinner(null);
  };

  const changePlayerTeam = (): void => {
    setPlayerTeam(selectRandomValerians(3));
  };

  const calculateDamage = (attacker: Valerian, defender: Valerian): number => {
    const baseDamage = attacker.stats.attack - defender.stats.defense;
    return Math.max(5, baseDamage + Math.floor(Math.random() * 20));
  };

  const updateValerianHp = (valerian: BattleValerian, damage: number): BattleValerian => {
    const newHp = Math.max(0, valerian.currentHp - damage);
    return { ...valerian, currentHp: newHp, isShaking: true, isDead: newHp === 0 };
  };

  const getAliveValerians = (team: BattleValerian[]): BattleValerian[] => {
    return team.filter(v => !v.isDead);
  };

  const checkWinCondition = (playerAlive: BattleValerian[], computerAlive: BattleValerian[]): string | null => {
    if (playerAlive.length === 0) return 'Computer';
    if (computerAlive.length === 0) return 'Player';
    return null;
  };

  const performAttack = (attacker: BattleValerian, defender: BattleValerian): BattleValerian => {
    const damage = calculateDamage(attacker, defender);
    const updatedDefender = updateValerianHp(defender, damage);
    
    const logMessage = `${attacker.name} deals ${damage} damage to ${defender.name}`;
    setBattleLog(prev => [...prev, { message: logMessage, type: 'attack' }]);

    if (updatedDefender.isDead) {
      setBattleLog(prev => [...prev, { message: `${updatedDefender.name} has been defeated!`, type: 'defeat' }]);
    }

    return updatedDefender;
  };

  const simulateBattle = async (): Promise<void> => {
    setIsBattleInProgress(true);
    setBattleLog([]);

    let currentPlayerTeam = [...playerTeam];
    let currentComputerTeam = [...computerTeam];

    while (true) {
      // Player team attacks
      for (const attacker of getAliveValerians(currentPlayerTeam)) {
        const aliveDefenders = getAliveValerians(currentComputerTeam);
        if (aliveDefenders.length === 0) break;
        
        const defenderIndex = Math.floor(Math.random() * aliveDefenders.length);
        const updatedDefender = performAttack(attacker, aliveDefenders[defenderIndex]);
        currentComputerTeam[currentComputerTeam.findIndex(v => v.id === updatedDefender.id)] = updatedDefender;
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setComputerTeam(currentComputerTeam);

      const winnerAfterPlayerTurn = checkWinCondition(getAliveValerians(currentPlayerTeam), getAliveValerians(currentComputerTeam));
      if (winnerAfterPlayerTurn) {
        setWinner(winnerAfterPlayerTurn);
        setBattleLog(prev => [...prev, { message: `${winnerAfterPlayerTurn} wins the battle!`, type: 'win' }]);
        break;
      }

      // Computer team attacks
      for (const attacker of getAliveValerians(currentComputerTeam)) {
        const aliveDefenders = getAliveValerians(currentPlayerTeam);
        if (aliveDefenders.length === 0) break;
        
        const defenderIndex = Math.floor(Math.random() * aliveDefenders.length);
        const updatedDefender = performAttack(attacker, aliveDefenders[defenderIndex]);
        currentPlayerTeam[currentPlayerTeam.findIndex(v => v.id === updatedDefender.id)] = updatedDefender;
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setPlayerTeam(currentPlayerTeam);

      const winnerAfterComputerTurn = checkWinCondition(getAliveValerians(currentPlayerTeam), getAliveValerians(currentComputerTeam));
      if (winnerAfterComputerTurn) {
        setWinner(winnerAfterComputerTurn);
        setBattleLog(prev => [...prev, { message: `${winnerAfterComputerTurn} wins the battle!`, type: 'win' }]);
        break;
      }

      // Reset shaking effect
      currentPlayerTeam = currentPlayerTeam.map(v => ({ ...v, isShaking: false }));
      currentComputerTeam = currentComputerTeam.map(v => ({ ...v, isShaking: false }));
    }

    setIsBattleInProgress(false);
  };

  useEffect(() => {
    initializeBattle();
  }, []);

  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [battleLog]);

  const getHealthColor = (currentHp: number, maxHp: number): string => {
    const healthPercentage = (currentHp / maxHp) * 100;
    if (healthPercentage > 50) return 'bg-green-500';
    if (healthPercentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const ValerianCard: React.FC<{ valerian: BattleValerian }> = ({ valerian }) => (
    <Card className={`transition-all duration-200 ${valerian.isShaking ? 'animate-shake' : ''} ${valerian.isDead ? 'opacity-50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-sm font-bold text-center">{valerian.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-16 h-16 mx-auto mb-2 border-2 border-indigo-400">
        <Image
          src={valerian.image}
          alt={valerian.name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        </div>
        <p className="text-xs text-center mb-2">{valerian.type} {valerian.class}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getHealthColor(valerian.currentHp, valerian.stats.hp)}`}
            style={{ width: `${(valerian.currentHp / valerian.stats.hp) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-center mt-1">HP: {valerian.currentHp}/{valerian.stats.hp}</p>
        {valerian.isDead && <p className="text-xs text-center text-red-500 font-bold mt-1">DEFEATED</p>}
      </CardContent>
    </Card>
  );

  const LogEntry: React.FC<{ entry: LogEntry }> = ({ entry }) => {
    let className = "text-sm mb-1 ";
    switch (entry.type) {
      case 'attack':
        className += "text-cyan-300";
        break;
      case 'defeat':
        className += "text-red-400 font-semibold";
        break;
      case 'win':
        className += "text-yellow-300 font-bold text-lg";
        break;
    }

    return <p className={className}>{entry.message}</p>;
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">      
        <header className="bg-indigo-900 py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">Valeria Mini Battle</h1>
        </div>
      </header>
      <Link href="/arcade" className="inline-block mb-4 px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
        ← Arcade
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Team</h2>
          <div className="grid grid-cols-3 gap-2">
            {playerTeam.map((valerian) => (
              <ValerianCard key={valerian.id} valerian={valerian} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Computer's Team</h2>
          <div className="grid grid-cols-3 gap-2">
            {computerTeam.map((valerian) => (
              <ValerianCard key={valerian.id} valerian={valerian} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <Button onClick={changePlayerTeam} disabled={isBattleInProgress || !!winner}>
          Change Team
        </Button>
        <Button onClick={simulateBattle} disabled={isBattleInProgress || !!winner}>
          {isBattleInProgress ? 'Battle in Progress...' : 'Start Battle'}
        </Button>
      </div>
      {winner && (
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">{winner} wins!</h2>
          <Button onClick={initializeBattle} className="mt-2">
            New Battle
          </Button>
        </div>
      )}
      <div className="bg-indigo-900 p-4 rounded-lg h-60 overflow-y-auto" ref={battleLogRef}>
        <h2 className="text-lg font-semibold mb-2">Battle Log</h2>
        {battleLog.map((log, index) => (
          <LogEntry key={index} entry={log} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default ValerianBattleSimulator;