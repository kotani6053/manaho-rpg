"use client";
import React, { useState, useEffect, useRef } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

export default function RobustRPG() {
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

  // クイズ生成
  const generateQuiz = () => {
    const isMath = Math.random() > 0.4;
    if (isMath) {
      const useThree = Math.random() > 0.4;
      if (useThree) {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 5) + 1;
        const op1 = Math.random() > 0.5 ? '+' : '-';
        const op2 = Math.random() > 0.5 ? '+' : '-';
        let ans = op1 === '+' ? a + b : a - b;
        ans = op2 === '+' ? ans + c : ans - c;
        if (ans < 0) return generateQuiz();
        setQuiz({ q: `${a} ${op1} ${b} ${op2} ${c} = ?`, a: ans.toString(), type: "math" });
      } else {
        const a = Math.floor(Math.random() * 30) + 10;
        const b = Math.floor(Math.random() * 20) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';
        const ans = op === '+' ? a + b : a - b;
        if (ans < 0) return generateQuiz();
        setQuiz({ q: `${a} ${op} ${b} = ?`, a: ans.toString(), type: "math" });
      }
    } else {
      const qData = kotobaData[Math.floor(Math.random() * kotobaData.length)];
      setQuiz({ ...qData, type: "word" });
    }
    setInputValue("");
  };

  // セーブ・ロード
  useEffect(() => {
    const saved = localStorage.getItem('mana-rpg-v8');
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
    localStorage.setItem('mana-rpg-v8', JSON.stringify({ points, playerLv, weapon, monsterIdx }));
  }, [points, playerLv, weapon, monsterIdx]);

  // 回答チェック
  const checkAnswer = (val: string) => {
    if (val === quiz.a) {
      const bonus = quiz.q.split(' ').length > 3 ? 50 : 30;
      setPoints(p => p + bonus);
      setMonsterHP(hp => Math.max(0, hp - 20)); // クイズ正解でも少しダメージ
      setMessage(`✨ せいかい！ ${bonus}PTゲット！ ✨`);
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もう一度！ ❌");
      setInputValue("");
    }
  };

  // 攻撃アクション
  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 200);
    const dmg = (isSpecial ? 250 : 60) + (weapon.power * playerLv);
    setPoints(p => p - cost);
    setMonsterHP(hp => {
      const newHp = hp - dmg;
      return newHp < 0 ? 0 : newHp;
    });
    setMessage(`${weapon.name}の こうげき！ ${dmg}ダメージ！`);
  };

  // モンスター交代ロジック (ここを大幅修正)
  useEffect(() => {
    if (monsterHP === 0) {
      const current = monsterList[monsterIdx];
      let bonus = current.isRare ? 800 : 0;
      if (bonus > 0) setPoints(p => p + bonus);
      
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${current.name}を たおした！ 🎊`);

      const timer = setTimeout(() => {
        const nextIdx = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(nextIdx);
        setMonsterHP(monsterList[nextIdx].hp); // ここで新しい敵のHPをセット
        setMessage(`${monsterList[nextIdx].name}が あらわれた！`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [monsterHP]);

  // ガチャ
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
    <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46, #047857)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ステータスバー */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '10px' }}>
          <div style={{ background: '#022c22', border: '2px solid #34d399', padding: '10px', borderRadius: '15px', color: 'white' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>レベル</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>Lv.{playerLv}</div>
          </div>
          <div style={{ background: '#022c22', border: '2px solid #fbbf24', padding: '10px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>ポイント</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>{points}</div>
          </div>
          <div style={{ background: '#022c22', border: '2px solid #34d399', padding: '10px', borderRadius: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden' }}><div style={{ fontSize: '10px' }}>ぶき</div><div style={{ fontSize: '11px', fontWeight: 'bold' }}>{weapon.img}{weapon.name}</div></div>
            <button onClick={drawGacha} disabled={points < 100} style={{ background: '#059669', color: 'white', padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}>ガチャ</button>
          </div>
        </div>

        {/* モンスターエリア */}
        <div style={{ height: '260px', borderRadius: '35px', border: monster.isRare ? '6px solid #fbbf24' : '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'rgba(0,0,0,0.3)' }}>
          {monster.isRare && <div style={{ position: 'absolute', top: '10px', background: '#fbbf24', color: '#000', padding: '4px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>レア！</div>}
          <div style={{ fontSize: '120px', transform: isAttacking ? 'scale(1.3)' : 'scale(1)', transition: '0.1s' }}>{monsterHP > 0 ? monster.img : '💥'}</div>
          <div style={{ position: 'absolute', bottom: '15px', width: '90%', background: 'white', padding: '12px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#064e3b', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}><span>{monster.name}</span><span>HP {monsterHP}</span></div>
            <div style={{ width: '100%', background: '#d1fae5', height: '12px', borderRadius: '6px', overflow: 'hidden' }}><div style={{ width: `${(monsterHP/monster.hp)*100}%`, background: '#ef4444', height: '100%', transition: '0.3s' }} /></div>
          </div>
        </div>

        {/* クイズエリア */}
        <div style={{ background: 'white', borderRadius: '30px', padding: '20px', border: '4px solid #064e3b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '900', color: '#064e3b', margin: '5px 0' }}>{quiz.q}</h2>
          {quiz.type === "math" ? (
            <div>
              <div style={{ fontSize: '40px', textAlign: 'center', background: '#f0fdf4', marginBottom: '15px', borderRadius: '15px', height: '60px', border: '2px solid #34d399', fontWeight: '900', color: '#064e3b' }}>{inputValue}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <button key={n} onClick={() => setInputValue(v => v + n)} style={{ height: '50px', fontSize: '20px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 3px 0 #cbd5e1' }}>{n}</button>
                ))}
                <button onClick={() => setInputValue("")} style={{ height: '50px', background: '#fee2e2', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>C</button>
                <button onClick={() => setInputValue(v => v + "0")} style={{ height: '50px', fontSize: '20px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>0</button>
                <button onClick={() => checkAnswer(inputValue)} style={{ height: '50px', background: '#10b981', color: 'white', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>OK!</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {quiz.options.map((opt: string) => (
                <button key={opt} onClick={() => checkAnswer(opt)} style={{ height: '65px', fontSize: '16px', background: '#f0fdf4', border: '2px solid #34d399', borderRadius: '15px', fontWeight: 'bold', color: '#064e3b' }}>{opt}</button>
              ))}
            </div>
          )}
        </div>

        {/* ボタンエリア */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => attack(false)} disabled={points < 25 || monsterHP <= 0} style={{ height: '70px', background: '#115e59', color: 'white', borderRadius: '20px', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 5px 0 #042f2e', opacity: (points < 25 || monsterHP <= 0) ? 0.4 : 1 }}>⚔️ こうげき</button>
          <button onClick={() => attack(true)} disabled={points < 60 || monsterHP <= 0} style={{ height: '70px', background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', color: 'white', borderRadius: '20px', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 5px 0 #7f1d1d', opacity: (points < 60 || monsterHP <= 0) ? 0.4 : 1 }}>🔥 ひっさつ</button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#d1fae5', fontSize: '14px' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
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
