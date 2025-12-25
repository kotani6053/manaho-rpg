"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function UltimateRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [message, setMessage] = useState("ぼうけんの はじまり！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 30) + 5;
      const op = Math.random() > 0.5 ? '+' : '-';
      const ans = op === '+' ? a + b : a - b;
      setQuiz({ q: `${a} ${op} ${b} = ?`, a: ans.toString() });
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
      setPoints(p => p + 20);
      setMessage("✨ せいかい！ パワーがたまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ おしい！ よくみてみよう！ ❌");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 50 : 20;
    if (points < cost) return;

    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);

    const baseDamage = isSpecial ? 150 : 40;
    const totalDamage = baseDamage + (weapon.power * playerLv);
    setMonsterHP(prev => Math.max(0, prev - totalDamage));
    setPoints(p => p - cost);
    setMessage(`${weapon.name}で ${totalDamage} ダメージ！`);
  };

  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const newWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    setWeapon(newWeapon);
    setShowGacha(true);
    setTimeout(() => setShowGacha(false), 2000);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setMessage("🎊 レベルアップ！ つぎのてきが くるぞ！ 🎊");
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-x-hidden">
      <div className="w-full max-w-lg space-y-6">
        
        {/* ヘッダー情報 */}
        <div className="flex justify-between items-center bg-slate-900/80 p-4 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="text-left">
            <p className="text-blue-400 text-[10px] font-black tracking-widest uppercase">Hero Status</p>
            <h1 className="text-2xl font-black text-white italic">LV. {playerLv}</h1>
          </div>
          <div className="text-right">
            <p className="text-amber-400 text-[10px] font-black tracking-widest uppercase">Energy Points</p>
            <p className="text-2xl font-black text-white">{points} <span className="text-xs">PT</span></p>
          </div>
        </div>

        {/* 武器ガチャ */}
        <div className="flex items-center justify-between bg-indigo-950/50 p-3 rounded-2xl border border-indigo-500/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{weapon.img}</span>
            <div>
              <p className="text-[10px] text-indigo-300 font-bold">EQUIPMENT</p>
              <p className="text-white font-bold">{weapon.name}</p>
            </div>
          </div>
          <button onClick={drawGacha} disabled={points < 100}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs px-4 py-2 rounded-full font-black shadow-lg hover:brightness-125 disabled:opacity-20 transition-all active:scale-95">
            ガチャ (100pt)
          </button>
        </div>

        {/* 巨大モンスター表示エリア */}
        <div className={`relative overflow-visible bg-gradient-to-b ${monster.color} rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] border-2 border-white/10 h-80 flex items-center justify-center transition-all ${isAttacking ? 'scale-90 brightness-200' : ''}`}>
          <div className={`text-[180px] leading-none select-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 ${monster.scale} ${isAttacking ? 'animate-bounce' : 'animate-pulse'}`}>
            {monsterHP > 0 ? monster.img : '✨'}
          </div>
          
          {/* HPオーバーレイ */}
          <div className="absolute bottom-6 w-5/6 bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/20">
            <div className="flex justify-between items-end mb-2">
              <span className="text-white font-black text-sm tracking-tighter uppercase">{monster.name}</span>
              <span className="text-white font-mono font-black text-lg">HP {monsterHP}</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)] transition-all duration-700" 
                   style={{ width: `${(monsterHP / monster.hp) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* クイズエリア */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="text-center mb-4 leading-tight">
            <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Answer to Power Up</p>
            <h2 className="text-5xl font-black text-slate-800 tracking-tighter">{quiz.q}</h2>
          </div>
          <form onSubmit={handleAnswer} className="flex gap-3">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
              className="flex-1 bg-slate-100 p-5 rounded-3xl text-3xl font-black text-slate-800 border-4 border-transparent focus:border-indigo-500 outline-none text-center shadow-inner" placeholder="?" />
            <button className="bg-indigo-600 text-white px-8 rounded-3xl font-black text-xl shadow-[0_8px_0_rgb(49,46,129)] active:translate-y-2 active:shadow-none transition-all">OK</button>
          </form>
        </div>

        {/* バトルボタン */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => attack(false)} disabled={points < 20}
            className="group bg-slate-800 p-5 rounded-[2rem] border-b-8 border-black active:border-b-0 active:translate-y-2 transition-all disabled:opacity-20 shadow-xl">
            <span className="block text-3xl mb-1">⚔️</span>
            <span className="block text-white font-black text-sm uppercase tracking-widest">Normal</span>
          </button>
          <button onClick={() => attack(true)} disabled={points < 50}
            className="group bg-gradient-to-b from-rose-500 to-red-700 p-5 rounded-[2rem] border-b-8 border-red-950 active:border-b-0 active:translate-y-2 transition-all disabled:opacity-20 shadow-[0_0_30px_rgba(225,29,72,0.3)]">
            <span className="block text-3xl mb-1 animate-pulse">🔥</span>
            <span className="block text-white font-black text-sm uppercase tracking-widest font-italic">Special</span>
          </button>
        </div>

        <p className="text-center text-cyan-400 font-black text-[10px] tracking-[0.4em] uppercase h-4">{message}</p>
      </div>

      {/* ガチャ演出 */}
      {showGacha && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-10 text-center animate-in fade-in zoom-in duration-300">
          <div className="text-[150px] mb-8 animate-bounce filter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">🎁</div>
          <h2 className="text-white text-4xl font-black italic mb-4 tracking-tighter">YOU GOT A WEAPON!</h2>
          <div className="bg-white p-10 rounded-[4rem] shadow-[0_0_100px_rgba(255,255,255,0.2)] scale-110">
            <div className="text-9xl mb-4">{weapon.img}</div>
            <p className="text-slate-900 text-3xl font-black mb-1">{weapon.name}</p>
            <p className="text-pink-600 font-black text-xl tracking-tighter italic font-mono">POWER +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
