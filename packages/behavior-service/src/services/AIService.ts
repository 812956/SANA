
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
            - /database (Child Database)
            - /elves (Elf Directory)
            
            User said: "${text}"
            
            Return a JSON object ONLY with no markdown formatting.
            Structure: { "type": "NAVIGATE" | "SPEAK" | "ACTION", "payload": "string", "action": "object/json string" }
            
            INTENT GUIDE:
            1. NAVIGATION: If user wants to go to a page. 
               Payload: URL path.
            
            2. MAP CONTROL: If user says "zoom in", "zoom out", "go to London", "pan to New York".
               Type: "ACTION"
               Payload: "map_control"
               Action (JSON): { "action": "ZOOM_IN" | "ZOOM_OUT" | "PAN", "lat": number, "lng": number, "zoom": number }
               (Approximate lat/lng for major cities: London [51.5, -0.1], NY [40.7, -74], North Pole [90, 0])
               
            3. LIST FILTER: If user says "search for Timmy", "filter by bad kids", "show me children in London", "Find Junaid from India".
               Type: "ACTION"
               Payload: "filter_children"
               Action (JSON): { "search": "name/term", "city": "city name", "country": "country name", "status": "NICE|NAUGHTY" }
               Example: "Find Junaid from India" -> { "search": "Junaid", "country": "India" }
               
            4. CONVERSATION: General questions.
                Type: "SPEAK"
            `;

            // 2. Call Gemini
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            // 3. Clean and Parse JSON
            const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanText);

            if (parsed.type && parsed.payload) {
                console.log("Gemini API Success:", parsed);
                return parsed;
            }
        } catch (e) {
            console.error("Gemini API Error (falling back to regex):", e);
        }

        console.log("Using Fallback Logic for:", text);

        // --- FALLBACK LOGIC (Regex) ---
        const lowerText = text.toLowerCase();
        
        try {
            // Greetings
            if (lowerText.match(/^(hi|hello|hey|greetings|merry christmas|ho ho ho)/)) {
                 response = {
                    type: "SPEAK",
                    payload: "Ho ho ho! Merry Christmas! How can I help you navigate the North Pole today?",
                    action: null
                };
            }
            // Help / Status
            else if (lowerText.includes("help") || lowerText.includes("what can you do") || lowerText.includes("status")) {
                 response = {
                    type: "SPEAK",
                    payload: "I can help you find children, check factory stats, or navigate the dashboard. Try saying 'Find Timmy' or 'Go to the factory'.",
                    action: null
                };
            }
            // Jokes
            else if (lowerText.includes("joke")) {
                 response = {
                    type: "SPEAK",
                    payload: "Why does Santa go down the chimney? Because it soots him! Ho ho ho!",
                    action: null
                };
            }
            // Navigation & Commands
            else if (lowerText.includes("zoom") || lowerText.includes("camera") || lowerText.includes("view")) {
                // More permissive zoom/map control
                let action = "ZOOM_IN";
                if (lowerText.includes("out")) action = "ZOOM_OUT";
                
                 response = {
                    type: "ACTION",
                    payload: "map_control",
                    action: JSON.stringify({ action: action })
                };
            } else if (lowerText.includes("search") || lowerText.includes("find")) {
                // Enhanced fallback extraction
                let term = lowerText.replace("search for", "").replace("find", "").trim();
                let city = undefined;
                let country = undefined;

                // Simple "from" extraction (e.g., "Find Junaid from India")
                if (term.includes(" from ")) {
                    const parts = term.split(" from ");
                    term = parts[0].trim();
                    const location = parts[1].trim();
                     country = location; 
                }

                 response = {
                    type: "ACTION",
                    payload: "filter_children",
                    action: JSON.stringify({ search: term, country: country, city: city })
                };
            } else if (lowerText.includes("elf") || lowerText.includes("elves")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/elves",
                    action: "Opening Elf Directory..."
                };
            } else if (lowerText.includes("database") || lowerText.includes("children") || lowerText.includes("list")) {
                response = {
                    type: "NAVIGATE",
                    payload: "/database",
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
                    payload: "/factory", // Fixed path
                    action: "Connecting to factory floor..."
                };
            }
        } catch (e) {
             console.error("AI Fallback Error", e);
            response = { type: "SPEAK", payload: "I'm having trouble accessing the mainframe archives.", action: null };
        }

        return response;
    }
}

export const aiService = new AIService();
