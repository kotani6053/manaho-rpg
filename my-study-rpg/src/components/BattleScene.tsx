import { useState, useEffect } from 'react';

type BattleSceneProps = {
  hp: number;
  maxHp?: number; // 最大HPを受け取るように拡張
  isAttacking: boolean;
  monsterName?: string;
  level?: number; // レベルを追加
};

export default function BattleScene({
  hp,
  maxHp = 100, // デフォルト100
  isAttacking,
  monsterName = "モンスター",
  level = 1 // デフォルト1
}: BattleSceneProps) {
  // HPの割合を計算（0%〜100%）
  const hpPercentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  // ダメージを受けた際のエフェクト用ステート
  const [isTakingDamage, setIsTakingDamage] = useState(false);

  // HPが減った（＝攻撃が当たった）瞬間にエフェクトをトリガー
  useEffect(() => {
    if (hp > 0 && isAttacking) {
        setIsTakingDamage(true);
        // 一定時間後にリセット（アニメーション時間より少し長く）
        const timer = setTimeout(() => setIsTakingDamage(false), 600); 
        return () => clearTimeout(timer);
    }
  }, [hp, isAttacking]);

  // HPバーの色を決定
  const barColor = hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 20 ? 'bg-amber-400' : 'bg-rose-600';

  return (
    // 全体のコンテナをポケモン風の背景グラデーションに
    <div className="w-full max-w-sm flex flex-col items-center bg-sky-100 p-8 rounded-3xl shadow-inner font-pkm">
      
      {/* モンスター本体:
          - HP 0 で煙になるアニメーション
          - isTakingDamage で点滅
          - hoverで少し動く（ポケモンBW風）
      */}
      <div className={`text-9xl mb-12 
                    transition-all duration-300 
                    ${hp > 0 ? 'scale-100 opacity-100 hover:-translate-y-2' : 'scale-150 opacity-0'}
                    ${isTakingDamage ? 'animate-flash' : ''} 
                    relative`}>
        {hp > 0 ? (
          // 健在
          <span className="relative z-10">👾</span>
        ) : (
          // 倒された：爆発絵文字を大きく出し、フェードアウト
          <span className="absolute inset-0 flex items-center justify-center text-7xl opacity-0 animate-fade-in-out">💥</span>
        )}
        {/* 地面の影 */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-600/30 rounded-full blur-[1px] z-0 transition-opacity ${hp > 0 ? 'opacity-100' : 'opacity-0'}`}></div>
      }
      </div>

      {/* ステータスボード：ポケモン風のデザイン */}
      <div className="w-full bg-[#f8f8f0] border-[5px] border-[#c0c0b8] rounded-tl-xl rounded-br-xl p-5 shadow-[-3px_3px_0_0_#c0c0b8] relative overflow-hidden">
        
        {/* 背景のうっすらとしたパターン */}
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-black pattern-bg-transparent pattern-size-1 pattern-opacity-10"></div>

        <div className="flex justify-between items-end mb-3 relative z-10">
          <div className="flex flex-col">
            {/* 名前：ボールドで大きく */}
            <span className="text-gray-950 font-black text-2xl tracking-tighter uppercase">{monsterName}</span>
            {/* レベル：Lv.表記で */}
            <span className="text-gray-800 text-sm font-bold bg-[#c0c0b8] px-2 py-0.5 rounded-full inline-block mt-1">Lv. <span className="font-mono text-base">{level}</span></span>
          </div>
          {/* HP数値：右下に */}
          <div className="flex items-baseline gap-1 text-gray-900 font-bold">
            <span className="text-lg font-mono">HP</span>
            <div className="text-3xl font-mono relative top-1">
                <span className={`${hpPercentage > 50 ? '' : hpPercentage > 20 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {hp}
                </span>
                <span className="text-base text-gray-700"> / {maxHp}</span>
            </div>
          </div>
        </div>

        {/* HPバーの外枠：ポケモン特有の形状 */}
        <div className="w-full bg-[#c0c0b8] rounded-full h-8 border-4 border-[#888880] p-[2px] shadow-inner relative flex items-center">
          {/* バーのラベル (HP) */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 border-4 border-[#c0c0b8] z-20">
            <span className="text-emerald-300 font-bold text-xs transform -rotate-12">HP</span>
          </div>
          
          {/* バーの背景（黒） */}
          <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden flex items-center px-1 relative">
             {/* バーの中身 */}
            <div 
              className={`h-4 ${barColor} rounded-full transition-[width] duration-700 ease-out relative`}
              style={{ width: `${hpPercentage}%` }}
            >
              {/* 光沢 */}
              <div className="absolute inset-x-0 top-0.5 h-1 bg-white/40 rounded-full mx-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// これらをプロジェクトの tailwind.config.js に追加してください
// ---------------------------------------------------------
/*
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'pkm': ['"Press Start 2P"', 'cursive'], // ポケモン風フォント（例）
      },
      keyframes: {
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' },
        },
        'fade-in-out': {
          '0%': { opacity: '0', scale: '1.2' },
          '20%': { opacity: '1', scale: '1' },
          '80%': { opacity: '1', scale: '1.1' },
          '100%': { opacity: '0', scale: '1.3' },
        },
      },
      animation: {
        flash: 'flash 0.1s linear 4',
        'fade-in-out': 'fade-in-out 1.2s ease-out forwards',
      },
    },
  },
  // 以下のプラグインも追加するとパターンが使えます
  // plugins: [require('tailwindcss-bg-patterns')],
}
*/
