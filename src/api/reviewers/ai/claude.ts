import Anthropic from '@anthropic-ai/sdk';
import { folderToLLMString } from "../../../helpers";
import { extractJsonFromResponse } from "../../../helpers/utils";
import { Reviewer, reviewScoreSchema } from "../reviewScore";
import { BASE_LLM_QUALITY_PROMPT } from "./CONSTANTS";

const apiKey = process.env.API_KEY_CLAUDE;

const anthropic = new Anthropic({
  apiKey: apiKey,
});

export const getClaudeReview: Reviewer = async (folder) => {
  if (!apiKey) throw new Error("API_KEY_CLAUDE is not set");

  // Convert the folder to a string format suitable for the LLM
  const folderDescription = folderToLLMString(folder);

  const fullPrompt = BASE_LLM_QUALITY_PROMPT + '\n' + folderDescription;

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [
      { role: "user", content: fullPrompt }
    ],
    temperature: 0
  });

  const responseContent = response.content?.[0];
  if (responseContent.type !== "text") {
    console.error("Claude response type is not text.")
    throw new Error("Claude response type is not text");
  }

  const responseText = responseContent.text;
  const filteredResponse = extractJsonFromResponse(responseText);
  const parsedJSON = JSON.parse(filteredResponse);
  const result = reviewScoreSchema.parse(parsedJSON);

  return { ...result, reviewer: "Claude" };
};
