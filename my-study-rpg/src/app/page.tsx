"use client";
import React, { useState } from 'react';
import BattleScene from '../components/BattleScene';
import ActionPanel from '../components/ActionPanel'; // ガチャ機能を持つコンポーネント
import { kotobaData } from '../data/gameData'; // クイズデータ

export default function GamePage() {
  // --- ゲームの状態（ステート） ---
  const [level, setLevel] = useState(5); // まなほのレベル
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // ガチャ用の状態（スコア100ごとに引けるシステム用）
  const [showGacha, setShowGacha] = useState(false);

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
      const nextScore = score + 10;
      setScore(nextScore);
      
      // 100点たまるごとに自動でレベルアップ ＆ ガチャ画面を開く！
      if (nextScore % 100 === 0) {
        setLevel((prev) => prev + 5);
        setTimeout(() => {
          setShowGacha(true); // ガチャ（ActionPanel）をオープン！
        }, 1000);
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
    <main className="h-screen w-screen bg-slate-900 p-3 sm:p-5 flex flex-col items-center justify-center font-sans select-none text-slate-800 overflow-hidden">
      {/* 全体の外枠。窮屈さを解消するため、max-w-6xl（広め）＆ max-h-[95vh] でゆったり配置 */}
      <div className="w-full max-w-6xl h-full max-h-[95vh] bg-slate-100 rounded-[2.5rem] border-[6px] border-[#222222] p-4 shadow-[0_12px_0_#000] flex flex-col gap-4 justify-between">
        
        {/* 🏆 ヘッダー */}
        <div className="flex justify-between items-center bg-white border-[3px] border-[#222222] rounded-2xl p-2.5 px-6 shadow-[4px_4px_0_#222222] shrink-0">
          <div className="text-xl md:text-2xl font-black flex items-center gap-2">
            <span>🎒</span> まなほ の べんきょうRPG
          </div>
          <div className="flex items-center gap-3">
            {/* ガチャボタン。100点たまるとピカピカ光ります */}
            <button
              onClick={() => setShowGacha(true)}
              className={`text-sm md:text-base font-black py-1 px-3 rounded-lg border-2 border-[#222222] shadow-[2px_2px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                score >= 100 ? "bg-gradient-to-r from-pink-400 to-amber-400 animate-pulse text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              🎰 ガチャをひく
            </button>
            <div className="text-lg md:text-xl font-black bg-amber-400 text-slate-900 py-1 px-4 rounded-xl border-2 border-[#222222]">
              スコア: {score} てん
            </div>
          </div>
        </div>

        {/* 🔗 メインコンテンツ（左右2分割エリア） */}
        <div className="flex-1 min-h-0 w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
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
          <div className="h-full min-h-0 bg-white border-[4px] border-[#222222] rounded-[2rem] p-5 shadow-[0_8px_0_#222222] flex flex-col justify-between gap-4">
            
            {/* 上部：問題文エリア（文字サイズを大きくゆったりと） */}
            <div className="flex flex-col gap-3">
              <div className="bg-blue-100 text-blue-800 text-xs md:text-sm font-black py-1 px-4 rounded-full w-fit border-2 border-blue-400">
                もんだい
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                {quiz.q}
              </h2>
            </div>

            {/* 中部：選択肢ボタン（縦並びで見やすさ重視） */}
            <div className="flex flex-col gap-3 my-auto">
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
                    className={`w-full border-[3px] shadow-[4px_4px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0_0_0_#222222] transition-all text-xl font-black py-3 px-5 rounded-2xl text-left flex items-center gap-3 ${btnStyle}`}
                  >
                    <span className="bg-slate-200 text-slate-700 text-sm w-7 h-7 rounded-full flex items-center justify-center font-mono border-2 border-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* 下部：まるばつ結果 & 次へ進むボタン */}
            <div className="h-20 shrink-0 flex items-center justify-center">
              {selectedAnswer && (
                <div className="w-full p-3 px-5 rounded-2xl border-[3px] border-[#222222] flex justify-between items-center gap-3 bg-slate-50 animate-fadeIn shadow-[2px_2px_0_#222222]">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="text-xl md:text-2xl font-black text-emerald-500 animate-bounce">⭕ せいかい！</span>
                    ) : (
                      <span className="text-xl md:text-2xl font-black text-rose-500">❌ こたえ: {quiz.a}</span>
                    )}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-black text-lg py-2 px-6 rounded-xl border-[3px] border-[#222222] shadow-[3px_3px_0_#222222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#222222] transition-all"
                  >
                    つぎへ ➡️
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* 🎰 ガチャのポップアップ（開いた時だけ表示） */}
      {showGacha && (
        <ActionPanel onClose={() => setShowGacha(false)} />
      )}
    </main>
  );
}
