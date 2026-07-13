"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene';
import ActionPanel from '../components/ActionPanel'; 
import { kotobaData } from '../data/gameData';

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [monsterHP, setMonsterHP] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);

  const quiz = kotobaData[currentQuizIndex] || kotobaData[0];

  const handleAttack = (isSpecial: boolean) => {
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setMonsterHP((prev) => Math.max(0, prev - (isSpecial ? 50 : 20)));
    }, 300);
  };

  return (
    <main className="h-screen w-screen bg-slate-900 p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[95vh] bg-slate-100 rounded-[2rem] border-[6px] border-[#222222] p-6 shadow-[0_10px_0_#000] flex flex-col gap-6">
        
        {/* ヘッダー */}
        <header className="flex justify-between items-center bg-white border-4 border-[#222222] rounded-2xl p-4 shrink-0">
          <h1 className="text-2xl font-black">🎒 まなほ の べんきょうRPG</h1>
          <div className="flex items-center gap-4">
            {/* ガチャボタンを復活 */}
            <button className="bg-pink-500 border-4 border-[#222222] px-6 py-2 rounded-xl font-black text-white hover:opacity-90">
              🎰 ガチャ
            </button>
            <div className="bg-amber-400 border-4 border-[#222222] px-6 py-2 rounded-xl font-black text-lg">
              スコア: {score}
            </div>
          </div>
        </header>

        {/* 左右分割 */}
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          
          {/* 左：バトル */}
          <div className="flex flex-col min-h-0">
            <BattleScene 
              monster={{ name: "わるいスライム", hp: 100, img: "💧" }} 
              monsterHP={monsterHP} 
              isAttacking={isAttacking} 
              isTakingDamage={isTakingDamage} 
              playerLevel={5} 
            />
          </div>
          
          {/* 右：クイズ(上) ＋ アクションパネル(下) */}
          <div className="flex flex-col gap-6 min-h-0">
            <div className="flex-1 bg-white border-4 border-[#222222] rounded-2xl p-6 overflow-y-auto">
              <h2 className="text-2xl font-black mb-6">{quiz.q}</h2>
              <div className="grid gap-4">
                {quiz.options.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => {
                      if (opt === quiz.a) {
                        setScore(s => s + 10);
                        setCurrentQuizIndex((prev) => (prev + 1) % kotobaData.length);
                      }
                    }} 
                    className="text-left p-5 border-4 border-[#222222] rounded-xl font-bold bg-white hover:bg-slate-50 transition-none"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="shrink-0">
              <ActionPanel 
                points={score} 
                monsterHP={monsterHP} 
                onAttack={handleAttack} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
