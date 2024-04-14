import { getGPTReview } from "./api/gpt";

export async function greet(name: string): Promise<void> {
  const gptReview = await getGPTReview();
  console.log(gptReview);
  console.log(`Hello, ${name}!`);
}

export function sayGoodbye(name: string): void {
  console.log(`Goodbye, ${name}!`);
}

/*
Google lighthouse - https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically
GPT - https://platform.openai.com/docs/quickstart?context=node
Claude - https://docs.anthropic.com/claude/reference/client-sdks#typescript
Gemini - https://ai.google.dev/tutorials/get_started_node#generate-text-from-text-input
Project Walace - https://github.com/projectwallace/css-code-quality 
*/
