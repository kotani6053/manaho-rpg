"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, gachaTable } from '../data/gameData';

export default function FixedLayoutRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState({ name: "ひのきのぼう", power: 5, img: "🪵" });
  const [message, setMessage] = useState("ぼうけん スタート！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [gachaResult, setGachaResult] = useState<any>(null);

  // クイズ生成
  const generateQuiz = () => {
    const randomType = Math.random();
    if (randomType > 0.4) {
      const useThreeNumbers = Math.random() > 0.5;
      if (useThreeNumbers) {
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 15) + 5;
        const c = Math.floor(Math.random() * 10) + 1;
        const op1 = Math.random() > 0.5 ? '+' : '-';
        const op2 = Math.random() > 0.5 ? '+' : '-';
        let ans = op1 === '+' ? a + b : a - b;
        ans = op2 === '+' ? ans + c : ans - c;
        if (ans < 0) return generateQuiz();
        setQuiz({ q: `${a} ${op1} ${b} ${op2} ${c} = ?`, a: ans.toString() });
      } else {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 40) + 5;
        const op = Math.random() > 0.5 ? '+' : '-';
        const ans = op === '+' ? a + b : a - b;
        if (ans < 0) return generateQuiz();
        setQuiz({ q: `${a} ${op} ${b} = ?`, a: ans.toString() });
      }
    } else {
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected?.q || "1 + 1 = ?", a: selected?.a || "2" });
    }
    setInputValue("");
  };

  // セーブ・ロード
  useEffect(() => {
    const savedData = localStorage.getItem('mana-rpg-save-v3');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPoints(parsed.points || 0);
      setPlayerLv(parsed.playerLv || 1);
      setWeapon(parsed.weapon || { name: "ひのきのぼう", power: 5, img: "🪵" });
      const mIdx = parsed.monsterIdx || 0;
      setMonsterIdx(mIdx);
      setMonsterHP(monsterList[mIdx].hp);
    }
    generateQuiz();
  }, []);

  useEffect(() => {
    const dataToSave = { points, playerLv, weapon, monsterIdx };
    localStorage.setItem('mana-rpg-save-v3', JSON.stringify(dataToSave));
  }, [points, playerLv, weapon, monsterIdx]);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      const bonus = quiz.q.split(' ').length > 3 ? 50 : 30;
      setPoints(p => p + bonus);
      setMonsterHP(p => Math.max(0, p - 10)); 
      setMessage(`✨ 正解！ ${bonus}ポイント！ ✨`);
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もう一度！ ❌");
    }
  };

  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 500);
    const dmg = (isSpecial ? 250 : 60) + (weapon.power * playerLv);
    setMonsterHP(p => Math.max(0, p - dmg));
    setPoints(p => p - cost);
    setMessage(`${weapon.name}！ ${dmg}ダメージ！`);
  };

  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    const totalWeight = gachaTable.reduce((s, i) => s + i.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedItem = gachaTable[0];
    for (const item of gachaTable) {
      if (random < item.weight) { selectedItem = item; break; }
      random -= item.weight;
    }
    if (!selectedItem.isHazure) setWeapon(selectedItem);
    setGachaResult(selectedItem);
    setTimeout(() => setGachaResult(null), 3000);
  };

  useEffect(() => {
    if (monsterHP <= 0) {
      const currentMonster = monsterList[monsterIdx];
      if (currentMonster.isRare) setPoints(p => p + 800);
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${currentMonster.name}を たおした！ 🎊`);
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ステータスバー */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '2px solid #6366f1', borderRadius: '15px', padding: '10px', color: 'white' }}>
            <div style={{ color: '#818cf8', fontSize: '10px', fontWeight: 'bold' }}>レベル</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>Lv.{playerLv}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '2px solid #f59e0b', borderRadius: '15px', padding: '10px', color: 'white', textAlign: 'center' }}>
            <div style={{ color: '#fbbf24', fontSize: '10px', fontWeight: 'bold' }}>ポイント</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>{points}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '2px solid #10b981', borderRadius: '15px', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#10b981', fontSize: '10px', fontWeight: 'bold' }}>ぶき</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{weapon.img}{weapon.name}</div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', fontSize: '10px', padding: '5px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.4 : 1, flexShrink: 0, marginLeft: '5px' }}>ガチャ</button>
          </div>
        </div>

        {/* モンスターエリア */}
        <div style={{ height: '300px', borderRadius: '30px', border: monster.isRare ? '5px solid #facc15' : '3px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: `linear-gradient(to bottom, #1e1b4b, #020617)`, overflow: 'hidden' }}>
          {monster.isRare && <div style={{ position: 'absolute', top: '10px', backgroundColor: '#facc15', color: '#000', padding: '2px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 }}>レア出現！</div>}
          <div style={{ fontSize: '120px', transform: isAttacking ? 'scale(1.2)' : 'scale(1)', transition: '0.2s' }}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          <div style={{ position: 'absolute', bottom: '15px', width: '90%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '12px', borderRadius: '20px', border: '1px solid white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#475569', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, backgroundColor: monster.isRare ? '#fbbf24' : '#ff4d4d', height: '100%', transition: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア (修正ポイント) */}
        <div style={{ backgroundColor: 'white', borderRadius: '30px', padding: '20px', boxShadow: '0 10px 0 #cbd5e1', border: '3px solid #1e293b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '40px', fontWeight: '900', color: '#0f172a', margin: '10px 0', wordBreak: 'break-all' }}>{quiz.q}</h2>
          <form onSubmit={handleAnswer} style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e)=>setInputValue(e.target.value)} 
              style={{ 
                flex: '2', 
                height: '60px', 
                backgroundColor: '#f8fafc', 
                borderRadius: '15px', 
                border: '2px solid #e2e8f0', 
                fontSize: '28px', 
                fontWeight: '900', 
                textAlign: 'center', 
                color: '#1e293b',
                minWidth: '0' // はみ出し防止
              }} 
              placeholder="?" 
            />
            <button style={{ 
              flex: '1', 
              backgroundColor: '#4f46e5', 
              color: 'white', 
              borderRadius: '15px', 
              border: 'none', 
              fontSize: '20px', 
              fontWeight: '900', 
              cursor: 'pointer', 
              boxShadow: '0 4px 0 #312e81',
              whiteSpace: 'nowrap' // 文字の折り返し防止
            }}>OK!</button>
          </form>
        </div>

        {/* ボタンエリア */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => attack(false)} disabled={points < 25} style={{ height: '70px', backgroundColor: '#334155', border: 'none', borderBottom: '5px solid #0f172a', borderRadius: '20px', color: 'white', fontSize: '18px', fontWeight: '900', cursor: 'pointer', opacity: points < 25 ? 0.3 : 1 }}>⚔️ こうげき</button>
          <button onClick={() => attack(true)} disabled={points < 60} style={{ height: '70px', background: 'linear-gradient(to bottom, #e11d48, #9f1239)', border: 'none', borderBottom: '5px solid #4c0519', borderRadius: '20px', color: 'white', fontSize: '18px', fontWeight: '900', cursor: 'pointer', opacity: points < 60 ? 0.3 : 1 }}>🔥 ひっさつ</button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#22d3ee', fontWeight: '900', fontSize: '14px', margin: '0' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {gachaResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '20px', textAlign: 'center' }}>
            {gachaResult.isHazure ? "ハズレちゃった..." : "武器をゲット！"}
          </div>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '40px', textAlign: 'center', width: '100%', maxWidth: '300px' }}>
            <div style={{ fontSize: '80px' }}>{gachaResult.img}</div>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{gachaResult.name}</p>
            {!gachaResult.isHazure && <p style={{ fontSize: '18px', fontWeight: '900', color: '#db2777' }}>パワー +{gachaResult.power}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
