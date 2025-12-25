"use client";
import React, { useState, useEffect } from 'react';
import { kanjiData, monsterList, gachaTable } from '../data/gameData';

export default function UltimateSaveRPG() {
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

  // --- 3つの数字の計算を生成するロジック ---
  const generateQuiz = () => {
    const randomType = Math.random();
    
    if (randomType > 0.4) { // 60%の確率で計算問題
      const useThreeNumbers = Math.random() > 0.5; // さらに50%で3つの数字
      
      if (useThreeNumbers) {
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 15) + 5;
        const c = Math.floor(Math.random() * 10) + 1;
        const op1 = Math.random() > 0.5 ? '+' : '-';
        const op2 = Math.random() > 0.5 ? '+' : '-';
        
        let ans = op1 === '+' ? a + b : a - b;
        ans = op2 === '+' ? ans + c : ans - c;
        
        // 答えがマイナスにならないように調整
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
    } else { // 漢字問題
      const selected = kanjiData[Math.floor(Math.random() * kanjiData.length)];
      setQuiz({ q: selected?.q || "1 + 1 = ?", a: selected?.a || "2" });
    }
    setInputValue("");
  };

  // セーブデータの読み込み
  useEffect(() => {
    const savedData = localStorage.getItem('mana-rpg-save-v2');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPoints(parsed.points || 0);
      setPlayerLv(parsed.playerLv || 1);
      setWeapon(parsed.weapon || { name: "ひのきのぼう", power: 5, img: "🪵" });
      const mIdx = parsed.monsterIdx || 0;
      setMonsterIdx(mIdx);
      setMonsterHP(monsterList[mIdx].hp);
      setMessage("つづきから はじめるよ！");
    }
    generateQuiz();
  }, []);

  // セーブデータの保存
  useEffect(() => {
    const dataToSave = { points, playerLv, weapon, monsterIdx };
    localStorage.setItem('mana-rpg-save-v2', JSON.stringify(dataToSave));
  }, [points, playerLv, weapon, monsterIdx]);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === quiz.a) {
      const bonus = quiz.q.split(' ').length > 3 ? 50 : 30; // 3つの数字ならボーナス多め
      setPoints(p => p + bonus);
      setMonsterHP(p => Math.max(0, p - 10)); 
      setMessage(`✨ せいかい！ ${bonus}ポイント ゲット！ ✨`);
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もういちど かんがえよう ❌");
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
      let bonusPts = currentMonster.isRare ? 800 : 0;
      if (bonusPts > 0) setPoints(p => p + bonusPts);
      
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${currentMonster.name}を たおした！ ${bonusPts > 0 ? 'レアボーナス 800PT!' : ''} 🎊`);
      
      setTimeout(() => {
        const next = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(next);
        setMonsterHP(monsterList[next].hp);
      }, 1500);
    }
  }, [monsterHP]);

  const monster = monsterList[monsterIdx];

  // UI部分は前回のスタイルを継承
  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ステータスバー */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '15px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #6366f1', borderRadius: '20px', padding: '15px', color: 'white' }}>
            <div style={{ color: '#818cf8', fontSize: '12px', fontWeight: 'bold' }}>レベル</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>Lv.{playerLv}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #f59e0b', borderRadius: '20px', padding: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold' }}>ポイント</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{points} PT</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '3px solid #10b981', borderRadius: '20px', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}>ぶき</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{weapon.img}{weapon.name}</div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', padding: '10px 15px', borderRadius: '12px', border: 'none', cursor: 'pointer', opacity: points < 100 ? 0.3 : 1 }}>ガチャ</button>
          </div>
        </div>

        {/* モンスターエリア */}
        <div style={{ height: '420px', borderRadius: '40px', border: monster.isRare ? '8px solid #facc15' : '5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: `linear-gradient(to bottom, #1e1b4b, #020617)` }}>
          {monster.isRare && <div style={{ position: 'absolute', top: '20px', backgroundColor: '#facc15', color: '#000', padding: '5px 20px', borderRadius: '20px', fontWeight: 'bold' }}>レアモンスター！</div>}
          <div style={{ fontSize: '200px', transform: isAttacking ? 'scale(1.3)' : 'scale(1)', transition: '0.2s' }}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          <div style={{ position: 'absolute', bottom: '25px', width: '85%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '30px', border: '2px solid white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: '900', fontSize: '20px', marginBottom: '10px' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP} / {monster.hp}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#475569', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, backgroundColor: monster.isRare ? '#fbbf24' : '#ff4d4d', height: '100%', transition: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア */}
        <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '35px', boxShadow: '0 15px 0 #cbd5e1, 0 25px 50px rgba(0,0,0,0.5)', border: '4px solid #1e293b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '64px', fontWeight: '900', color: '#0f172a', margin: '15px 0' }}>{quiz.q}</h2>
          <form onSubmit={handleAnswer} style={{ display: 'flex', gap: '15px' }}>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} style={{ flex: 1, height: '90px', backgroundColor: '#f8fafc', borderRadius: '25px', border: '4px solid #e2e8f0', fontSize: '48px', fontWeight: '900', textAlign: 'center', color: '#1e293b' }} placeholder="答えは？" />
            <button style={{ padding: '0 50px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '25px', border: 'none', fontSize: '32px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 0 #312e81' }}>OK</button>
          </form>
        </div>

        {/* ボタンエリア */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <button onClick={() => attack(false)} disabled={points < 25} style={{ height: '110px', backgroundColor: '#334155', border: 'none', borderBottom: '10px solid #0f172a', borderRadius: '30px', color: 'white', fontSize: '28px', fontWeight: '900', cursor: 'pointer', opacity: points < 25 ? 0.3 : 1 }}>⚔️ こうげき (25pt)</button>
          <button onClick={() => attack(true)} disabled={points < 60} style={{ height: '110px', background: 'linear-gradient(to bottom, #e11d48, #9f1239)', border: 'none', borderBottom: '10px solid #4c0519', borderRadius: '30px', color: 'white', fontSize: '28px', fontWeight: '900', cursor: 'pointer', opacity: points < 60 ? 0.3 : 1 }}>🔥 ひっさつ (60pt)</button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#22d3ee', fontWeight: '900', fontSize: '16px' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {gachaResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ color: 'white', fontSize: '40px', fontWeight: '900', marginBottom: '30px' }}>
            {gachaResult.isHazure ? "ああっ！ハズレだ..." : "おめでとう！"}
          </div>
          <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '70px', textAlign: 'center' }}>
            <div style={{ fontSize: '120px' }}>{gachaResult.img}</div>
            <p style={{ fontSize: '40px', fontWeight: '900', color: '#1e293b' }}>{gachaResult.name}</p>
            {!gachaResult.isHazure && <p style={{ fontSize: '24px', fontWeight: '900', color: '#db2777' }}>パワー +{gachaResult.power}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
