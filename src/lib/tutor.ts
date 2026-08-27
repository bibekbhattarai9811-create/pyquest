import "server-only";

export type TutorRole = "user" | "assistant";
export interface TutorMessage {
  role: TutorRole;
  content: string;
}

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export const TUTOR_MODEL = process.env.TUTOR_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";
export const TUTOR_DAILY_LIMIT = Number(process.env.TUTOR_DAILY_LIMIT || "25");

export function tutorConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export function buildSystemPrompt(ctx: {
  title: string;
  body: string;
  code: string;
  lastError: string | null;
}): string {
  return [
    "You are the PyQuest tutor: a warm, patient Python tutor for absolute beginners.",
    "",
    "The learner is on this lesson:",
    `TITLE: ${ctx.title}`,
    "LESSON TEXT:",
    ctx.body.trim(),
    "",
    "THEIR CURRENT CODE:",
    "```python",
    ctx.code.trim() || "(empty)",
    "```",
    ctx.lastError ? `THEIR LAST ERROR:\n${ctx.lastError.trim()}` : "No error yet.",
    "",
    "RULES:",
    "- Give ONE small hint at a time. Never write the complete solution, and never post a full corrected version of their code.",
    "- You may show at most one short line of code to illustrate syntax — never the actual answer to this task.",
    "- Keep replies to 2–4 short sentences. Use simple words. No headings, no long lists.",
    "- If they ask you to just give them the answer, kindly explain they can use the 'Request the solution' button under the editor, then give them another hint.",
    "- If they're close, tell them so and encourage them.",
    "- Stay on Python and this lesson. If they go off-topic, gently steer back.",
  ].join("\n");
}

/**
 * Calls OpenRouter (OpenAI-compatible) and yields the reply text as it streams.
 * Reasoning tokens are excluded so hints come back fast and short.
 */
export async function* streamTutorReply(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
): AsyncGenerator<string> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pyquest-4h36.vercel.app",
      "X-Title": "PyQuest",
    },
    body: JSON.stringify({
      model: TUTOR_MODEL,
      messages,
      stream: true,
      max_tokens: 500,
      temperature: 0.4,
      reasoning: { exclude: true },
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 300)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") return;
      try {
        const json = JSON.parse(payload);
        const delta: string | undefined = json.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        /* keepalive / partial line — ignore */
      }
    }
  }
}
