import { NextRequest, NextResponse } from "next/server";

// Resume URL from environment variable
const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || "https://drive.google.com/file/d/1xfSFPUVxTxV80_wksD6FJgczfDhIcqE9/view?usp=sharing";

// Complete CV Data as knowledge base
const CV_DATA = `
=== WAI YAN MAING - FULL STACK DEVELOPER ===

CONTACT INFORMATION
- Phone: 0652940833
- Email: waiyanmaing.dev@gmail.com
- Address: 37 Lasalle 19th Alley, Bang Na Tai, Bangkok City, Thailand
- Website: https://waiyanmaing.me
- Resume Download: ${RESUME_URL}

ABOUT ME
I am a Full Stack Developer with strong expertise in Laravel, Node.js, React, React Native, jQuery, and JavaScript, specializing in delivering scalable and user-friendly web and mobile applications. My backend proficiency in Laravel and Node.js combined with modern frontend skills allows me to build robust end-to-end solutions.

I have experience as a Team Lead, driving projects with Agile methodologies to ensure effective collaboration and timely delivery. Beyond software development, I am passionate about AI research and development, focusing on RAG-based knowledge bots and Sales Forecasting AI Agents with n8n, aiming to integrate intelligent automation into business solutions.

EDUCATION
1. Bachelor of Computer Science (B.C.Sc.)
   - Institution: University of Computer Studies Taungngu (UCST)
   - Period: 2013 - 2018

2. DHIS Tool Certificates
   - Institution: University of Oslo
   - Certificates: DHIS 2 Fundamental, DHIS 2 Data Quality
   - Period: 2020 - 2021

3. Certificate of English Enhancement Program
   - Institution: ACM Knowledge School
   - Year: 2022

WORK EXPERIENCE (From Most Recent to Oldest)

1. AI Solution Architect & Research Developer
   Company: Thai Beverage Public Company Limited
   Period: 2025 - Present (Current Job)
   Responsibilities:
   - Designed end-to-end AI computer vision architecture for warehouse inventory detection, utilizing YOLO and deep learning models to achieve best accuracy in real-time object recognition across supplier warehouses
   - Architected cross-platform mobile solutions by converting Go-Lang projects to Android AAR and iOS XCFramework packages using gomobile, enabling offline-first inventory processing on mobile devices
   - Collaborated with cross-functional teams and supplier stakeholders to integrate computer vision systems with existing infrastructure, defining architectural patterns and best practices for AI-driven inventory management solutions

2. Software Development Executive
   Company: Grand Royal Group International
   Period: 2023 - 2025 (September)
   Responsibilities:
   - Developed and maintained scalable web applications using React.js, Node.js, and Laravel, ensuring high performance, security, and optimized user experiences
   - Collaborated with cross-functional teams and integrated third-party vendor applications, ensuring smooth operations and business alignment
   - Implemented responsive UI designs with cross-browser/device compatibility and promoted clean code practices through code reviews
   - Strengthened application security with authentication, authorization, encryption, and managed SSL certificates on VM servers
   - Lead infrastructure transformation with Kubernetes, Dockerization, microservices, and standardized technical documentation
   - Directed teams and projects using Agile methodologies, driving collaboration, transparency, and timely delivery
   - Built an AI-powered chatbot using Python, OpenAI embeddings, and FAISS, integrated across web, Teams, Telegram, and mobile apps
   - Developed a Sales Forecasting AI Agent with n8n, MSSQL, and prompt engineering, delivering predictive insights and automation

3. Senior Team Lead
   Company: DirAce Technology (Japan)
   Period: 2023 (February - March)
   Responsibilities:
   - Deployed and managed testing environments in close collaboration with project managers and international teams from Japan
   - Worked with cross-functional teams (designers, product managers, and developers) to deliver high-quality, user-focused products
   - Implemented responsive designs with full cross-browser compatibility, ensuring consistent user experiences across platforms
   - Participated in code reviews, providing constructive feedback and fostering code quality and team collaboration

4. Web Developer, Full-Stack Developer, Team Leader
   Company: AGGA.IO
   Period: 2018 - 2023 (5 years)
   Responsibilities:
   - Developed and maintained web applications using PHP, Laravel, and related technologies, ensuring performance and scalability
   - Collaborated with cross-functional teams to design and deliver high-quality, user-focused products
   - Implemented responsive designs with cross-browser compatibility, optimizing accessibility and usability
   - Built mobile applications with Cordova, Framework7, and React Native, extending functionality across platforms
   - Maintained and troubleshot servers (cloud and physical) on both Linux and Windows environments to ensure system reliability
   - Participated in code reviews, providing constructive feedback and promoting clean code practices
   - Managed Agile sprints and version control using Git and Azure DevOps, supporting efficient and transparent project delivery

TECHNICAL SKILLS

Frontend:
- React.js, jQuery, HTML5, CSS3, JavaScript, Bootstrap

Cross-Platform Mobile Development:
- React Native, Framework7, Cordova

Backend:
- PHP, Laravel, Node.js, Express.js, RESTful APIs, Python Flask API

Databases:
- MySQL, MSSQL, PostgreSQL, MongoDB

DevOps & Cloud:
- Docker, Kubernetes, VM server management, Linux, Windows, SSL management

Version Control & CI/CD:
- Git, Azure DevOps, Jenkins

AI & Automation:
- Python, OpenAI embeddings, FAISS, n8n, Prompt Engineering, YOLO, Computer Vision, Deep Learning

Project Management & Methodologies:
- Agile, Scrum, Sprint Planning, Cross-functional Team Collaboration

Other Tools & Integrations:
- Third-party API integration, Microservices architecture, Cloud deployment, gomobile

LANGUAGE SKILLS
- Myanmar: 100% (Native)
- English: 67% (Professional Working)

REFERENCES
1. Mrs. Thidar Aung
   - Title: Head Manager
   - Company: Grand Royal Group (GRG)
   - Phone: +95 9 517 296 4

2. Ms. Keshan
   - Title: Cyber Security & Infrastructure Manager
   - Company: Grand Royal Group (GRG)
   - Phone: +95 9 252 329 087

CAREER SUMMARY
- Total Years of Experience: 7+ years (2018 - Present)
- Companies Worked: 4 companies
- Current Location: Bangkok, Thailand
- Availability: Open to new opportunities
`;

