import './globals.css'; // ← これを必ず1行目に追加してください！

export const metadata = {
  title: '勉強RPG',
  description: 'たのしく漢字と算数を学ぼう！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* デザインを反映させるために body に背景色などをつけるとより確実です */}
      <body className="bg-slate-950">{children}</body>
    </html>
  );
}
