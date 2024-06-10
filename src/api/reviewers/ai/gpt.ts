import OpenAI from "openai";
import { folderToLLMString } from "../../../helpers";
import { Reviewer, reviewScoreSchema } from "../reviewScore";
import { BASE_LLM_QUALITY_PROMPT } from "./CONSTANTS";
import { extractJsonFromResponse } from "../../../helpers/utils";

const apiKey = process.env.API_KEY_GPT;

const openai = new OpenAI({
  apiKey: apiKey,
});

// Define the getGPTReview function as async
export const getGPTReview: Reviewer = async (folder) => {
  if (!apiKey) throw new Error("API_KEY_GPT is not set");

  // Convert the folder to a string format suitable for the LLM
  const folderDescription = folderToLLMString(folder);

  try {
    // Making the API call to GPT-4 Turbo
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: BASE_LLM_QUALITY_PROMPT,
        },
        { role: "user", content: folderDescription },
      ],
      temperature: 0,
    });

    const responseText = completion.choices[0].message.content;

    if (responseText === null) {
      throw new Error("UNABLE_TO_GENERATE_RESPONSE");
    }

    const filteredResponse = extractJsonFromResponse(responseText);

    const result = reviewScoreSchema.parse(JSON.parse(filteredResponse));

    return { ...result, reviewer: "GPT-4" };
  } catch (e) {
    console.error('GPT-4 error:', e);
    throw e;
  }
};
