"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function ShinCompleteRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [message, setMessage] = useState("冒険が はじまった！");
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
      setQuiz({ q: selected?.q || "1 + 1 = ?", a: selected?.a || "2" });
    }
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  // 答え合わせ
  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      setPoints(p => p + 25);
      setMonsterHP(p => Math.max(0, p - 5)); 
      setMessage("✨ せいかい！ パワーが たまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もういちど かんがえよう ❌");
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
    setMessage(`${weapon.name}で ${dmg} ダメージ！`);
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

  const monster = monsterList[monsterIdx];

  // Tailwindが効かない時用のインラインスタイル（保険）
  const containerStyle = {
    backgroundColor: '#020617',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={containerStyle}>
      <div className="w-full max-w-[900px] flex flex-col gap-6" style={{ width: '100%', maxWidth: '900px' }}>
        
        {/* ステータスバー */}
        <div className="grid grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div className="bg-slate-900 border-2 border-indigo-500 p-4 rounded-3xl text-white" style={{ backgroundColor: '#0f172a', border: '2px solid #6366f1', borderRadius: '24px', padding: '16px' }}>
            <p style={{ color: '#818cf8', fontSize: '10px', fontWeight: 'bold' }}>HERO LEVEL</p>
            <p style={{ fontSize: '20px', fontWeight: '900' }}>LV. {playerLv}</p>
          </div>
          <div className="bg-slate-900 border-2 border-amber-500 p-4 rounded-3xl text-center text-white" style={{ backgroundColor: '#0f172a', border: '2px solid #f59e0b', borderRadius: '24px', padding: '16px' }}>
            <p style={{ color: '#fbbf24', fontSize: '10px', fontWeight: 'bold' }}>POINTS</p>
            <p style={{ fontSize: '24px', fontWeight: '900' }}>{points} PT</p>
          </div>
          <div className="bg-slate-900 border-2 border-emerald-500 p-4 rounded-3xl flex items-center justify-between text-white" style={{ backgroundColor: '#0f172a', border: '2px solid #10b981', borderRadius: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#10b981', fontSize: '10px', fontWeight: 'bold' }}>WEAPON</p>
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{weapon.img}{weapon.name}</p>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ backgroundColor: '#10b981', color: 'white', fontSize: '10px', padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.3 : 1 }}>ガチャ(100)</button>
          </div>
        </div>

        {/* モンスター表示 */}
        <div className={`h-[400px] rounded-[3rem] border-4 border-white/10 flex items-center justify-center relative overflow-hidden`} style={{ height: '400px', borderRadius: '48px', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'linear-gradient(to bottom, #1e1b4b, #020617)' }}>
          <div style={{ fontSize: '180px', transition: '0.3s', transform: isAttacking ? 'scale(1.2)' : 'scale(1)', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))' }}>
            {monsterHP > 0 ? monster.img : '✨'}
          </div>
          
          <div style={{ position: 'absolute', bottom: '30px', width: '80%', backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP} / {monster.hp}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#334155', height: '16px', borderRadius: '8px' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, backgroundColor: '#ef4444', height: '100%', borderRadius: '8px', transition: '1s shadow 0.5s' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア */}
        <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', fontWeight: 'black', letterSpacing: '2px', marginBottom: '10px' }}>ANSWER TO CHARGE ENERGY</p>
          <h2 style={{ textAlign: 'center', fontSize: '60px', fontWeight: '900', color: '#1e293b', margin: '10px 0' }}>{quiz.q}</h2>
          <form onSubmit={handleAnswer} style={{ display: 'flex', gap: '12px' }}>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} style={{ flex: 1, height: '80px', backgroundColor: '#f1f5f9', borderRadius: '20px', border: '4px solid transparent', fontSize: '40px', fontWeight: '900', textAlign: 'center', outline: 'none' }} placeholder="?" />
            <button style={{ padding: '0 40px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '20px', border: 'none', fontSize: '24px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 0 #3730a3' }}>OK</button>
          </form>
        </div>

        {/* コマンド */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <button onClick={() => attack(false)} disabled={points < 25} style={{ height: '100px', backgroundColor: '#1e293b', border: 'none', borderBottom: '8px solid #000', borderRadius: '24px', color: 'white', fontSize: '24px', fontWeight: '900', cursor: 'pointer', opacity: points < 25 ? 0.3 : 1 }}>⚔️ こうげき (25)</button>
          <button onClick={() => attack(true)} disabled={points < 60} style={{ height: '100px', background: 'linear-gradient(to bottom, #f43f5e, #be123c)', border: 'none', borderBottom: '8px solid #4c0519', borderRadius: '24px', color: 'white', fontSize: '24px', fontWeight: '900', cursor: 'pointer', opacity: points < 60 ? 0.3 : 1 }}>🔥 ひっさつ (60)</button>
        </div>

        <p style={{ textAlign: 'center', color: '#22d3ee', fontWeight: 'bold', fontSize: '12px', letterSpacing: '4px', marginTop: '10px' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {showGacha && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ fontSize: '150px', marginBottom: '20px' }}>🎁</div>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '20px' }}>NEW WEAPON!</h2>
          <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>{weapon.img}</div>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b' }}>{weapon.name}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#db2777' }}>POWER +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
