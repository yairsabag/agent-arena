"use client";

import { useState } from "react";
import { AGENTS } from "@/lib/constants";
import type { JudgeResult, AgentId } from "@/lib/constants";
import type { UIText } from "@/lib/i18n";

export function SharePanel({
  task,
  judge,
  userVote,
  t,
  isRtl,
  onClose,
}: {
  task: string;
  judge: JudgeResult;
  userVote: AgentId;
  t: UIText;
  isRtl: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const winnerAgent = AGENTS[userVote];
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${appUrl}/share?task=${encodeURIComponent(task)}&winner=${userVote}`;

  const shareText = isRtl
    ? `⚔️ זירת הסוכנים: "${task.substring(0, 60)}${task.length > 60 ? "..." : ""}" — ${winnerAgent.emoji} ${winnerAgent.name} ניצח!`
    : `⚔️ Agent Arena: "${task.substring(0, 60)}${task.length > 60 ? "..." : ""}" — ${winnerAgent.emoji} ${winnerAgent.name} wins!`;

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[420px] bg-[#141420] rounded-[20px] border border-white/[0.08] animate-slide-up"
        style={{ padding: "28px 24px", direction: isRtl ? "rtl" : "ltr" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 w-8 h-8 rounded-full bg-white/5 border-none text-[#666680] text-base cursor-pointer flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
          style={isRtl ? { left: 14 } : { right: 14 }}
        >
          ✕
        </button>

        <div className="text-center mb-5">
          <div className="text-[32px] mb-2">🏆</div>
          <div className="text-lg font-semibold text-[#e8e8ed] mb-1">{t.shareTitle}</div>
          <div className="text-[13px] text-[#666680]">
            <span style={{ color: winnerAgent.color }}>
              {winnerAgent.emoji} {winnerAgent.name}
            </span>{" "}
            {t.wins}!
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.06] mb-4" style={{ direction: "ltr" }}>
          <div className="flex-1 text-xs text-[#555568] font-mono overflow-hidden text-ellipsis whitespace-nowrap">
            {shareUrl.length > 50 ? shareUrl.substring(0, 50) + "..." : shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="py-2 px-4 rounded-lg border-none text-xs font-semibold font-mono cursor-pointer transition-all whitespace-nowrap min-h-[36px]"
            style={{
              background: copied ? "rgba(74,222,128,0.15)" : "rgba(251,146,60,0.12)",
              color: copied ? "#4ade80" : "#fb923c",
            }}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`, "_blank")}
            className="w-full py-3.5 rounded-xl border border-[rgba(37,211,102,0.20)] text-[#25d366] text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-[rgba(37,211,102,0.14)] min-h-[52px]"
            style={{ background: "rgba(37,211,102,0.08)" }}
          >
            <span className="text-lg">💬</span> {t.shareWhatsApp}
          </button>

          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank")}
            className="w-full py-3.5 rounded-xl border border-[rgba(29,155,240,0.20)] text-[#1d9bf0] text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-[rgba(29,155,240,0.14)] min-h-[52px]"
            style={{ background: "rgba(29,155,240,0.08)" }}
          >
            <span className="text-lg">🐦</span> {t.shareTwitter}
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#a0a0b8] text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-white/[0.08] hover:text-[#e8e8ed] min-h-[52px]"
          >
            <span className="text-lg">🔗</span> {copied ? t.shareCopied : t.shareCopy}
          </button>
        </div>
      </div>
    </div>
  );
}
