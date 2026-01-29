
import { GoogleGenAI, Type } from "@google/genai";

const PROJECT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Name of the project to replicate" },
    difficulty: { type: Type.STRING, description: "Beginner, Intermediate, or Advanced" },
    description: { type: Type.STRING, description: "Brief overview of what to build" },
    techStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of technologies recommended" },
    tasks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key features to build" }
  },
  required: ["title", "difficulty", "description", "techStack", "tasks"]
};

export async function generateProjectIdea(topic?: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-flash-preview';
  
  const prompt = topic 
    ? `Generate a project to replicate related to: ${topic}. Provide a realistic coding challenge.`
    : "Generate a random interesting project for a developer to 'replicate' (build from scratch) to improve their skills.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: PROJECT_SCHEMA,
      }
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error generating project idea:", error);
    throw error;
  }
}
