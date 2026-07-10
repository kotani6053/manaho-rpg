"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene'; // 修正したパス
import { kotobaData } from '../data/gameData'; // クイズデータのパス

export default function GamePage() {
  // --- ゲームの状態（ステート） ---
  const [level, setLevel] = useState(5); // まなほのレベル
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // バトルの演出用状態
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);

  // 敵モンスターのデータ
  const [monster, setMonster] = useState({
    name: "わるいスライム",
    hp: 100,
    img: "💧",
    isRare: false
  });
  const [monsterHP, setMonsterHP] = useState(100);

  // 現在のクイズ
  const quiz = kotobaData[currentQuizIndex] || kotobaData[0];

  // --- こうげき・必殺技のアクション ---
  const handleAttack = () => {
    if (monsterHP <= 0) return;
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setIsTakingDamage(true);
      const damage = 15 + level * 2;
      setMonsterHP((prev) => Math.max(0, prev - damage));
      setTimeout(() => setIsTakingDamage(false), 500);
    }, 300);
  };

  const handleSpecial = () => {
    if (monsterHP <= 0) return;
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setIsTakingDamage(true);
      const damage = 40 + level * 4;
      setMonsterHP((prev) => Math.max(0, prev - damage));
      setTimeout(() => setIsTakingDamage(false), 600);
    }, 300);
  };

  // --- クイズの答えあわせ ---
  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    const correct = option === quiz.a;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prev) => prev + 10);
      if ((score + 10) % 30 === 0) {
        setLevel((prev) => prev + 5);
      }
      handleAttack();
    } else {
      setIsTakingDamage(true);
      setTimeout(() => setIsTakingDamage(false), 300);
    }
  };

  // 次のクイズへ
  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuizIndex((prev) => (prev + 1) % kotobaData.length);
    
    if (monsterHP <= 0) {
      const monsters = [
        { name: "ファイヤードラゴン", hp: 150, img: "🐉", isRare: false },
        { name: "ぴかぴかキング", hp: 200, img: "👑", isRare: true },
        { name: "ぷよぷよおばけ", hp: 120, img: "👾", isRare: false }
      ];
      const nextMonster = monsters[Math.floor(Math.random() * monsters.length)];
      setMonster({
        name: nextMonster.name,
        hp: nextMonster.hp,
        img: nextMonster.img,
        isRare: nextMonster.isRare
      });
      setMonsterHP(nextMonster.hp);
    }
  };

  return (
    // 💡 画面ぴったりでスクロールを防止
    <main className="h-screen w-screen bg-slate-900 p-4 flex flex-col items-center justify-center font-sans select-none text-slate-800 overflow-hidden">
      {/* 💡 横幅を最大 5xl (少し広め) に広げて、左右のバランスを良くしました */}
      <div className="w-full max-w-5xl h-full max-h-[92vh] bg-slate-100 rounded-[2.5rem] border-[6px] border-[#222222] p-4 shadow-[0_12px_0_#000] flex flex-col gap-3 justify-between">
        
        {/* 🏆 ヘッダー */}
        <div className="flex justify-between items-center bg-white border-[3px] border-[#222222] rounded-xl p-2 px-5 shadow-[3px_3px_0_#222222] shrink-0">
          <div className="text-xl font-black flex items-center gap-2">
            <span>🎒</span> まなほ の べんきょうRPG
          </div>
          <div className="text-lg font-black bg-amber-400 text-slate-900 py-0.5 px-4 rounded-lg border-2 border-[#222222]">
            スコア: {score} てん
          </div>
        </div>

        {/* 🔗 メインコンテンツ（左右2分割エリア） */}
        <div className="flex-1 min-h-0 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 👾 左側：バトルフィールド */}
          <div className="h-full min-h-0 flex flex-col justify-center">
            <BattleScene 
              monster={monster} 
              monsterHP={monsterHP} 
              isAttacking={isAttacking} 
              isTakingDamage={isTakingDamage}
              playerLevel={level}
              onAttackClick={handleAttack}
              onSpecialClick={handleSpecial}
            />
          </div>

          {/* 📝 右側：クイズエリア */}
          <div className="h-full min-h-0 bg-white border-[4px] border-[#222222] rounded-[1.5rem] p-4 shadow-[0_6px_0_#222222] flex flex-col justify-between gap-2 overflow-y-auto">
            
            {/* 上部：問題文エリア */}
            <div className="flex flex-col gap-2">
              <div className="bg-blue-100 text-blue-800 text-xs font-black py-0.5 px-3 rounded-full w-fit border-2 border-blue-400">
                もんだい
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
                {quiz.q}
              </h2>
            </div>

            {/* 中部：選択肢ボタン（縦並びで押しやすく、枠に収まるサイズ） */}
            <div className="flex flex-col gap-2 my-auto">
              {quiz.options.map((option, idx) => {
                let btnStyle = "bg-white hover:bg-slate-50 text-slate-800 border-[#222222]";
                if (selectedAnswer === option) {
                  btnStyle = option === quiz.a 
                    ? "bg-emerald-400 text-white border-emerald-600" 
                    : "bg-rose-400 text-white border-rose-600";
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full border-[3px] shadow-[3px_3px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0_0_0_#222222] transition-all text-lg font-black py-2.5 px-4 rounded-xl text-left flex items-center gap-2 ${btnStyle}`}
                  >
                    <span className="bg-slate-200 text-slate-700 text-xs w-6 h-6 rounded-full flex items-center justify-center font-mono border-2 border-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* 下部：まるばつ結果 & 次へ進むボタン */}
            <div className="h-16 shrink-0 flex items-center justify-center">
              {selectedAnswer && (
                <div className="w-full p-2 px-4 rounded-xl border-[3px] border-[#222222] flex justify-between items-center gap-2 bg-slate-50 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="text-lg md:text-xl font-black text-emerald-500">⭕ せいかい！</span>
                    ) : (
                      <span className="text-lg md:text-xl font-black text-rose-500">❌ こたえ: {quiz.a}</span>
                    )}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-black text-base py-1.5 px-4 rounded-lg border-[3px] border-[#222222] shadow-[3px_3px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#222222] transition-all"
                  >
                    つぎへ ➡️
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
