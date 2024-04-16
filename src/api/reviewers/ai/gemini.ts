import fetch from "node-fetch";
import { Reviewer, reviewScoreSchema } from "../reviewScore";
import { folderToLLMString } from "../../../helpers";

const apiKey = process.env.API_KEY_GEMINI;

export const getGeminiReview: Reviewer = async (folder) => {
  if (!apiKey) throw new Error("API_KEY_GEMINI is not set");

  const folderDescription = folderToLLMString(folder);
  const prompt = `You are a coding assistant who reviews code quality. You must return a JSON output that follows the following schema: {
      "type": "object",
      "properties": {
        "remarks": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "An array of remarks on the quality of code provided to the assistant"
        },
        "possibleImprovements": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "An array of possible improvements that can be done to the code"
        },
        "quality": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "A score of how good the provided code is, 0 being the worst and 100 being perfect"
        },
      },
      "required": ["quality", "remarks", "possibleImprovements"]
    }`;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
        role: "model",
      },
      {
        role: "user",
        parts: [{ text: folderDescription }],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw await response.text();
    }

    const data = await response.json();

    if (!data) {
      throw new Error("UNABLE_TO_GENERATE_RESPONSE");
    }

    const reviewString = (data as any)?.candidates?.[0]?.content?.parts?.[0]
      .text;

    // Parse the JSON string according to the schema to validate and extract the data
    const parsedResult = reviewScoreSchema.parse(JSON.parse(reviewString));
    return { ...parsedResult, reviewer: "Gemini-Pro" };
  } catch (e) {
    throw e;
  }
};
