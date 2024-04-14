import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY_GEMINI || "";

const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiReview() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  return text;
}
