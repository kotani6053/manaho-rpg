"use client";
import React, { useState, useEffect } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

// 📁 新しく作成したレトロパーツをすべて読み込む
import BattleScene from '../components/BattleScene';
import Quiz from '../components/Quiz';
import ActionPanel from '../components/ActionPanel';

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

  const resetGame = () => {
    if (window.confirm("さいしょから やりなおしますか？（ポイントやレベルも 0になります）")) {
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
      let bonusMsg = "";
      if (current.isRare) {
        setPoints(p => p + 600);
        bonusMsg = " ＋レアボーナス！";
      }
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${current.name}を たおした！${bonusMsg} 🎊`);
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

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 antialiased selection:bg-amber-200">
      <div className="w-full max-w-md flex flex-col gap-4">
        
        {/* レトロゲーム風ステータスヘッダー */}
        <div className="grid grid-cols-3 gap-2 text-center text-gray-950 font-bold">
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-between items-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Trainer</span>
            <span className="text-xl font-black">Lv.{playerLv}</span>
            <button onClick={resetGame} className="mt-1 bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded border border-rose-800 hover:bg-rose-500 active:translate-y-0.5 transition-all">リセット</button>
          </div>
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-center items-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Points</span>
            <span className="text-xl font-black text-amber-600 font-mono">{points} <span className="text-xs text-gray-700">pt</span></span>
          </div>
          <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-xl p-2 shadow-[-2px_2px_0_0_#c0c0b8] flex flex-col justify-between items-center overflow-hidden">
            <span className="text-[10px] text-gray-500 tracking-wider truncate w-full">{weapon.img}{weapon.name}</span>
            <button onClick={drawGacha} disabled={points < 100} className="w-full mt-1 bg-amber-500 disabled:bg-gray-300 border-2 border-amber-700 text-white font-black text-xs py-1 rounded shadow-md hover:bg-amber-400 disabled:opacity-50 active:translate-y-0.5 transition-all cursor-pointer">ガチャ (100)</button>
          </div>
        </div>

        {/* 👾 1. バトルフィールド（切り出しコンポーネント） */}
        <BattleScene 
          monster={monster} 
          monsterHP={monsterHP} 
          isAttacking={isAttacking} 
          isTakingDamage={isTakingDamage} 
        />

        {/* 📝 下部テキストログ */}
        <div className="bg-slate-950 border-2 border-slate-800 rounded-xl p-2.5 text-center min-h-[44px] flex items-center justify-center">
          <p className="text-emerald-400 font-bold text-xs tracking-wide">{message}</p>
        </div>

        {/* 📝 2. クイズエリア（切り出しコンポーネント） */}
        <Quiz 
          quiz={quiz} 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          onCheckAnswer={checkAnswer} 
        />

        {/* ⚔️ 3. コマンドアクションパネル（切り出しコンポーネント） */}
        <ActionPanel 
          points={points} 
          monsterHP={monsterHP} 
          onAttack={attack} 
        />

      </div>

      {/* 🎰 ガチャリザルト演出 */}
      {gachaResult && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#f8f8f0] border-8 border-amber-400 p-6 rounded-3xl text-center max-w-xs w-full shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Gacha Result</span>
            <div className="text-[11px] font-black text-slate-700 bg-[#c0c0b8] py-1 px-3 rounded-full inline-block">
              {gachaResult.isHazure ? "しんぴの クズひろい..." : gachaResult.power > weapon.power ? "🔥 ぶきを こうしん！" : "🛡️ 今のほうが つよい"}
            </div>
            <div className="text-8xl my-6 animate-bounce">{gachaResult.img}</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{gachaResult.name}</h3>
            {!gachaResult.isHazure && <div className="mt-2 text-rose-600 font-mono font-black text-lg">ATK +{gachaResult.power}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
