"use client";

import { useState } from "react";
import { AGENTS } from "@/lib/constants";
import { SharePanel } from "./SharePanel";
import type { JudgeResult, AgentId } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function JudgeVerdict({
  judge,
  userVote,
  task,
  t,
  isRtl,
  onReset,
}: {
  judge: JudgeResult;
  userVote: AgentId;
  task: string;
  t: UIText;
  isRtl: boolean;
  onReset: () => void;
}) {
  const [showShare, setShowShare] = useState(false);
  const winnerAgent = AGENTS[judge.winner];
  const userAgent = AGENTS[userVote];
  const userAgreed = userVote === judge.winner;

  return (
    <div className="w-full animate-fade-in-up" style={{ direction: isRtl ? "rtl" : "ltr" }}>
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

      {/* Agreement badge */}
      <div className="flex justify-center mb-5">
        <div
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full text-[13px] font-mono"
          style={{
            background: userAgreed ? "rgba(74,222,128,0.08)" : "rgba(251,146,60,0.08)",
            border: `1px solid ${userAgreed ? "rgba(74,222,128,0.25)" : "rgba(251,146,60,0.25)"}`,
            color: userAgreed ? "#4ade80" : "#fb923c",
          }}
        >
          {userAgreed ? t.agreedJudge : `${t.youVoted} ${userAgent.emoji} ${userAgent.name}`}
        </div>
      </div>

      {/* Verdict */}
      <div
        className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-4"
        style={{ textAlign: isRtl ? "right" : "left" }}
      >
        <div className="text-[15px] text-[#c8c8d8] leading-relaxed mb-4">
          {judge.verdict}
        </div>
        <div className="flex flex-col gap-2">
          {judge.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#9898b0] leading-relaxed">
              <span className="text-[8px] mt-[7px] flex-shrink-0" style={{ color: winnerAgent.color }}>
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
          style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)" }}
        >
          {t.tryAnother}
        </button>
      </div>

      {showShare && (
        <SharePanel
          task={task}
          judge={judge}
          userVote={userVote}
          t={t}
          isRtl={isRtl}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
