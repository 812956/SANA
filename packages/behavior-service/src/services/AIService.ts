
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface AIResponse {
    type: 'NAVIGATE' | 'SPEAK' | 'ACTION';
    payload: string;
    action?: string | null;
}

export class AIService {
    async processCommand(text: string): Promise<AIResponse> {
        // Fallback response
        let response: AIResponse = {
            type: "SPEAK",
            payload: "I'm sorry, my neural pathways are frozen.",
            action: null
        };

        try {
            // 1. Construct Prompt
            const prompt = `
            You are SANA (Santa's Advanced Neural Algorithm).
            You allow the user to control a dashboard via voice.
            
            Current Context: Santa's Dashboard.
            Available Routes:
            - / (Command Center / Map)
            - /logistics (Factory Floor)
            - /children (Database)
            - /reports (Elf Reports)
            
            User said: "${text}"
            
            Return a JSON object ONLY with no markdown formatting.
            Structure: { "type": "NAVIGATE" | "SPEAK", "payload": "url or text", "action": "description" }
            
            If the user asks to go somewhere, type is NAVIGATE.
            If the user asks a question, type is SPEAK.
            `;

            // 2. Call Gemini
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            // 3. Clean and Parse JSON
            const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanText);

            if (parsed.type && parsed.payload) {
                return parsed;
            }
        } catch (e) {
            console.error("Gemini API Error (falling back to regex):", e);
        }

        // --- FALLBACK LOGIC (Regex) ---
        const lowerText = text.toLowerCase();
        
        try {
             if (lowerText.includes("database") || lowerText.includes("children") || lowerText.includes("list")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/children",
                    action: "Opening Child Database..."
                };
            } else if (lowerText.includes("report") || lowerText.includes("incident")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/reports",
                    action: "Accessing Incident Reports..."
                };
            } else if (lowerText.includes("dashboard") || lowerText.includes("home") || lowerText.includes("map")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/",
                    action: "Starting global view..."
                };
            } else if (lowerText.includes("factory") || lowerText.includes("logistics") || lowerText.includes("toys")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/logistics",
                    action: "Connecting to factory floor..."
                };
            }
        } catch (e) {
             console.error("AI Error", e);
            response = { type: "SPEAK", payload: "I'm having trouble accessing the mainframe archives.", action: null };
        }

        return response;
    }
}

export const aiService = new AIService();
