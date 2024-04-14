import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.API_KEY_CLAUDE;

const anthropic = new Anthropic({
  apiKey: apiKey,
});

export async function getClaudeReview() {
  if (!apiKey) throw new Error("API_KEY_CLAUDE is not set");

  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }],
  });
  return msg;
}
