"use client";
import React from 'react';

type BattleSceneProps = {
  monster: {
    name: string;
    hp: number;
    img: string;
    isRare?: boolean;
  };
  monsterHP: number;
  isAttacking: boolean;
  isTakingDamage: boolean;
};

export default function BattleScene({ monster, monsterHP, isAttacking, isTakingDamage }: BattleSceneProps) {
  const hpPercentage = Math.max(0, Math.min(100, (monsterHP / monster.hp) * 100));
  const hpBarColor = hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 20 ? 'bg-amber-400' : 'bg-rose-600';

  return (
    <div className={`h-64 rounded-2xl border-4 ${monster.isRare ? 'border-amber-400 shadow-[0_0_20px_#f59e0b]' : 'border-[#c0c0b8]'} bg-gradient-to-b from-sky-200 to-emerald-100 flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-inner`}>
      {/* 背景の芝生ライン */}
      <div className="absolute bottom-16 w-[150%] h-16 bg-emerald-200/60 rounded-full blur-sm -rotate-3"></div>

      {/* モンスター画像エリア */}
      <div className="flex-1 flex items-center justify-center relative w-full">
        <div className={`text-8xl transition-all duration-100 relative z-10
          ${monsterHP > 0 ? 'scale-100 opacity-100 hover:-translate-y-2' : 'scale-150 opacity-0 duration-700'}
          ${isAttacking ? 'animate-bounce' : ''}
          ${isTakingDamage ? 'animate-pulse bg-red-500/20 rounded-full' : ''}
        `}>
          {monsterHP > 0 ? monster.img : '💥'}
        </div>
        {/* 地面の影 */}
        {monsterHP > 0 && (
          <div className="absolute bottom-4 w-24 h-3 bg-emerald-900/10 rounded-full blur-[1px]"></div>
        )}
      </div>

      {/* ポケモン風 モンスター情報ステータス窓 */}
      <div className="w-full bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-tl-xl rounded-br-xl p-3 shadow-[-3px_3px_0_0_#c0c0b8] relative z-20">
        <div className="flex justify-between items-end mb-1 text-gray-950 font-bold">
          <span className="text-base font-black truncate">{monster.name}</span>
          <span className="text-xs font-mono text-gray-600">HP {monsterHP} / {monster.hp}</span>
        </div>
        {/* HP外枠 */}
        <div className="w-full bg-[#c0c0b8] rounded-full h-5 border-2 border-[#888880] p-[1px] flex items-center relative">
          <span className="absolute left-1.5 text-[9px] font-bold text-slate-800 z-10">HP</span>
          <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden pl-5 pr-0.5 flex items-center">
            <div 
              className={`h-2.5 ${hpBarColor} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
