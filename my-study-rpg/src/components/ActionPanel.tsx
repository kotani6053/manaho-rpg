"use client";
import React from 'react';

type ActionPanelProps = {
  points: number;
  monsterHP: number;
  onAttack: (isSpecial: boolean) => void;
};

export default function ActionPanel({ points, monsterHP, onAttack }: ActionPanelProps) {
  return (
    <div className="bg-white border-[4px] border-[#222222] rounded-2xl p-4 grid grid-cols-2 gap-4 shadow-[6px_6px_0_#222222]">
      <button 
        onClick={() => onAttack(false)} 
        disabled={points < 25 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white p-5 rounded-xl border-[3px] border-[#222222] transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        <span className="text-3xl mb-1">⚔️</span>
        <span className="font-black text-lg">こうげき</span>
      </button>

      <button 
        onClick={() => onAttack(true)} 
        disabled={points < 60 || monsterHP <= 0} 
        className="flex flex-col items-center justify-center bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-300 text-slate-900 p-5 rounded-xl border-[3px] border-[#222222] transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        <span className="text-3xl mb-1">✨</span>
        <span className="font-black text-lg">ひっさつ</span>
      </button>
    </div>
  );
}
