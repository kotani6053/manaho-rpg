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
  const hpBarColor = hpPercentage > 50 ? 'bg-[#a3e635]' : hpPercentage > 20 ? 'bg-[#facc15]' : 'bg-[#f87171]';

  // モンスターのタイプ（絵文字）に合わせて、リッチな背景魔法陣・オーラの色を自動切り替え
  const getMonsterEffects = () => {
    if (monster.isRare) {
      return {
        aura: "bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 animate-spin duration-[8000ms]",
        glow: "shadow-[0_0_50px_rgba(245,158,11,0.8)]",
        badge: "👑 SSR"
      };
    }
    // 火・魔王系
    if (['👹', '🐉', '👾'].includes(monster.img)) {
      return {
        aura: "bg-gradient-to-b from-rose-600 to-amber-500 animate-pulse",
        glow: "shadow-[0_0_40px_rgba(239,68,68,0.6)]",
        badge: "🔥 BOSS"
      };
    }
    // 水・スライム系
    if (['💧', '🐟', '🐙'].includes(monster.img)) {
      return {
        aura: "bg-gradient-to-tr from-blue-500 via-sky-300 to-emerald-400 animate-bounce duration-[3000ms]",
        glow: "shadow-[0_0_30px_rgba(14,165,233,0.5)]",
        badge: "💧 NORMAL"
      };
    }
    // その他通常
    return {
      aura: "bg-gradient-to-tr from-emerald-400 to-yellow-300 opacity-60 animate-spin duration-[12000ms]",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
      badge: "🍃 NORMAL"
    };
  };

  const effects = getMonsterEffects();

  return (
    <div className={`flex-1 flex flex-col justify-between p-6 relative overflow-hidden rounded-[2rem] border-[6px] border-[#222222] bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#bbf7d0] shadow-[0_12px_0_#111111]`}>
      
      {/* 背景グラフィック */}
      <div className="absolute top-12 left-4 w-12 h-12 bg-amber-400 rounded-full opacity-60 blur-[1px]"></div>
      <div className="absolute bottom-20 -left-10 w-[60%] h-24 bg-[#86efac] rounded-full rotate-6"></div>
      <div className="absolute bottom-16 -right-10 w-[65%] h-28 bg-[#4ade80] rounded-full -rotate-6"></div>
      <div className="absolute bottom-0 inset-x-0 h-24 bg-[#22c55e]"></div>

      {/* ⚔️ 対峙レイアウト */}
      <div className="flex-1 flex flex-col justify-between relative z-10 w-full my-2">
        
        {/* ＝ 敵モンスターエリア（右上） ＝ */}
        <div className="flex flex-col items-end w-full pr-4 relative">
          
          {/* 敵のステータスバッジ */}
          <div className="bg-white/95 border-[4px] border-[#222222] rounded-2xl p-2.5 px-4 shadow-[4px_4px_0_#222222] min-w-[220px] mb-4 transform -rotate-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-slate-800 text-sm flex items-center gap-1">
                <span className={`text-[10px] text-white px-2 py-0.5 rounded-full border-2 border-[#222222] font-black
                  ${monster.isRare ? 'bg-gradient-to-r from-amber-500 to-rose-500 animate-pulse' : 'bg-slate-700'}`}>
                  {effects.badge}
                </span>
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

          {/* 🔥 キャラクターグラフィック演出（ここを大幅強化！） */}
          <div className="relative w-44 h-44 flex items-center justify-center mr-8">
            {monsterHP > 0 && (
              <>
                {/* 後方：特大の属性魔方陣オーラ */}
                <div className={`absolute w-36 h-36 rounded-full opacity-70 blur-[2px] border-4 border-dashed border-white/40 ${effects.aura}`} />
                {/* 中方：発光グローエフェクト */}
                <div className={`absolute w-28 h-28 rounded-full bg-white/20 ${effects.glow}`} />
                {/* 足元：召喚レイヤーの影 */}
                <div className="absolute bottom-2 w-32 h-6 bg-black/20 rounded-full blur-[4px]" />
              </>
            )}

            {/* 前方：本体グラフィック */}
            <div className={`text-8xl select-none filter drop-shadow-[0_8px_0_rgba(0,0,0,0.15)] transition-all duration-150 z-10
              ${monsterHP > 0 ? 'scale-100 opacity-100 hover:scale-110 active:scale-95 cursor-pointer' : 'scale-150 opacity-0 duration-700 rotate-45'}
              ${isTakingDamage ? 'animate-bounce bg-red-500/40 rounded-full p-2' : ''}
            `}>
              {monsterHP > 0 ? monster.img : '💥'}
            </div>

            {/* 前方エフェクト：ダメージ時のパチパチ火花 */}
            {isTakingDamage && (
              <div className="absolute inset-0 flex items-center justify-center z-20 text-4xl animate-ping pointer-events-none⭐">⚡💥⚡</div>
            )}
          </div>
        </div>

        {/* ＝ プレイヤーの相棒キャラエリア（左下） ＝ */}
        <div className="flex items-end pl-4 mt-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* 相棒の足元オーラ */}
            <div className="absolute w-20 h-20 rounded-full bg-emerald-400/30 blur-sm animate-ping duration-[3000ms]" />
            <div className="absolute bottom-1 w-20 h-4 bg-black/10 rounded-full blur-[2px]" />
            <div className={`text-7xl select-none filter drop-shadow-[0_6px_0_rgba(0,0,0,0.15)] z-20 transition-transform relative
              ${isAttacking ? 'translate-x-16 -translate-y-12 scale-125 rotate-12 duration-75' : 'animate-pulse'}`}
            >
              🐱
            </div>
          </div>
          
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
