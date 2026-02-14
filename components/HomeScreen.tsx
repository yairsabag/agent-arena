"use client";

import { useState } from "react";
import { AGENTS, MAX_CHARS, EXAMPLE_CHIPS } from "@/lib/constants";
import { UI_TEXT } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export function HomeScreen({
  onStart,
  lang,
  setLang,
}: {
  onStart: (task: string) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [task, setTask] = useState("");
  const t = UI_TEXT[lang];
  const isRtl = lang === "he";
  const charsLeft = MAX_CHARS - task.length;
  const canStart = task.trim().length > 0;
  const chips = EXAMPLE_CHIPS[lang];

  return (
    <div
      className="relative z-[1] max-w-[640px] mx-auto px-6 pt-[60px] pb-10 flex flex-col items-center min-h-screen max-sm:px-4 max-sm:pt-12"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Language toggle */}
      <div
        className="absolute top-4 flex gap-1 p-[3px] rounded-[10px] bg-white/[0.04] border border-white/[0.08] z-10"
        style={isRtl ? { left: 16 } : { right: 16 }}
      >
        {(["en", "he"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="py-2 px-4 rounded-lg border-none text-[13px] font-medium cursor-pointer font-mono transition-all min-h-[40px] min-w-[44px]"
            style={{
              background: lang === l ? "rgba(251,146,60,0.15)" : "transparent",
              color: lang === l ? "#fb923c" : "#555568",
            }}
          >
            {l === "en" ? "EN" : "עב"}
          </button>
        ))}
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-arena-creative/[0.08] border border-arena-creative/20 font-mono text-[11px] tracking-widest uppercase text-arena-creative mb-7 animate-fade-in-up max-sm:text-[10px] max-sm:mb-5">
        <span>⚔️</span>
        <span>{t.badge}</span>
      </div>

      {/* Title */}
      <h1 className="text-[clamp(36px,8vw,56px)] font-bold text-center m-0 mb-3 tracking-tighter leading-[1.1] animate-fade-in-up max-sm:text-[clamp(28px,7vw,42px)]" style={{ animationDelay: "0.1s" }}>
        <span className="bg-gradient-to-br from-white via-[#a8a8b3] to-arena-creative bg-clip-text text-transparent">
          {t.title1}<br />{t.title2}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-[17px] text-[#8888a0] text-center mb-11 font-light leading-relaxed animate-fade-in-up max-sm:text-[15px] max-sm:mb-8" style={{ animationDelay: "0.2s" }}>
        {t.subtitle}
      </p>

      {/* Input area */}
      <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="relative w-full rounded-2xl bg-white/[0.03] border-[1.5px] border-white/[0.08] transition-all focus-within:border-arena-creative/40 focus-within:shadow-[0_0_30px_rgba(251,146,60,0.06),inset_0_1px_8px_rgba(0,0,0,0.25)]">
          <textarea
            className="w-full min-h-[110px] py-4 px-[18px] pb-10 bg-transparent border-none outline-none text-[#e8e8ed] font-outfit text-base leading-relaxed resize-y placeholder:text-[#555568] max-sm:min-h-[100px] max-sm:text-[15px] max-sm:py-3.5 max-sm:px-4 max-sm:pb-9"
            placeholder={t.placeholder}
            value={task}
            onChange={(e) => { if (e.target.value.length <= MAX_CHARS) setTask(e.target.value); }}
            maxLength={MAX_CHARS}
            style={{ direction: isRtl ? "rtl" : "ltr", textAlign: isRtl ? "right" : "left" }}
          />
          <span
            className={`absolute bottom-3 right-4 font-mono text-[11px] transition-colors max-sm:text-[10px] ${
              charsLeft <= 30 ? "text-red-500" : charsLeft <= 80 ? "text-orange-500" : "text-[#555568]"
            }`}
          >
            {charsLeft}
          </span>
        </div>

        {/* Chips */}
        <div className="w-full mt-4 animate-fade-in-up max-sm:mt-3.5" style={{ animationDelay: "0.4s" }}>
          <div className="text-xs text-[#555568] uppercase tracking-[1.5px] mb-2.5 font-mono max-sm:text-[11px] max-sm:mb-2">
            {t.chipsLabel}
          </div>
          <div className="flex flex-wrap gap-2 max-sm:gap-1.5">
            {chips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => setTask(chip.task)}
                className="py-2 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#a0a0b8] text-sm cursor-pointer transition-all whitespace-nowrap hover:bg-arena-creative/[0.08] hover:border-arena-creative/30 hover:text-arena-creative hover:-translate-y-px max-sm:py-2.5 max-sm:px-3.5 max-sm:text-[13px] max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start button */}
      <button
        className={`mt-7 w-full py-[18px] rounded-[14px] border-none text-[17px] font-semibold tracking-wide cursor-pointer transition-all animate-fade-in-up max-sm:py-4 max-sm:text-base max-sm:min-h-[52px] max-sm:mt-5 ${
          canStart
            ? "bg-gradient-to-br from-arena-creative to-orange-500 text-[#0a0a0f] animate-pulse-glow hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(251,146,60,0.3)]"
            : "bg-white/5 text-[#555568] cursor-not-allowed"
        }`}
        style={{ animationDelay: "0.5s" }}
        disabled={!canStart}
        onClick={() => canStart && onStart(task)}
      >
        {canStart ? t.startActive : t.startDisabled}
      </button>

      {/* Footer */}
      <div className="mt-auto pt-12 text-center animate-fade-in-up max-sm:pt-8" style={{ animationDelay: "0.6s" }}>
        <div className="flex justify-center gap-6 mb-3 max-sm:gap-4">
          {Object.values(AGENTS).map((a) => (
            <div key={a.id} className="flex items-center gap-1.5 text-xs text-[#666680] font-mono max-sm:text-[11px]">
              <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
              {a.name}
            </div>
          ))}
        </div>
        <div className="text-xs text-[#333348] font-mono">{t.footerText}</div>
      </div>
    </div>
  );
}
