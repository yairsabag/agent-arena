"use client";

import type { Agent, AgentId } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function VoteCard({
  agent,
  quote,
  selected,
  dimmed,
  onVote,
  t,
  isRtl,
}: {
  agent: Agent;
  quote: string;
  selected: AgentId | null;
  dimmed: boolean;
  onVote: (id: AgentId) => void;
  t: UIText;
  isRtl: boolean;
}) {
  const isSelected = selected === agent.id;
  const isDimmed = dimmed && !isSelected;

  return (
    <button
      onClick={() => !selected && onVote(agent.id as AgentId)}
      className="w-full rounded-2xl relative overflow-hidden text-left font-outfit transition-all duration-400"
      style={{
        padding: 18,
        background: isSelected ? agent.hoverBg : agent.bgColor,
        border: `2px solid ${isSelected ? agent.color : agent.borderColor}`,
        cursor: selected ? "default" : "pointer",
        transform: isSelected ? "scale(1.03)" : isDimmed ? "scale(0.96)" : "scale(1)",
        opacity: isDimmed ? 0.35 : 1,
        boxShadow: isSelected ? `0 0 30px ${agent.glowColor}, 0 0 60px ${agent.bgColor}` : "none",
        textAlign: isRtl ? "right" : "left",
        direction: isRtl ? "rtl" : "ltr",
        minHeight: 52,
      }}
    >
      {isSelected && (
        <div
          className="absolute top-3 text-[11px] font-mono tracking-wide uppercase animate-fade-in-up"
          style={{ color: agent.color, ...(isRtl ? { left: 14 } : { right: 14 }) }}
        >
          {t.votedLabel}
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-[22px]"
          style={{ background: agent.bgColor, border: `2px solid ${agent.borderColor}` }}
        >
          {agent.emoji}
        </div>
        <div>
          <div className="text-lg font-semibold" style={{ color: agent.color }}>
            {agent.name}
          </div>
          <div className="text-xs text-[#666680] font-mono">
            {agent.id === "creative" ? t.creativeDesc : agent.id === "logical" ? t.logicalDesc : t.realistDesc}
          </div>
        </div>
      </div>

      <div className="text-[13px] text-[#9898b0] leading-relaxed italic" style={{ paddingInlineStart: 4 }}>
        &ldquo;{quote}&rdquo;
      </div>
    </button>
  );
}
