import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import type { ArenaResponse } from "@/lib/constants";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── Simple IP rate limiter ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = parseInt(process.env.ARENA_RATE_LIMIT_PER_IP || "10");
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── JSON recovery ───
function tryParseJSON(raw: string): ArenaResponse | null {
  let clean = raw.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    if (parsed.timeline && parsed.judge) return parsed;
  } catch {}

  // Recovery for truncated JSON
  const openBraces = (clean.match(/{/g) || []).length;
  const closeBraces = (clean.match(/}/g) || []).length;
  const openBrackets = (clean.match(/\[/g) || []).length;
  const closeBrackets = (clean.match(/\]/g) || []).length;

  if (openBraces > closeBraces || openBrackets > closeBrackets) {
    const lastComplete = clean.lastIndexOf('"}');
    if (lastComplete > 0) {
      clean = clean.substring(0, lastComplete + 2);
      clean += "]".repeat(openBrackets - (clean.match(/\]/g) || []).length);
      clean += "}".repeat(openBraces - (clean.match(/}/g) || []).length);
    }
  }

  try {
    const parsed = JSON.parse(clean);
    if (parsed.timeline && parsed.timeline.length >= 3) {
      if (!parsed.judge) {
        parsed.judge = {
          needs_clarification: false,
          winner: "logical",
          verdict: "The debate was compelling. Based on the arguments presented, Logical wins.",
          bullets: ["Strongest overall argument", "Most practical approach", "Best response to challenges"],
        };
      }
      return parsed;
    }
  } catch {}

  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { task?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const task = body.task?.trim();
  if (!task || task.length === 0 || task.length > 300) {
    return NextResponse.json(
      { error: "Task must be 1-300 characters" },
      { status: 400 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2048,
      temperature: 0.9,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: task },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "";
    const parsed = tryParseJSON(raw);

    if (!parsed) {
      // Retry once
      const retry = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 2048,
        temperature: 0.8,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: task },
        ],
      });

      const retryParsed = tryParseJSON(retry.choices[0]?.message?.content || "");
      if (!retryParsed) {
        return NextResponse.json(
          { error: "Failed to generate arena. Please try again." },
          { status: 500 }
        );
      }
      return NextResponse.json(retryParsed);
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Arena API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
