"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList } from '../data/gameData';

export default function SuperStudyRPG() {
  // 基本ステート
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [message, setMessage] = useState("ぼうけんのはじまりだ！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);

  // 問題作成
  const generateQuiz = () => {
    const isMath = Math.random() > 0.4; // 60%で算数
    if (isMath) {
      const a = Math.floor(Math.random() * 20) + 1; // 2年生なので少し難しく
      const b = Math.floor(Math.random() * 20) + 1;
      setQuiz({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected.q, a: selected.a });
    }
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  // 答え合わせ
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      const getPoints = 10 + playerLv; // レベルが高いほどもらえるポイント増
      setPoints(prev => prev + getPoints);
      setMessage(`せいかい！ ${getPoints}ポイント ゲット！ ✨`);
      generateQuiz();
    } else {
      setMessage("おしい！ もういちど かんがえてみよう 🤔");
    }
  };

  // こうげき（レベルに応じてダメージ増）
  const handleAttack = (type: 'normal' | 'special') => {
    let damage = type === 'normal' ? 10 + (playerLv * 5) : 40 + (playerLv * 10);
    let cost = type === 'normal' ? 10 : 30;

    if (points >= cost) {
      setIsAttacking(true);
      setTimeout(() => setIsAttacking(false), 500);
      setMonsterHP(prev => Math.max(0, prev - damage));
      setPoints(prev => prev - cost);
      setMessage(`${type === 'normal' ? 'こうげき！' : 'ひっさつわざ！'} ${damage}のダメージ！`);
    }
  };

  // モンスターを倒した時の処理
  useEffect(() => {
    if (monsterHP <= 0) {
      setMessage(`${monsterList[monsterIdx].name} を たおした！`);
      setPlayerLv(prev => prev + 1); // レベルアップ！
      setTimeout(() => {
        const nextIdx = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(nextIdx);
        setMonsterHP(monsterList[nextIdx].hp);
        setMessage(`${monsterList[nextIdx].name} が あらわれた！`);
      }, 2000);
    }
  }, [monsterHP]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-950 text-white p-4 font-sans">
      <div className="w-full max-w-sm flex justify-between items-center mb-4 bg-indigo-900 p-3 rounded-2xl border border-indigo-700">
        <span className="font-black text-yellow-400 text-lg">Lv. {playerLv} ゆうしゃ</span>
        <span className="font-bold">ポイント: {points} pt</span>
      </div>

      {/* モンスター表示 */}
      <div className={`w-full max-w-sm bg-slate-800 rounded-3xl p-8 mb-4 border-4 border-slate-700 relative transition-all ${isAttacking ? 'animate-ping' : ''}`}>
        <div className="text-center text-8xl mb-4">{monsterHP > 0 ? monsterList[monsterIdx].img : '💥'}</div>
        <div className="text-center font-bold mb-2">{monsterList[monsterIdx].name} (Lv.{monsterList[monsterIdx].lv})</div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div className="bg-gradient-to-r from-red-500 to-orange-400 h-4 rounded-full transition-all duration-500" 
               style={{ width: `${(monsterHP / monsterList[monsterIdx].hp) * 100}%` }}></div>
        </div>
      </div>

      <div className="text-center font-bold text-cyan-300 mb-4 h-12 flex items-center">{message}</div>

      {/* 学習エリア */}
      <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl p-6 shadow-2xl mb-6">
        <p className="text-3xl font-black mb-4 text-center">{quiz.q}</p>
        <form onSubmit={handleQuizSubmit} className="flex gap-2">
          <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
            className="flex-1 p-3 rounded-xl border-2 border-slate-300 text-2xl text-center focus:border-indigo-500 outline-none" placeholder="?" />
          <button className="bg-indigo-600 text-white px-6 rounded-xl font-black">OK</button>
        </form>
      </div>

      {/* こうげきボタン（大きく押しやすく！） */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <button onClick={() => handleAttack('normal')} disabled={points < 10}
          className="bg-orange-600 h-20 rounded-2xl font-black text-xl shadow-[0_4px_0_rgb(154,52,18)] active:translate-y-1 active:shadow-none disabled:opacity-30">
          ⚔️ こうげき
        </button>
        <button onClick={() => handleAttack('special')} disabled={points < 30}
          className="bg-purple-600 h-20 rounded-2xl font-black text-xl shadow-[0_4px_0_rgb(88,28,135)] active:translate-y-1 active:shadow-none disabled:opacity-30">
          🔥 ひっさつ
        </button>
      </div>
    </div>
  );
}
