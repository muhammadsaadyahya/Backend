import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAlOyyPB-4UMDfS_C3atNJIX2pQDrQJ5dM",
});

export async function generateAnswer(question, contexts) {
  const contextText = contexts.join("\n\n---\n\n");

  const prompt = `
You are a helpful legal assistant.

Use the following document excerpts to answer the question.

Context:
${contextText}

Question:
${question}

Answer concisely and clearly, citing relevant context if applicable.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a helpful legal assistant.",
    },
  });

  return response.text;
}
