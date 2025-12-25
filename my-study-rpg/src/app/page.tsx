"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function FullScreenRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState({ name: "ひのきのぼう", power: 5, img: "🪵" });
  const [message, setMessage] = useState("敵の あらわれを まっている...");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const a = Math.floor(Math.random() * 50) + 10;
      const b = Math.floor(Math.random() * 40) + 10;
      const op = Math.random() > 0.5 ? '+' : '-';
      setQuiz({ q: `${a} ${op} ${b} = ?`, a: (op === '+' ? a + b : a - b).toString() });
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
      setPoints(p => p + 25);
      setMessage("✨ せいかい！ パワーが 25たまわった！ ✨");
      setMonsterHP(prev => Math.max(0, prev - 10)); // 正解するだけで10ダメージ
      generateQuiz();
    } else {
      setMessage("❌ まちがいだ！ もういちど 集中しよう！ ❌");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);
    const dmg = (isSpecial ? 150 : 40) + (weapon.power * playerLv);
    setMonsterHP(p => Math.max(0, p - dmg));
    setPoints(p => p - cost);
    setMessage(`${weapon.name}の こうげき！ ${dmg}の ダメージ！`);
  };

  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const newW = weaponList[Math.floor(Math.random() * weaponList.length)];
    setWeapon(newW);
    setShowGacha(true);
    setTimeout(() => setShowGacha(false), 2000);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setMessage("🎊 モンスターを 撃破！ レベルアップ！ 🎊");
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 gap-4 overflow-hidden font-serif">
      
      {/* --- 上段：ステータスバー --- */}
      <div className="grid grid-cols-3 gap-4 h-24">
        <div className="bg-slate-900 border-2 border-indigo-500 rounded-xl p-4 flex flex-col justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Player Status</p>
          <p className="text-2xl font-black">勇者マナホ <span className="text-indigo-500">Lv.{playerLv}</span></p>
        </div>
        <div className="bg-slate-900 border-2 border-amber-500 rounded-xl p-4 flex flex-col justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] text-center">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">Battle Points</p>
          <p className="text-3xl font-black text-amber-100">{points} <span className="text-sm">PT</span></p>
        </div>
        <div className="bg-slate-900 border-2 border-emerald-500 rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{weapon.img}</span>
            <div>
              <p className="text-emerald-500 text-[10px] font-bold">WEAPON</p>
              <p className="font-bold">{weapon.name}</p>
            </div>
          </div>
          <button onClick={drawGacha} disabled={points < 100} className="bg-emerald-600 px-4 py-2 rounded-lg text-xs font-black hover:bg-emerald-500 disabled:opacity-20 transition-all active:scale-95 shadow-lg">ガチャ(100pt)</button>
        </div>
      </div>

      {/* --- 中段：メインバトル画面 --- */}
      <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
        {/* 左：モンスター情報 */}
        <div className="col-span-1 bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 italic">
          <h3 className="text-indigo-400 font-bold border-b border-indigo-400/30 pb-2">Monster Info</h3>
          <p className="text-xl font-bold">{monster.name}</p>
          <p className="text-sm text-slate-400 leading-relaxed">{monster.info}</p>
        </div>

        {/* 中央：モンスター巨大表示 */}
        <div className={`col-span-2 relative ${monster.color} rounded-3xl border-4 border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 ${isAttacking ? 'brightness-200' : ''}`}>
           {/* 背景のグリッド模様 */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          <div className={`text-[240px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none transition-transform ${isAttacking ? 'scale-110 rotate-12' : 'animate-bounce'}`}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          
          <div className="absolute bottom-10 w-4/5">
            <div className="flex justify-between items-end mb-2 px-2">
              <span className="text-white font-black drop-shadow-md text-lg italic uppercase">{monster.name}</span>
              <span className="text-white font-mono font-black text-2xl drop-shadow-md">HP {monsterHP} / {monster.hp}</span>
            </div>
            <div className="w-full bg-black/40 h-6 rounded-full border-2 border-white/20 p-1">
              <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(239,68,68,0.5)]" 
                   style={{ width: `${(monsterHP / monster.hp) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* 右：メッセージログ */}
        <div className="col-span-1 bg-black/40 border border-white/10 rounded-2xl p-6 overflow-y-auto font-mono text-sm space-y-3">
           <p className="text-slate-500 border-b border-white/10 pb-1">-- Battle Log --</p>
           <p className="text-cyan-400 animate-pulse">{message}</p>
        </div>
      </div>

      {/* --- 下段：コントロールパネル --- */}
      <div className="grid grid-cols-2 gap-4 h-48">
        {/* 左：クイズパネル */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-8 shadow-2xl overflow-hidden relative">
          <div className="bg-slate-100 px-10 py-4 rounded-3xl border-4 border-slate-200">
            <p className="text-slate-400 text-xs font-bold text-center mb-1">QUESTION</p>
            <p className="text-slate-800 text-5xl font-black tracking-tighter">{quiz.q}</p>
          </div>
          <form onSubmit={handleAnswer} className="flex-1 flex gap-3 h-full items-center">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} 
                   className="flex-1 h-20 bg-slate-50 border-4 border-slate-200 rounded-2xl text-slate-900 text-4xl font-black text-center focus:border-indigo-500 outline-none shadow-inner" placeholder="？" />
            <button className="h-20 bg-indigo-600 text-white px-10 rounded-2xl font-black text-2xl shadow-[0_8px_0_rgb(49,46,129)] active:translate-y-2 active:shadow-none transition-all">OK</button>
          </form>
        </div>

        {/* 右：コマンドパネル */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => attack(false)} disabled={points < 25} 
                  className="bg-slate-800 border-b-8 border-black rounded-2xl flex flex-col items-center justify-center hover:bg-slate-700 transition-all active:translate-y-2 active:border-b-0 disabled:opacity-20">
            <span className="text-4xl mb-1">⚔️</span>
            <span className="font-black text-xl">こうげき</span>
            <span className="text-slate-400 text-xs">25 PT 消費</span>
          </button>
          <button onClick={() => attack(true)} disabled={points < 60} 
                  className="bg-gradient-to-b from-orange-600 to-red-700 border-b-8 border-red-950 rounded-2xl flex flex-col items-center justify-center active:translate-y-2 active:border-b-0 disabled:opacity-20 shadow-xl group">
            <span className="text-4xl mb-1 group-hover:scale-125 transition-transform">🔥</span>
            <span className="font-black text-xl text-white">ひっさつ</span>
            <span className="text-orange-200 text-xs font-bold tracking-widest animate-pulse">60 PT 消費</span>
          </button>
        </div>
      </div>

      {/* ガチャ演出 */}
      {showGacha && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
          <div className="text-[200px] mb-10 animate-bounce drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">🎁</div>
          <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_0_100px_rgba(255,255,255,0.2)] scale-125 border-8 border-indigo-100">
            <div className="text-[120px] mb-4 drop-shadow-lg">{weapon.img}</div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] mb-2">New Weapon Get!</p>
            <p className="text-slate-900 text-5xl font-black mb-2 tracking-tighter">{weapon.name}</p>
            <p className="text-indigo-600 font-black text-2xl italic tracking-tighter">Attack Power +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
