import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledge from "@/lib/chat/knowledge.json";

// Resume URL - Local path
const RESUME_URL = "/resume.pdf";

// System prompt for Gemini
function getSystemPrompt() {
  // Inject environment variables into the knowledge base at runtime
  const dynamicKnowledge = {
    ...knowledge,
    links: {
      ...knowledge.links,
      resume: process.env.NEXT_PUBLIC_RESUME_URL || knowledge.links.resume,
      portfolio: process.env.NEXT_PUBLIC_WEBSITE_URL || knowledge.links.portfolio,
    }
  };

  const knowledgeStr = JSON.stringify(dynamicKnowledge, null, 2);

  return `You are Wai Yan Maing's AI assistant. You are a strict RAG (Retrieval-Augmented Generation) bot.
  
STRICT RULES:
1. ONLY answer questions using the KNOWLEDGE BASE provided below. 
2. Do NOT use any external knowledge, general information, or your own pre-trained facts.
3. If a question is about something not explicitly mentioned in the KNOWLEDGE BASE, respond exactly with: "I'm sorry, but that information is not in Wai Yan's portfolio. Please contact him directly at waiyanmaing.dev@gmail.com for more details."
4. Do NOT speculate, hallucinate, or provide info about other people or topics.
6. RESPONSE FORMAT: Always use **markdown** for links (e.g., [Download Resume](URL)) and **bold** for emphasis. 

KNOWLEDGE BASE:
${knowledgeStr}
`;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: "fallback"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: getSystemPrompt()
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      source: "gemini"
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      response: "I apologize for the technical difficulty. Please try again, or contact Wai Yan directly at waiyanmaing.dev@gmail.com",
      source: "error"
    });
  }
}

// Detailed fallback responses
function generateFallbackResponse(input: string): string {
  const lower = input.toLowerCase();

  // Greetings
  if (lower.match(/^(hi|hello|hey|good|greetings|yo|howdy|what'?s up|sup|morning|afternoon|evening)/i) || lower.length < 5) {
    return `Hello! Welcome to Wai Yan Maing's portfolio.
I can help you learn about:
• **Work Experience** - 7+ years across 4 companies
• **Technical Skills** - Full Stack, AI, DevOps
• **Projects** - Including **BeeBudget** (Finance App)
• **Contact Info** - Email, phone, website
• **Resume** - Download PDF

What would you like to know?`;
  }

  // Projects
  if (lower.match(/project|app|build|made|work/)) {
    return `**Wai Yan Maing's Prominent Projects**

• **BeeBudget** - Smart Personal Finance app with AI insights
• **HexGuard** - Website security surface scanner
• **Hmaryu Store** - Cross-border proxy shopping platform
• **AI Warehouse Inventory** - YOLO-based detection for Thai Beverage

Which one would you like to know more about?`;
  }

  // Skills
  if (lower.match(/skill|tech|stack|know|programming/)) {
    return `**Technical Skills**
• **Frontend**: React.js, jQuery, HTML5, CSS3, JS
• **Mobile**: React Native, Expo, Cordova
• **Backend**: PHP (Laravel), Node.js (Express), Python
• **AI**: Gemini API, YOLO, OpenAI, n8n, FAISS`;
  }

  // Contact
  if (lower.match(/contact|email|phone|reach/)) {
    return `**Contact Wai Yan Maing**
• **Email**: waiyanmaing.dev@gmail.com
• **Phone**: 0652940833
• **Website**: https://waiyanmaing.space`;
  }

  // Default
  return `I'm here to help! I can tell you about Wai Yan Maing's experience, skills, projects (like BeeBudget), or provide his contact info. What would you like to know?`;
}
