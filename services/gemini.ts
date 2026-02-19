
// Always use GoogleGenAI from @google/genai
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisMode, ProjectFile } from "../types";

/**
 * GeminiService handles AI interactions for ArchitectAI.
 * It follows the latest @google/genai SDK guidelines.
 */
export class GeminiService {
  constructor() {}

  /**
   * Analyzes project files using specified model (Flash or Pro).
   * Context is built from project file contents.
   */
  async analyzeProject(files: ProjectFile[], userMessage: string, mode: AnalysisMode): Promise<string> {
    // Guidelines: Always create a new GoogleGenAI instance right before the API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Manage context window based on selected model
    const contextLimit = mode === AnalysisMode.Deep ? 100000 : 30000;
    
    let context = "PROJECT CONTEXT:\n";
    let currentLength = 0;
    
    for (const file of files) {
      const fileSummary = `File: ${file.path}\nContent:\n${file.content.substring(0, 2000)}\n\n`;
      if (currentLength + fileSummary.length > contextLimit) {
        context += `... and more files omitted due to size limits.`;
        break;
      }
      context += fileSummary;
      currentLength += fileSummary.length;
    }

    const systemInstruction = `
      You are ArchitectAI, a senior software architect.
      Analyze the provided project context and answer the user accurately.
      Be concise but thorough. Focus on technical patterns, performance, and architecture.
    `;

    try {
      // Use ai.models.generateContent with model name and contents
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: mode,
        contents: { 
          parts: [
            { text: context },
            { text: `User Question: ${userMessage}` }
          ] 
        },
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Guidelines: Access .text property directly, do not call as a function.
      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Generates a 2-sentence summary of the provided project.
   */
  async summarizeProject(files: ProjectFile[]): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const fileList = files.slice(0, 50).map(f => f.path).join(', ');
    const prompt = `Provide a concise 2-sentence summary of this project based on these files: ${fileList}`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          maxOutputTokens: 200,
          temperature: 0.5
        }
      });
      return response.text || "Summary unavailable.";
    } catch (e) {
      console.error("Summary error:", e);
      return "Unable to generate summary at this time.";
    }
  }
}

// Singleton instance for the application
export const gemini = new GeminiService();