// System prompt for OpenAI
function getSystemPrompt() {
  return `You are Wai Yan Maing's AI assistant on his portfolio website. You MUST ONLY answer questions using the CV/Resume data provided below. Do NOT use any external knowledge.

STRICT RULES:
1. ONLY answer based on the CV DATA below - do not make up or assume any information
2. If information is not in the CV data, say "That information is not in Wai Yan's CV. Please contact him directly at waiyanmaing.dev@gmail.com"
3. Keep responses concise and professional

GREETING HANDLING:
- For ANY greeting (hi, hello, hey, good morning, good afternoon, good evening, what's up, yo, howdy, greetings, etc.), respond warmly and ask what they'd like to know about Wai Yan
- Example greetings response: "Hello! Welcome to Wai Yan Maing's portfolio. I can help you learn about his work experience, technical skills, education, or contact information. What would you like to know?"

UNDERSTANDING USER INTENT:
- "experience", "work", "job", "history", "career", "previous", "old work" = Show ALL work experience
- "skills", "tech", "stack", "technologies" = Show technical skills
- "contact", "email", "phone", "reach" = Show contact information
- "resume", "cv", "download" = Provide resume download link: ${RESUME_URL}
- "education", "degree", "study" = Show education
- "current", "now", "doing" = Show current job at Thai Beverage
- "detail", "more" = Provide more details on the last discussed topic

CV DATA (ONLY SOURCE OF TRUTH):
${CV_DATA}

RESPONSE FORMAT:
- Use **bold** for headings and important info
- Use bullet points (•) for lists
- Keep responses structured and easy to read
- Be helpful but concise`;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: "fallback"
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: getSystemPrompt() },
          { role: "user", content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: "fallback"
      });
    }

    const data = await response.json();
    return NextResponse.json({
      response: data.choices[0].message.content,
      source: "openai"
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

  // Greetings - catch various greeting patterns
  if (lower.match(/^(hi|hello|hey|good|greetings|yo|howdy|what'?s up|sup|morning|afternoon|evening)/i) ||
    lower.length < 5 ||
    lower === "hi" ||
    lower === "hello") {
    return `Hello! Welcome to Wai Yan Maing's portfolio.

I can help you learn about:
• **Work Experience** - 7+ years across 4 companies
• **Technical Skills** - Full Stack, AI, DevOps
• **Education** - B.C.Sc. and certifications
• **Contact Info** - Email, phone, website
• **Resume** - Download PDF

What would you like to know?`;
  }

  // Thanks / Gratitude
  if (lower.match(/thank|thanks|thx|appreciate|helpful|great|awesome|perfect|nice|cool|good job|well done/)) {
    return `You're welcome! 😊

Is there anything else you'd like to know about Wai Yan Maing? I can help with:
• Work experience & projects
• Technical skills
• Contact information
• Resume download`;
  }

  // Goodbye / Farewell
  if (lower.match(/bye|goodbye|see you|later|take care|cya|farewell|gtg|gotta go/)) {
    return `Goodbye! Thanks for visiting Wai Yan Maing's portfolio. 

Feel free to come back anytime, or reach out directly at **waiyanmaing.dev@gmail.com**. Take care! 👋`;
  }

  // Yes / No / Affirmatives
  if (lower.match(/^(yes|yeah|yep|yup|ok|okay|sure|no|nope|nah)$/)) {
    return `I'm here to help! What would you like to know about Wai Yan Maing?

• **Experience** - 7+ years across 4 companies
• **Skills** - Full Stack, AI, DevOps
• **Contact** - Email, phone, website
• **Resume** - Download PDF`;
  }

  // Experience / Work History / Jobs
  if (lower.match(/experience|work|job|history|career|employ|company|companies|previous|past|old/)) {
    return `**Wai Yan Maing's Work Experience (7+ Years)**

**1. AI Solution Architect & Research Developer**
Thai Beverage Public Company Limited | 2025 - Present
• Designing AI computer vision for warehouse inventory using YOLO & deep learning
• Building cross-platform mobile solutions with Go-Lang, Android AAR, iOS XCFramework
• Architecting AI-driven inventory management systems

**2. Software Development Executive**
Grand Royal Group International | 2023 - 2025
• Built scalable web apps with React.js, Node.js, Laravel
• Created AI chatbot with Python, OpenAI, FAISS
• Developed Sales Forecasting AI Agent with n8n
• Led Kubernetes & Docker infrastructure transformation

**3. Senior Team Lead**
DirAce Technology (Japan) | Feb - Mar 2023
• Managed testing environments with Japan teams
• Led cross-functional product delivery

**4. Web Developer & Team Leader**
AGGA.IO | 2018 - 2023 (5 years)
• Full-stack development with PHP, Laravel
• Built mobile apps with React Native, Cordova
• Server management (Linux/Windows)
• Agile sprint management with Git & Azure DevOps

Need more details about any specific role?`;
  }

  // Skills
  if (lower.match(/skill|tech|stack|know|programming|language|framework|tool/)) {
    return `**Wai Yan Maing's Technical Skills**

**Frontend:**
React.js, jQuery, HTML5, CSS3, JavaScript, Bootstrap

**Mobile Development:**
React Native, Framework7, Cordova

**Backend:**
PHP, Laravel, Node.js, Express.js, RESTful APIs, Python Flask

**Databases:**
MySQL, MSSQL, PostgreSQL, MongoDB

**DevOps & Cloud:**
Docker, Kubernetes, VM management, Linux, Windows, SSL

**AI & Automation:**
Python, OpenAI embeddings, FAISS, n8n, Prompt Engineering, YOLO, Computer Vision

**Project Management:**
Agile, Scrum, Sprint Planning, Cross-functional Team Leadership

**Version Control:**
Git, Azure DevOps, Jenkins, CI/CD`;
  }

  // Contact
  if (lower.match(/contact|email|phone|reach|call|message/)) {
    return `**Contact Wai Yan Maing**

**Email:** waiyanmaing.dev@gmail.com
**Phone:** 0652940833
**Location:** Bangkok, Thailand
**Website:** https://waiyanmaing.me

**Download Resume:** [Click Here](${RESUME_URL})

Feel free to reach out!`;
  }

  // Resume / CV / Download
  if (lower.match(/resume|cv|download|pdf/)) {
    return `**Download Wai Yan's Resume**

You can view and download the resume here:
**[Download CV/Resume](${RESUME_URL})**

Or visit the website: https://waiyanmaing.me`;
  }

  // Education
  if (lower.match(/education|degree|university|study|school|certificate/)) {
    return `**Wai Yan Maing's Education**

**1. Bachelor of Computer Science (B.C.Sc.)**
University of Computer Studies Taungngu (UCST)
2013 - 2018

**2. DHIS Tool Certificates**
University of Oslo
DHIS 2 Fundamental & Data Quality
2020 - 2021

**3. Certificate of English Enhancement Program**
ACM Knowledge School
2022`;
  }

  // About
  if (lower.match(/about|who|yourself|summary|introduce|tell me/)) {
    return `**About Wai Yan Maing**

I am a **Full Stack Developer** with 7+ years of experience, specializing in:
• Laravel, Node.js, React, React Native
• Scalable web and mobile applications
• Team leadership with Agile methodologies

**Currently:** AI Solution Architect at Thai Beverage, working on computer vision and inventory AI systems.

**Passionate about:** AI research, RAG-based knowledge bots, and Sales Forecasting AI Agents with n8n.

Based in Bangkok, Thailand
Email: waiyanmaing.dev@gmail.com`;
  }

  // Current job
  if (lower.match(/current|now|present|today|doing/)) {
    return `**Current Role**

**AI Solution Architect & Research Developer**
Thai Beverage Public Company Limited
2025 - Present

**What I'm working on:**
• AI computer vision for warehouse inventory detection using YOLO & deep learning
• Cross-platform mobile solutions (Go-Lang to Android AAR & iOS XCFramework)
• Integrating AI systems with supplier infrastructure
• Defining best practices for AI-driven inventory management`;
  }

  // AI Projects
  if (lower.match(/ai|machine learning|computer vision|chatbot|yolo/)) {
    return `**Wai Yan's AI & Automation Experience**

**Current (Thai Beverage):**
• AI computer vision for inventory detection using YOLO
• Deep learning models for real-time object recognition
• Mobile AI solutions with gomobile

**Previous (Grand Royal Group):**
• Built RAG-based AI chatbot with Python, OpenAI embeddings & FAISS
• Integrated across Web, Microsoft Teams, Telegram, and mobile apps
• Developed Sales Forecasting AI Agent with n8n & MSSQL
• Prompt engineering for automation

**Skills:** Python, OpenAI, FAISS, n8n, YOLO, Computer Vision, Deep Learning`;
  }

  // Default
  return `I'm here to help! I can tell you about Wai Yan Maing's:

• **Work Experience** - 7+ years across 4 companies
• **Technical Skills** - Full Stack, AI, DevOps
• **Education** - B.C.Sc. and certifications
• **Contact Info** - Email, phone, website
• **Resume Download** - Get the PDF

What would you like to know?`;
}
