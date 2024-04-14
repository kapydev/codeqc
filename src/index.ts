import { getClaudeReview } from "./api/claude";
import { getGeminiReview } from "./api/gemini";
import { getGPTReview } from "./api/gpt";
import { getLightHouseReview } from "./api/lighthouse";
import { getWallaceReview } from "./api/wallace";

export async function getReview(filePath: string): Promise<void> {
  // AI
  const gptReview = await getGPTReview();
  const claudeReview = await getClaudeReview();
  const geminiReview = await getGeminiReview();

  // NON-AI
  const lightHouseReview = await getLightHouseReview();
  const wallaceReview = await getWallaceReview();

  const overallReview = [
    gptReview,
    claudeReview,
    geminiReview,
    lightHouseReview,
    wallaceReview,
  ];

  console.log(`This is the file path, ${filePath}!`);
  console.log(`This is the overall review, ${overallReview}!`);
}

/*
Google lighthouse - https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically
GPT - https://platform.openai.com/docs/quickstart?context=node
Claude - https://docs.anthropic.com/claude/reference/client-sdks#typescript
Gemini - https://ai.google.dev/tutorials/get_started_node#generate-text-from-text-input
Project Walace - https://github.com/projectwallace/css-code-quality 
*/
