type BattleSceneProps = {
  hp: number;
  isAttacking: boolean;
  monsterName?: string;
};

export default function BattleScene({ hp, isAttacking, monsterName = "モンスター" }: BattleSceneProps) {
  // HPの割合を計算（0%〜100%）
  const hpPercentage = Math.max(0, Math.min(100, hp));

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      {/* モンスター本体：isAttackingがtrueのときに揺れるアニメーションを追加 */}
      <div className={`text-9xl mb-6 transition-transform duration-100 ${isAttacking ? 'animate-bounce' : 'hover:scale-105'}`}>
        {hp > 0 ? '👾' : '💥'}
      </div>

      {/* ステータスボード */}
      <div className="w-full bg-slate-800 border-4 border-slate-700 rounded-3xl p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-black text-lg">{monsterName}</span>
          <span className="text-white font-mono font-bold">HP: {hp} / 100</span>
        </div>

        {/* HPバーの外枠 */}
        <div className="w-full bg-gray-700 rounded-full h-6 border-2 border-slate-900 overflow-hidden">
          {/* HPバーの中身：HPに応じて色と長さが変わる */}
          <div 
            className={`h-full transition-all duration-500 ${
              hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 20 ? 'bg-yellow-500' : 'bg-red-600'
            }`}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
