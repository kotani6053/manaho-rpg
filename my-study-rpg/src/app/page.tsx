"use client";
import { useState } from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { kanjiData } from '@/data/kanji';

export default function GamePage() {
  const { points, monsterHP, addPoints, attackMonster, setMonsterHP } = useGameLogic();
  const [ans, setAns] = useState("");
  const [msg, setMsg] = useState("べんきょうして モンスターを たおそう！");

  const checkAnswer = () => {
    // 簡易的なさんすうクイズチェック（例：1+1）
    if (parseInt(ans) === 2) {
      addPoints(10);
      setMsg("せいかい！ 10ポイントゲット！");
      setAns("");
    } else {
      setMsg("おしい！もういちど！");
    }
  };

  return (
    <main className="min-h-screen bg-green-50 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">べんきょうRPG</h1>
      
      {/* バトルシーン */}
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm text-center mb-6">
        <div className="text-7xl mb-4 animate-bounce">👾</div>
        <div className="h-4 w-full bg-gray-200 rounded-full">
          <div className="h-4 bg-red-500 rounded-full transition-all" style={{width: `${monsterHP}%`}} />
        </div>
        <p className="mt-2 font-bold">HP: {monsterHP}</p>
      </div>

      <p className="text-blue-600 font-bold mb-4">{msg}</p>

      {/* アクションパネル */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-400">
          <p className="text-xs">もってるポイント: {points}</p>
          <input 
            type="number" 
            className="w-full mt-2 p-1 border rounded" 
            placeholder="1 + 1 = ?"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={checkAnswer} className="w-full mt-2 bg-yellow-400 font-bold rounded">こたえる</button>
        </div>

        <div className="bg-red-100 p-4 rounded-xl border-2 border-red-400">
          <button 
            onClick={() => attackMonster(20, 10)}
            className="w-full py-1 bg-red-500 text-white rounded mb-2 shadow-md active:translate-y-1"
          >
            パンチ (10pt)
          </button>
          <button 
            onClick={() => attackMonster(50, 30)}
            className="w-full py-1 bg-purple-600 text-white rounded shadow-md active:translate-y-1"
          >
            まほう (30pt)
          </button>
        </div>
      </div>
      
      {monsterHP <= 0 && (
        <button onClick={() => setMonsterHP(100)} className="mt-8 p-4 bg-black text-white rounded-full animate-pulse">
          つぎの モンスターを よぶ！
        </button>
      )}
    </main>
  );
}
