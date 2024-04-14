import OpenAI from "openai";

const apiKey = process.env.API_KEY_GPT;

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function getGPTReview() {
  if (!apiKey) throw new Error("API_KEY_GPT is not set");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4-turbo",
  });

  return completion.choices[0];
}
