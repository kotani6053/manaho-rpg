"use client";
import React from 'react';

// モンスターのデータ型（がた）
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
  playerLevel: number; // まなほのレベル
  onAttackClick?: () => void; // こうげきボタンをおしたとき
  onSpecialClick?: () => void; // ひっさつわざボタンをおしたとき
};

export default function BattleScene({ 
  monster, 
  monsterHP, 
  isAttacking, 
  isTakingDamage,
  playerLevel = 5, // 指定がないときはレベル5
  onAttackClick,
  onSpecialClick
}: BattleSceneProps) {
  
  const hpPercentage = Math.max(0, Math.min(100, (monsterHP / monster.hp) * 100));
  const hpBarColor = hpPercentage > 50 ? 'bg-[#a3e635]' : hpPercentage > 20 ? 'bg-[#facc15]' : 'bg-[#f87171]';

  // 🐾 レベルにあわせてモフにゃんがしんかするシステム
  const getBuddyForm = (level: number) => {
    if (level >= 30) {
      return {
        name: "ゴッドモフニャン",
        img: "🦁✨",
        attackName: "ごっど・ひっさつわざ！",
        levelColor: "text-amber-500"
      };
    } else if (level >= 15) {
      return {
        name: "メガモフニャン",
        img: "🐆",
        attackName: "メガ・スーパーアタック！",
        levelColor: "text-purple-600"
      };
    } else {
      return {
        name: "モフニャン",
        img: "🐱",
        attackName: "たいあたりこうげき！",
        levelColor: "text-emerald-600"
      };
    }
  };

  const buddy = getBuddyForm(playerLevel);

  // 👾 モンスターのタイプ（絵文字）にあわせて、うしろのオーラをチェンジ
  const getMonsterEffects = () => {
    if (monster.isRare || monster.tier === "SSR" || monster.tier === "GOD") {
      return {
        aura: "bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 animate-spin duration-[8000ms]",
        glow: "shadow-[0_0_50px_rgba(245,158,11,0.8)]",
        badge: "👑 ちょうレア"
      };
    }
    if (['👹', '🐉', '👾', '🔥'].includes(monster.img)) {
      return {
        aura: "bg-gradient-to-b from-rose-600 to-amber-500 animate-pulse",
        glow: "shadow-[0_0_40px_rgba(239,68,68,0.6)]",
        badge: "🔥 ボス"
      };
    }
    if (['💧', '🐟', '🐙', '🐳'].includes(monster.img)) {
      return {
        aura: "bg-gradient-to-tr from-blue-500 via-sky-300 to-emerald-400 animate-bounce duration-[3000ms]",
        glow: "shadow-[0_0_30px_rgba(14,165,233,0.5)]",
        badge: "💧 みず"
      };
    }
    return {
      aura: "bg-gradient-to-tr from-emerald-400 to-yellow-300 opacity-60 animate-spin duration-[12000ms]",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
      badge: "🍃 ふつう"
    };
  };

  const effects = getMonsterEffects();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 relative overflow-hidden rounded-[2.5rem] border-[8px] border-[#222222] bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#bbf7d0] shadow-[0_16px_0_#111111]">
      
      {/* 背景（はいけい）のグラフィック */}
      <div className="absolute top-12 left-4 w-16 h-16 bg-amber-400 rounded-full opacity-60 blur-[1px]"></div>
      <div className="absolute bottom-32 -left-10 w-[60%] h-28 bg-[#86efac] rounded-full rotate-6"></div>
      <div className="absolute bottom-28 -right-10 w-[65%] h-32 bg-[#4ade80] rounded-full -rotate-6"></div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-[#22c55e]"></div>

      {/* ⚔️ バトルレイアウト */}
      <div className="flex-1 flex flex-col justify-between relative z-10 w-full my-2">
        
        {/* ＝ 敵モンスターエリア（右上） ＝ */}
        <div className="flex flex-col items-end w-full pr-4 relative">
          
          {/* 敵のステータス（文字を大きくしました！） */}
          <div className="bg-white/95 border-[5px] border-[#222222] rounded-2xl p-3 px-5 shadow-[5px_5px_0_#222222] min-w-[280px] mb-4 transform -rotate-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-black text-slate-800 text-lg flex items-center gap-2">
                <span className={`text-xs text-white px-2.5 py-1 rounded-full border-2 border-[#222222] font-black
                  ${monster.isRare ? 'bg-gradient-to-r from-amber-500 to-rose-500 animate-pulse' : 'bg-slate-700'}`}>
                  {effects.badge}
                </span>
                {monster.name}
              </span>
              <span className="text-sm font-black text-slate-500">Lv.10</span>
            </div>
            
            {/* HPゲージ */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700">HP</span>
              <div className="flex-1 bg-[#222222] rounded-full h-5 p-[3px] overflow-hidden">
                <div className={`h-full ${hpBarColor} rounded-full transition-all duration-300 ease-out`} style={{ width: `${hpPercentage}%` }} />
              </div>
              <span className="text-xs font-mono font-black text-slate-600">{monsterHP}/{monster.hp}</span>
            </div>
          </div>

          {/* モンスターの絵文字イラスト */}
          <div className="relative w-48 h-48 flex items-center justify-center mr-8">
            {monsterHP > 0 && (
              <>
                <div className={`absolute w-40 h-40 rounded-full opacity-70 blur-[2px] border-4 border-dashed border-white/40 ${effects.aura}`} />
                <div className={`absolute w-32 h-32 rounded-full bg-white/20 ${effects.glow}`} />
                <div className="absolute bottom-2 w-36 h-6 bg-black/20 rounded-full blur-[4px]" />
              </>
            )}

            <div className={`text-9xl select-none filter drop-shadow-[0_10px_0_rgba(0,0,0,0.15)] transition-all duration-150 z-10
              ${monsterHP > 0 ? 'scale-100 opacity-100 hover:scale-110 active:scale-95 cursor-pointer' : 'scale-150 opacity-0 duration-700 rotate-45'}
              ${isTakingDamage ? 'animate-bounce bg-red-500/40 rounded-full p-2' : ''}
            `}>
              {monsterHP > 0 ? monster.img : '💥'}
            </div>

            {/* ダメージをうけたときのパチパチエフェクト */}
            {isTakingDamage && (
              <div className="absolute inset-0 flex items-center justify-center z-20 text-5xl animate-ping pointer-events-none">⚡💥⚡</div>
            )}
          </div>
        </div>


        {/* ＝ まなほと相棒（あいぼう）エリア（左下） ＝ */}
        <div className="flex items-end pl-2 mt-2 justify-between w-full">
          
          <div className="flex items-end">
            {/* しんかする相棒（あいぼう）の見た目 */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-emerald-400/30 blur-sm animate-ping duration-[3000ms]" />
              <div className="absolute bottom-1 w-24 h-4 bg-black/10 rounded-full blur-[2px]" />
              <div className={`text-8xl select-none filter drop-shadow-[0_8px_0_rgba(0,0,0,0.15)] z-20 transition-transform relative
                ${isAttacking ? 'translate-x-20 -translate-y-16 scale-125 rotate-12 duration-75' : 'animate-pulse'}`}
              >
                {buddy.img}
              </div>
            </div>
            
            {/* まなほ＆モフにゃんのステータス */}
            <div className="bg-white/95 border-[5px] border-[#222222] rounded-2xl p-3 px-4 shadow-[5px_5px_0_#222222] min-w-[200px] ml-2 mb-2 transform rotate-1">
              <div className="text-xs font-bold text-blue-600 mb-0.5">プレイヤー: まなほ</div>
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-800 text-base">{buddy.name}</span>
                <span className={`text-xs font-black ${buddy.levelColor}`}>Lv.{playerLevel}</span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-3 mt-1.5 overflow-hidden">
                <div className="h-full bg-[#a3e635] rounded-full w-[90%]" />
              </div>
            </div>
          </div>

          {/* 🔴🟡 ボタンエリア（とっても明るく見やすくしました！） ＝ */}
          <div className="flex flex-col gap-3 mr-4 mb-2">
            {/* こうげきボタン（あざやかな赤色！） */}
            <button 
              onClick={onAttackClick}
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-black text-lg py-3 px-6 rounded-2xl border-[4px] border-[#222222] shadow-[4px_4px_0_#222222] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_#202020] transition-all flex items-center gap-2"
            >
              <span>⚔️</span> こうげき
            </button>

            {/* ひっさつわざボタン（キラキラ金色の黄色！） */}
            <button 
              onClick={onSpecialClick}
              className="bg-[#facc15] hover:bg-[#eab308] text-slate-900 font-black text-lg py-3 px-6 rounded-2xl border-[4px] border-[#222222] shadow-[4px_4px_0_#222222] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_#202020] transition-all flex items-center gap-2 animate-bounce"
            >
              <span>✨</span> {buddy.attackName}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
