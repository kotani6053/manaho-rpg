import './globals.css'; // ← この1行が「絶対に」必要です！

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* bg-slate-950 を入れることで、画面全体の背景が真っ暗になります */}
      <body className="bg-slate-950">{children}</body>
    </html>
  );
}
