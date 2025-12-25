"use client";
import React, { useState, useEffect } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

export default function SmartRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState({ name: "ひのきのぼう", power: 5, img: "🪵" });
  const [message, setMessage] = useState("ぼうけんが はじまった！");
  const [quiz, setQuiz] = useState<any>({ q: "", a: "", type: "math" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [gachaResult, setGachaResult] = useState<any>(null);

  const generateQuiz = () => {
    const isMath = Math.random() > 0.5;
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
    const saved = localStorage.getItem('mana-rpg-v6');
    if (saved) {
      const p = JSON.parse(saved);
      setPoints(p.points); setPlayerLv(p.playerLv); setWeapon(p.weapon); setMonsterIdx(p.monsterIdx);
      setMonsterHP(monsterList[p.monsterIdx].hp);
    }
    generateQuiz();
  }, []);

  useEffect(() => {
    localStorage.setItem('mana-rpg-v6', JSON.stringify({ points, playerLv, weapon, monsterIdx }));
  }, [points, playerLv, weapon, monsterIdx]);

  const checkAnswer = (val: string) => {
    if (val === quiz.a) {
      setPoints(p => p + 30);
      setMonsterHP(hp => Math.max(0, hp - 10));
      setMessage("✨ 正解！パワーがたまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ まちがい！もう一度えらぼう ❌");
      if (quiz.type === 'math') setInputValue("");
    }
  };

  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const total = gachaTable.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * total;
    let selected = gachaTable[0];
    for (const item of gachaTable) { if (r < item.weight) { selected = item; break; } r -= item.weight; }
    if (!selected.isHazure) setWeapon(selected);
    setGachaResult(selected);
    setTimeout(() => setGachaResult(null), 2500);
  };

  const monster = monsterList[monsterIdx];

  return (
    <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ステータス */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div style={{ background: '#022c22', border: '2px solid #34d399', padding: '10px', borderRadius: '15px', color: 'white' }}>
            <div style={{ fontSize: '10px' }}>レベル</div><div>Lv.{playerLv}</div>
          </div>
          <div style={{ background: '#022c22', border: '2px solid #fbbf24', padding: '10px', borderRadius: '15px', color: 'white' }}>
            <div style={{ fontSize: '10px' }}>ポイント</div><div>{points}</div>
          </div>
          <button onClick={drawGacha} disabled={points < 100} style={{ background: '#059669', color: 'white', borderRadius: '15px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.5 : 1 }}>ガチャ(100)</button>
        </div>

        {/* モンスターエリア */}
        <div style={{ height: '220px', background: 'rgba(0,0,0,0.4)', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ fontSize: '80px' }}>{monsterHP > 0 ? monster.img : '💥'}</div>
          <div style={{ width: '80%', background: 'white', padding: '10px', borderRadius: '15px' }}>
            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}><span>{monster.name}</span><span>HP {monsterHP}</span></div>
            <div style={{ width: '100%', background: '#eee', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${(monsterHP/monster.hp)*100}%`, background: '#ef4444', height: '100%' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア (ここが今回の肝!) */}
        <div style={{ background: 'white', borderRadius: '30px', padding: '20px', border: '4px solid #064e3b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px', color: '#064e3b' }}>{quiz.q}</h2>
          
          {quiz.type === "math" ? (
            /* 算数：テンキー入力 */
            <div>
              <div style={{ fontSize: '40px', textAlign: 'center', background: '#f0fdf4', marginBottom: '15px', borderRadius: '10px', height: '60px' }}>{inputValue}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[1,2,3,4,5,6,7,8,9,0].map(n => (
                  <button key={n} onClick={() => setInputValue(v => v + n)} style={{ height: '50px', fontSize: '20px', background: '#e2e8f0', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>{n}</button>
                ))}
                <button onClick={() => setInputValue("")} style={{ background: '#fecaca' }}>消す</button>
                <button onClick={() => checkAnswer(inputValue)} style={{ background: '#34d399', color: 'white' }}>OK!</button>
              </div>
            </div>
          ) : (
            /* 国語：4択ボタン */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {quiz.options.map((opt: string) => (
                <button key={opt} onClick={() => checkAnswer(opt)} style={{ height: '60px', fontSize: '18px', background: '#f0fdf4', border: '2px solid #34d399', borderRadius: '15px', fontWeight: 'bold', color: '#064e3b' }}>{opt}</button>
              ))}
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => { setPoints(p => p - 25); setMonsterHP(h => Math.max(0, h - (60 + weapon.power*playerLv))); }} disabled={points < 25} style={{ height: '60px', background: '#115e59', color: 'white', borderRadius: '20px', border: 'none', fontWeight: 'bold' }}>⚔️ こうげき</button>
          <button onClick={() => { setPoints(p => p - 60); setMonsterHP(h => Math.max(0, h - (250 + weapon.power*playerLv))); }} disabled={points < 60} style={{ height: '60px', background: '#ef4444', color: 'white', borderRadius: '20px', border: 'none', fontWeight: 'bold' }}>🔥 ひっさつ</button>
        </div>
        <p style={{ textAlign: 'center', color: '#d1fae5', fontSize: '14px' }}>{message}</p>
      </div>

      {/* ガチャ結果 */}
      {gachaResult && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px' }}>{gachaResult.img}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{gachaResult.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
