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
    <div className="bg-white border-4 border-[#222222] rounded-2xl p-6 shadow-[5px_5px_0_#222222]">
      <span className="text-[10px] bg-[#222222] px-2 py-1 rounded-full font-black text-white uppercase tracking-wider">
        {quiz.type === "math" ? "🔢 さんすうクエスト" : "🔤 ことばクエスト"}
      </span>
      
      <h2 className="text-center text-3xl font-black my-6 tracking-tight text-slate-900">{quiz.q}</h2>
      
      {quiz.type === "math" ? (
        <div className="flex flex-col gap-4">
          <div className="text-3xl text-center bg-slate-800 text-emerald-400 rounded-xl h-16 flex items-center justify-center border-4 border-[#222222] font-mono font-black shadow-inner">
            {inputValue || " "}
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
              <button key={n} onClick={() => setInputValue(v => v + n)} className="h-12 bg-white border-4 border-[#222222] rounded-xl font-black text-xl text-slate-800 shadow-[2px_2px_0_#222222] hover:bg-slate-100 active:translate-y-0.5 transition-none">
                {n}
              </button>
            ))}
            <button onClick={() => setInputValue("")} className="h-12 bg-rose-200 border-4 border-[#222222] rounded-xl font-black text-rose-800 shadow-[2px_2px_0_#222222] hover:bg-rose-300 active:translate-y-0.5 transition-none">
              C
            </button>
            <button onClick={() => onCheckAnswer(inputValue)} className="h-12 bg-emerald-500 border-4 border-[#222222] text-white rounded-xl font-black text-xl shadow-[2px_2px_0_#222222] hover:bg-emerald-600 active:translate-y-0.5 transition-none">
              OK!
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {quiz.options?.map((opt: string) => (
            <button 
              key={opt} 
              onClick={() => onCheckAnswer(opt)} 
              className="text-left px-6 py-4 bg-white border-4 border-[#222222] rounded-xl font-black text-lg text-slate-800 shadow-[4px_4px_0_#222222] hover:bg-slate-100 active:translate-y-0.5 transition-none"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
