"use client";

import { useState, useEffect, useRef } from "react";
import { AGENTS, MESSAGE_DELAY, TYPING_DURATION } from "@/lib/constants";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { TimelineMessage } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function ArenaScreen({
  task,
  timeline,
  onArenaComplete,
  t,
  isRtl,
}: {
  task: string;
  timeline: TimelineMessage[];
  onArenaComplete: () => void;
  t: UIText;
  isRtl: boolean;
}) {
  const [visibleMessages, setVisibleMessages] = useState<TimelineMessage[]>([]);
  const [typingAgent, setTypingAgent] = useState<string | null>(null);
  const [arenaComplete, setArenaComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;

    function showNext() {
      if (cancelled) return;
      if (idx >= timeline.length) {
        setTypingAgent(null);
        setArenaComplete(true);
        return;
      }
      const msg = timeline[idx];
      setTypingAgent(msg.agent);

      setTimeout(() => {
        if (cancelled) return;
        setTypingAgent(null);
        setVisibleMessages((prev) => [...prev, msg]);
        idx++;
        setTimeout(showNext, MESSAGE_DELAY - TYPING_DURATION);
      }, TYPING_DURATION);
    }

    const start = setTimeout(showNext, 1200);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [timeline]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, typingAgent, arenaComplete]);

  return (
    <div
      className="relative z-[1] max-w-[640px] mx-auto px-6 pt-8 pb-10 flex flex-col items-center min-h-screen"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Header */}
      <div className="w-full mb-5 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-arena-creative/[0.08] border border-arena-creative/20 font-mono text-[11px] tracking-widest uppercase text-arena-creative mb-3">
          <span>⚔️</span>
          <span>{t.arenaLive}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-2">
          <div className="text-[11px] font-mono text-[#555568] uppercase tracking-[1.5px] mb-1.5">
            {t.taskLabel}
          </div>
          <div className="text-[15px] text-[#c8c8d8] leading-relaxed">{task}</div>
        </div>

        <div className="flex gap-4 justify-center py-2.5">
          {Object.values(AGENTS).map((a) => (
            <div key={a.id} className="flex items-center gap-1.5 text-xs font-mono" style={{ color: a.color }}>
              <span>{a.emoji}</span>{a.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="w-full flex-1 flex flex-col gap-3.5 pb-6">
        {visibleMessages.map((msg, i) => (
          <ChatBubble key={i} agent={AGENTS[msg.agent]} text={msg.text} isRtl={isRtl} />
        ))}

        {typingAgent && <TypingIndicator agent={AGENTS[typingAgent as keyof typeof AGENTS]} t={t} />}

        {arenaComplete && (
          <div className="text-center pt-8 pb-2 animate-fade-in-up">
            <div className="text-[13px] font-mono text-arena-creative tracking-widest uppercase mb-2.5">
              {t.arenaComplete}
            </div>
            <div className="text-[22px] font-semibold text-[#e8e8ed] leading-snug mb-4">
              {t.chooseWinner}
            </div>
            <button
              onClick={onArenaComplete}
              className="py-4 px-9 rounded-xl border-none text-[#0a0a0f] text-base font-semibold cursor-pointer transition-all animate-pulse-glow hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(251,146,60,0.3)] min-h-[52px]"
              style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)" }}
            >
              {t.castVote}
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
