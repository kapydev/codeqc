import OpenAI from "openai";
import { Reviewer, reviewScoreSchema } from "../reviewScore";
import { folderToLLMString } from "../../../helpers";

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
          content: `You are a coding assistant who reviews code quality. You must return an JSON output that follows the following schema: {
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
            }`,
        },
        { role: "user", content: folderDescription },
      ],
    });

    const responseText = completion.choices[0].message.content;

    if (responseText === null) {
      throw new Error("UNABLE_TO_GENERATE_RESPONSE");
    }

    const result = reviewScoreSchema.parse(JSON.parse(responseText));
    return result;
  } catch (e) {
    throw e;
  }
};
