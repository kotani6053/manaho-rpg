"use client";
import React, { useState } from 'react';
import BattleScene from './BattleScene'; // パスが異なる場合は適宜調整してください
import { kotobaData } from '../data/gameData'; // クイズデータのパス

export default function GamePage() {
  // --- ゲームの状態（ステート） ---
  const [level, setLevel] = useState(5); // まなほのレベル（ここを変えると進化が変わります）
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // バトルの演出用状態
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);

  // 敵モンスターのデータ（例）
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
    
    // 1. プレイヤーのこうげきアニメ開始
    setIsAttacking(true);
    
    setTimeout(() => {
      setIsAttacking(false);
      // 2. モンスターのダメージアニメ開始
      setIsTakingDamage(true);
      
      // ダメージ計算（レベルが上がると強くなる！）
      const damage = 15 + level * 2;
      setMonsterHP((prev) => Math.max(0, prev - damage));
      
      setTimeout(() => {
        setIsTakingDamage(false);
      }, 500);
    }, 300);
  };

  const handleSpecial = () => {
    if (monsterHP <= 0) return;
    
    setIsAttacking(true);
    
    setTimeout(() => {
      setIsAttacking(false);
      setIsTakingDamage(true);
      
      // 必殺技は大ダメージ！
      const damage = 40 + level * 4;
      setMonsterHP((prev) => Math.max(0, prev - damage));
      
      setTimeout(() => {
        setIsTakingDamage(false);
      }, 600);
    }, 300);
  };

  // --- クイズの答えあわせ ---
  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // 回答済みなら何もしない
    setSelectedAnswer(option);
    
    const correct = option === quiz.a;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prev) => prev + 10);
      // 正解したらレベルアップ！(3問正解ごとに1レベルアップの例)
      if ((score + 10) % 30 === 0) {
        setLevel((prev) => prev + 5); // レベルが5ずつあがる
      }
      // モンスターに攻撃
      handleAttack();
    } else {
      // 不正解でもモンスターが少し動くなどの演出
      setIsTakingDamage(true);
      setTimeout(() => setIsTakingDamage(false), 300);
    }
  };

  // 次のクイズへ
  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuizIndex((prev) => (prev + 1) % kotobaData.length);
    
    // モンスターが倒れていたら復活させる
    if (monsterHP <= 0) {
      // 次のモンスターをランダムっぽくセット
      const monsters = [
        { name: "ファイヤードラゴン", hp: 150, img: "🐉", isRare: false },
        { name: "ぴかぴかキング", hp: 200, img: "👑", isRare: true },
        { name: "ぷよぷよおばけ", db: 120, img: "👾", isRare: false }
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
    <main className="min-h-screen bg-slate-900 p-4 md:p-8 flex flex-col items-center justify-center font-sans select-none text-slate-800">
      <div className="w-full max-w-4xl bg-slate-100 rounded-[3rem] border-[8px] border-[#222222] p-4 md:p-6 shadow-[0_16px_0_#000] flex flex-col gap-6">
        
        {/* 🏆 ヘッダー・スコアエリア */}
        <div className="flex justify-between items-center bg-white border-[4px] border-[#222222] rounded-2xl p-3 px-6 shadow-[4px_4px_0_#222222]">
          <div className="text-xl font-black flex items-center gap-2">
            <span>🎒</span> まなほ の べんきょうRPG
          </div>
          <div className="text-lg font-black bg-amber-400 text-slate-900 py-1 px-4 rounded-xl border-2 border-[#222222]">
            スコア: {score} てん
          </div>
        </div>

        {/* 👾 1. バトルフィールドエリア */}
        <BattleScene 
          monster={monster} 
          monsterHP={monsterHP} 
          isAttacking={isAttacking} 
          isTakingDamage={isTakingDamage}
          playerLevel={level} // 👈 ここでまなほのレベルをBattleSceneに渡しています！
          onAttackClick={handleAttack}
          onSpecialClick={handleSpecial}
        />

        {/* 📝 2. クイズエリア（小学生向けに文字を大きく、読みやすく） */}
        <div className="bg-white border-[6px] border-[#222222] rounded-[2rem] p-6 shadow-[0_10px_0_#222222] flex flex-col gap-4">
          <div className="bg-blue-100 text-blue-800 text-sm font-black py-1 px-4 rounded-full w-fit border-2 border-blue-400">
            もんだい
          </div>
          
          {/* 問題文を大きく */}
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
            {quiz.q}
          </h2>

          {/* 選択肢ボタン */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {quiz.options.map((option, idx) => {
              let btnStyle = "bg-white hover:bg-slate-50 text-slate-800 border-[#222222]";
              if (selectedAnswer === option) {
                btnStyle = option === quiz.a 
                  ? "bg-emerald-400 text-white border-emerald-600 animate-pulse" 
                  : "bg-rose-400 text-white border-rose-600";
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswerClick(option)}
                  className={`border-[4px] shadow-[4px_4px_0_#222222] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_#222222] transition-all text-xl font-black py-4 px-6 rounded-2xl text-left flex items-center gap-3 ${btnStyle}`}
                >
                  <span className="bg-slate-200 text-slate-700 text-sm w-7 h-7 rounded-full flex items-center justify-center font-mono border-2 border-slate-400 shrink-0">
                    {idx + 1}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* まるばつ結果 & 次へ進むボタン */}
          {selectedAnswer && (
            <div className="mt-4 p-4 rounded-2xl border-[4px] border-[#222222] flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 animate-fadeIn">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <span className="text-4xl text-emerald-500 animate-bounce">⭕ せいかい！大ダメージ！</span>
                ) : (
                  <span className="text-4xl text-rose-500">❌ ざんねん！ こたえは「{quiz.a}」</span>
                )}
              </div>
              <button
                onClick={handleNextQuiz}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-black text-xl py-3 px-8 rounded-xl border-[4px] border-[#222222] shadow-[4px_4px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#222222] transition-all"
              >
                つぎのもんだいへ ➡️
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
