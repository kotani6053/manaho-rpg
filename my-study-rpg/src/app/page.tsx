"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function PcFittedRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [message, setMessage] = useState("モンスターがあらわれた！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);

  const generateQuiz = () => {
    const isMath = Math.random() > 0.5;
    if (isMath) {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 30) + 5;
      setQuiz({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
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
      setMonsterHP(p => Math.max(0, p - 5));
      setMessage("せいかい！ 5ダメージ ＆ 20ポイント！");
      generateQuiz();
    } else {
      setMessage("ざんねん！ もういちど！");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 50 : 20;
    if (points < cost) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);
    const dmg = isSpecial ? 100 : 30 + (playerLv * 5);
    setMonsterHP(p => Math.max(0, p - dmg));
    setPoints(p => p - cost);
    setMessage(`${dmg} の ダメージを あたえた！`);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
        setMessage("つぎの モンスターが あらわれた！");
      }, 1000);
    }
  }, [monsterHP]);

  return (
    /* 画面全体を紺色にし、要素を上下左右の真ん中に配置 */
    <div className="min-h-screen bg-[#0a0a20] flex flex-col items-center justify-center p-4 font-mono">
      
      {/* ゲーム機のモニターのような枠 */}
      <div className="w-full max-w-[900px] bg-slate-900 border-[10px] border-slate-700 rounded-[3rem] p-8 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col gap-6">
        
        {/* ステータスエリア */}
        <div className="flex justify-between bg-black/50 p-4 rounded-2xl border-2 border-slate-700">
          <div className="text-xl font-bold text-blue-400">ゆうしゃ：Lv.{playerLv}</div>
          <div className="text-xl font-bold text-yellow-400">ポイント：{points} PT</div>
          <div className="text-xl font-bold text-emerald-400">そうび：{weapon.img}</div>
        </div>

        {/* バトルエリア（2カラム） */}
        <div className="grid grid-cols-5 gap-6 h-[400px]">
          {/* 左：モンスター表示（巨大） */}
          <div className="col-span-3 bg-gradient-to-b from-indigo-900 to-black rounded-3xl border-4 border-slate-600 flex flex-col items-center justify-center relative overflow-hidden">
            <div className={`text-[180px] transition-transform duration-200 ${isAttacking ? 'scale-125 brightness-200' : 'animate-pulse'}`}>
              {monsterHP > 0 ? monsterList[monsterIdx].img : '💥'}
            </div>
            {/* HPバー */}
            <div className="absolute bottom-6 w-3/4 bg-gray-800 h-8 rounded-full border-2 border-white overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${(monsterHP / monsterList[monsterIdx].hp) * 100}%` }} />
              <div className="absolute inset-0 text-center text-white font-bold leading-7 text-sm">HP {monsterHP} / {monsterList[monsterIdx].hp}</div>
            </div>
          </div>

          {/* 右：メッセージとコマンド */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex-1 bg-black p-4 rounded-2xl border-2 border-slate-700 text-cyan-400 text-lg">
              {message}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => attack(false)} disabled={points < 20} className="h-20 bg-orange-700 hover:bg-orange-600 text-white font-black text-2xl rounded-2xl border-b-8 border-orange-950 active:border-0 active:translate-y-2 disabled:opacity-30 transition-all">
                ⚔️ こうげき (20)
              </button>
              <button onClick={() => attack(true)} disabled={points < 50} className="h-20 bg-purple-700 hover:bg-purple-600 text-white font-black text-2xl rounded-2xl border-b-8 border-purple-950 active:border-0 active:translate-y-2 disabled:opacity-30 transition-all">
                🔥 ひっさつ (50)
              </button>
            </div>
          </div>
        </div>

        {/* クイズエリア（一番下に配置） */}
        <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
          <p className="text-slate-500 font-bold uppercase tracking-widest">もんだいを といて パワーをためろ！</p>
          <div className="text-6xl font-black text-slate-800 mb-2">{quiz.q}</div>
          <form onSubmit={handleAnswer} className="w-full flex gap-4">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} 
              className="flex-1 h-20 bg-slate-100 rounded-2xl text-5xl text-center font-black text-slate-900 border-4 border-slate-200 focus:border-blue-500 outline-none" placeholder="？" />
            <button className="w-40 bg-blue-600 text-white text-3xl font-black rounded-2xl shadow-[0_8px_0_rgb(30,58,138)] active:translate-y-2 active:shadow-none transition-all">OK</button>
          </form>
        </div>

      </div>
    </div>
  );
}
