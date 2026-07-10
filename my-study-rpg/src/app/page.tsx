"use client";
import React, { useState, useEffect } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

// 🚨 ここで新しく作ったコンポーネントを呼び出す必要があります！
// （もし既存の page.tsx 内に直接古いモンスター表示やボタンのタグが残っているなら、それらをこれに置き換えます）

export default function Page() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState({ name: "ひのきのぼう", power: 5, img: "🪵" });
  const [message, setMessage] = useState("ぼうけんが はじまった！");
  const [quiz, setQuiz] = useState<any>({ q: "", a: "", type: "math" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingDamage, setIsTakingDamage] = useState(false);
  const [gachaResult, setGachaResult] = useState<any>(null);

  // ゲームの初期化やクイズ生成ロジック（省略せずに以前のものをそのまま残す）
  const resetGame = () => {
    if (window.confirm("さいしょから やりなおしますか？")) {
      localStorage.removeItem('mana-rpg-vFinal-Ultra-Safe');
      window.location.reload();
    }
  };

  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const a = Math.floor(Math.random() * 20) + 10;
      const b = Math.floor(Math.random() * 10) + 1;
      const op = Math.random() > 0.5 ? '+' : '-';
      setQuiz({ q: `${a} ${op} ${b} = ?`, a: op === '+' ? (a+b).toString() : (a-b).toString(), type: "math" });
    } else {
      const qData = kotobaData[Math.floor(Math.random() * kotobaData.length)];
      setQuiz({ ...qData, type: "word" });
    }
    setInputValue("");
  };

  useEffect(() => {
    const saved = localStorage.getItem('mana-rpg-vFinal-Ultra-Safe');
    if (saved) {
      const p = JSON.parse(saved);
      setPoints(p.points || 0);
      setPlayerLv(p.playerLv || 1);
      setWeapon(p.weapon || { name: "ひのきのぼう", power: 5, img: "🪵" });
      setMonsterIdx(p.monsterIdx || 0);
      setMonsterHP(monsterList[p.monsterIdx || 0].hp);
    }
    generateQuiz();
  }, []);

  useEffect(() => {
    localStorage.setItem('mana-rpg-vFinal-Ultra-Safe', JSON.stringify({ points, playerLv, weapon, monsterIdx }));
  }, [points, playerLv, weapon, monsterIdx]);

  const checkAnswer = (val: string) => {
    if (val === quiz.a) {
      setPoints(p => p + 35);
      setIsTakingDamage(true);
      setTimeout(() => setIsTakingDamage(false), 500);
      setMonsterHP(hp => Math.max(0, hp - (10 + playerLv * 2)));
      setMessage("✨ せいかい！ パワーが たまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もういちど えらぼう ❌");
      setInputValue("");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    
    setIsAttacking(true);
    setIsTakingDamage(true);
    setTimeout(() => {
      setIsAttacking(false);
      setIsTakingDamage(false);
    }, 500);

    const baseDmg = isSpecial ? 150 : 50;
    const weaponBonus = weapon.power * (1 + playerLv * 0.12);
    const dmg = Math.floor(baseDmg + weaponBonus);

    setPoints(p => p - cost);
    setMonsterHP(hp => Math.max(0, hp - dmg));
    setMessage(`${weapon.name}で こうげき！ ${dmg}ダメージ！`);
  };

  useEffect(() => {
    if (monsterHP === 0) {
      const current = monsterList[monsterIdx];
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${current.name}を たおした！ 🎊`);
      const timer = setTimeout(() => {
        const nextIdx = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(nextIdx);
        setMonsterHP(monsterList[nextIdx].hp);
        setMessage(`${monsterList[nextIdx].name}が あらわれた！`);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [monsterHP, monsterIdx]);

  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const totalWeight = gachaTable.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * totalWeight;
    let selected = gachaTable[0];
    for (const item of gachaTable) {
      if (r < item.weight) { selected = item; break; }
      r -= item.weight;
    }
    if (!selected.isHazure && selected.power > weapon.power) setWeapon(selected);
    setGachaResult(selected);
    setTimeout(() => setGachaResult(null), 2500);
  };

  const monster = monsterList[monsterIdx];
  const hpPercentage = Math.max(0, Math.min(100, (monsterHP / monster.hp) * 100));
  const hpBarColor = hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 20 ? 'bg-amber-400' : 'bg-rose-600';

  // ⭐️ 画面の見た目部分（HTML/Tailwind）
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md flex flex-col gap-4">
        
        {/* 1. ステータスヘッダー */}
        <div className="grid grid-cols-3 gap-2 text-center text-gray-950 font-bold">
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-between items-center">
            <span className="text-[10px] text-gray-500 uppercase">Trainer</span>
            <span className="text-xl font-black">Lv.{playerLv}</span>
            <button onClick={resetGame} className="mt-1 bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded border border-rose-800">リセット</button>
          </div>
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-center items-center">
            <span className="text-[10px] text-gray-500 uppercase">Points</span>
            <span className="text-xl font-black text-amber-600 font-mono">{points} <span className="text-xs text-gray-700">pt</span></span>
          </div>
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-between items-center overflow-hidden">
            <span className="text-[10px] text-gray-500 tracking-wider truncate w-full">{weapon.img}{weapon.name}</span>
            <button onClick={drawGacha} disabled={points < 100} className="w-full mt-1 bg-amber-500 disabled:bg-gray-300 border-2 border-amber-700 text-white font-black text-xs py-1 rounded shadow-md disabled:opacity-50">ガチャ (100)</button>
          </div>
        </div>

        {/* 2. ポケモン風バトルフィールド */}
        <div className={`h-64 rounded-2xl border-4 ${monster.isRare ? 'border-amber-400 shadow-[0_0_20px_#f59e0b]' : 'border-[#c0c0b8]'} bg-gradient-to-b from-sky-200 to-emerald-100 flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-inner`}>
          <div className="flex-1 flex items-center justify-center relative w-full">
            <div className={`text-8xl transition-all duration-100 relative z-10
              ${monsterHP > 0 ? 'scale-100 opacity-100' : 'scale-150 opacity-0 duration-700'}
              ${isAttacking ? 'animate-bounce' : ''}
              ${isTakingDamage ? 'animate-pulse bg-red-500/20 rounded-full' : ''}
            `}>
              {monsterHP > 0 ? monster.img : '💥'}
            </div>
            {monsterHP > 0 && <div className="absolute bottom-4 w-24 h-3 bg-emerald-900/10 rounded-full blur-[1px]"></div>}
          </div>

          <div className="w-full bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-tl-xl rounded-br-xl p-3 shadow-[-3px_3px_0_0_#c0c0b8] relative z-20">
            <div className="flex justify-between items-end mb-1 text-gray-950 font-bold">
              <span className="text-base font-black truncate">{monster.name}</span>
              <span className="text-xs font-mono text-gray-600">HP {monsterHP} / {monster.hp}</span>
            </div>
            <div className="w-full bg-[#c0c0b8] rounded-full h-5 border-2 border-[#888880] p-[1px] flex items-center relative">
              <span className="absolute left-1.5 text-[9px] font-bold text-slate-800 z-10">HP</span>
              <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden pl-5 pr-0.5 flex items-center">
                <div className={`h-2.5 ${hpBarColor} rounded-full transition-all duration-300 ease-out`} style={{ width: `${hpPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. テキストログ */}
        <div className="bg-slate-950 border-2 border-slate-800 rounded-xl p-2.5 text-center min-h-[44px] flex items-center justify-center">
          <p className="text-emerald-400 font-bold text-xs">{message}</p>
        </div>

        {/* 4. クイズエリア */}
        <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-2xl p-4 shadow-[-4px_4px_0_0_#c0c0b8] text-gray-950">
          <span className="text-[10px] bg-[#c0c0b8] px-2 py-0.5 rounded font-bold text-gray-700">
            {quiz.type === "math" ? "🔢 さんすうクエスト" : "🔤 ことばクエスト"}
          </span>
          <h2 className="text-center text-3xl font-black my-4 text-slate-900">{quiz.q}</h2>
          {quiz.type === "math" ? (
            <div className="flex flex-col gap-3">
              <div className="text-2xl text-center bg-slate-950 text-emerald-400 rounded-xl h-12 flex items-center justify-center border-2 border-[#c0c0b8] font-mono font-bold">{inputValue || " "}</div>
              <div className="grid grid-cols-3 gap-1.5 font-mono">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
                  <button key={n} onClick={() => setInputValue(v => v + n)} className="h-10 bg-white border-2 border-[#c0c0b8] rounded-lg font-black text-lg shadow hover:bg-gray-100">{n}</button>
                ))}
                <button onClick={() => setInputValue("")} className="h-10 bg-rose-100 border-2 border-rose-300 rounded-lg font-black text-rose-700 shadow">C</button>
                <button onClick={() => checkAnswer(inputValue)} className="h-10 bg-emerald-600 border-2 border-emerald-800 text-white rounded-lg font-black text-sm shadow">OK!</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {quiz.options?.map((opt: string) => (
                <button key={opt} onClick={() => checkAnswer(opt)} className="group relative text-left pl-6 pr-2 py-3 bg-white border-2 border-[#c0c0b8] rounded-xl font-bold text-xs text-slate-800 shadow hover:border-amber-500">
                  <span className="absolute left-2 opacity-0 group-hover:opacity-100 text-amber-600">▶</span>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. コマンドアクションパネル */}
        <div className="bg-[#101010] border-4 border-[#c0c0b8] rounded-2xl p-2.5 grid grid-cols-2 gap-2 shadow-[-4px_4px_0_0_#c0c0b8]">
          <button onClick={() => attack(false)} disabled={points < 25 || monsterHP <= 0} className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-neutral-700 disabled:opacity-30 text-gray-950 p-2.5 rounded-xl border-2 border-transparent hover:border-amber-500 min-h-[76px]">
            <span className="absolute left-1 top-3 text-xs opacity-0 group-hover:opacity-100">▶</span>
            <span className="pl-3 font-black text-sm leading-tight group-disabled:text-neutral-400">つうじょう<br />こうげき</span>
            <span className="w-full text-right text-[10px] font-mono text-gray-500 font-bold">PP 25</span>
          </button>
          <button onClick={() => attack(true)} disabled={points < 60 || monsterHP <= 0} className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-neutral-700 disabled:opacity-30 text-gray-950 p-2.5 rounded-xl border-2 border-transparent hover:border-rose-500 min-h-[76px]">
            <span className="absolute left-1 top-3 text-xs opacity-0 group-hover:opacity-100">▶</span>
            <span className="pl-3 font-black text-sm leading-tight text-rose-900 group-disabled:text-neutral-400">ひっさつ<br />わざ</span>
            <span className="w-full text-right text-[10px] font-mono text-gray-500 font-bold">PP 60</span>
          </button>
        </div>

      </div>

      {/* ガチャポップアップ */}
      {gachaResult && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#f8f8f0] border-8 border-amber-400 p-6 rounded-3xl text-center max-w-xs w-full shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            <span className="text-xs font-bold text-gray-500 block mb-1">Gacha Result</span>
            <div className="text-[11px] font-black text-slate-700 bg-[#c0c0b8] py-1 px-3 rounded-full inline-block">
              {gachaResult.isHazure ? "しんぴの クズひろい..." : gachaResult.power > weapon.power ? "🔥 ぶきを こうしん！" : "🛡️ 今のほうが つよい"}
            </div>
            <div className="text-8xl my-6 animate-bounce">{gachaResult.img}</div>
            <h3 className="text-2xl font-black text-slate-900">{gachaResult.name}</h3>
            {!gachaResult.isHazure && <div className="mt-2 text-rose-600 font-mono font-black text-lg">ATK +{gachaResult.power}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
