
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// AI Suggestion for EQ based on video context
export const suggestEQPreset = async (videoTitle: string) => {
  const ai = getAI();
  const prompt = `I am watching a video titled "${videoTitle}". 
  Suggest the ideal 10-band equalizer settings (-12 to +12 range) for these frequencies: 32Hz, 64Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz.
  Return only a JSON array of 10 numbers.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.NUMBER }
        }
      }
    });
    // Use .text getter directly
    const text = response.text;
    return text ? JSON.parse(text) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  } catch (err) {
    console.error("AI Suggestion Error:", err);
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
};

// AI Copywriter for Google Play Store listings
export const generateStoreListing = async (appName: string, features: string) => {
  const ai = getAI();
  const prompt = `Create a professional and compelling Google Play Store listing for an app.
  App Name: ${appName}
  Features: ${features}
  
  Please provide:
  1. A short description (max 80 characters).
  2. A detailed long description highlighting the value proposition and key features.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Complex text task
      contents: prompt,
      config: {
        systemInstruction: "You are an expert mobile app marketer and copywriter specializing in Play Store Optimization (ASO).",
      }
    });
    return response.text;
  } catch (err) {
    console.error("AI Writer Error:", err);
    throw err;
  }
};

// AI Consultant Chat for Play Store and TWA advice
export const chatWithConsultant = async (messages: { role: 'user' | 'model', text: string }[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: "You are ShipBot, a professional consultant for Google Play Store deployments and Trusted Web Activities (TWA). You help developers with technical requirements like assetlinks.json, Play Console setup, and ASO.",
      }
    });
    return response.text;
  } catch (err) {
    console.error("AI Consultant Error:", err);
    throw err;
  }
};
