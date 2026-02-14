"use client";

import type { Agent } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function TypingIndicator({ agent, t }: { agent: Agent; t: UIText }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 animate-fade-in-up">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm animate-pulse-avatar"
        style={{ background: agent.bgColor, border: `1.5px solid ${agent.borderColor}` }}
      >
        {agent.emoji}
      </div>
      <div
        className="flex items-center gap-2 py-2.5 px-4 rounded-2xl"
        style={{ background: agent.bgColor, border: `1px solid ${agent.borderColor}` }}
      >
        <span className="text-[13px] font-mono tracking-wide" style={{ color: agent.color }}>
          {agent.name} {t.thinking}
        </span>
        <span className="flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[5px] h-[5px] rounded-full"
              style={{
                background: agent.color,
                opacity: 0.7,
                animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
