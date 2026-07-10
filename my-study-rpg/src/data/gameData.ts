// ==========================================
// 1. クイズデータ（全50問・削りなし完全版）
// ==========================================
export const kotobaData = [
 { q: "「親切（しんせつ）」の はんたいの言葉は？", a: "不親切", options: ["乱暴", "不親切", "意地悪", "冷たい"] },
  { q: "「幸福（こうふく）」の はんたいの言葉は？", a: "不幸", options: ["退屈", "不運", "不幸", "心配"] },
  { q: "「急行（きゅうこう）」の はんたいの電車は？", a: "普通", options: ["各駅", "普通", "快速", "鈍行"] },
  { q: "「増加（ぞうか）」の はんたいの言葉は？", a: "減少", options: ["縮小", "減少", "終了", "低下"] },
  { q: "「勝利（しょうり）」の はんたいの言葉は？", a: "敗北", options: ["失敗", "中止", "敗北", "引退"] },
  { q: "「集合（しゅうごう）」の はんたいの言葉は？", a: "解散", options: ["解散", "出発", "終了", "帰宅"] },
  { q: "「成功（せいこう）」の はんたいの言葉は？", a: "失敗", options: ["後悔", "間違い", "苦労", "失敗"] },
  { q: "「宣伝（せんでん）」と にた意味の言葉は？", a: "広める", options: ["集める", "広める", "伝える", "教える"] },
  { q: "「短気（たんき）」の はんたいの言葉は？", a: "気長", options: ["のんびり", "気長", "優しい", "冷静"] },
  { q: "「進歩（しんぽ）」の はんたいの言葉は？", a: "退歩", options: ["後退", "退歩", "停止", "減少"] },
  { q: "「優秀（ゆうしゅう）」の はんたいの言葉は？", a: "劣等", options: ["下手", "普通", "苦手", "劣等"] },
  { q: "「傑作（けっさく）」の はんたいの言葉は？", a: "拙作", options: ["失敗", "駄作", "拙作", "普通"] },
  { q: "「豊富（ほうふ）」の はんたいの言葉は？", a: "乏しい", options: ["少ない", "乏しい", "貧しい", "不便"] },
  { q: "「清潔（せいけつ）」の はんたいの言葉は？", a: "不潔", options: ["汚い", "不潔", "乱雑", "危険"] },
  { q: "「幼稚（ようち）」の はんたいの言葉は？", a: "成熟", options: ["大人", "成熟", "完成", "発達"] },
  { q: "「内心（ないしん）」の はんたいの言葉は？", a: "表面", options: ["外見", "表面", "言葉", "態度"] },
  { q: "「臨時（りんじ）」の はんたいの言葉は？", a: "定期", options: ["通常", "毎日", "定期", "普通"] },
  { q: "「冷静（れいせい）」の はんたいの言葉は？", a: "興奮", options: ["激怒", "興奮", "混乱", "油断"] },
  { q: "「短所（たんしょ）」の はんたいの言葉は？", a: "長所", options: ["長所", "美点", "得意", "正解"] },
  { q: "「新鮮（しんせん）」の はんたいの言葉は？", a: "腐敗", options: ["古い", "乾燥", "腐敗", "傷物"] },

  // --- 後半：新規に15問追加したパワーアップ枠 ---
  { q: "「偶然（ぐうぜん）」の はんたいの言葉は？", a: "必然", options: ["当然", "必然", "計画", "絶対"] },
  { q: "「過去（かこ）」の はんたいの言葉は？", a: "未来", options: ["現在", "未来", "明日", "今度"] },
  { q: "「一瞬（いっしゅん）」の はんたいの言葉は？", a: "永遠", options: ["永遠", "長時間", "未来", "ずっと"] },
  { q: "「簡単（かんたん）」と にた意味の言葉は？", a: "容易", options: ["単純", "容易", "気楽", "便利"] },
  { q: "「巨大（きょだい）」の はんたいの言葉は？", a: "微小", options: ["小型", "微小", "細か", "軽量"] },
  { q: "「油断（ゆだん）」と にた意味の言葉は？", a: "隙（すき）", options: ["失敗", "間違い", "隙（すき）", "のんびり"] },
  { q: "「正確（せいかく）」の はんたいの言葉は？", a: "不正確", options: ["間違い", "適当", "不正確", "デタラメ"] },
  { q: "「丁寧（ていねい）」と にた意味の言葉は？", a: "几帳面", options: ["親切", "几帳面", "真面目", "静か"] },
  { q: "「得意（とくい）」と にた意味の言葉は？", a: "自慢", options: ["上手", "自慢", "満足", "勝利"] },
  { q: "「感謝（かんしゃ）」と にた意味の言葉は？", a: "お礼", options: ["お礼", "お祝い", "挨拶", "お返し"] },
  { q: "「乾燥（かんそう）」の はんたいの言葉は？", a: "湿潤", options: ["湿潤", "水気", "梅雨", "ジメジメ"] },
  { q: "「自由（じゆう）」の はんたいの言葉は？", a: "不自由", options: ["不自由", "制限", "禁止", "我慢"] },
  { q: "「親友（しんゆう）」と にた意味の言葉は？", a: "竹馬の友", options: ["仲間", "竹馬の友", "幼馴染", "相棒"] },
  { q: "「売買（ばいばい）」の「買」の はんたいの漢字は？", a: "売", options: ["売", "貸", "与", "渡"] },
  { q: "「最初（さいしょ）」と にた意味の言葉は？", a: "冒頭", options: ["一番", "最初期", "冒頭", "出発"] }

  // --- 2. 漢字の読み・書き・言葉のルール ---
  { q: "「お土産」の 正しいよみかたは？", a: "おみやげ", options: ["おどさん", "おみやげ", "おみや", "とさん"] },
  { q: "「昨日」の 正しいよみかたは？", a: "きのう", options: ["さくじつ", "きのう", "おととり", "あした"] },
  { q: "「下手」の 正しいよみかたは？", a: "へた", options: ["したて", "へた", "げしゅ", "へだし"] },
  { q: "「時計」の 正しいよみかたは？", a: "とけい", options: ["とけえ", "とけい", "どけい", "ときい"] },
  { q: "「一足」の 正しいよみかたは？", a: "いっそく", options: ["いちあし", "ひとあし", "いっそく", "いっぽ"] },
  { q: "「風車」の 正しいよみかたは？", a: "かざぐるま", options: ["ふうしゃ", "かざぐるま", "かぜくるま", "ふうくるま"] },
  { q: "「万作」の「万」のよみかたは？", a: "まん", options: ["まん", "ばん", "まる", "よろず"] },
  { q: "「親切」の「親」のよみかたは？", a: "しん", options: ["おや", "しん", "した", "したしみ"] },
  { q: "「黄金」の 正しいよみかたは？", a: "おうごん", options: ["こがね", "おうごん", "きんがね", "きんいろ"] },
  { q: "「台所」の 正しいよみかたは？", a: "だいどころ", options: ["たいしょ", "だいどころ", "だいしょく", "ねどこ"] },
  { q: "「日記」の「記」のよみかたは？", a: "き", options: ["しるし", "き", "しょ", "ぶん"] },
  { q: "「公園」の「園」のよみかたは？", a: "えん", options: ["にわ", "えん", "ぞの", "まる"] },
  { q: "「強風」の「強」のよみかたは？", a: "きょう", options: ["つよ", "きょう", "ごう", "こわ"] },
  { q: "「毎日」の「毎」のよみかたは？", a: "まい", options: ["まい", "ごと", "つね", "いつも"] },
  { q: "「用紙」の「紙」のよみかたは？", a: "し", options: ["かみ", "し", "がみ", "ぶん"] },
  { q: "「一昨日」の 正しいよみかたは？", a: "おととい", options: ["きのう", "おととい", "あさって", "さくじつ"] },
  { q: "「明日」の 正しいよみかたは？", a: "あした", options: ["あした", "きのう", "まいにち", "みょうにち"] },
  { q: "「体つくり」の「体」のよみかたは？", a: "からだ", options: ["たい", "からだ", "てあし", "み"] },
  { q: "「図工」の「図」のよみかたは？", a: "ず", options: ["と", "ず", "え", "はかる"] },
  { q: "「算数」の「数」のよみかたは？", a: "すう", options: ["かず", "すう", "す", "そう"] },

  // --- 3. なかまはずれ (高い思考力・分類) ---
  { q: "「なかまはずれ」は どれ？（主食と調味料）", a: "お砂糖", options: ["食パン", "うどん", "お米", "お砂糖"] },
  { q: "「なかまはずれ」は どれ？（哺乳類と鳥類）", a: "ペンギン", options: ["ライオン", "クジラ", "コウモリ", "ペンギン"] },
  { q: "「なかまはずれ」は どれ？（夏野菜と果物）", a: "スイカ", options: ["トマト", "ピーマン", "キュウリ", "スイカ"] },
  { q: "「なかまはずれ」は どれ？（昆虫とクモ形類）", a: "クモ", options: ["カブトムシ", "クモ", "テントウムシ", "バッタ"] },
  { q: "「なかまはずれ」は どれ？（弦楽器と打楽器）", a: "太鼓", options: ["バイオリン", "ギター", "ピアノ", "太鼓"] },
  { q: "「なかまはずれ」は どれ？（文房具と電化製品）", a: "電卓", options: ["定規", "コンパス", "彫刻刀", "電卓"] },
  { q: "「なかまはずれ」は どれ？（日本の県名と国名）", a: "ブラジル", options: ["北海道", "沖縄県", "京都府", "ブラジル"] },
  { q: "「なかまはずれ」は どれ？（液体と気体）", a: "空気", options: ["お水", "牛乳", "お茶", "空気"] },
  { q: "「なかまはずれ」は どれ？（春の花と秋の花）", a: "コスモス", options: ["サクラ", "チューリップ", "タンポポ", "コスモス"] },
  { q: "「なかまはずれ」は どれ？（乗れるものと建物）", a: "駅", options: ["新幹線", "飛行機", "ヘリコプター", "駅"] },
  { q: "「なかまはずれ」は どれ？（魚類と哺乳類）", a: "イルカ", options: ["マグロ", "サケ", "メダカ", "イルカ"] },
  { q: "「なかまはずれ」は どれ？（冬のイベントとそれ以外）", a: "七夕", options: ["クリスマス", "お正月", "節分", "七夕"] },
  { q: "「なかまはずれ」は どれ？（陸の乗り物と空の乗り物）", a: "気球", options: ["タクシー", "トラック", "自転車", "気球"] },
  { q: "「なかまはずれ」は どれ？（鳥の名前と虫の名前）", a: "トンボ", options: ["スズメ", "ツバメ", "カラス", "トンボ"] },
  { q: "「なかまはずれ」は どれ？（履物と服）", a: "ズボン", options: ["スニーカー", "長靴", "サンダル", "ズボン"] },

  // --- 4. ことわざ・慣用句・日本語表現 ---
  { q: "「？も歩けば棒に当たる」の「？」は？", a: "犬", options: ["猫", "犬", "猿", "鳥"] },
  { q: "「猫に ？」は何でしょう？", a: "小判", options: ["小判", "お魚", "マタタビ", "ご飯"] },
  { q: "うれしくてたまらない様子を「頬が？」という？", a: "落ちる", options: ["緩む", "落ちる", "赤くなる", "上がる"] },
  { q: "一生懸命がんばることを「？を粉にする」という？", a: "骨", options: ["身", "骨", "手", "頭"] },
  { q: "仲がとても悪いことを「？と猿」という？", a: "犬", options: ["猫", "犬", "キツネ", "オオカミ"] },
  { q: "「早起きは三文の？」は何でしょう？", a: "徳", options: ["得", "徳", "損", "益"] },
  { q: "話が上手でペラペラしゃべる様子を「板に？」という？", a: "付く", options: ["乗る", "付く", "跳ねる", "咲く"] },
  { q: "とても驚いて目が丸くなる様子を「目を？」という？", a: "丸くする", options: ["大きくする", "丸くする", "開ける", "細める"] },
  { q: "「猿も木から？」はどうなる？", a: "落ちる", options: ["飛び降りる", "落ちる", "滑る", "登る"] },
  { q: "「棚から？」が落ちてくる？", a: "ぼたもち", options: ["リンゴ", "ケーキ", "ぼたもち", "お金"] },
  { q: "とても腹が立って我慢できないとき「頭に？」という？", a: "くる", options: ["くる", "のる", "ひびく", "あがる"] },
  { q: "恥ずかしくて顔が真っ赤になる様子を「顔から？が出る」という？", a: "火", options: ["汗", "火", "血", "涙"] },
  { q: "自分のした悪いことが自分に返ってくることを「自業？」という？", a: "自得", options: ["自得", "失敗", "自滅", "交代"] },
  { q: "すっかりあきれて言葉が出ない様子を「開いた口が？」という？", a: "ふさがらない", options: ["ふさがらない", "閉じない", "笑わない", "曲がらない"] },
  { q: "とても仲が良い二人のことを「？と影」という？", a: "形", options: ["光", "形", "友", "心"] },

  // --- 5. 算数クイズ (小2単位・図形・計算) ---
  { q: "1リットル（L）は 何デシリットル（dL）？", a: "10dL", options: ["10dL", "100dL", "1000dL", "5dL"] },
  { q: "1メートル（m）は 何センチメートル（cm）？", a: "100cm", options: ["10cm", "100cm", "1000cm", "50cm"] },
  { q: "午前10時の「3時間前」は何時？", a: "午前7時", options: ["午前6時", "午前7時", "午前8時", "午後1時"] },
  { q: "午後4時は、24時間でいうと何時？", a: "16時", options: ["14時", "15時", "16時", "17時"] },
  { q: "サイコロの「向かい合う面の数」を足すと、全部いくつ？", a: "7", options: ["6", "7", "8", "9"] },
  { q: "三角形（さんかくけい）の角（かど）は、全部でいくつある？", a: "3つ", options: ["2つ", "3つ", "4つ", "5つ"] },
  { q: "正方形（せいほうけい）の辺（まわりの線の長さ）は、全部どうなっている？", a: "同じ長さ", options: ["全部バラバラ", "2本だけ同じ", "同じ長さ", "斜めになっている"] },
  { q: "「8×7」の かけ算の答えは？", a: "56", options: ["54", "56", "63", "64"] },
  { q: "「9×6」の かけ算の答えは？", a: "54", options: ["48", "54", "56", "63"] },
  { q: "1分間は 60秒。では「2分間」は何秒？", a: "120秒", options: ["100秒", "110秒", "120秒", "160秒"] },
  { q: "1センチメートル（cm）は 何ミリメートル（mm）？", a: "10mm", options: ["10mm", "100mm", "5mm", "12mm"] },
  { q: "長方形（ちょうほうけい）の角（かど）は全部で4つ。その角はすべて何という？", a: "直角", options: ["直角", "鋭角", "四角", "三角"] },
  { q: "「7×8」と「8×7」の答えの大きさはどうなる？", a: "同じになる", options: ["7×8が大きい", "8×7が大きい", "同じになる", "引き算になる"] },
  { q: "100を10個あつめた数はいくつ？", a: "1000", options: ["100", "500", "1000", "10000"] },
  { q: "53にいくつを足すと、ちょうど100になる？", a: "47", options: ["37", "47", "57", "63"] },

  // --- 6. 理科・生き物・自然クイズ ---
  { q: "昆虫（こんちゅう）の足は、全部で何本ある？", a: "6本", options: ["4本", "6本", "8本", "10本"] },
  { q: "昆虫の体は「頭」と「胸」と、あとどこに分かれている？", a: "腹（はら）", options: ["お尻", "腹（はら）", "足", "背中"] },
  { q: "カブトムシが野生（やせい）で大好きな食べ物は？", a: "樹液", options: ["花の蜜", "樹液", "腐った果物", "葉っぱ"] },
  { q: "ちょうちょになる前、サナギの前は何だった？", a: "青虫（幼虫）", options: ["ミミズ", "青虫（幼虫）", "毛虫", "バッタ"] },
  { q: "カエルになる前、卵から生まれたばかりの時は？", a: "オタマジャクシ", options: ["メダカ", "オタマジャクシ", "ヤゴ", "イモリ"] },
  { q: "植物の「ひまわり」が、花を咲かせる季節は？", a: "夏", options: ["春", "夏", "秋", "冬"] },
  { q: "雪の結晶（けっしょう）の形は、基本は何角形？", a: "六角形", options: ["三角形", "四角形", "五角形", "六角形"] },
  { q: "暗いところで、お尻をピカピカ光らせる夏の虫は？", a: "ホタル", options: ["テントウムシ", "ホタル", "アブ", "セミ"] },
  { q: "冬の間に、ご飯を食べずにずーっと眠ることを何という？", a: "冬眠（とうみん）", options: ["冬眠（とうみん）", "夜なべ", "冬ごもり", "熟睡"] },
  { q: "雨を降らせる、空にある黒くてぶ厚いものは何？", a: "雲", options: ["太陽", "雲", "霧", "虹"] },
  { q: "アサガオの花が咲くのは、1日のうちのいつ頃？", a: "朝早く", options: ["朝早く", "お昼頃", "夕方", "夜中"] },
  { q: "ダンゴムシの足の数は全部で何本？（昆虫ではないよ）", a: "14本", options: ["6本", "8本", "12本", "14本"] },
  { q: "メダカのヒレの中で、一番大きくて後ろにあるものは？", a: "尾びれ", options: ["背びれ", "胸びれ", "腹びれ", "尾びれ"] },
  { q: "カタツムリの頭にある、長い2本の角の先にあるものは？", a: "目", options: ["耳", "目", "鼻", "口"] },
  { q: "秋になるとキレイな声で「リンリン」と鳴く虫は？", a: "スズムシ", options: ["コオロギ", "スズムシ", "キリギリス", "セミ"] },

  // --- 7. 社会・生活・一般常識 ---
  { q: "太陽が「昇る（のぼる）」方角はどれ？", a: "東", options: ["東", "西", "南", "北"] },
  { q: "太陽が「沈む（しずむ）」方角はどれ？", a: "西", options: ["東", "西", "南", "北"] },
  { q: "日本の一番「南」にある島国、または県はどこ？", a: "沖縄県", options: ["北海道", "東京都", "沖縄県", "鹿児島県"] },
  { q: "日本の一番「北」にある、とても広い都道府県はどこ？", a: "北海道", options: ["青森県", "東京都", "沖縄県", "北海道"] },
  { q: "1年は52週間と、あと何日？（うるう年をのぞく）", a: "1日", options: ["1日", "2日", "3日", "なし"] },
  { q: "秋に、お米をたくさん収穫（しゅうかく）することを何という？", a: "稲刈り", options: ["田植え", "稲刈り", "草むしり", "種まき"] },
  { q: "119番に電話をかけると、どこの人が来てくれる？", a: "消防署", options: ["警察署", "消防署", "病院", "市役所"] },
  { q: "110番に電話をかけると、どこの人が来てくれる？", a: "警察署", options: ["警察署", "消防署", "郵便局", "銀行"] },
  { q: "車が走る道路の端にある、人が歩く安全な場所は？", a: "歩道", options: ["車道", "歩道", "高速道路", "交差点"] },
  { q: "日本のまわりを囲んでいるものは何？", a: "海", options: ["山", "海", "大きな川", "外国"] },
  { q: "郵便マーク（〒）が書かれた赤い箱の名前は？", a: "郵便ポスト", options: ["宅配ボックス", "郵便ポスト", "公衆電話", "掲示板"] },
  { q: "大昔に地球に住んでいた、化石で見つかる巨大な生き物は？", a: "恐竜", options: ["マンモス", "恐竜", "クジラ", "ライオン"] },
  { q: "世界で一番広いといわれる大きな海（洋）の名前は？", a: "太平洋", options: ["大西洋", "インド洋", "太平洋", "日本海"] },
  { q: "5月5日の「こどもの日」に飾る、魚の形をした飾りは？", a: "鯉のぼり", options: ["鮭のぼり", "鯉のぼり", "鯛のぼり", "竜のぼり"] },
  { q: "日本の現在の首都（政治の中心地）はどこ？", a: "東京都", options: ["大阪府", "京都府", "東京都", "神奈川県"] },

  // --- 8. マナー・学校生活・なぞなぞ応用 ---
  { q: "お友達の家に入るときに言う 正しいあいさつは？", a: "おじゃまします", options: ["こんにちは", "おじゃまします", "あそぼう", "だれかいる？"] },
  { q: "くしゃみが出そうなときのマナーとして正しいのは？", a: "手やハンカチで口を押さえる", options: ["そのまま出す", "手やハンカチで口を押さえる", "空を向く", "叫ぶ"] },
  { q: "学校に忘れたものをしないために、いつ準備する？", a: "前の日の夜", options: ["朝起きたら", "学校に着いてから", "前の日の夜", "いつでもいい"] },
  { q: "お箸（はし）を正しく持つのはどっちの手？", a: "利き手", options: ["右手", "左手", "利き手", "両手"] },
  { q: "パンはパンでも、フライパン以外で食べられないパンは？", a: "ジーパン", options: ["メロンパン", "食パン", "クロワッサン", "ジーパン"] },
  { q: "逆立ちすると、体重がすごーく軽くなる動物は？", a: "イルカ", options: ["カバ", "イルカ", "ゾウ", "サル"] },
  { q: "お父さんが 毎日ずーっと嫌がっているくだものは？", a: "パパイヤ", options: ["ピーマン", "パパイヤ", "マンゴー", "バナナ"] },
  { q: "使うときは投げられて、使い終わると紐で縛られるおもちゃは？", a: "独楽（コマ）", options: ["ヨーヨー", "独楽（コマ）", "ボール", "縄跳び"] },
  { q: "中に入ると、誰もが静かになって本を読み始める場所は？", a: "図書館", options: ["遊園地", "映画館", "図書館", "体育館"] },
  { q: "日本で一番高くて、てっぺんに雪が積もる有名な山は？", a: "富士山", options: ["阿蘇山", "富士山", "エベレスト", "筑波山"] },
  { q: "お風呂に入るときに、必ずみんなが脱ぐ「お菓子」は？", a: "和菓子（上着）", options: ["チョコ", "クッキー", "上着（うわぎ）", "ドーナツ"] },
  { q: "いつも嘘（うそ）ばかりついている、部屋の真ん中にあるものは？", a: "床（とこ/嘘）", options: ["テレビ", "机", "イス", "床（ゆか）"] },
  { q: "切れば切るほど、どんどん長くなっていくものは何？", a: "髪の毛", options: ["紐", "髪の毛", "食パン", "紙テープ"] },
  { q: "上を向いているのに、下を向いているよと言われる体の一部は？", a: "まつげ", options: ["鼻の穴", "まつげ", "まゆげ", "あご"] },
  { q: "いくらおねだりしても、絶対に「嫌だ」という鳥は？", a: "クジャク（孔雀）", options: ["カラス", "クジャク", "ハト", "スズメ"] }
];

