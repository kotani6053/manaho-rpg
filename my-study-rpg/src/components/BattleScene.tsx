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
  
  // ことだまモンスター風の鮮やかなグリーンのHPバー
  const hpBarColor = hpPercentage > 50 ? 'bg-[#a3e635]' : hpPercentage > 20 ? 'bg-[#facc15]' : 'bg-[#f87171]';

  return (
    <div className={`flex-1 flex flex-col justify-between p-6 relative overflow-hidden rounded-[2rem] border-[6px] border-[#222222] bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#bbf7d0] shadow-[0_12px_0_#111111]`}>
      
      {/* 遠景の山と太陽のポップアート風グラフィック */}
      <div className="absolute top-12 left-4 w-12 h-12 bg-amber-400 rounded-full opacity-60 blur-[1px]"></div>
      <div className="absolute bottom-20 -left-10 w-[60%] h-24 bg-[#86efac] rounded-full rotate-6"></div>
      <div className="absolute bottom-16 -right-10 w-[65%] h-28 bg-[#4ade80] rounded-full -rotate-6"></div>
      <div className="absolute bottom-0 inset-x-0 h-24 bg-[#22c55e]"></div>

      {/* ⚔️ 対峙レイアウト (敵は右上、自分は左下) */}
      <div className="flex-1 flex flex-col justify-between relative z-10 w-full my-2">
        
        {/* ＝ 敵モンスターエリア（右上） ＝ */}
        <div className="flex flex-col items-end w-full pr-4 relative">
          {/* 敵のステータスバッジ */}
          <div className="bg-white/95 border-[4px] border-[#222222] rounded-2xl p-2.5 px-4 shadow-[4px_4px_0_#222222] min-w-[200px] mb-2 transform -rotate-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-slate-800 text-sm flex items-center gap-1">
                {monster.isRare && <span className="text-xs bg-[#facc15] text-amber-950 px-1.5 py-0.5 rounded-full border-2 border-[#222222] animate-bounce">SSR</span>}
                {monster.name}
              </span>
              <span className="text-[11px] font-black text-slate-500">Lv.3</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-slate-700">HP</span>
              <div className="flex-1 bg-[#222222] rounded-full h-3.5 p-[2px] overflow-hidden">
                <div className={`h-full ${hpBarColor} rounded-full transition-all duration-300 ease-out`} style={{ width: `${hpPercentage}%` }} />
              </div>
              <span className="text-[10px] font-mono font-black text-slate-600">{monsterHP}/{monster.hp}</span>
            </div>
          </div>
          {/* 敵グラフィック */}
          <div className={`text-8xl select-none filter drop-shadow-[0_8px_0_rgba(0,0,0,0.15)] transition-all duration-150 mr-6
            ${monsterHP > 0 ? 'scale-100 opacity-100 hover:scale-110' : 'scale-150 opacity-0 duration-700 rotate-12'}
            ${isTakingDamage ? 'animate-ping bg-red-400/30 rounded-full' : ''}
          `}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
        </div>

        {/* ＝ プレイヤーの相棒キャラエリア（左下） ＝ */}
        <div className="flex items-end pl-4 mt-2">
          <div className={`text-7xl select-none filter drop-shadow-[0_8px_0_rgba(0,0,0,0.15)] z-20 transition-transform
            ${isAttacking ? 'translate-x-12 -translate-y-8 scale-125 rotate-12' : 'animate-pulse'}
          `}>
            🐱
          </div>
          {/* 相棒の簡易ステータス（ことだま風） */}
          <div className="bg-white/95 border-[4px] border-[#222222] rounded-2xl p-2 px-3 shadow-[4px_4px_0_#222222] min-w-[160px] ml-2 mb-2 transform rotate-1">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-800 text-xs">モフニャン</span>
              <span className="text-[10px] font-black text-emerald-600">Lv.5</span>
            </div>
            <div className="w-full bg-[#222222] rounded-full h-2 mt-1">
              <div className="h-full bg-[#a3e635] rounded-full w-[85%]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
