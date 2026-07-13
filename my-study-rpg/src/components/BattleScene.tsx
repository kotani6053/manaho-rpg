"use client";
import React from 'react';

type BattleSceneProps = {
  monster: {
    name: string;
    hp: number;
    img: string;
    isRare?: boolean;
    tier?: string;
  };
  monsterHP: number;
  isAttacking: boolean;
  isTakingDamage: boolean;
  playerLevel: number;
};

export default function BattleScene({ 
  monster, 
  monsterHP, 
  isAttacking, 
  isTakingDamage,
  playerLevel = 5
}: BattleSceneProps) {
  
  const hpPercentage = Math.max(0, Math.min(100, (monsterHP / monster.hp) * 100));
  const hpBarColor = hpPercentage > 50 ? 'bg-[#a3e635]' : hpPercentage > 20 ? 'bg-[#facc15]' : 'bg-[#f87171]';

  const getBuddyForm = (level: number) => {
    if (level >= 30) return { name: "ゴッドモフニャン", img: "🦁✨", levelColor: "text-amber-500" };
    if (level >= 15) return { name: "メガモフニャン", img: "🐆", levelColor: "text-purple-600" };
    return { name: "モフニャン", img: "🐱", levelColor: "text-emerald-600" };
  };

  const buddy = getBuddyForm(playerLevel);

  const getMonsterEffects = () => {
    if (monster.isRare || monster.tier === "SSR" || monster.tier === "GOD") {
      return { aura: "bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500", badge: "👑 ちょうレア" };
    }
    if (['👹', '🐉', '👾', '🔥'].includes(monster.img)) {
      return { aura: "bg-gradient-to-b from-rose-600 to-amber-500", badge: "🔥 ボス" };
    }
    return { aura: "bg-gradient-to-tr from-emerald-400 to-yellow-300", badge: "🍃 ふつう" };
  };

  const effects = getMonsterEffects();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 relative overflow-hidden rounded-[2.5rem] border-[8px] border-[#222222] bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#bbf7d0] shadow-[0_16px_0_#111111]">
      <div className="absolute top-12 left-4 w-16 h-16 bg-amber-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-[#22c55e]"></div>

      <div className="flex-1 flex flex-col justify-between relative z-10 w-full my-2">
        {/* 敵モンスターエリア */}
        <div className="flex flex-col items-end w-full pr-4">
          <div className="bg-white/95 border-[5px] border-[#222222] rounded-2xl p-3 px-5 shadow-[5px_5px_0_#222222] min-w-[280px] mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-black text-slate-800 text-lg flex items-center gap-2">
                <span className="text-xs text-white px-2.5 py-1 rounded-full border-2 border-[#222222] font-black bg-slate-700">
                  {effects.badge}
                </span>
                {monster.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700">HP</span>
              <div className="flex-1 bg-[#222222] rounded-full h-5 p-[3px]">
                <div className={`h-full ${hpBarColor} rounded-full`} style={{ width: `${hpPercentage}%` }} />
              </div>
            </div>
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center mr-8">
            <div className={`text-9xl select-none transition-all duration-150 z-10 ${monsterHP > 0 ? 'opacity-100' : 'opacity-0'}`}>
              {monsterHP > 0 ? monster.img : '💥'}
            </div>
          </div>
        </div>

        {/* まなほと相棒エリア（男の子を追加） */}
        <div className="flex items-end pl-2 mt-2 w-full">
          <div className="relative w-36 h-28 flex items-center justify-center gap-2">
            {/* 男の子 */}
            <div className="text-6xl select-none">👦</div>
            {/* モフニャン */}
            <div className={`text-7xl select-none z-20 ${isAttacking ? 'translate-x-20 -translate-y-16 scale-125' : ''}`}>
              {buddy.img}
            </div>
          </div>
          <div className="bg-white/95 border-[5px] border-[#222222] rounded-2xl p-3 px-4 shadow-[5px_5px_0_#222222] min-w-[200px] ml-2 mb-2">
            <div className="text-xs font-bold text-blue-600">プレイヤー: まなほ & 男の子</div>
            <div className="font-black text-slate-800 text-base">{buddy.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
