import type { ArenaResponse } from "./constants";

export async function fetchArena(task: string): Promise<ArenaResponse> {
  const res = await fetch("/api/arena", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });

  if (res.status === 429) {
    throw new Error("Too many requests. Please wait a bit and try again.");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Server error: ${res.status}`);
  }

  const data: ArenaResponse = await res.json();

  if (!data.timeline || !data.judge) {
    throw new Error("Invalid response format");
  }

  return data;
}
