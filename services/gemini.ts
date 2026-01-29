import { GoogleGenAI, Type } from "@google/genai";

const PROJECT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    description: { type: Type.STRING },
    techStack: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    tasks: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["title", "difficulty", "description", "techStack", "tasks"]
};

export async function generateProjectIdea(topic: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = topic 
    ? `Generate a high-level software engineering project challenge related to: ${topic}.`
    : "Generate a randomized high-level software engineering project challenge.";
    
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: PROJECT_SCHEMA,
    },
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text);
}