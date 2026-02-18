
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client
export async function getAssistantResponse(prompt: string, context?: any) {
  // Creating a new instance right before call as per guidelines to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Using gemini-3-flash-preview for general text assistance tasks as per model selection rules
    // Using a simple string for contents for a text-only prompt to stay consistent with SDK examples
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Buy Buzz Data Spot Expert Stylist. 
Tone: Professional, helpful, efficiency-focused, and friendly.
Objective: Help users find the best mobile data bundles for MTN, Telecel, and AirtelTigo networks based on their usage habits (streaming, working, casual browsing).
Context: Buy Buzz Data Spot is the leading digital hub for instant mobile data top-ups and connectivity bundles across Ghana's top networks.

Current User Session Context: ${JSON.stringify(context || {})}
User Message: ${prompt}`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Directly access the .text property (it is a getter, not a method) to extract the generated response
    return response.text || "I'm sorry, I couldn't process your request at this moment. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our network gateway is experiencing high traffic. Please try refreshing your request.";
  }
}
