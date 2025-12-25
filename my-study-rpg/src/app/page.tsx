"use client";
import React, { useState, useEffect } from 'react';
import { kotobaData, monsterList, gachaTable } from '../data/gameData';

export default function UltimateRPG() {
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

  // 初期ロードとセーブ
  useEffect(() => {
    const saved = localStorage.getItem('mana-rpg-vFinal-Ultra');
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
    localStorage.setItem('mana-rpg-vFinal-Ultra', JSON.stringify({ points, playerLv, weapon, monsterIdx }));
  }, [points, playerLv, weapon, monsterIdx]);

  // 回答チェック
  const checkAnswer = (val: string) => {
    if (val === quiz.a) {
      setPoints(p => p + 35);
      // 正解時、わずかにダメージを与える（レベル比例）
      setMonsterHP(hp => Math.max(0, hp - (10 + playerLv * 2)));
      setMessage("✨ せいかい！ パワーが たまった！ ✨");
      generateQuiz();
    } else {
      setMessage("❌ まちがい！ もういちど えらぼう ❌");
      setInputValue("");
    }
  };

  // 攻撃アクション（精密なパワーバランス）
  const attack = (isSpecial: boolean) => {
    const cost = isSpecial ? 60 : 25;
    if (points < cost) return;
    
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 200);

    // ダメージ計算: 基本威力 + (武器の力 * レベル補正)
    const baseDmg = isSpecial ? 150 : 50;
    const weaponBonus = weapon.power * (1 + playerLv * 0.12);
    const dmg = Math.floor(baseDmg + weaponBonus);

    setPoints(p => p - cost);
    setMonsterHP(hp => Math.max(0, hp - dmg));
    setMessage(`${weapon.name}で こうげき！ ${dmg}ダメージ！`);
  };

  // モンスター交代（不具合修正済み堅牢ロジック）
  useEffect(() => {
    if (monsterHP === 0) {
      const current = monsterList[monsterIdx];
      let bonusMsg = "";
      if (current.isRare) {
        setPoints(p => p + 600);
        bonusMsg = " ＋レアボーナス！";
      }
      
      setPlayerLv(l => l + 1);
      setMessage(`🎊 ${current.name}を たおした！${bonusMsg} 🎊`);

      const timer = setTimeout(() => {
        const nextIdx = (monsterIdx + 1) % monsterList.length;
        setMonsterIdx(nextIdx);
        setMonsterHP(monsterList[nextIdx].hp); // ここで新しい敵のHPに更新
        setMessage(`${monsterList[nextIdx].name}が あらわれた！`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [monsterHP, monsterIdx]);

  // ガチャ
  const drawGacha = () => {
    if (points < 100) return;
    setPoints(p => p - 100);
    
    const totalWeight = gachaTable.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * totalWeight;
    let selected = gachaTable[0];
    
    for (const item of gachaTable) {
      if (r < item.weight) {
        selected = item;
        break;
      }
      r -= item.weight;
    }
    
    if (!selected.isHazure) setWeapon(selected);
    setGachaResult(selected);
    setTimeout(() => setGachaResult(null), 2500);
  };

  const monster = monsterList[monsterIdx];

  return (
    <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46, #047857)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* ステータスバー */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr', gap: '8px' }}>
          <div style={{ background: '#022c22', border: '2px solid #34d399', padding: '8px', borderRadius: '15px', color: 'white' }}>
            <div style={{ fontSize: '10px', color: '#6ee7b7' }}>Lv.</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>{playerLv}</div>
          </div>
          <div style={{ background: '#022c22', border: '2px solid #fbbf24', padding: '8px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#fcd34d' }}>ポイント</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>{points}</div>
          </div>
          <div style={{ background: '#022c22', border: '2px solid #34d399', padding: '8px', borderRadius: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '10px', color: '#6ee7b7' }}>ぶき</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{weapon.img}{weapon.name}</div>
            </div>
            <button onClick={drawGacha} disabled={points < 100} style={{ background: '#059669', color: 'white', padding: '6px 8px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}>ガチャ</button>
          </div>
        </div>

        {/* モンスター表示 */}
        <div style={{ height: '220px', borderRadius: '35px', border: monster.isRare ? '6px solid #fbbf24' : '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '100px', transform: isAttacking ? 'scale(1.3)' : 'scale(1)', transition: '0.1s' }}>
            {monsterHP > 0 ? monster.img : '💥'}
          </div>
          <div style={{ position: 'absolute', bottom: '15px', width: '90%', background: 'white', padding: '10px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#064e3b', fontWeight: 'bold', fontSize: '13px' }}>
              <span>{monster.name}</span>
              <span>HP {monsterHP}</span>
            </div>
            <div style={{ width: '100%', background: '#d1fae5', height: '10px', borderRadius: '5px', overflow: 'hidden', marginTop: '5px' }}>
              <div style={{ width: `${(monsterHP / monster.hp) * 100}%`, background: '#ef4444', height: '100%', transition: '0.3s' }} />
            </div>
          </div>
        </div>

        {/* クイズエリア */}
        <div style={{ background: 'white', borderRadius: '25px', padding: '15px', border: '4px solid #064e3b', boxShadow: '0 8px 0 rgba(0,0,0,0.2)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '900', color: '#064e3b', margin: '5px 0' }}>{quiz.q}</h2>
          {quiz.type === "math" ? (
            <div>
              <div style={{ fontSize: '32px', textAlign: 'center', background: '#f0fdf4', marginBottom: '10px', borderRadius: '12px', height: '50px', lineHeight: '50px', border: '2px solid #34d399', fontWeight: '900', color: '#064e3b' }}>{inputValue}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
                  <button key={n} onClick={() => setInputValue(v => v + n)} style={{ height: '42px', fontSize: '18px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 3px 0 #cbd5e1' }}>{n}</button>
                ))}
                <button onClick={() => setInputValue("")} style={{ height: '42px', background: '#fee2e2', borderRadius: '10px', border: 'none', fontWeight: 'bold', boxShadow: '0 3px 0 #fca5a5' }}>C</button>
                <button onClick={() => checkAnswer(inputValue)} style={{ height: '42px', background: '#10b981', color: 'white', borderRadius: '10px', border: 'none', fontWeight: 'bold', boxShadow: '0 3px 0 #059669' }}>OK!</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {quiz.options.map((opt: string) => (
                <button key={opt} onClick={() => checkAnswer(opt)} style={{ height: '50px', fontSize: '13px', background: '#f0fdf4', border: '2px solid #34d399', borderRadius: '15px', fontWeight: 'bold', color: '#064e3b', boxShadow: '0 3px 0 #34d399' }}>{opt}</button>
              ))}
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => attack(false)} disabled={points < 25 || monsterHP <= 0} style={{ height: '60px', background: '#115e59', color: 'white', borderRadius: '20px', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 5px 0 #042f2e', opacity: (points < 25 || monsterHP <= 0) ? 0.4 : 1 }}>⚔️ こうげき</button>
          <button onClick={() => attack(true)} disabled={points < 60 || monsterHP <= 0} style={{ height: '60px', background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', color: 'white', borderRadius: '20px', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 5px 0 #7f1d1d', opacity: (points < 60 || monsterHP <= 0) ? 0.4 : 1 }}>🔥 ひっさつ</button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#d1fae5', fontSize: '13px', fontWeight: 'bold' }}>{message}</p>
      </div>

      {/* ガチャ演出 */}
      {gachaResult && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '35px', textAlign: 'center', border: '6px solid #fbbf24', animation: 'pop 0.3s ease-out' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>{gachaResult.isHazure ? "ハズレ..." : "ぶきを 手にいれた！"}</div>
            <div style={{ fontSize: '80px', margin: '15px 0' }}>{gachaResult.img}</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#064e3b' }}>{gachaResult.name}</div>
            {!gachaResult.isHazure && <div style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '5px' }}>こうげき力アップ！</div>}
          </div>
        </div>
      )}
      <style jsx>{` @keyframes pop { 0% { transform: scale(0.5); } 100% { transform: scale(1); } } `}</style>
    </div>
  );
}
