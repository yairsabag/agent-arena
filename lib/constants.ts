// ─── Agent definitions ───
export const AGENTS = {
  creative: {
    id: "creative",
    name: "Creative",
    nameHe: "קריאייטיב",
    color: "#fb923c",
    bgColor: "rgba(251,146,60,0.08)",
    borderColor: "rgba(251,146,60,0.20)",
    hoverBg: "rgba(251,146,60,0.14)",
    glowColor: "rgba(251,146,60,0.35)",
    emoji: "🎨",
  },
  logical: {
    id: "logical",
    name: "Logical",
    nameHe: "לוגי",
    color: "#a78bfa",
    bgColor: "rgba(167,139,250,0.08)",
    borderColor: "rgba(167,139,250,0.20)",
    hoverBg: "rgba(167,139,250,0.14)",
    glowColor: "rgba(167,139,250,0.35)",
    emoji: "🧠",
  },
  realist: {
    id: "realist",
    name: "Realist",
    nameHe: "ריאליסט",
    color: "#38bdf8",
    bgColor: "rgba(56,189,248,0.08)",
    borderColor: "rgba(56,189,248,0.20)",
    hoverBg: "rgba(56,189,248,0.14)",
    glowColor: "rgba(56,189,248,0.35)",
    emoji: "⚡",
  },
} as const;

export type AgentId = keyof typeof AGENTS;
export type Agent = (typeof AGENTS)[AgentId];

export interface TimelineMessage {
  agent: AgentId;
  text: string;
}

export interface VerdictData {
  winner: AgentId;
  verdict: string;
  bullets: string[];
}

export interface ClarificationOption {
  id: string;
  label: string;
}

export interface JudgeResult {
  needs_clarification: boolean;
  // Direct verdict (when needs_clarification = false)
  winner?: AgentId;
  verdict?: string;
  bullets?: string[];
  // Clarification (when needs_clarification = true)
  question?: string;
  options?: ClarificationOption[];
  verdicts?: Record<string, VerdictData>;
}

export interface ArenaResponse {
  timeline: TimelineMessage[];
  judge: JudgeResult;
}

// ─── Constants ───
export const MAX_CHARS = 300;
export const MESSAGE_DELAY = 3500;
export const TYPING_DURATION = 2200;

export const EXAMPLE_CHIPS = {
  en: [
    { label: "🚀 Launch a product", task: "Launch a new mobile app for tracking daily habits" },
    { label: "✈️ Plan a trip", task: "Plan a 5-day trip to Tokyo on a budget" },
    { label: "🤝 Solve a conflict", task: "Two co-founders disagree on company direction" },
    { label: "🎯 Marketing strategy", task: "Create a marketing strategy for a local coffee shop" },
    { label: "💡 Side project", task: "Build a profitable side project in 30 days" },
  ],
  he: [
    { label: "🚀 השקת מוצר", task: "להשיק אפליקציה חדשה למעקב אחרי הרגלים יומיים" },
    { label: "✈️ תכנון טיול", task: "לתכנן טיול של 5 ימים לטוקיו" },
    { label: "🤝 פתרון קונפליקט", task: "שני שותפים לא מסכימים על כיוון החברה" },
    { label: "🎯 אסטרטגיית שיווק", task: "ליצור אסטרטגיית שיווק לבית קפה שכונתי" },
    { label: "💡 פרויקט צד", task: "לבנות פרויקט צד רווחי תוך 30 יום" },
  ],
};
