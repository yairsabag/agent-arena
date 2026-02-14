"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AGENTS } from "@/lib/constants";
import { ArenaBg } from "@/components/ArenaBg";
import type { AgentId } from "@/lib/constants";

function ShareContent() {
  const searchParams = useSearchParams();

  const task = searchParams.get("task") || "Unknown task";
  const winner = (searchParams.get("winner") || "logical") as AgentId;
  const winnerAgent = AGENTS[winner] || AGENTS.logical;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8ed] font-outfit relative overflow-hidden">
      <ArenaBg />

      <div className="relative z-[1] max-w-[640px] mx-auto px-6 pt-16 pb-10 flex flex-col items-center min-h-screen">
        <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-arena-creative/[0.08] border border-arena-creative/20 font-mono text-[11px] tracking-widest uppercase text-arena-creative mb-8">
          <span>⚔️</span>
          <span>Agent Arena Result</span>
        </div>

        <div className="text-center mb-8">
          <div className="text-[48px] mb-4">{winnerAgent.emoji}</div>
          <div className="text-3xl font-bold mb-2">
            <span style={{ color: winnerAgent.color }}>{winnerAgent.name}</span> wins!
          </div>
        </div>

        <div className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
          <div className="text-[11px] font-mono text-[#555568] uppercase tracking-[1.5px] mb-2">Task</div>
          <div className="text-[15px] text-[#c8c8d8] leading-relaxed">{task}</div>
        </div>

        <a
          href="/"
          className="py-4 px-10 rounded-xl border-none text-[#0a0a0f] text-base font-semibold no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(251,146,60,0.3)]"
          style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)" }}
        >
          ⚔️ Try Your Own Task
        </a>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <ShareContent />
    </Suspense>
  );
}
