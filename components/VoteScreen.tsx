"use client";

import { useState } from "react";
import { AGENTS } from "@/lib/constants";
import { VoteCard } from "./VoteCard";
import type { TimelineMessage, AgentId } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function VoteScreen({
  timeline,
  onVote,
  t,
  isRtl,
}: {
  timeline: TimelineMessage[];
  onVote: (id: AgentId) => void;
  t: UIText;
  isRtl: boolean;
}) {
  const [selected, setSelected] = useState<AgentId | null>(null);

  // Get last message per agent as their best quote
  const lastMsgs: Record<string, string> = {};
  timeline.forEach((m) => { lastMsgs[m.agent] = m.text; });

  function handleVote(id: AgentId) {
    setSelected(id);
    setTimeout(() => onVote(id), 1200);
  }

  return (
    <div
      className="relative z-[1] max-w-[640px] mx-auto px-6 pt-10 pb-10 flex flex-col items-center justify-center min-h-screen"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <div className="w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-arena-creative tracking-widest uppercase mb-2.5">
            {t.yourVote}
          </div>
          <div className="text-[26px] font-bold text-[#e8e8ed] mb-1.5">{t.whoWon}</div>
          <div className="text-[15px] text-[#666680]">{t.pickMind}</div>
        </div>

        <div className="flex flex-col gap-3">
          {Object.values(AGENTS).map((agent, i) => (
            <div
              key={agent.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <VoteCard
                agent={agent}
                quote={lastMsgs[agent.id] || ""}
                selected={selected}
                dimmed={!!selected}
                onVote={handleVote}
                t={t}
                isRtl={isRtl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
