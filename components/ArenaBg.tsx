"use client";

const blobs = [
  { bg: "radial-gradient(circle, rgba(251,146,60,0.10) 0%, transparent 70%)", size: 420, top: "10%", left: "70%", dur: 18 },
  { bg: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)", size: 350, top: "60%", left: "10%", dur: 22 },
  { bg: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", size: 300, top: "30%", left: "50%", dur: 20 },
  { bg: "radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)", size: 260, top: "70%", left: "80%", dur: 24 },
  { bg: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", size: 320, top: "5%", left: "20%", dur: 19 },
  { bg: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)", size: 280, top: "80%", left: "55%", dur: 21 },
];

export function ArenaBg() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            background: b.bg,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            animation: `floatBlob ${b.dur}s ease-in-out infinite alternate`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
    </div>
  );
}
