"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene';
import ActionPanel from '../components/ActionPanel'; 
import { kotobaData } from '../data/gameData';

export default function GamePage() {
  const [score, setScore] = useState(100);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [monsterHP, setMonsterHP] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);

  const quiz = kotobaData[currentQuizIndex] || kotobaData[0];

  const handleAttack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (score < cost || monsterHP <= 0) return;

    setScore((prev) => prev - cost);
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setMonsterHP((prev) => Math.max(0, prev - (isSpecial ? 50 : 20)));
    }, 300);
  };

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    const correct = option === quiz.a;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 20);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuizIndex((prev) => (prev + 1) % kotobaData.length);
  };

  return (
    <main className="h-screen w-screen bg-slate-900 p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[95vh] bg-slate-100 rounded-[2rem] border-[6px] border-[#222222] p-6 shadow-[0_10px_0_#000] flex flex-col gap-6">
        
        {/* ヘッダー：ガチャ消費を100に変更 */}
        <header className="flex justify-between items-center bg-white border-4 border-[#222222] rounded-2xl p-4 shrink-0">
          <h1 className="text-2xl font-black">🎒 まなほ の べんきょうRPG</h1>
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center bg-pink-500 border-4 border-[#222222] px-4 py-1.5 rounded-xl font-black text-white hover:opacity-90">
              <span>🎰 ガチャ</span>
              <span className="text-[10px] bg-black/20 px-2 rounded-full">消費: 100</span>
            </button>
            <div className="bg-amber-400 border-4 border-[#222222] px-6 py-2 rounded-xl font-black text-lg">
              スコア: {score}
            </div>
          </div>
        </header>

        {/* 左右分割 */}
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          <div className="flex flex-col min-h-0">
            <BattleScene 
              monster={{ name: "わるいスライム", hp: 100, img: "💧" }} 
              monsterHP={monsterHP} 
              isAttacking={isAttacking} 
              isTakingDamage={isTakingDamage} 
              playerLevel={5} 
            />
          </div>
          
          <div className="flex flex-col gap-6 min-h-0">
            <div className="flex-1 bg-white border-4 border-[#222222] rounded-2xl p-6 flex flex-col gap-4 overflow-y-auto">
              <h2 className="text-2xl font-black">{quiz.q}</h2>
              <div className="grid gap-3">
                {quiz.options.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => handleAnswerClick(opt)} 
                    disabled={selectedAnswer !== null}
                    className={`text-left p-5 border-4 border-[#222222] rounded-xl font-bold transition-none ${
                      selectedAnswer === opt 
                        ? (isCorrect ? "bg-emerald-400 text-white" : "bg-rose-400 text-white") 
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {selectedAnswer !== null && (
                <div className={`p-4 rounded-xl border-4 border-[#222222] font-black text-center ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                  {isCorrect ? "⭕ せいかい！スコアゲット！" : `❌ ざんねん！こたえは「${quiz.a}」でした。`}
                  <button onClick={handleNextQuiz} className="block w-full mt-3 bg-[#222222] text-white py-2 rounded-lg">つぎのもんだいへ</button>
                </div>
              )}
            </div>
            
            <div className="shrink-0">
              <ActionPanel points={score} monsterHP={monsterHP} onAttack={handleAttack} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
