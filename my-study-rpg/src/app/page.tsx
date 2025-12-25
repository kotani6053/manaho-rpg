"use client";
import React, { useState, useEffect } from 'react';

export default function StudyRPG() {
  // ステート管理
  const [points, setPoints] = useState(0);
  const [monsterHP, setMonsterHP] = useState(100);
  const [message, setMessage] = useState("モンスターがあらわれた！");
  const [quiz, setQuiz] = useState({ a: 0, b: 0, answer: 0 });
  const [inputValue, setInputValue] = useState("");

  // 新しい問題を作成
  const generateQuiz = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setQuiz({ a, b, answer: a + b });
    setInputValue("");
  };

  useEffect(() => { generateQuiz(); }, []);

  // クイズ回答処理
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(inputValue) === quiz.answer) {
      setPoints(prev => prev + 10);
      setMessage("せいかい！ 10ポイント ゲット！");
      generateQuiz();
    } else {
      setMessage("ざんねん！ もういちど かんがえてみよう。");
    }
  };

  // 攻撃処理
  const handleAttack = (type: 'normal' | 'special') => {
    let damage = 0;
    let cost = 0;

    if (type === 'normal') {
      damage = 20;
      cost = 10;
    } else {
      damage = 50;
      cost = 30;
    }

    if (points >= cost) {
      setMonsterHP(prev => Math.max(0, prev - damage));
      setPoints(prev => prev - cost);
      setMessage(`${type === 'normal' ? 'こうげき！' : 'ひっさつわざ！'} ${damage}のダメージ！`);
    } else {
      setMessage("ポイントが たりないよ！ べんきょうして ためよう。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4 font-sans">
      {/* モンスターエリア */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 mb-6 text-center">
        <div className="text-6xl mb-4 transition-transform hover:scale-110">👾</div>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
          <div 
            className="bg-red-500 h-6 rounded-full transition-all duration-500" 
            style={{ width: `${monsterHP}%` }}
          ></div>
        </div>
        <p className="font-bold text-gray-600">モンスターの HP: {monsterHP}</p>
      </div>

      {/* メッセージエリア */}
      <div className="mb-6 h-12 text-xl font-bold text-blue-700">{message}</div>

      {/* 学習エリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="bg-yellow-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-4">📖 さんすうクイズ</h2>
          <p className="text-3xl mb-4">{quiz.a} + {quiz.b} = ?</p>
          <form onSubmit={handleQuizSubmit} className="flex gap-2">
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 rounded-lg border-2 border-yellow-400 text-2xl"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-lg font-bold">決定</button>
          </form>
          <p className="mt-4 font-bold text-orange-600">もってるポイント: {points}</p>
        </div>

        {/* 攻撃エリア */}
        <div className="bg-red-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-4">⚔️ バトルコマンド</h2>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleAttack('normal')}
              className="bg-orange-500 text-white p-3 rounded-xl font-bold hover:bg-orange-600"
            >
              こうげき (10pt使う)
            </button>
            <button 
              onClick={() => handleAttack('special')}
              className="bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700"
            >
              ひっさつわざ (30pt使う)
            </button>
          </div>
        </div>
      </div>

      {monsterHP === 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center flex-col text-white">
          <h1 className="text-6xl font-bold mb-4">CLEAR!</h1>
          <button onClick={() => setMonsterHP(100)} className="bg-white text-black px-6 py-2 rounded-full font-bold">
            もういちど あそぶ
          </button>
        </div>
      )}
    </div>
  );
}
