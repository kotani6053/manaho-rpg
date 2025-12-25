"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, gachaTable } from '../data/gameData';

export default function ColorfulFantasyRPG() {
  const [points, setPoints] = useState(0);
  const [playerLv, setPlayerLv] = useState(1);
  const [monsterIdx, setMonsterIdx] = useState(0);
  const [monsterHP, setMonsterHP] = useState(monsterList[0].hp);
  const [weapon, setWeapon] = useState({ name: "ひのきのぼう", power: 5, img: "🪵" });
  const [message, setMessage] = useState("ぼうけんが はじまった！");
  const [quiz, setQuiz] = useState({ q: "", a: "" });
  const [inputValue, setInputValue] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [gachaResult, setGachaResult] = useState<any>(null);

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

  useEffect(() => {
    const savedData = localStorage.getItem('mana-rpg-save-v4');
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
    localStorage.setItem('mana-rpg-save-v4', JSON.stringify(dataToSave));
  }, [points, playerLv, weapon, monsterIdx]);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      const bonus = quiz.q.split(' ').length > 3 ? 50 : 30;
      setPoints(p => p + bonus);
      setMonsterHP(p => Math.max(0, p - 10)); 
      setMessage(`✨ せいかい！ ${bonus}ポイント！ ✨`);
      generateQuiz();
    } else {
      setMessage("❌ ざんねん！ もういちど！ ❌");
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
    <div style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 50%, #831843 100%)', // 明るいファンタジーグラデ
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '15px', 
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ステータスバー（透明感のあるデザイン） */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '10px', color: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <div style={{ color: '#a5f3fc', fontSize: '10px', fontWeight: 'bold' }}>レベル</div>
            <div style={{ fontSize: '20px', fontWeight: '900' }}>Lv.{playerLv}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <div style={{ color: '#fef08a', fontSize: '10px', fontWeight: 'bold' }}>ポイント</div>
            <div style={{ fontSize: '20px', fontWeight: '900' }}>{points}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#bbf7d0', fontSize: '10px', fontWeight: 'bold' }}>ぶき</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{weapon.img}{weapon.name}</div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ background: 'linear-gradient(to bottom, #10b981, #059669)', color: 'white', fontWeight: 'bold', fontSize: '10px', padding: '6px 10px', borderRadius: '10px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.4 : 1, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>ガチャ</button>
          </div>
        </div>

        {/* モンスターエリア（光の演出を追加） */}
        <div style={{ 
          height: '320px', 
          borderRadius: '40px', 
          border: monster.isRare ? '6px solid #fbbf24' : '4px solid rgba(255,255,255,0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative', 
          background: 'rgba(0,0,0,0.3)',
          boxShadow: monster.isRare ? '0 0 30px rgba(251,191,36,0.5)' : 'inset 0 0 50px rgba(0,0,0,0.3)',
          overflow: 'hidden' 
        }}>
          {monster.isRare && <div style={{ position: 'absolute', top: '15px', backgroundColor: '#fbbf24', color: '#000', padding: '4px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '900', boxShadow: '0 0 15px #fbbf24' }}>レアモンスター 出現！</div>}
          <div style={{ fontSize: '140px', transform: isAttacking ? 'scale(1.2)' : 'scale(1)', transition: '0.2s', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          <div style={{ position: 'absolute', bottom: '20px', width: '85%', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1e293b', fontWeight: '900', fontSize: '16px', marginBottom: '8px' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '14px', borderRadius: '7px', overflow: 'hidden' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, background: 'linear-gradient(to right, #ef4444, #dc2626)', height: '100%', transition: '0.5s ease-out' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア（ポップなデザイン） */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '35px', padding: '25px', boxShadow: '0 15px 0 rgba(0,0,0,0.2)', border: '4px solid #1e293b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '50px', fontWeight: '900', color: '#1e293b', margin: '10px 0' }}>{quiz.q}</h2>
          <form onSubmit={handleAnswer} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e)=>setInputValue(e.target.value)} 
              style={{ flex: '2', height: '70px', backgroundColor: '#f1f5f9', borderRadius: '20px', border: '3px solid #cbd5e1', fontSize: '32px', fontWeight: '900', textAlign: 'center', color: '#0f172a', outline: 'none' }} 
              placeholder="答えは？" 
            />
            <button style={{ flex: '1', background: 'linear-gradient(to bottom, #4f46e5, #3730a3)', color: 'white', borderRadius: '20px', border: 'none', fontSize: '24px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 5px 0 #1e1b4b' }}>OK!</button>
          </form>
        </div>

        {/* ボタンエリア */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button onClick={() => attack(false)} disabled={points < 25} style={{ height: '80px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '25px', color: 'white', fontSize: '22px', fontWeight: '900', cursor: 'pointer', opacity: points < 25 ? 0.3 : 1, transition: '0.2s', backdropFilter: 'blur(5px)' }}>⚔️ こうげき</button>
          <button onClick={() => attack(true)} disabled={points < 60} style={{ height: '80px', background: 'linear-gradient(to bottom, #f43f5e, #be123c)', border: 'none', borderRadius: '25px', color: 'white', fontSize: '22px', fontWeight: '900', cursor: 'pointer', opacity: points < 60 ? 0.3 : 1, boxShadow: '0 6px 0 #4c0519' }}>🔥 ひっさつ</button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#a5f3fc', fontWeight: '900', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {gachaResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '25px', textShadow: '0 0 20px #6366f1' }}>
            {gachaResult.isHazure ? "ハズレ！ざんねん！" : "✨ レアアイテム ゲット！ ✨"}
          </div>
          <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '50px', textAlign: 'center', border: '8px solid #6366f1', boxShadow: '0 0 50px #6366f1' }}>
            <div style={{ fontSize: '100px', marginBottom: '10px' }}>{gachaResult.img}</div>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b' }}>{gachaResult.name}</p>
            {!gachaResult.isHazure && <p style={{ fontSize: '20px', fontWeight: '900', color: '#db2777' }}>パワー +{gachaResult.power}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
