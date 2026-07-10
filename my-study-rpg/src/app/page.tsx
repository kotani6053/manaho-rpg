"use client";
import React, { useState, useEffect } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

import BattleScene from '../components/BattleScene';
import Quiz from '../components/Quiz';
import ActionPanel from '../components/ActionPanel';

export default function Page() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(5); // 初期Lvを画像に合わせて5に
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
    if (window.confirm("さいしょから ぼうけんを やりなおしますか？")) {
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
      setPlayerLv(p.playerLv || 5);
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
      setIsAttacking(true);
      setTimeout(() => setIsAttacking(false), 500);
      setMonsterHP(hp => Math.max(0, hp - (10 + playerLv * 2)));
      setMessage("✨ すばらしい！ せいかいだ！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ おしい！ もういちど かんがえてみよう！ ❌");
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
    setMessage(`⚔️ ${weapon.name}の ひっさつこうげき！ ${dmg}ダメージ！`);
  };

  useEffect(() => {
    if (monsterHP === 0) {
      const current = monsterList[monsterIdx];
      let bonusMsg = "";
      if (current.isRare) {
        setPoints(p => p + 300);
        bonusMsg = " ＋スペシャルボーナス！";
      }
      setPlayerLv(l => l + 1);
      setMessage(`🎊 プレミアム！ ${current.name}を つかまえた！${bonusMsg} 🎊`);
      const timer = setTimeout(() => {
        const nextIdx = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(nextIdx);
        setMonsterHP(monsterList[nextIdx].hp);
        setMessage(`あっ！ ${monsterList[nextIdx].name}が とびだしてきた！`);
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
    // 🌟 全体の背景を『ことだまモンスター』風の明るく楽しいスカイブルー＆マップ背景風に
    <div className="min-h-screen bg-gradient-to-tr from-[#e0f2fe] via-[#fef08a]/30 to-[#e0f2fe] flex items-center justify-center p-8 antialiased">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* ================= 左カラム：ステータス ＆ バトル画面 ================= */}
        <div className="flex flex-col gap-6">
          
          {/* 👑 ことだまモンスター風・極太ポップヘッダー */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* ゆうしゃ枠 */}
            <div className="bg-[#4fbbf6] border-[4px] border-[#222222] rounded-2xl p-3 shadow-[0_6px_0_#222222] flex flex-col justify-between items-center text-white">
              <span className="text-[11px] font-black tracking-widest bg-[#1e3a8a]/30 px-2 py-0.5 rounded-full">YUSHA</span>
              <span className="text-2xl font-black filter drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">Lv.{playerLv}</span>
              <button onClick={resetGame} className="mt-1.5 bg-[#ef4444] text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-[#222222] shadow-[0_3px_0_#222222] active:translate-y-0.5 active:shadow-none transition-all">やりなおす</button>
            </div>
            
            {/* コイン・ポイント枠 */}
            <div className="bg-[#ffcb2b] border-[4px] border-[#222222] rounded-2xl p-3 shadow-[0_6px_0_#222222] flex flex-col justify-center items-center text-[#451a03]">
              <span className="text-[11px] font-black tracking-widest bg-[#b45309]/20 px-2 py-0.5 rounded-full">COIN</span>
              <span className="text-2xl font-black font-mono mt-1 flex items-center gap-1">
                🪙{points} <span className="text-xs font-black">pt</span>
              </span>
            </div>

            {/* 武器・ガチャ枠 */}
            <div className="bg-[#a3e635] border-[4px] border-[#222222] rounded-2xl p-3 shadow-[0_6px_0_#222222] flex flex-col justify-between items-center text-slate-900">
              <span className="text-[11px] font-black tracking-widest bg-[#3f6212]/20 px-2 py-0.5 rounded-full truncate w-full">{weapon.img}{weapon.name}</span>
              <button 
                onClick={drawGacha} 
                disabled={points < 100} 
                className="w-full mt-1.5 bg-[#f97316] disabled:bg-slate-300 border-[3px] border-[#222222] text-white disabled:text-slate-500 font-black text-xs py-1.5 rounded-xl shadow-[0_4px_0_#222222] disabled:shadow-none hover:bg-[#ea580c] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                ガチャ 🎪
              </button>
            </div>
          </div>

          {/* 👾 バトルフィールド */}
          <BattleScene 
            monster={monster} 
            monsterHP={monsterHP} 
            isAttacking={isAttacking} 
            isTakingDamage={isTakingDamage} 
          />
        </div>

        {/* ================= 右カラム：クイズ ＆ 操作・ログパネル ================= */}
        <div className="flex flex-col gap-6 justify-between">
          
          {/* 💬 ナレーション・メッセージログ（吹き出し風） */}
          <div className="bg-white border-[4px] border-[#222222] rounded-2xl p-4 text-center shadow-[0_6px_0_#222222] relative">
            <p className="text-[#1e3a8a] font-black text-base tracking-wide">{message}</p>
          </div>

          {/* 📝 クイズエリア */}
          <div className="flex-1 flex flex-col justify-stretch">
            <Quiz 
              quiz={quiz} 
              inputValue={inputValue} 
              setInputValue={setInputValue} 
              onCheckAnswer={checkAnswer} 
            />
          </div>

          {/* ⚔️ コマンドアクションパネル */}
          <ActionPanel 
            points={points} 
            monsterHP={monsterHP} 
            onAttack={attack} 
          />
        </div>

      </div>

      {/* 🎪 超ポップなガチャリザルト演出 */}
      {gachaResult && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white border-[8px] border-[#222222] p-8 rounded-[2.5rem] text-center max-w-sm w-full shadow-[0_16px_0_#111111] transform scale-100 transition-transform">
            <span className="text-sm font-black text-amber-500 block mb-1 tracking-widest animate-pulse">✨ GACHA GET !! ✨</span>
            <div className="text-xs font-black text-white bg-[#4fbbf6] py-1 px-4 rounded-full border-2 border-[#222222] inline-block shadow-[0_3px_0_#222222]">
              {gachaResult.isHazure ? "ざんねんアイテム..." : "おめでとう！新しいぶき！"}
            </div>
            <div className="text-9xl my-6 animate-bounce select-none filter drop-shadow-[0_10px_0_rgba(0,0,0,0.1)]">{gachaResult.img}</div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{gachaResult.name}</h3>
            {!gachaResult.isHazure && <div className="mt-2 text-[#ef4444] font-black text-xl">こうげきりょく +{gachaResult.power}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