// ==========================================
// 2. モンスターデータ（全45体・演出メタ付完全版）
// ==========================================
export type MonsterStyle = {
  name: string;
  hp: number;
  img: string;
  isRare: boolean;
  tier: "ノーマル" | "レア" | "SSR" | "GOD";
  elementType: "grass" | "fire" | "water" | "thunder" | "dark" | "cosmo";
  bgGradient: string;
  animationClass: string;
};

export const monsterList: MonsterStyle[] = [
  // --- 1〜10: 始まりの草原・洞窟 ---
  { name: "プルプルスライム", hp: 150, img: "👾", isRare: false, tier: "ノーマル", elementType: "water", bgGradient: "from-blue-400 to-sky-300", animationClass: "animate-[bounce_2s_infinite]" },
  { name: "迷子のプチ・インプ", hp: 280, img: "😈", isRare: false, tier: "ノーマル", elementType: "dark", bgGradient: "from-purple-500 to-indigo-400", animationClass: "animate-[pulse_1.5s_infinite]" },
  { name: "✨キンピカ・タートル✨", hp: 400, img: "🐢", isRare: true, tier: "SSR", elementType: "thunder", bgGradient: "from-amber-400 via-yellow-300 to-amber-500", animationClass: "animate-[spin_6s_linear_infinite]" },
  { name: "メラメラくん", hp: 450, img: "🔥", isRare: false, tier: "ノーマル", elementType: "fire", bgGradient: "from-orange-500 to-red-500", animationClass: "animate-[pulse_1s_infinite]" },
  { name: "わんぱくゴブリン", hp: 550, img: "👺", isRare: false, tier: "ノーマル", elementType: "grass", bgGradient: "from-emerald-500 to-green-400", animationClass: "animate-[bounce_1.2s_infinite]" },
  { name: "かみつきチワワ", hp: 600, img: "🐕", isRare: false, tier: "ノーマル", elementType: "grass", bgGradient: "from-orange-300 to-yellow-200", animationClass: "animate-[pulse_2s_infinite]" },
  { name: "どろどろマッドマン", hp: 700, img: "💩", isRare: false, tier: "ノーマル", elementType: "dark", bgGradient: "from-yellow-800 to-stone-600", animationClass: "animate-[bounce_2.5s_infinite]" },
  { name: "パタパタ・コウモリ", hp: 750, img: "🦇", isRare: false, tier: "ノーマル", elementType: "dark", bgGradient: "from-slate-700 to-purple-900", animationClass: "animate-[bounce_1s_infinite]" },
  { name: "パックン・チェスト", hp: 850, img: "🧳", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-amber-700 to-stone-800", animationClass: "animate-pulse" },
  { name: "✨トパーズ・キャット✨", hp: 600, img: "🐱", isRare: true, tier: "SSR", elementType: "thunder", bgGradient: "from-amber-300 via-rose-300 to-yellow-400", animationClass: "animate-[bounce_2s_infinite]" },

  // --- 11〜25: 迷宮・妖精の森・地底湖 ---
  { name: "ビリビリ丸", hp: 1100, img: "⚡", isRare: false, tier: "レア", elementType: "thunder", bgGradient: "from-yellow-400 to-amber-300", animationClass: "animate-[pulse_0.5s_infinite]" },
  { name: "ドクドク・キノコ", hp: 1400, img: "🍄", isRare: false, tier: "ノーマル", elementType: "grass", bgGradient: "from-purple-600 to-emerald-600", animationClass: "animate-pulse" },
  { name: "✨クリスタル・クラブ✨", hp: 1000, img: "🦀", isRare: true, tier: "SSR", elementType: "water", bgGradient: "from-cyan-400 via-teal-300 to-blue-400", animationClass: "animate-[bounce_1.5s_infinite]" },
  { name: "おばけカボチャ", hp: 1800, img: "🎃", isRare: false, tier: "レア", elementType: "fire", bgGradient: "from-orange-600 to-yellow-500", animationClass: "animate-[bounce_1.8s_infinite]" },
  { name: "マッド・パペット", hp: 2100, img: "🧸", isRare: false, tier: "ノーマル", elementType: "grass", bgGradient: "from-amber-600 to-amber-900", animationClass: "animate-[bounce_2.2s_infinite]" },
  { name: "ストーン・ソルジャー", hp: 2500, img: "🧱", isRare: false, tier: "レア", elementType: "grass", bgGradient: "from-stone-500 to-stone-700", animationClass: "animate-[pulse_3s_infinite]" },
  { name: "怒りの呪いのワラ人形", hp: 2800, img: "🧍", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-red-900 to-stone-900", animationClass: "animate-bounce" },
  { name: "カチコチ・ウッドマン", hp: 3200, img: "🪵", isRare: false, tier: "ノーマル", elementType: "grass", bgGradient: "from-amber-800 to-green-800", animationClass: "animate-pulse" },
  { name: "深海のクラーケン", hp: 3800, img: "🦑", isRare: false, tier: "レア", elementType: "water", bgGradient: "from-blue-800 to-teal-900", animationClass: "animate-[bounce_2.5s_infinite]" },
  { name: "アーマード・マンティス", hp: 4300, img: "🐜", isRare: false, tier: "レア", elementType: "grass", bgGradient: "from-emerald-600 to-stone-600", animationClass: "animate-[pulse_1.2s_infinite]" }, // 螳より環境依存の低い🐜に変更

  // --- 26〜40: 荒野・天空城・古代遺跡 ---
  { name: "アイアン・ゴーレム", hp: 4800, img: "🗿", isRare: false, tier: "レア", elementType: "grass", bgGradient: "from-stone-500 to-slate-400", animationClass: "animate-[pulse_3s_infinite]" },
  { name: "✨黄金のスフィンクス✨", hp: 3500, img: "🦁", isRare: true, tier: "SSR", elementType: "thunder", bgGradient: "from-yellow-500 via-amber-400 to-yellow-600", animationClass: "animate-pulse" },
  { name: "毒針マッドハチ公", hp: 5300, img: "🐝", isRare: false, tier: "レア", elementType: "thunder", bgGradient: "from-amber-500 to-stone-700", animationClass: "animate-[bounce_1s_infinite]" },
  { name: "ミイラ男の呪い", hp: 5800, img: "🧻", isRare: false, tier: "ノーマル", elementType: "dark", bgGradient: "from-yellow-100 to-stone-400", animationClass: "animate-pulse" },
  { name: "密林のシャドウコブラ", hp: 6500, img: "🐍", isRare: false, tier: "レア", elementType: "grass", bgGradient: "from-green-700 to-purple-900", animationClass: "animate-[pulse_1.8s_infinite]" },
  { name: "マグマ・ギガンテス", hp: 7500, img: "🌋", isRare: false, tier: "レア", elementType: "fire", bgGradient: "from-red-700 to-orange-600", animationClass: "animate-bounce" },
  { name: "アーマード・ヘヴィビートル", hp: 8500, img: "🪲", isRare: false, tier: "レア", elementType: "grass", bgGradient: "from-cyan-900 to-slate-800", animationClass: "animate-pulse" },
  { name: "シャドー・ナイトウルフ", hp: 9500, img: "🐺", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-indigo-900 to-slate-900", animationClass: "animate-[bounce_1.4s_infinite]" },
  { name: "✨メタル・ジェネラル✨", hp: 6000, img: "🤖", isRare: true, tier: "SSR", elementType: "cosmo", bgGradient: "from-slate-400 via-zinc-300 to-cyan-500", animationClass: "animate-[spin_12s_linear_infinite]" },
  { name: "氷結のウインタージャイアント", hp: 12000, img: "🧊", isRare: false, tier: "レア", elementType: "water", bgGradient: "from-sky-300 to-blue-500", animationClass: "animate-pulse" },

  // --- 41〜55: 地獄の門・試練の塔 ---
  { name: "古代兵器オメガロボ", hp: 15500, img: "🛸", isRare: false, tier: "レア", elementType: "cosmo", bgGradient: "from-zinc-700 to-purple-800", animationClass: "animate-[spin_8s_linear_infinite]" },
  { name: "✨エメラルド・フェニックス✨", hp: 8500, img: "🦅", isRare: true, tier: "SSR", elementType: "grass", bgGradient: "from-emerald-400 via-teal-300 to-green-500", animationClass: "animate-[bounce_2.5s_infinite]" },
  { name: "ヘルハウンド・ケルベロス", hp: 18000, img: "🐕‍🦺", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-red-800 to-stone-900", animationClass: "animate-[pulse_1s_infinite]" },
  { name: "毒霧のスモッグ・ガス", hp: 20000, img: "💨", isRare: false, tier: "ノーマル", elementType: "water", bgGradient: "from-teal-600 to-slate-600", animationClass: "animate-pulse" },
  { name: "死神のシャドウリーパー", hp: 23000, img: "👻", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-violet-900 to-black", animationClass: "animate-[bounce_2s_infinite]" },
  { name: "溶岩マント・ファイアコング", hp: 26000, img: "🦍", isRare: false, tier: "レア", elementType: "fire", bgGradient: "from-orange-600 to-red-700", animationClass: "animate-pulse" },
  { name: "機動要塞パワードスーツ", hp: 30000, img: "🦿", isRare: false, tier: "レア", elementType: "cosmo", bgGradient: "from-slate-600 to-zinc-800", animationClass: "animate-[pulse_2s_infinite]" },

  // --- 最深部・伝説の神々・ラストボスクラス ---
  { name: "灼熱 of レベリアドラゴン", hp: 35000, img: "🐲", isRare: false, tier: "レア", elementType: "fire", bgGradient: "from-rose-700 via-red-500 to-amber-600", animationClass: "animate-pulse" },
  { name: "暗黒騎士すみ", hp: 45000, img: "⚔️", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-purple-900 via-stone-800 to-black", animationClass: "animate-[pulse_1.2s_infinite]" },
  { name: "デス・ネクロマンサー", hp: 55000, img: "🧙", isRare: false, tier: "レア", elementType: "dark", bgGradient: "from-fuchsia-900 to-stone-950", animationClass: "animate-bounce" },
  { name: "✨極光のダイヤモンド竜✨", hp: 20000, img: "💎", isRare: true, tier: "SSR", elementType: "cosmo", bgGradient: "from-fuchsia-400 via-cyan-300 to-indigo-400", animationClass: "animate-[bounce_3s_infinite]" },
  { name: "古代神マオー・ゼウス", hp: 70000, img: "👿", isRare: false, tier: "GOD", elementType: "dark", bgGradient: "from-violet-800 via-fuchsia-900 to-slate-900", animationClass: "animate-[pulse_0.8s_infinite]" },
  { name: "世界蛇ヨルムンガンド・コア", hp: 85000, img: "🐉", isRare: false, tier: "GOD", elementType: "water", bgGradient: "from-teal-800 via-cyan-900 to-blue-950", animationClass: "animate-[pulse_1.5s_infinite]" },
  { name: "冥王ハデス・エタニティ", hp: 100000, img: "💀", isRare: false, tier: "GOD", elementType: "dark", bgGradient: "from-stone-800 via-purple-950 to-black", animationClass: "animate-pulse" },
  { name: "究極時空超獣クロノス", hp: 120000, img: "🪐", isRare: false, tier: "GOD", elementType: "cosmo", bgGradient: "from-indigo-900 via-purple-600 to-pink-500", animationClass: "animate-[spin_20s_linear_infinite]" },
  { name: "よしおかしずか（神の化身）", hp: 150000, img: "👑", isRare: false, tier: "GOD", elementType: "cosmo", bgGradient: "from-amber-400 via-rose-400 to-teal-400 animate-pulse", animationClass: "animate-[bounce_0.5s_infinite]" }
];

// ==========================================
// 3. ガチャテーブル（全25種類・完全演出付フル枠）
// ==========================================
export type WeaponStyle = {
  name: string;
  power: number;
  img: string;
  weight: number;
  isHazure: boolean;
  rarity: "N" | "R" | "SR" | "SSR" | "UR";
  rarityColor: string;
};

export const gachaTable: WeaponStyle[] = [
  // --- ハズレ・おちゃめ枠 (Rarity: N) ---
  { name: "ゆうりのうんち", power: 0, img: "💩", weight: 15, isHazure: true, rarity: "N", rarityColor: "text-amber-800" },
  { name: "バナナの皮", power: 1, img: "🍌", weight: 12, isHazure: true, rarity: "N", rarityColor: "text-yellow-600" },
  { name: "ゆうりの破れた靴下", power: 2, img: "🧦", weight: 10, isHazure: true, rarity: "N", rarityColor: "text-slate-400" },
  { name: "ただの雑草", power: 3, img: "🌿", weight: 8, isHazure: true, rarity: "N", rarityColor: "text-emerald-700" },
  { name: "穴のあいたバケツ", power: 5, img: "🪣", weight: 6, isHazure: true, rarity: "N", rarityColor: "text-blue-500" },
  { name: "ひん曲がった針金", power: 6, img: "📎", weight: 5, isHazure: true, rarity: "N", rarityColor: "text-zinc-500" },
  { name: "ただの硬い石ころ", power: 8, img: "🪨", weight: 4, isHazure: true, rarity: "N", rarityColor: "text-stone-500" },
  { name: "枯れた木の枝", power: 9, img: "🥢", weight: 3, isHazure: true, rarity: "N", rarityColor: "text-amber-700" },
  { name: "謎の割れたガラスの破片", power: 10, img: "🥛", weight: 2, isHazure: true, rarity: "N", rarityColor: "text-sky-400" },
  { name: "カビの生えたパンくず", power: 12, img: "🍞", weight: 1, isHazure: true, rarity: "N", rarityColor: "text-yellow-700" },
  
  // --- 通常装備 (Rarity: R) ---
  { name: "見習いの木刀", power: 20, img: "🪵", weight: 8, isHazure: false, rarity: "R", rarityColor: "text-emerald-600" },
  { name: "銅のつるぎ", power: 35, img: "🗡️", weight: 7, isHazure: false, rarity: "R", rarityColor: "text-cyan-600" },
  { name: "錆びたてつの斧", power: 50, img: "🪓", weight: 6, isHazure: false, rarity: "R", rarityColor: "text-stone-600" },
  { name: "兵士の鉄製ロングスピア", power: 70, img: "🔱", weight: 5, isHazure: false, rarity: "R", rarityColor: "text-blue-600" },
  { name: "魔術師のノーマルスタッフ", power: 90, img: "🪄", weight: 4, isHazure: false, rarity: "R", rarityColor: "text-purple-600" },
  { name: "狩人のウッドロングボウ", power: 110, img: "🏹", weight: 3, isHazure: false, rarity: "R", rarityColor: "text-orange-600" },
  { name: "重戦士のブロンズメイス", power: 135, img: "🔨", weight: 2, isHazure: false, rarity: "R", rarityColor: "text-yellow-700" },
  { name: "アサシンのツインダガー", power: 160, img: "⚔️", weight: 1.5, isHazure: false, rarity: "R", rarityColor: "text-slate-700" },

  // --- レア装備 (Rarity: SR) ---
  { name: "紅蓮の炎熱大刀", power: 220, img: "🔥", weight: 2.2, isHazure: false, rarity: "SR", rarityColor: "text-orange-500 font-bold" },
  { name: "氷結のフリーズハンマー", power: 280, img: "🔨", weight: 1.8, isHazure: false, rarity: "SR", rarityColor: "text-blue-500 font-bold" },
  { name: "裁きのサンダーボルトムチ", power: 350, img: "⚡", weight: 1.5, isHazure: false, rarity: "SR", rarityColor: "text-yellow-500 font-bold" },
  { name: "大地のガイアヘヴィ大剣", power: 430, img: "⚔️", weight: 1.2, isHazure: false, rarity: "SR", rarityColor: "text-green-600 font-bold" },
  { name: "風ノ翼のサファイアエッジ", power: 520, img: "🏹", weight: 1.0, isHazure: false, rarity: "SR", rarityColor: "text-sky-500 font-bold" },
  { name: "鳳凰のホーリーシールド", power: 620, img: "🛡️", weight: 0.8, isHazure: false, rarity: "SR", rarityColor: "text-amber-500 font-bold" },
  { name: "大海原のポセイドントライデント", power: 730, img: "🔱", weight: 0.6, isHazure: false, rarity: "SR", rarityColor: "text-teal-500 font-bold" },
  { name: "妖狐の紫水双剣", power: 850, img: "⚔️", weight: 0.5, isHazure: false, rarity: "SR", rarityColor: "text-fuchsia-500 font-bold" },

  // --- 超レア・伝説・神話・アルティメット級 (Rarity: SSR / UR) ---
  { name: "王宮のシャイニング・エクス・カリバー", power: 1100, img: "✨", weight: 0.4, isHazure: false, rarity: "SSR", rarityColor: "text-yellow-500 font-extrabold tracking-wider" },
  { name: "銀河のビッグバン時空破壊斧", power: 1400, img: "🌌", weight: 0.25, isHazure: false, rarity: "SSR", rarityColor: "text-purple-500 font-extrabold tracking-wider" },
  { name: "深淵のインフェルノ冥府魔鎌", power: 1800, img: "🌙", weight: 0.18, isHazure: false, rarity: "SSR", rarityColor: "text-slate-800 font-extrabold tracking-wider" },
  { name: "精霊王のエターナルスター全知全能杖", power: 2300, img: "🌟", weight: 0.12, isHazure: false, rarity: "SSR", rarityColor: "text-amber-400 font-extrabold tracking-wider" },
  { name: "次元を超越せし覇王ヴォイド神剣", power: 3000, img: "🔮", weight: 0.06, isHazure: false, rarity: "UR", rarityColor: "text-fuchsia-600 font-black tracking-widest animate-pulse" },
  { name: "創世の十二翼セラフィムブレード", power: 4000, img: "👼", weight: 0.03, isHazure: false, rarity: "UR", rarityColor: "text-sky-400 font-black tracking-widest" },
  { name: "魔王滅殺機甲竜の波動砲", power: 5500, img: "🐉", weight: 0.015, isHazure: false, rarity: "UR", rarityColor: "text-emerald-500 font-black tracking-widest" },
  { name: "終焉のゴッドオデッセイブレード", power: 7500, img: "👑", weight: 0.005, isHazure: false, rarity: "UR", rarityColor: "text-amber-500 font-black tracking-widest animate-pulse" },
  { name: "究極至高インフィニティ・ラグナロク・オメガ", power: 9999, img: "🔱", weight: 0.001, isHazure: false, rarity: "UR", rarityColor: "text-red-600 font-black tracking-widest animate-bounce" }
];
