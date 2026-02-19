
import { GoogleGenAI } from "@google/genai";

// AI Services enabled using Google Gemini API for real-time customer support
export async function getAssistantResponse(prompt: string, context?: any) {
  try {
    // Guidelines: Always create a new GoogleGenAI instance right before the API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the expert support assistant for 'Buy Buzz Data Spot', a leading Ghanaian digital marketplace. Help users with MTN/Telecel/AirtelTigo data bundles, AFA registration, WAEC result checkers, and flyer designs. Be concise, professional, and friendly.",
        temperature: 0.7,
      }
    });

    // Guidelines: Access the .text property directly.
    return response.text || "I'm here to help, but I'm having trouble processing that request right now. Please try again or reach out on WhatsApp.";
  } catch (error) {
    console.error("Gemini Support Assistant Error:", error);
    return "Live assistant is currently experiencing high traffic. Please contact our WhatsApp support for immediate help.";
  }
}
