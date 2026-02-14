"use client";

import type { UIText } from "@/lib/i18n";

export function ErrorScreen({
  error,
  onRetry,
  t,
}: {
  error: string | null;
  onRetry: () => void;
  t: UIText;
}) {
  return (
    <div className="relative z-[1] max-w-[640px] mx-auto px-6 pt-0 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in-up">
        <div className="text-[48px] mb-5">😵</div>
        <div className="text-xl font-semibold text-[#e8e8ed] mb-2.5">{t.errorTitle}</div>
        <div className="text-sm text-[#8888a0] mb-6 max-w-[400px]">{error || t.errorDefault}</div>
        <button
          onClick={onRetry}
          className="py-4 px-9 rounded-xl border-none text-[#0a0a0f] text-base font-semibold cursor-pointer min-h-[52px]"
          style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)" }}
        >
          {t.retryBtn}
        </button>
      </div>
    </div>
  );
}
