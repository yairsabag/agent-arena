"use client";

import type { Agent } from "@/lib/constants";

export function ChatBubble({
  agent,
  text,
  isRtl,
}: {
  agent: Agent;
  text: string;
  isRtl: boolean;
}) {
  return (
    <div
      className="flex gap-2.5 items-start animate-fade-in-up mb-1.5"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
        style={{ background: agent.bgColor, border: `1.5px solid ${agent.borderColor}` }}
      >
        {agent.emoji}
      </div>
      <div style={{ flex: 1, maxWidth: "calc(100% - 50px)" }}>
        <div
          className="text-[11px] font-mono mb-1 tracking-wide"
          style={{ color: agent.color }}
        >
          {agent.name}
        </div>
        <div
          className="py-3 px-4 text-sm leading-relaxed"
          style={{
            borderRadius: "4px 16px 16px 16px",
            background: agent.bgColor,
            border: `1px solid ${agent.borderColor}`,
            color: "#d4d4e0",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
