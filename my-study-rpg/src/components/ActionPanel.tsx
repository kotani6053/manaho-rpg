type ActionPanelProps = {
  points: number;
  onAttack: (damage: number, cost: number) => void;
};

export default function ActionPanel({ points, onAttack }: ActionPanelProps) {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 w-full max-w-sm">
      <p className="text-yellow-400 font-bold mb-3 text-center">もってるポイント: {points}pt</p>
      
      <div className="flex flex-col gap-3">
        {/* 通常攻撃ボタン */}
        <button 
          onClick={() => onAttack(20, 10)}
          disabled={points < 10}
          className="bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-white font-black py-3 rounded-xl shadow-lg transition-all active:scale-95"
        >
          ⚔️ つうじょう こうげき (10pt)
        </button>

        {/* 必殺技ボタン */}
        <button 
          onClick={() => onAttack(50, 30)}
          disabled={points < 30}
          className="bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white font-black py-3 rounded-xl shadow-lg transition-all active:scale-95"
        >
          🔥 ひっさつわざ (30pt)
        </button>
      </div>
    </div>
  );
}
