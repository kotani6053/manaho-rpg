"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, weaponList } from '../data/gameData';

export default function GuaranteedRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState(weaponList[0]);
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    const isMath = Math.random() > 0.5;
    if (isMath) {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 30) + 5;
      setQuiz({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected?.q || "1 + 1 = ?", a: selected?.a || "2" });
    }
  }, [points, monsterIdx]);

  const attack = () => {
    if (points < 20) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);
    setMonsterHP(p => Math.max(0, p - (30 + weapon.power)));
    setPoints(p => p - 20);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      setPlayerLv(l => l + 1);
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1000);
    }
  }, [monsterHP]);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#1e293b', borderRadius: '40px', padding: '40px', border: '8px solid #334155', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold' }}>
          <div style={{ color: '#818cf8' }}>LV. {playerLv} ゆうしゃ</div>
          <div style={{ color: '#fbbf24' }}>{points} PT</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', borderRadius: '30px', padding: '40px', marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '120px', marginBottom: '20px', transform: isAttacking ? 'scale(1.2)' : 'scale(1)', transition: '0.2s' }}>
            {monsterHP > 0 ? monsterList[monsterIdx].img : '💥'}
          </div>
          <div style={{ width: '100%', backgroundColor: '#334155', height: '20px', borderRadius: '10px' }}>
            <div style={{ width: `${(monsterHP / monsterList[monsterIdx].hp) * 100}%`, backgroundColor: '#ef4444', height: '100%', borderRadius: '10px', transition: '0.5s' }} />
          </div>
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{monsterList[monsterIdx].name} HP: {monsterHP}</div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '25px', padding: '30px', color: '#1e293b' }}>
          <div style={{ fontSize: '40px', fontWeight: '900', marginBottom: '20px' }}>{quiz.q}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flex: 1, padding: '15px', fontSize: '30px', textAlign: 'center', borderRadius: '15px', border: '3px solid #cbd5e1' }}
            />
            <button 
              onClick={() => { if(inputValue === quiz.a) { setPoints(p => p + 20); setInputValue(""); } }}
              style={{ padding: '0 40px', fontSize: '24px', fontWeight: 'bold', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '15px', cursor: 'pointer' }}
            >OK</button>
          </div>
        </div>

        <button 
          onClick={attack}
          disabled={points < 20}
          style={{ marginTop: '30px', width: '100%', height: '80px', fontSize: '30px', fontWeight: 'bold', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '20px', borderBottom: '8px solid #9f1239', cursor: 'pointer', opacity: points < 20 ? 0.3 : 1 }}
        >
          ⚔️ こうげき！ (20ptつかう)
        </button>
      </div>
    </div>
  );
}
