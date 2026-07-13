"use client";
import React from 'react';

type ActionPanelProps = {
  points: number;
  monsterHP: number;
  onAttack: (isSpecial: boolean) => void;
};

export default function ActionPanel({ points, monsterHP, onAttack }: ActionPanelProps) {
  return (
    <div className="bg-slate-200 border-4 border-[#222222] rounded-2xl p-4 grid grid-cols-2 gap-4">
      <button 
        onClick={() => onAttack(false)} 
        disabled={points < 25 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-red-500 disabled:bg-slate-400 text-white p-4 rounded-xl border-4 border-[#222222]"
      >
        <span className="text-2xl mb-1">⚔️</span>
        <span className="font-black text-sm">こうげき</span>
      </button>

      <button 
        onClick={() => onAttack(true)} 
        disabled={points < 60 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-yellow-400 disabled:bg-slate-400 text-black p-4 rounded-xl border-4 border-[#222222]"
      >
        <span className="text-2xl mb-1">✨</span>
        <span className="font-black text-sm">ひっさつ</span>
      </button>
    </div>
  );
}
