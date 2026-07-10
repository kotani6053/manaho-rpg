type ActionPanelProps = {
  points: number;
  onAttack: (damage: number, cost: number) => void;
};

export default function ActionPanel({ points, onAttack }: ActionPanelProps) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-2 font-pkm">
      {/* 上部のメッセージウィンドウ（戦闘テキスト風） */}
      <div className="bg-[#f8f8f0] border-[5px] border-[#c0c0b8] rounded-tl-xl rounded-br-xl p-3 shadow-[-3px_3px_0_0_#c0c0b8]">
        <p className="text-gray-950 font-black text-sm tracking-wider">
          どうする？ <br />
          <span className="text-xs text-gray-600">（のこりPP: <span className="font-mono text-base text-emerald-600 font-bold">{points}</span> pt）</span>
        </p>
      </div>

      {/* 4分割コマンドウィンドウ */}
      <div className="grid grid-cols-2 bg-[#101010] border-[5px] border-[#c0c0b8] rounded-tr-xl rounded-bl-xl p-2 gap-2 shadow-[-3px_3px_0_0_#c0c0b8]">
        
        {/* 1番目の技：つうじょうこうげき */}
        <button
          onClick={() => onAttack(20, 10)}
          disabled={points < 10}
          className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-[#d0d0c8] disabled:opacity-50 text-gray-950 p-3 rounded-lg border-2 border-transparent hover:border-amber-500 active:bg-gray-200 transition-all cursor-pointer disabled:cursor-not-allowed min-h-[84px]"
        >
          {/* 左側のセレクト矢印（ホバー時に出る） */}
          <span className="absolute left-1 top-3.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-gray-950">▶</span>
          
          <div className="pl-3 w-full">
            <span className="font-black text-base tracking-tighter block leading-tight">
              つうじょう<br />こうげき
            </span>
          </div>
          <div className="w-full text-right mt-1">
            <span className="text-[10px] font-bold text-gray-500 font-mono">PP 10</span>
          </div>
        </button>

        {/* 2番目の技：ひっさつわざ */}
        <button
          onClick={() => onAttack(50, 30)}
          disabled={points < 30}
          className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] disabled:bg-[#d0d0c8] disabled:opacity-50 text-gray-950 p-3 rounded-lg border-2 border-transparent hover:border-purple-500 active:bg-gray-200 transition-all cursor-pointer disabled:cursor-not-allowed min-h-[84px]"
        >
          <span className="absolute left-1 top-3.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-gray-950">▶</span>
          
          <div className="pl-3 w-full">
            <span className="font-black text-base tracking-tighter block leading-tight text-purple-900 group-disabled:text-gray-950">
              ひっさつ<br />わざ
            </span>
          </div>
          <div className="w-full text-right mt-1">
            <span className="text-[10px] font-bold text-gray-500 font-mono">PP 30</span>
          </div>
        </button>

        {/* 3番目の技：どうぐ（ダミー：今後の学習ゲーム拡張用） */}
        <button
          disabled
          className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] opacity-40 p-3 rounded-lg border-2 border-transparent min-h-[84px] cursor-not-allowed"
        >
          <div className="pl-3 w-full">
            <span className="font-black text-base tracking-tighter block leading-tight text-gray-400">
              おまもり<br />（ヒント）
            </span>
          </div>
          <div className="w-full text-right mt-1">
            <span className="text-[10px] font-bold text-gray-400 font-mono">--</span>
          </div>
        </button>

        {/* 4番目の技：にげる（ダミー） */}
        <button
          disabled
          className="group relative flex flex-col justify-between items-start text-left bg-[#f8f8f0] opacity-40 p-3 rounded-lg border-2 border-transparent min-h-[84px] cursor-not-allowed"
        >
          <div className="pl-3 w-full">
            <span className="font-black text-base tracking-tighter block leading-tight text-gray-400">
              にげる
            </span>
          </div>
          <div className="w-full text-right mt-1">
            <span className="text-[10px] font-bold text-gray-400 font-mono">--</span>
          </div>
        </button>

      </div>
    </div>
  );
}
