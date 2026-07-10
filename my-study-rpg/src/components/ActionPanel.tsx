"use client";
import React from 'react';

type ActionPanelProps = {
  points: number;
  monsterHP: number;
  onAttack: (isSpecial: boolean) => void;
};

export default function ActionPanel({ points, monsterHP, onAttack }: ActionPanelProps) {
  return (
    <div className="bg-[#101010] border-4 border-[#c0c0b8] rounded-2xl p-2.5 grid grid-cols-2 gap-2 shadow-[-4px_4px_0_0_#c0c0b8]">
      <button 
        onClick={() => onAttack(false)} 
        disabled={points < 25 || monsterHP <= 0} 
        className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-neutral-700 disabled:opacity-30 text-gray-950 p-2.5 rounded-xl border-2 border-transparent hover:border-amber-500 transition-all cursor-pointer disabled:cursor-not-allowed min-h-[76px]"
      >
        <span className="absolute left-1 top-3 text-xs opacity-0 group-hover:opacity-100 text-gray-950">▶</span>
        <span className="pl-3 font-black text-sm leading-tight group-disabled:text-neutral-400">つうじょう<br />こうげき</span>
        <span className="w-full text-right text-[10px] font-mono text-gray-500 font-bold group-disabled:text-neutral-500">PP 25</span>
      </button>

      <button 
        onClick={() => onAttack(true)} 
        disabled={points < 60 || monsterHP <= 0} 
        className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-neutral-700 disabled:opacity-30 text-gray-950 p-2.5 rounded-xl border-2 border-transparent hover:border-rose-500 transition-all cursor-pointer disabled:cursor-not-allowed min-h-[76px]"
      >
        <span className="absolute left-1 top-3 text-xs opacity-0 group-hover:opacity-100 text-gray-950">▶</span>
        <span className="pl-3 font-black text-sm leading-tight text-rose-900 group-disabled:text-neutral-400">ひっさつ<br />わざ</span>
        <span className="w-full text-right text-[10px] font-mono text-gray-500 font-bold group-disabled:text-neutral-500">PP 60</span>
      </button>
    </div>
  );
}
