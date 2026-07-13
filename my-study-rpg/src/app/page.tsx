"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene';
import ActionPanel from '../components/ActionPanel';
import { kotobaData } from '../data/gameData';

export default function GamePage() {
  // --- ゲームの状態 ---
  const [level, setLevel] = useState(5);
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);
  const [monsterHP, setMonsterHP] = useState(100);
  const [monster, setMonster] = useState({ name: "わるいスライム", hp: 100, img: "💧", isRare: false });

  const quiz = kotobaData[currentQuizIndex] || kotobaData[0];

  // --- アクション連携 ---
  const handleAttack = (isSpecial: boolean) => {
    if (monsterHP <= 0) return;
    setIsAttacking(true);
    const damage = isSpecial ? 40 + level * 4 : 15 + level * 2;
    setTimeout(() => {
      setIsAttacking(false);
      setIsTakingDamage(true);
      setMonsterHP((prev) => Math.max(0, prev - damage));
      setTimeout(() => setIsTakingDamage(false), 500);
    }, 300);
  };

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    const correct = option === quiz.a;
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 10);
      handleAttack(false);
    } else {
      setIsTakingDamage(true);
      setTimeout(() => setIsTakingDamage(false), 300);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuizIndex((prev) => (prev + 1) % kotobaData.length);
    if (monsterHP <= 0) {
      setMonster({ name: "ファイヤードラゴン", hp: 150, img: "🐉", isRare: false });
      setMonsterHP(150);
    }
  };

  return (
    <main className="h-screen w-screen bg-slate-900 p-4 flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* 全体を包むメインコンテナ：窮屈さを解消するため max-w-6xl で広めに設定 */}
      <div className="w-full max-w-6xl h-full max-h-[94vh] bg-slate-100 rounded-[2.5rem] border-[6px] border-[#222222] p-5 shadow-[0_12px_0_#000] flex flex-col gap-4">
        
        {/* ヘッダー */}
        <header className="flex justify-between items-center bg-white border-4 border-[#222222] rounded-2xl p-4 shadow-[4px_4px_0_#222222]">
          <h1 className="text-2xl font-black">🎒 まなほ の べんきょうRPG</h1>
          <div className="flex items-center gap-4">
            <button className="bg-pink-400 border-4 border-[#222222] px-6 py-2 rounded-xl font-black text-white shadow-[3px_3px_0_#222222] hover:scale-105 transition-transform">
              🎰 ガチャをひく
            </button>
            <div className="bg-amber-400 border-4 border-[#222222] px-6 py-2 rounded-xl font-black text-lg">
              スコア: {score}
            </div>
          </div>
        </header>

        {/* 左右分割コンテンツエリア */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          {/* 左：バトル画面 */}
          <div className="h-full min-h-0">
            <BattleScene 
              monster={monster} 
              monsterHP={monsterHP} 
              isAttacking={isAttacking} 
              isTakingDamage={isTakingDamage} 
              playerLevel={level} 
            />
          </div>

          {/* 右：クイズ ＋ 下部：アクションパネル */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* クイズボックス */}
            <div className="flex-1 bg-white border-4 border-[#222222] rounded-[2rem] p-6 shadow-[0_8px_0_#222222] flex flex-col min-h-0">
              <h2 className="text-2xl font-black mb-6 leading-tight">{quiz.q}</h2>
              <div className="grid gap-3 overflow-y-auto pr-2">
                {quiz.options.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => handleAnswerClick(opt)} 
                    disabled={!!selectedAnswer}
                    className={`text-left text-xl font-black p-5 border-4 border-[#222222] rounded-2xl transition-all shadow-[4px_4px_0_#222222] ${
                      selectedAnswer === opt 
                        ? (opt === quiz.a ? "bg-emerald-400 text-white" : "bg-rose-400 text-white") 
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {/* 正誤判定後の次へボタン */}
              {selectedAnswer && (
                <button onClick={handleNextQuiz} className="mt-4 bg-blue-500 text-white font-black py-3 rounded-xl border-4 border-[#222222] shadow-[4px_4px_0_#222222]">
                  つぎへ ➡️
                </button>
              )}
            </div>

            {/* あなたのカラフルな攻撃パネル */}
            <ActionPanel points={score} monsterHP={monsterHP} onAttack={handleAttack} />
          </div>
        </div>
      </div>
    </main>
  );
}
