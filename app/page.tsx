"use client";

import { useState } from "react";
import { ArenaBg } from "@/components/ArenaBg";
import { HomeScreen } from "@/components/HomeScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorScreen";
import { ArenaScreen } from "@/components/ArenaScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { fetchArena } from "@/lib/api";
import { UI_TEXT, detectHebrew } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import type { ArenaResponse } from "@/lib/constants";

type Phase = "home" | "loading" | "error" | "arena" | "result";

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("home");
  const [lang, setLang] = useState<Lang>("en");
  const [task, setTask] = useState("");
  const [arenaData, setArenaData] = useState<ArenaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isRtl = lang === "he";
  const t = UI_TEXT[lang];

  async function handleStart(inputTask: string) {
    const detectedHe = detectHebrew(inputTask);
    if (detectedHe && lang !== "he") setLang("he");
    if (!detectedHe && lang !== "en") setLang("en");

    setTask(inputTask);
    setPhase("loading");
    setError(null);

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const data = await fetchArena(inputTask);
        setArenaData(data);
        setPhase("arena");
        return;
      } catch (err) {
        console.error(`Attempt ${attempt + 1}:`, err);
        if (attempt === 1) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setPhase("error");
        }
      }
    }
  }

  function handleRetry() {
    if (task) handleStart(task);
    else setPhase("home");
  }

  function handleReset() {
    setPhase("home");
    setTask("");
    setArenaData(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-arena-bg relative overflow-x-hidden">
      <ArenaBg />

      {phase === "home" && (
        <HomeScreen onStart={handleStart} lang={lang} setLang={setLang} />
      )}

      {phase === "loading" && <LoadingScreen t={t} />}

      {phase === "error" && (
        <ErrorScreen error={error} onRetry={handleRetry} t={t} />
      )}

      {phase === "arena" && arenaData && (
        <ArenaScreen
          task={task}
          timeline={arenaData.timeline}
          onArenaComplete={() => setPhase("result")}
          t={t}
          isRtl={isRtl}
        />
      )}

      {phase === "result" && arenaData && (
        <ResultScreen
          judge={arenaData.judge}
          task={task}
          t={t}
          isRtl={isRtl}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
