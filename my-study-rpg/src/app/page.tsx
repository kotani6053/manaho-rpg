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

  // クイズ作成
  const generateQuiz = () => {
    const isMath = Math.random() > 0.5;
    if (isMath) {
      const a = Math.floor(Math.random() * 30) + 10;
      const b = Math.floor(Math.random() * 20) + 5;
      setQuiz({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected.q, a: selected.a });
    }
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  // 答え合わせ
  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      setPoints(p => p + 15);
      setMessage("✨ せいかい！ パワーがたまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ おしい！ よくみてみよう！ ❌");
    }
  };

  // こうげき
  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 50 : 20;
    if (points < cost) return;

    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);

    const baseDamage = isSpecial ? 100 : 30;
    const totalDamage = baseDamage + weapon.power + (playerLv * 2);
    setMonsterHP(prev => Math.max(0, prev - totalDamage));
    setPoints(p => p - cost);
    setMessage(`${weapon.img}${weapon.name}で ${totalDamage} ダメージ！`);
  };

  // ガチャを引く
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
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        
        {/* ステータスバー */}
        <div className="flex justify-between gap-2">
          <div className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-500 p-3 rounded-2xl border-b-4 border-blue-800 shadow-lg">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Player Level</p>
            <p className="text-xl font-black text-white italic text-center">Lv. {playerLv}</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-amber-500 to-orange-400 p-3 rounded-2xl border-b-4 border-orange-700 shadow-lg">
            <p className="text-[10px] text-orange-100 font-bold uppercase">Current Points</p>
            <p className="text-xl font-black text-white text-center">{points} <span className="text-xs">PT</span></p>
          </div>
        </div>

        {/* 武器スロット */}
        <div className="bg-slate-800 p-2 rounded-xl flex items-center justify-between border border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{weapon.img}</span>
            <span className="text-xs font-bold text-slate-300">そうび: {weapon.name}</span>
          </div>
          <button onClick={drawGacha} disabled={points < 100}
            className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-black hover:bg-pink-500 disabled:opacity-30">
            ガチャをひく (100pt)
          </button>
        </div>

        {/* モンスターエリア */}
        <div className={`relative overflow-hidden bg-gradient-to-b ${monster.color} rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/20 aspect-square flex flex-col items-center justify-center transition-all ${isAttacking ? 'scale-95 brightness-150' : ''}`}>
          <div className={`text-[120px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${isAttacking ? 'animate-bounce' : 'animate-pulse'}`}>
            {monsterHP > 0 ? monster.img : '💀'}
          </div>
          <div className="absolute bottom-6 w-5/6 space-y-2">
            <div className="flex justify-between items-end">
              <span className="bg-black/40 px-3 py-1 rounded-lg text-white font-black text-xs">{monster.name}</span>
              <span className="text-white font-mono font-bold">HP: {monsterHP} / {monster.hp}</span>
            </div>
            <div className="w-full bg-black/30 h-4 rounded-full p-1 border border-white/20">
              <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500" 
                   style={{ width: `${(monsterHP / monster.hp) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* クイズエリア */}
        <div className="bg-white rounded-3xl p-5 shadow-2xl">
          <div className="text-center mb-4">
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Question</p>
            <h2 className="text-4xl font-black text-slate-800">{quiz.q}</h2>
          </div>
          <form onSubmit={handleAnswer} className="flex gap-2">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
              className="flex-1 bg-slate-100 p-4 rounded-2xl text-2xl font-black text-slate-800 border-2 border-transparent focus:border-indigo-500 outline-none text-center" placeholder="？" />
            <button className="bg-indigo-600 text-white px-6 rounded-2xl font-black shadow-[0_5px_0_rgb(49,46,129)] active:translate-y-1 active:shadow-none transition-all">OK</button>
          </form>
        </div>

        {/* バトルボタン */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => attack(false)} disabled={points < 20}
            className="group relative bg-slate-800 p-4 rounded-3xl border-b-8 border-slate-950 active:border-b-0 active:translate-y-2 transition-all disabled:opacity-20">
            <span className="block text-2xl mb-1">⚔️</span>
            <span className="block text-white font-black text-sm uppercase tracking-tighter">Attack</span>
            <span className="text-xs text-slate-400 font-bold">20 pt</span>
          </button>
          <button onClick={() => attack(true)} disabled={points < 50}
            className="group relative bg-rose-600 p-4 rounded-3xl border-b-8 border-rose-900 active:border-b-0 active:translate-y-2 transition-all disabled:opacity-20 overflow-hidden">
            <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 -skew-x-12" />
            <span className="block text-2xl mb-1 text-white">🔥</span>
            <span className="block text-white font-black text-sm uppercase tracking-tighter">Special</span>
            <span className="text-xs text-rose-200 font-bold">50 pt</span>
          </button>
        </div>

        {/* メッセージ */}
        <div className="text-center bg-white/5 py-2 rounded-full border border-white/10">
          <p className="text-cyan-400 font-bold text-[10px] animate-pulse uppercase tracking-[0.2em]">{message}</p>
        </div>
      </div>

      {/* ガチャ演出オーバーレイ */}
      {showGacha && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
          <div className="text-9xl mb-8 animate-bounce">🎁</div>
          <h2 className="text-white text-3xl font-black mb-2 italic uppercase tracking-tighter">New Weapon!</h2>
          <div className="bg-white p-6 rounded-[2rem] text-center shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <div className="text-7xl mb-2">{weapon.img}</div>
            <p className="text-slate-800 text-2xl font-black">{weapon.name}</p>
            <p className="text-pink-600 font-bold">こうげきりょく +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
