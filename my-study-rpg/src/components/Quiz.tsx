"use client";
import React from 'react';

type QuizProps = {
  quiz: {
    q: string;
    a: string;
    type: "math" | "word";
    options?: string[];
  };
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onCheckAnswer: (val: string) => void;
};

export default function Quiz({ quiz, inputValue, setInputValue, onCheckAnswer }: QuizProps) {
  return (
    <div className="bg-[#f8f8f0] border-4 border-[#c0c0b8] rounded-2xl p-4 shadow-[-4px_4px_0_0_#c0c0b8] text-gray-950">
      <span className="text-[10px] bg-[#c0c0b8] px-2 py-0.5 rounded font-bold text-gray-700 uppercase tracking-wider">
        {quiz.type === "math" ? "🔢 さんすうクエスト" : "🔤 ことばクエスト"}
      </span>
      <h2 className="text-center text-3xl font-black my-4 tracking-tight text-slate-900">{quiz.q}</h2>
      
      {quiz.type === "math" ? (
        <div className="flex flex-col gap-3">
          <div className="text-2xl text-center bg-slate-950 text-emerald-400 rounded-xl h-12 flex items-center justify-center border-2 border-[#c0c0b8] font-mono font-bold shadow-inner">
            {inputValue || " "}
          </div>
          <div className="grid grid-cols-3 gap-1.5 font-mono">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
              <button key={n} onClick={() => setInputValue(v => v + n)} className="h-10 bg-white border-2 border-[#c0c0b8] rounded-lg font-black text-lg text-slate-800 shadow hover:bg-gray-100 active:translate-y-0.5 transition-all">
                {n}
              </button>
            ))}
            <button onClick={() => setInputValue("")} className="h-10 bg-rose-100 border-2 border-rose-300 rounded-lg font-black text-rose-700 shadow hover:bg-rose-200 active:translate-y-0.5 transition-all">
              C
            </button>
            <button onClick={() => onCheckAnswer(inputValue)} className="h-10 bg-emerald-600 border-2 border-emerald-800 text-white rounded-lg font-black text-sm shadow hover:bg-emerald-500 active:translate-y-0.5 transition-all">
              OK!
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {quiz.options?.map((opt: string) => (
            <button key={opt} onClick={() => onCheckAnswer(opt)} className="group relative text-left pl-6 pr-2 py-3 bg-white border-2 border-[#c0c0b8] rounded-xl font-bold text-xs text-slate-800 shadow hover:border-amber-500 hover:bg-amber-50/50 active:translate-y-0.5 transition-all">
              <span className="absolute left-2 opacity-0 group-hover:opacity-100 text-amber-600 transition-opacity">▶</span>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
