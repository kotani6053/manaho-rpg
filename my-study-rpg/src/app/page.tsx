"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function UltimatePcFittedRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [message, setMessage] = useState("冒険の準備が整った！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  // クイズ生成
  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 30) + 5;
      const op = Math.random() > 0.5 ? '+' : '-';
      setQuiz({ q: `${a} ${op} ${b} = ?`, a: (op === '+' ? a + b : a - b).toString() });
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
      setPoints(p => p + 25);
      setMonsterHP(p => Math.max(0, p - 10)); // 正解でも少しダメージ
      setMessage("✨ 正解！ パワーがみなぎる！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ おっと、計算ちがいだ！ ❌");
    }
  };

  // 攻撃
  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;

    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);

    const dmg = (isSpecial ? 150 : 40) + (weapon.power * playerLv);
    setMonsterHP(p => Math.max(0, p - dmg));
    setPoints(p => p - cost);
    setMessage(`${weapon.img}${weapon.name}の攻撃！ ${dmg}ダメージ！`);
  };

  // ガチャ
  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const newW = weaponList[Math.floor(Math.random() * weaponList.length)];
    setWeapon(newW);
    setShowGacha(true);
    setTimeout(() => setShowGacha(false), 2000);
  };

  // 撃破判定
  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setMessage("🎊 モンスターを倒した！ レベルアップ！ 🎊");
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  return (
    /* 【最強の中央配置】 画面の高さ一杯を使い、上下左右の真ん中に子要素を置く */
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-6 overflow-hidden text-slate-100 font-sans">
      
      {/* メインコンテナ：PCで最適なサイズ感に固定 */}
      <div className="w-full max-w-[1000px] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* --- ステータスバー --- */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/80 border-2 border-indigo-500 rounded-3xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <p className="text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-1">Hero Level</p>
            <p className="text-2xl font-black italic">勇者マナホ LV.{playerLv}</p>
          </div>
          <div className="bg-slate-900/80 border-2 border-amber-500 rounded-3xl p-4 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-center">
            <p className="text-amber-500 text-[10px] font-black tracking-widest uppercase mb-1">Energy Points</p>
            <p className="text-3xl font-black text-amber-50">{points} <span className="text-sm">PT</span></p>
          </div>
          <div className="bg-slate-900/80 border-2 border-emerald-500 rounded-3xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="flex items-center gap-3">
              <span className="text-4xl filter drop-shadow-md">{weapon.img}</span>
              <div>
                <p className="text-emerald-500 text-[10px] font-black uppercase">Equipment</p>
                <p className="font-bold text-sm leading-tight">{weapon.name}</p>
              </div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 text-[10px] font-black px-3 py-2 rounded-xl transition-all active:scale-90">ガチャ(100)</button>
          </div>
        </div>

        {/* --- バトルメイン画面 --- */}
        <div className={`relative h-[450px] bg-gradient-to-b ${monster.color} rounded-[3rem] border-4 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 ${isAttacking ? 'scale-95 brightness-150' : ''}`}>
          
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          {/* 巨大モンスター */}
          <div className={`text-[220px] select-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 ${monster.scale || 'scale-100'} ${isAttacking ? 'animate-bounce' : 'animate-pulse'}`}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>

          {/* モンスターHPバー */}
          <div className="absolute bottom-10 w-4/5 bg-black/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/20">
            <div className="flex justify-between items-end mb-2">
              <span className="text-white font-black text-lg tracking-widest uppercase drop-shadow-md">{monster.name}</span>
              <span className="text-white font-mono font-black text-2xl">HP {monsterHP} / {monsterList[monsterIdx].hp}</span>
            </div>
            <div className="w-full bg-slate-800 h-6 rounded-full p-1 shadow-inner">
              <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                   style={{ width: `${(monsterHP / monsterList[monsterIdx].hp) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* --- 下段：コントロールセンター --- */}
        <div className="grid grid-cols-5 gap-6">
          
          {/* クイズエリア (3/5カラム) */}
          <div className="col-span-3 bg-white rounded-[2.5rem] p-6 shadow-2xl flex flex-col justify-center">
            <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase text-center mb-2 italic underline decoration-indigo-200 decoration-4">Answer to Charge Energy</p>
            <div className="text-center mb-4">
              <h2 className="text-6xl font-black text-slate-800 tracking-tighter">{quiz.q}</h2>
            </div>
            <form onSubmit={handleAnswer} className="flex gap-3">
              <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                className="flex-1 bg-slate-100 p-5 rounded-3xl text-4xl font-black text-slate-800 border-4 border-transparent focus:border-indigo-500 outline-none text-center shadow-inner" placeholder="?" />
              <button className="bg-indigo-600 text-white px-8 rounded-3xl font-black text-2xl shadow-[0_8px_0_rgb(49,46,129)] active:translate-y-2 active:shadow-none transition-all">OK</button>
            </form>
          </div>

          {/* コマンドエリア (2/5カラム) */}
          <div className="col-span-2 grid grid-cols-1 gap-4">
            <button onClick={() => attack(false)} disabled={points < 25} 
              className="bg-slate-800 hover:bg-slate-700 border-b-8 border-black rounded-3xl flex items-center justify-between px-8 transition-all active:translate-y-2 active:border-b-0 disabled:opacity-20 group">
              <div className="text-left">
                <span className="block font-black text-white text-xl uppercase italic">Attack</span>
                <span className="block text-slate-400 text-[10px] font-bold">COST: 25 PT</span>
              </div>
              <span className="text-4xl group-hover:scale-125 transition-transform">⚔️</span>
            </button>
            <button onClick={() => attack(true)} disabled={points < 60} 
              className="bg-gradient-to-br from-rose-500 to-red-700 border-b-8 border-red-950 rounded-3xl flex items-center justify-between px-8 shadow-xl transition-all active:translate-y-2 active:border-b-0 disabled:opacity-20 group relative overflow-hidden">
              <div className="text-left relative z-10">
                <span className="block font-black text-white text-xl uppercase italic tracking-tighter">Special Art</span>
                <span className="block text-rose-200 text-[10px] font-bold">COST: 60 PT</span>
              </div>
              <span className="text-4xl group-hover:rotate-12 transition-transform relative z-10">🔥</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 -skew-x-12"></div>
            </button>
          </div>
        </div>

        {/* メッセージ表示 */}
        <div className="text-center py-2">
          <p className="text-cyan-400 font-black text-xs tracking-[0.4em] uppercase animate-pulse">{message}</p>
        </div>
      </div>

      {/* ガチャ演出 */}
      {showGacha && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
          <div className="text-[180px] mb-8 animate-bounce filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">🎁</div>
          <h2 className="text-white text-4xl font-black italic mb-6 tracking-tighter">EQUIPMENT UNLOCKED!</h2>
          <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_0_100px_rgba(255,255,255,0.2)] scale-125">
            <div className="text-[120px] mb-4">{weapon.img}</div>
            <p className="text-slate-900 text-4xl font-black mb-1 tracking-tighter">{weapon.name}</p>
            <p className="text-pink-600 font-black text-2xl italic">POWER +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
