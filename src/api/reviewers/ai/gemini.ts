import { GoogleGenerativeAI } from "@google/generative-ai";
import { folderToLLMString } from "../../../helpers";
import { Reviewer, reviewScoreSchema } from "../reviewScore";
import { BASE_LLM_QUALITY_PROMPT } from "./CONSTANTS";
import { extractJsonFromResponse } from "../../../helpers/utils";

const GEMINI_API_KEY = process.env.API_KEY_GEMINI;

const GEMINI_CONFIG = {
  temperature: 0,
};

export const getGeminiReview: Reviewer = async (folder) => {
  if (!GEMINI_API_KEY) throw new Error("API_KEY_GEMINI is not set");
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: GEMINI_CONFIG });

  const folderDescription = folderToLLMString(folder);

  const requestBody = {
    contents: [
      {
        parts: [{ text: BASE_LLM_QUALITY_PROMPT }],
        role: "model",
      },
      {
        role: "user",
        parts: [{ text: folderDescription }],
      },
    ],
  };


  try {
    const result = await model.generateContent(requestBody)
    const response = await result.response;

    const text = response.text();

    const jsonContent = extractJsonFromResponse(text);

    // Parse the JSON string according to the schema to validate and extract the data
    const parsedResult = reviewScoreSchema.parse(JSON.parse(jsonContent));
    return { ...parsedResult, reviewer: "Gemini-Pro" };
  } catch (e) {
    console.error('Gemini-Pro error:', e);
    throw e;
  }
};