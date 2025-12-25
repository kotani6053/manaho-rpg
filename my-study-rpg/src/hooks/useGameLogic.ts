import { useState } from 'react';

export const useGameLogic = () => {
  const [points, setPoints] = useState(0);
  const [monsterHP, setMonsterHP] = useState(100);

  const addPoints = (amount: number) => setPoints(p => p + amount);
  
  const attackMonster = (damage: number, cost: number) => {
    if (points >= cost) {
      setMonsterHP(hp => Math.max(0, hp - damage));
      setPoints(p => p - cost);
      return true;
    }
    return false;
  };

  return { points, monsterHP, addPoints, attackMonster, setMonsterHP };
};
