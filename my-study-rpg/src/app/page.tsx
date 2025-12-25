"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function VisibilityHighRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [message, setMessage] = useState("ぼうけん スタート！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const a = Math.floor(Math.random() * 80) + 10;
      const b = Math.floor(Math.random() * 70) + 5;
      const op = Math.random() > 0.5 ? '+' : '-';
      const ans = op === '+' ? a + b : a - b;
      setQuiz({ q: `${a} ${op} ${b} = ?`, a: ans.toString() });
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected?.q || "1 + 1 = ?", a: selected?.a || "2" });
    }
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      setPoints(p => p + 30);
      setMonsterHP(p => Math.max(0, p - 10)); 
      setMessage("✨ せいかい！ パワーを ためた！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ よくみて かこう ❌");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);
    const dmg = (isSpecial ? 200 : 50) + (weapon.power * playerLv);
    setMonsterHP(p => Math.max(0, p - dmg));
    setPoints(p => p - cost);
    setMessage(`${weapon.name}！ ${dmg}ダメージ！`);
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
      setMessage("🎊 モンスターを たおした！ レベルアップ！ 🎊");
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ステータスバー（文字を白、背景を濃い青にしてコントラストを最大化） */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '15px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #6366f1', borderRadius: '20px', padding: '15px', color: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            <div style={{ color: '#818cf8', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>PLAYER LV</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>LV. {playerLv}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #f59e0b', borderRadius: '20px', padding: '15px', color: 'white', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            <div style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>ENERGY</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{points} PT</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #10b981', borderRadius: '20px', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            <div>
              <div style={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}>EQUIP</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{weapon.img}{weapon.name}</div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', padding: '10px 15px', borderRadius: '12px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.3 : 1 }}>ガチャ</button>
          </div>
        </div>

        {/* モンスターエリア（巨大化 & HP数値を白文字で強調） */}
        <div style={{ height: '420px', borderRadius: '40px', border: '5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: `linear-gradient(to bottom, #1e1b4b, #020617)`, boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
          <div style={{ fontSize: '200px', transform: isAttacking ? 'scale(1.3) rotate(10deg)' : 'scale(1)', transition: '0.2s', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          <div style={{ position: 'absolute', bottom: '25px', width: '85%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '30px', border: '2px solid white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: '900', fontSize: '20px', marginBottom: '10px', textShadow: '2px 2px 0 black' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP} / {monster.hp}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#475569', height: '24px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #1e293b' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, backgroundColor: '#ff4d4d', height: '100%', transition: '0.5s ease-out' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア（白背景に黒文字で絶対に見やすく！） */}
        <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '35px', boxShadow: '0 15px 0 #cbd5e1, 0 25px 50px rgba(0,0,0,0.5)', border: '4px solid #1e293b' }}>
          <div style={{ textAlign: 'center', color: '#64748b', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>▼ もんだいを といて こうげき パワーを ためよう！</div>
          <h2 style={{ textAlign: 'center', fontSize: '72px', fontWeight: '900', color: '#0f172a', margin: '15px 0', lineHeight: '1' }}>{quiz.q}</h2>
          <form onSubmit={handleAnswer} style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} style={{ flex: 1, height: '90px', backgroundColor: '#f8fafc', borderRadius: '25px', border: '4px solid #e2e8f0', fontSize: '48px', fontWeight: '900', textAlign: 'center', color: '#1e293b' }} placeholder="?" autoFocus />
            <button style={{ padding: '0 50px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '25px', border: 'none', fontSize: '32px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 0 #312e81' }}>OK</button>
          </form>
        </div>

        {/* ボタンエリア */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <button onClick={() => attack(false)} disabled={points < 25} style={{ height: '110px', backgroundColor: '#334155', border: 'none', borderBottom: '10px solid #0f172a', borderRadius: '30px', color: 'white', fontSize: '28px', fontWeight: '900', cursor: 'pointer', opacity: points < 25 ? 0.3 : 1, transition: '0.1s' }}>⚔️ こうげき (25pt)</button>
          <button onClick={() => attack(true)} disabled={points < 60} style={{ height: '110px', background: 'linear-gradient(to bottom, #e11d48, #9f1239)', border: 'none', borderBottom: '10px solid #4c0519', borderRadius: '30px', color: 'white', fontSize: '28px', fontWeight: '900', cursor: 'pointer', opacity: points < 60 ? 0.3 : 1, textShadow: '2px 2px 0 black' }}>🔥 ひっさつ (60pt)</button>
        </div>

        <p style={{ textAlign: 'center', color: '#22d3ee', fontWeight: '900', fontSize: '16px', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {showGacha && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ fontSize: '180px', marginBottom: '20px', animation: 'bounce 1s infinite' }}>🎁</div>
          <h2 style={{ color: 'white', fontSize: '40px', fontWeight: '900', marginBottom: '30px', textShadow: '0 0 20px #6366f1' }}>NEW WEAPON!</h2>
          <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '70px', textAlign: 'center', border: '10px solid #6366f1' }}>
            <div style={{ fontSize: '120px' }}>{weapon.img}</div>
            <p style={{ fontSize: '40px', fontWeight: '900', color: '#1e293b' }}>{weapon.name}</p>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#db2777' }}>こうげきりょく +{weapon.power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
