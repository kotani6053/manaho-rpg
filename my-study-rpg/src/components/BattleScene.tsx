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
    <div className={`h-64 rounded-2xl border-4 ${monster.isRare ? 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse' : 'border-[#b8b8b0]'} 
      ${monster.isRare ? 'bg-gradient-to-b from-amber-100 via-sky-100 to-emerald-100' : 'bg-gradient-to-b from-sky-100 to-emerald-50'} 
      flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]`}
    >
      {/* 背景の芝生ライン */}
      <div className="absolute bottom-16 w-[150%] h-16 bg-emerald-200/50 rounded-full blur-sm -rotate-2"></div>

      {/* レアモンスター用のキラキラエフェクト */}
      {monster.isRare && monsterHP > 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="absolute text-xl top-6 left-12 animate-spin duration-1000">🌟</span>
          <span className="absolute text-lg bottom-20 right-12 animate-ping">✨</span>
          <span className="absolute text-xl top-10 right-16 animate-bounce">🌟</span>
        </div>
      )}

      {/* モンスター画像エリア */}
      <div className="flex-1 flex items-center justify-center relative w-full">
        <div className={`text-8xl transition-all duration-100 relative z-10 select-none
          ${monsterHP > 0 ? 'scale-100 opacity-100 hover:scale-110' : 'scale-150 opacity-0 duration-700'}
          ${isAttacking ? 'animate-bounce' : ''}
          ${isTakingDamage ? 'animate-flash bg-rose-500/30 rounded-full p-2' : ''}
        `}>
          {monsterHP > 0 ? monster.img : '💥'}
        </div>
        {/* 地面の影 */}
        {monsterHP > 0 && (
          <div className="absolute bottom-3 w-28 h-3 bg-emerald-900/15 rounded-full blur-[1px]"></div>
        )}
      </div>

      {/* ポケモン風 モンスター情報ステータス窓 */}
      <div className="w-full bg-[#fcfcf8] border-4 border-[#b8b8b0] rounded-tl-xl rounded-br-xl p-3 shadow-[-3px_3px_0_0_#b8b8b0] relative z-20">
        <div className="flex justify-between items-end mb-1 text-slate-900 font-bold">
          <div className="flex items-center gap-1.5 truncate">
            {monster.isRare && <span className="text-xs bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded font-black animate-pulse">RARE</span>}
            <span className="text-base font-black truncate">{monster.name}</span>
          </div>
          <span className="text-xs font-mono text-slate-600 font-bold">HP {monsterHP} / {monster.hp}</span>
        </div>
        {/* HP外枠 */}
        <div className="w-full bg-[#c8c8c0] rounded-full h-5 border-2 border-[#989890] p-[1px] flex items-center relative">
          <span className="absolute left-1.5 text-[9px] font-black text-slate-700 z-10">HP</span>
          <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden pl-5 pr-0.5 flex items-center">
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
