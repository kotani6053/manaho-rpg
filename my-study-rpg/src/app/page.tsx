"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList } from '../data/gameData';

export default function MegaRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [message, setMessage] = useState("ぼうけん スタート！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [shake, setShake] = useState(false);

  // クイズ生成（漢字・足し算・引き算）
  const generateQuiz = () => {
    const rand = Math.random();
    if (rand < 0.4) {
      const a = Math.floor(Math.random() * 50) + 10;
      const b = Math.floor(Math.random() * 40) + 5;
      setQuiz({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
    } else if (rand < 0.7) {
      const a = Math.floor(Math.random() * 20) + 20;
      const b = Math.floor(Math.random() * 19) + 1;
      setQuiz({ q: `${a} - ${b} = ?`, a: (a - b).toString() });
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected.q, a: selected.a });
    }
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      setPoints(p => p + 10 + Math.floor(playerLv / 2));
      setMessage("✨ せいかい！ ポイントゲット！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ おしい！ よくみて かいてね ❌");
    }
  };

  const handleAttack = (isSpecial: boolean) => {
    const cost = isSpecial ? 30 : 10;
    if (points < cost) return;

    setShake(true);
    setTimeout(() => setShake(false), 500);

    const damage = isSpecial ? (40 + playerLv * 10) : (15 + playerLv * 4);
    setMonsterHP(prev => Math.max(0, prev - damage));
    setPoints(p => p - cost);
    setMessage(`ズババッ！ ${damage}の ダメージ！`);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setMessage("🎊 モンスターを たおした！ レベルアップ！ 🎊");
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const currentMonster = monsterList[monsterIdx];

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center p-4 font-sans text-slate-800">
      {/* ヒーローステータス */}
      <div className="w-full max-w-md bg-white border-b-8 border-sky-300 rounded-3xl p-4 flex justify-between items-center mb-6 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-yellow-200 shadow-inner">L{playerLv}</div>
          <span className="font-black text-lg">ゆうしゃ</span>
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-2xl border-2 border-orange-200">
          <span className="text-orange-600 font-black">ポイント: {points} pt</span>
        </div>
      </div>

      {/* モンスターエリア */}
      <div className={`w-full max-w-md ${currentMonster.color} rounded-[3rem] p-8 border-8 border-white shadow-2xl transition-all ${shake ? 'animate-bounce scale-110' : ''} mb-4`}>
        <div className="text-center text-[120px] leading-none mb-6 drop-shadow-lg">{monsterHP > 0 ? currentMonster.img : '✨'}</div>
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4">
          <div className="flex justify-between font-black mb-1 px-1">
            <span>{currentMonster.name}</span>
            <span>HP: {monsterHP}</span>
          </div>
          <div className="w-full bg-slate-200 h-6 rounded-full overflow-hidden border-2 border-slate-300">
            <div className="h-full bg-gradient-to-r from-red-500 to-pink-400 transition-all duration-500" style={{ width: `${(monsterHP / currentMonster.hp) * 100}%` }} />
          </div>
        </div>
      </div>

      <p className="text-lg font-black text-indigo-600 mb-4 h-6 animate-pulse">{message}</p>

      {/* クイズエリア */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-t-8 border-indigo-200 mb-6">
        <div className="bg-indigo-50 rounded-2xl p-4 mb-4 text-center">
          <p className="text-indigo-400 text-sm font-bold mb-1">もんだいを といて パワーをためよう！</p>
          <p className="text-4xl font-black text-slate-700">{quiz.q}</p>
        </div>
        <form onSubmit={handleAnswer} className="flex gap-3">
          <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} 
            className="flex-1 text-2xl font-black p-4 rounded-2xl border-4 border-slate-100 bg-slate-50 focus:border-indigo-400 outline-none text-center" placeholder="？" />
          <button className="bg-indigo-500 text-white px-8 rounded-2xl font-black text-xl shadow-[0_6px_0_rgb(67,56,202)] active:shadow-none active:translate-y-[6px] transition-all">OK</button>
        </form>
      </div>

      {/* バトルボタン */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button onClick={() => handleAttack(false)} disabled={points < 10}
          className="bg-orange-500 text-white h-24 rounded-[2rem] font-black text-2xl shadow-[0_8px_0_rgb(154,52,18)] active:shadow-none active:translate-y-2 transition-all disabled:opacity-30 disabled:grayscale">
          ⚔️ こうげき<br/><span className="text-sm">10pt</span>
        </button>
        <button onClick={() => handleAttack(true)} disabled={points < 30}
          className="bg-purple-600 text-white h-24 rounded-[2rem] font-black text-2xl shadow-[0_8px_0_rgb(88,28,135)] active:shadow-none active:translate-y-2 transition-all disabled:opacity-30 disabled:grayscale text-shadow">
          🔥 ひっさつ<br/><span className="text-sm">30pt</span>
        </button>
      </div>
    </div>
  );
}
