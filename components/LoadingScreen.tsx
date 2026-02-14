"use client";

import { useState, useEffect } from "react";
import { AGENTS } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function LoadingScreen({ t }: { t: UIText }) {
  const [dots, setDots] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const d = setInterval(() => setDots((v) => (v + 1) % 4), 400);
    const m = setInterval(() => setMsgIdx((v) => (v + 1) % t.loadingMsgs.length), 2200);
    return () => { clearInterval(d); clearInterval(m); };
  }, [t.loadingMsgs.length]);

  return (
    <div className="relative z-[1] max-w-[640px] mx-auto px-6 pt-0 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in-up">
        <div className="text-[56px] mb-6 animate-pulse-avatar">⚔️</div>
        <div className="text-[22px] font-semibold text-[#e8e8ed] mb-4">
          {t.enteringArena}{".".repeat(dots)}
        </div>
        <div className="text-sm text-[#8888a0] font-mono transition-opacity min-h-[20px]">
          {t.loadingMsgs[msgIdx]}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Object.values(AGENTS).map((a, i) => (
            <div
              key={a.id}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{
                background: a.bgColor,
                border: `2px solid ${a.borderColor}`,
                animation: `pulseAvatar 1.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              {a.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
