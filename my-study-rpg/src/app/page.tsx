"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene';
import ActionPanel from '../components/ActionPanel'; 
import { kotobaData } from '../data/gameData';

export default function GamePage() {
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
    }
  };

  return (
    <main className="h-screen w-screen bg-slate-950 p-6 flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[92vh] bg-slate-900 rounded-3xl border-4 border-[#333] p-6 shadow-2xl flex flex-col gap-6">
        
        {/* ヘッダー */}
        <header className="flex justify-between items-center bg-slate-800 border-4 border-[#333] rounded-2xl p-4">
          <h1 className="text-2xl font-black text-white">🎒 まなほ の べんきょうRPG</h1>
          <div className="flex items-center gap-4">
            <button className="bg-pink-600 border-4 border-[#333] px-8 py-2 rounded-xl font-black text-white">🎰 ガチャ</button>
            <div className="bg-amber-500 border-4 border-[#333] px-8 py-2 rounded-xl font-black text-lg">スコア: {score}</div>
          </div>
        </header>

        {/* 左右分割 */}
        <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
          {/* 左側：バトル（※BattleScene内の攻撃ボタンはpropsで渡さないようにすれば表示されません） */}
          <div className="h-full">
            <BattleScene 
              monster={monster} 
              monsterHP={monsterHP} 
              isAttacking={isAttacking} 
              isTakingDamage={isTakingDamage} 
              playerLevel={level} 
            />
          </div>

          {/* 右側：クイズ ＋ 下部：ActionPanel */}
          <div className="flex flex-col gap-6 min-h-0">
            <div className="flex-1 bg-slate-800 border-4 border-[#333] rounded-3xl p-8 flex flex-col gap-6 overflow-y-auto">
              <h2 className="text-3xl font-black leading-tight text-white">{quiz.q}</h2>
              <div className="grid gap-4">
                {quiz.options.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => handleAnswerClick(opt)} 
                    disabled={!!selectedAnswer}
                    className={`text-left text-2xl font-bold p-6 border-4 border-[#333] rounded-2xl ${
                      selectedAnswer === opt 
                        ? (opt === quiz.a ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") 
                        : "bg-slate-700 text-white hover:bg-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* パネル：ボタンはここだけ */}
            <ActionPanel 
              points={score} 
              monsterHP={monsterHP} 
              onAttack={handleAttack} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
