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
    "- You may show at most one short line of code to illustrate syntax, but it MUST use different text, numbers, and variable names than this task uses — never reproduce the exact answer, even as an 'example'.",
    "- Keep replies to 2–4 short sentences. Use simple words. No headings, no long lists.",
    "- If they ask you to just give them the answer, kindly explain they can use the 'Request the solution' button under the editor, then give them another hint.",
    "- If they're close, tell them so and encourage them.",
    "- Stay on Python and this lesson. If they go off-topic, gently steer back.",
  ].join("\n");
}

async function openRouterStream(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
): Promise<Response> {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pyquest-4h36.vercel.app",
      "X-Title": "PyQuest",
    },
    body: JSON.stringify({
      // ordered list: primary first, then a free fallback for when the free
      // NVIDIA endpoint is briefly overloaded.
      models: [TUTOR_MODEL, "meta-llama/llama-3.3-70b-instruct:free"],
      messages,
      stream: true,
      max_tokens: 500,
      temperature: 0.4,
      reasoning: { exclude: true },
    }),
  });
}

/**
 * Calls OpenRouter (OpenAI-compatible) and yields the reply text as it streams.
 * Reasoning tokens are excluded so hints come back fast and short. Retries a
 * couple of times when the free upstream is briefly overloaded.
 */
export async function* streamTutorReply(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
): AsyncGenerator<string> {
  let res: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await openRouterStream(messages);
    if (res.ok && res.body) break;
    const detail = await res.text().catch(() => "");
    const retryable = res.status === 429 || res.status === 502 || res.status === 503;
    if (!retryable || attempt === 2) {
      throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 300)}`);
    }
    await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
  }
  if (!res || !res.body) throw new Error("OpenRouter: no response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let emitted = false;

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
      if (payload === "[DONE]") {
        if (!emitted) throw new Error("OpenRouter: empty stream");
        return;
      }
      try {
        const json = JSON.parse(payload);
        if (json.error) throw new Error(`OpenRouter upstream: ${json.error.message ?? "error"}`);
        const delta: string | undefined = json.choices?.[0]?.delta?.content;
        if (delta) {
          emitted = true;
          yield delta;
        }
      } catch (e) {
        if (e instanceof Error && e.message.startsWith("OpenRouter upstream")) throw e;
        /* keepalive / partial line — ignore */
      }
    }
  }
  if (!emitted) throw new Error("OpenRouter: empty stream");
}
