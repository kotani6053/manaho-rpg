"use client";
import React from 'react';

type ActionPanelProps = {
  points: number;
  monsterHP: number;
  onAttack: (isSpecial: boolean) => void;
};

export default function ActionPanel({ points, monsterHP, onAttack }: ActionPanelProps) {
  return (
    <div className="bg-[#1e1e1e] border-4 border-[#333] rounded-2xl p-4 grid grid-cols-2 gap-4">
      <button 
        onClick={() => onAttack(false)} 
        disabled={points < 25 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-red-600 disabled:bg-neutral-800 text-white p-4 rounded-xl border-4 border-[#222] transition-none"
      >
        <span className="text-2xl mb-1">⚔️</span>
        <span className="font-black text-sm">こうげき</span>
      </button>

      <button 
        onClick={() => onAttack(true)} 
        disabled={points < 60 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-yellow-500 disabled:bg-neutral-800 text-black p-4 rounded-xl border-4 border-[#222] transition-none"
      >
        <span className="text-2xl mb-1">✨</span>
        <span className="font-black text-sm">ひっさつ</span>
      </button>
    </div>
  );
}
