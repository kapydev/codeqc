import Anthropic from "@anthropic-ai/sdk";
import { Reviewer } from "../reviewScore";

const apiKey = process.env.API_KEY_CLAUDE;

const anthropic = new Anthropic({
  apiKey: apiKey,
});

export const getClaudeReview: Reviewer = async () => {
  if (!apiKey) throw new Error("API_KEY_CLAUDE is not set");

  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }],
  });
  return msg;
};
