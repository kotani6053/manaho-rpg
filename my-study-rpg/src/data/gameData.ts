export const kanjiData = [
  { q: "「何」のよみ？", a: "なに" }, { q: "「海」のよみ？", a: "うみ" },
  { q: "「風」のよみ？", a: "かぜ" }, { q: "「家」のよみ？", a: "いえ" },
  { q: "「黄色」のよみ？", a: "きいろ" }, { q: "「朝」のよみ？", a: "あさ" },
  { q: "「昼」のよみ？", a: "ひる" }, { q: "「夜」のよみ？", a: "よる" },
  { q: "「歩く」のよみ？", a: "あるく" }, { q: "「走る」のよみ？", a: "はしる" },
  { q: "「止まる」のよみ？", a: "とまる" }, { q: "「強い」のよみ？", a: "つよい" },
  { q: "「広い」のよみ？", a: "ひろい" }, { q: "「岩」のよみ？", a: "いわ" },
  { q: "「夏」のよみ？", a: "なつ" }, { q: "「記」のよみ？", a: "き" },
  { q: "「園」のよみ？", a: "えん" }, { q: "「遠」のよみ？", a: "えん" },
  { q: "「科」のよみ？", a: "か" }, { q: "「図」のよみ？", a: "ず" },
  { q: "「答」のよみ？", a: "こたえ" }, { q: "「声」のよみ？", a: "こえ" },
  { q: "「体」のよみ？", a: "からだ" }, { q: "「弟」のよみ？", a: "おとうと" },
  { q: "「姉」のよみ？", a: "あね" }, { q: "「冬」のよみ？", a: "ふゆ" },
  { q: "「春」のよみ？", a: "はる" }, { q: "「秋」のよみ？", a: "あき" },
  { q: "「線」のよみ？", a: "せん" }, { q: "「船」のよみ？", a: "ふね" },
  { q: "「雪」のよみ？", a: "ゆき" }, { q: "「雲」のよみ？", a: "くも" },
  { q: "「晴」のよみ？", a: "はれ" }
];

export const monsterList = [
  { name: "プルプルスライム", hp: 120, img: "👾", color: "from-blue-600 to-blue-900" },
  { name: "メラメラくん", hp: 250, img: "🔥", color: "from-red-500 to-red-900" },
  { name: "ビリビリ丸", hp: 400, img: "⚡", color: "from-yellow-500 to-amber-900" },
  { name: "ドクドク・バット", hp: 600, img: "🦇", color: "from-purple-600 to-purple-950" },
  { name: "アイアン・ゴーレム", hp: 900, img: "🗿", color: "from-gray-500 to-gray-800" },
  { name: "森の長老", hp: 1400, img: "🌳", color: "from-green-600 to-green-950" },
  { name: "深海のクラーケン", hp: 2000, img: "🦑", color: "from-cyan-600 to-blue-950" },
  { name: "スカイ・フェニックス", hp: 3000, img: "🐦‍🔥", color: "from-orange-500 to-red-800" },
  { name: "暗黒騎士マナホ", hp: 5000, img: "⚔️", color: "from-slate-700 to-black" },
  { name: "宇宙の創造神", hp: 9999, img: "👑", color: "from-indigo-600 to-black" }
];

// ガチャ用データ：weightが小さいほど出にくい
export const gachaTable = [
  { name: "ボロボロの石ころ", power: 0, img: "🪨", weight: 40, isHazure: true },
  { name: "バナナの皮", power: 1, img: "🍌", weight: 20, isHazure: true },
  { name: "鉄のつるぎ", power: 25, img: "🗡️", weight: 20, isHazure: false },
  { name: "炎のつえ", power: 65, img: "🔥", weight: 10, isHazure: false },
  { name: "氷のやり", power: 130, img: "❄️", weight: 6, isHazure: false },
  { name: "光の聖剣", power: 350, img: "✨", weight: 3, isHazure: false },
  { name: "銀河の破壊斧", power: 900, img: "🪓", weight: 1, isHazure: false }
];
