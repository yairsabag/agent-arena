"use client";

import { useState, useEffect } from "react";
import { AGENTS } from "@/lib/constants";
import { SharePanel } from "./SharePanel";
import type { JudgeResult, AgentId, VerdictData } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

function ClarificationScreen({
  judge,
  onSelect,
  t,
  isRtl,
}: {
  judge: JudgeResult;
  onSelect: (optionId: string) => void;
  t: UIText;
  isRtl: boolean;
}) {
  return (
    <div
      className="w-full animate-fade-in-up"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <div className="text-center mb-8">
        <div className="text-[40px] mb-4">🤔</div>
        <div className="text-xs font-mono text-arena-creative tracking-widest uppercase mb-3">
          {isRtl ? "⚖️ השופט צריך עוד פרט" : "⚖️ The Judge needs one more thing"}
        </div>
        <div className="text-[22px] font-semibold text-[#e8e8ed] leading-snug">
          {judge.question}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {judge.options?.map((option, i) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="w-full py-5 px-6 rounded-2xl bg-white/[0.03] border-[1.5px] border-white/[0.08] text-[#e8e8ed] text-lg font-medium cursor-pointer transition-all hover:bg-white/[0.06] hover:border-arena-creative/30 hover:scale-[1.02] active:scale-[0.98] min-h-[60px] animate-fade-in-up"
            style={{
              animationDelay: `${0.1 + i * 0.1}s`,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function VerdictDisplay({
  verdictData,
  task,
  t,
  isRtl,
  onReset,
}: {
  verdictData: VerdictData;
  task: string;
  t: UIText;
  isRtl: boolean;
  onReset: () => void;
}) {
  const [showShare, setShowShare] = useState(false);
  const winnerAgent = AGENTS[verdictData.winner];

  return (
    <div
      className="w-full animate-fade-in-up"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-xs font-mono text-arena-creative tracking-widest uppercase mb-2">
          {t.judgeVerdict}
        </div>
        <div className="text-[28px] font-bold text-[#e8e8ed]">
          <span style={{ color: winnerAgent.color }}>
            {winnerAgent.emoji} {winnerAgent.name}
          </span>{" "}
          {t.wins}
        </div>
      </div>

      {/* Verdict */}
      <div
        className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-4"
        style={{ textAlign: isRtl ? "right" : "left" }}
      >
        <div className="text-[15px] text-[#c8c8d8] leading-relaxed mb-4">
          {verdictData.verdict}
        </div>
        <div className="flex flex-col gap-2">
          {verdictData.bullets.map((bullet, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-[#9898b0] leading-relaxed"
            >
              <span
                className="text-[8px] mt-[7px] flex-shrink-0"
                style={{ color: winnerAgent.color }}
              >
                ●
              </span>
              {bullet}
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2.5 mt-5 flex-wrap">
        <button
          onClick={() => setShowShare(true)}
          className="flex-1 min-w-[140px] py-4 rounded-xl bg-white/5 border border-white/[0.12] text-[#a0a0b8] text-sm font-medium cursor-pointer transition-all hover:bg-white/[0.08] hover:text-[#e8e8ed] min-h-[52px]"
        >
          {t.shareResult}
        </button>
        <button
          onClick={onReset}
          className="flex-1 min-w-[140px] py-4 rounded-xl border-none text-[#0a0a0f] text-sm font-semibold cursor-pointer transition-all hover:-translate-y-px min-h-[52px]"
          style={{
            background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
          }}
        >
          {t.tryAnother}
        </button>
      </div>

      {showShare && (
        <SharePanel
          task={task}
          judge={{
            winner: verdictData.winner,
            verdict: verdictData.verdict,
            bullets: verdictData.bullets,
            needs_clarification: false,
          }}
          userVote={verdictData.winner}
          t={t}
          isRtl={isRtl}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}

export function ResultScreen({
  judge,
  task,
  t,
  isRtl,
  onReset,
}: {
  judge: JudgeResult;
  task: string;
  t: UIText;
  isRtl: boolean;
  onReset: () => void;
}) {
  const [phase, setPhase] = useState<"thinking" | "clarify" | "verdict">(
    "thinking"
  );
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictData | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (judge.needs_clarification) {
        setPhase("clarify");
      } else {
        setSelectedVerdict({
          winner: judge.winner!,
          verdict: judge.verdict!,
          bullets: judge.bullets!,
        });
        setPhase("verdict");
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [judge]);

  function handleOptionSelect(optionId: string) {
    const verdict = judge.verdicts?.[optionId];
    if (verdict) {
      setSelectedVerdict(verdict);
      setPhase("verdict");
    }
  }

  return (
    <div className="relative z-[1] max-w-[640px] mx-auto px-6 pt-10 pb-10 flex flex-col items-center justify-center min-h-screen">
      {phase === "thinking" && (
        <div className="text-center animate-fade-in-up">
          <div className="text-[40px] mb-5 animate-pulse-avatar">⚖️</div>
          <div className="text-xl font-semibold text-[#e8e8ed] mb-2.5">
            {t.judgeDeliberate}
          </div>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-arena-creative opacity-70"
                style={{
                  animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {phase === "clarify" && (
        <ClarificationScreen
          judge={judge}
          onSelect={handleOptionSelect}
          t={t}
          isRtl={isRtl}
        />
      )}

      {phase === "verdict" && selectedVerdict && (
        <VerdictDisplay
          verdictData={selectedVerdict}
          task={task}
          t={t}
          isRtl={isRtl}
          onReset={onReset}
        />
      )}
    </div>
  );
}
