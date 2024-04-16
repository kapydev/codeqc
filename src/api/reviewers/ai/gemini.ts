import { GoogleGenerativeAI } from "@google/generative-ai";
import { Reviewer } from "../reviewScore";

const apiKey = process.env.API_KEY_GEMINI;

export const getGeminiReview: Reviewer = async () => {
  if (!apiKey) throw new Error("API_KEY_GEMINI is not set");

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  return text;
};
