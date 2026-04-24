// Portfolio Configuration - WAI YAN MAING's ACTUAL CV DATA
// This data is used by the AI chatbot for accurate responses

export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Wai Yan Maing",
    title: "Full Stack Developer",
    email: "waiyanmaing.dev@gmail.com",
    phone: "0652940833",
    location: "Bangkok, Thailand",
    address: "PF94+GFC, Phet Kasem Rd, Bang Wa, Phasi Charoen, Bangkok 10160",
    website: "https://waiyanmaing.vercel.app",

    // Social Links
    github: "https://github.com/wymdev",
    linkedin: "https://www.linkedin.com/in/waiyanmaing-dev",
    twitter: "",

    // Resume/CV Download Link (Uses local public file)
    resumeUrl: "/resume.pdf",
    resumeDownloadUrl: "/resume.pdf",
    resumeFileName: "Wai_Yan_Maing_CV.pdf",

    avatar: "",
  },

  // About / Bio
  about: {
    shortBio: "Full Stack Developer with strong expertise in Laravel, Node.js, React, React Native, specializing in scalable web and mobile applications. Passionate about AI research, RAG-based knowledge bots, and Sales Forecasting AI Agents.",
    longBio: `I am a Full Stack Developer with strong expertise in Laravel, Node.js, React, React Native, jQuery, and JavaScript, specializing in delivering scalable and user-friendly web and mobile applications. My backend proficiency in Laravel and Node.js combined with modern frontend skills allows me to build robust end-to-end solutions.

I have experience as a Team Lead, driving projects with Agile methodologies to ensure effective collaboration and timely delivery. Beyond software development, I am passionate about AI research and development, focusing on RAG-based knowledge bots and Sales Forecasting AI Agents with n8n, aiming to integrate intelligent automation into business solutions.`,
  },

  // Education
  education: [
    {
      degree: "Bachelor of Computer Science (B.C.Sc.)",
      institution: "University of Computer Studies Taungngu (UCST)",
      year: "2013 - 2018",
      description: "Computer Science degree",
    },
    {
      degree: "DHIS 2 Fundamental & Data Quality Certificates",
      institution: "University of Oslo",
      year: "2020 - 2021",
      description: "DHIS Tool Certificates",
    },
    {
      degree: "Certificate of English Enhancement Program",
      institution: "ACM Knowledge School",
      year: "2022",
      description: "English language certification",
    },
  ],

  // Experience - ACTUAL WORK HISTORY
  experience: [
    {
      role: "AI Solution Architect & Research Developer",
      company: "Thai Beverage Public Company Limited",
      period: "2025 - Present",
      description: "AI architecture and computer vision development for warehouse inventory systems.",
      highlights: [
        "Designed end-to-end AI computer vision architecture for warehouse inventory detection using YOLO and deep learning models",
        "Achieved best accuracy in real-time object recognition across supplier warehouses",
        "Architected cross-platform mobile solutions by converting Go-Lang projects to Android AAR and iOS XCFramework using gomobile",
        "Enabled offline-first inventory processing on mobile devices",
        "Collaborated with cross-functional teams and supplier stakeholders to integrate computer vision systems",
        "Defined architectural patterns and best practices for AI-driven inventory management solutions",
      ],
    },
    {
      role: "Software Development Executive",
      company: "Grand Royal Group International",
      period: "2023 - 2025 (September)",
      description: "Led software development and AI integration initiatives.",
      highlights: [
        "Developed and maintained scalable web applications using React.js, Node.js, and Laravel",
        "Ensured high performance, security, and optimized user experiences",
        "Collaborated with cross-functional teams and integrated third-party vendor applications",
        "Implemented responsive UI designs with cross-browser/device compatibility",
        "Strengthened application security with authentication, authorization, encryption, and SSL certificates",
        "Lead infrastructure transformation with Kubernetes, Dockerization, and microservices",
        "Built AI-powered chatbot using Python, OpenAI embeddings, and FAISS",
        "Integrated chatbot across web, Teams, Telegram, and mobile apps",
        "Developed Sales Forecasting AI Agent with n8n, MSSQL, and prompt engineering",
        "Directed teams using Agile methodologies",
      ],
    },
    {
      role: "Senior Team Lead",
      company: "DirAce Technology (Japan)",
      period: "2023 (Feb - March)",
      description: "Led international development teams and managed testing environments.",
      highlights: [
        "Deployed and managed testing environments with project managers and international teams from Japan",
        "Worked with cross-functional teams (designers, product managers, developers)",
        "Implemented responsive designs with full cross-browser compatibility",
        "Participated in code reviews, providing constructive feedback",
      ],
    },
    {
      role: "Web Developer, Full-Stack Developer, Team Leader",
      company: "AGGA.IO",
      period: "2018 - 2023",
      description: "Full-stack development and team leadership for web and mobile applications.",
      highlights: [
        "Developed and maintained web applications using PHP, Laravel, and related technologies",
        "Collaborated with cross-functional teams to design and deliver high-quality products",
        "Implemented responsive designs with cross-browser compatibility",
        "Built mobile applications with Cordova, Framework7, and React Native",
        "Maintained and troubleshot servers (cloud and physical) on Linux and Windows",
        "Managed Agile sprints and version control using Git and Azure DevOps",
      ],
    },
  ],

  // Skills - ACTUAL TECHNICAL SKILLS
  skills: {
    frontend: ["React.js", "jQuery", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    mobile: ["React Native", "Framework7", "Cordova"],
    backend: ["PHP", "Laravel", "Node.js", "Express.js", "RESTful APIs", "Python Flask API"],
    database: ["MySQL", "MSSQL", "PostgreSQL", "MongoDB"],
    devops: ["Docker", "Kubernetes", "VM Server Management", "Linux", "Windows", "SSL Management"],
    versionControl: ["Git", "Azure DevOps", "Jenkins", "CI/CD"],
    ai: ["Python", "OpenAI Embeddings", "FAISS", "n8n", "Prompt Engineering", "YOLO", "Computer Vision", "Deep Learning"],
    projectManagement: ["Agile", "Scrum", "Sprint Planning", "Cross-functional Team Collaboration"],
    other: ["Third-party API Integration", "Microservices Architecture", "Cloud Deployment", "gomobile"],
  },

  // Projects
  projects: [
    {
      name: "AI Warehouse Inventory Detection",
      description: "End-to-end AI computer vision architecture for real-time inventory detection using YOLO and deep learning models",
      tech: ["YOLO", "Deep Learning", "Computer Vision", "Go-Lang", "gomobile", "Android AAR", "iOS XCFramework"],
      company: "Thai Beverage",
    },
    {
      name: "AI-Powered Chatbot",
      description: "RAG-based knowledge bot integrated across web, Teams, Telegram, and mobile apps",
      tech: ["Python", "OpenAI Embeddings", "FAISS", "React", "Node.js"],
      company: "Grand Royal Group",
    },
    {
      name: "Sales Forecasting AI Agent",
      description: "Predictive analytics and automation system delivering business insights",
      tech: ["n8n", "MSSQL", "Prompt Engineering", "AI Automation"],
      company: "Grand Royal Group",
    },
    {
      name: "Enterprise Web Applications",
      description: "Scalable web applications with Kubernetes, Docker, and microservices architecture",
      tech: ["React.js", "Node.js", "Laravel", "Kubernetes", "Docker"],
      company: "Grand Royal Group",
    },
    {
      "name": "BeeBudget",
      "description": "Smart Personal Finance Management app with multi-account support, budget planning, and AI-powered financial insights (Production)",
      "tech": ["React Native", "Expo", "SQLite", "Zustand", "Gemini AI"],
      "url": "https://play.google.com/store/apps/details?id=com.xynotechmm.beebudget",
      "image": "https://play-lh.googleusercontent.com/yxWkF6NwV4bVpMe8oSo8yd-5htZnbVwAfl9nqtLdt5wrBnfzfV1cwHGcdcDcyMTt_m0z680dHcvZzexBP6VvAA=w480-h960-rw"
    },
    {
      name: "KidGame",
      description: "Interactive learning and gaming platform for kids",
      tech: ["HTML5", "CSS3", "JavaScript", "Educational Games"],
      url: "https://kidgame.xynotechmm.online/",
    },
    {
      name: "Hmaryu Store",
      description: "Cross-border proxy shopping and e-commerce platform",
      tech: ["Next.js", "React", "Node.js", "Laravel"],
      url: "https://hmaryu.store/",
    },
    {
      name: "Cross-Platform Mobile Apps",
      description: "Mobile applications built with React Native, Cordova, and Framework7",
      tech: ["React Native", "Cordova", "Framework7"],
      company: "AGGA.IO",
    },
  ],


  // Stats
  stats: {
    yearsExperience: "7+",
    projectsCompleted: "50+",
    githubRepos: "30+",
    companiesWorked: "4",
  },

  // Languages
  languages: [
    { language: "Myanmar", proficiency: "100%", level: "Native" },
    { language: "English", proficiency: "67%", level: "Professional" },
  ],

  // References
  references: [
    {
      name: "Mrs. Thidar Aung",
      title: "Head Manager",
      company: "Grand Royal Group (GRG)",
      phone: "+95 9 517 296 4",
    },
    {
      name: "Ms. Keshan",
      title: "Cyber Security & Infrastructure Manager",
      company: "Grand Royal Group (GRG)",
      phone: "+95 9 252 329 087",
    },
  ],

  // Availability
  availability: {
    isAvailable: true,
    status: "Open to new opportunities",
    preferredWork: ["Full-time", "Contract", "AI Projects"],
  },
};

// Email configuration
export const emailConfig = {
  to: portfolioConfig.personal.email,
  subject: "Job Inquiry from Portfolio",
  body: "Hi Wai Yan,\n\nI found your portfolio and would like to discuss a potential opportunity.\n\n",
};

// Theme configuration
export const themeConfig = {
  defaultTheme: "dark-default",
  enableThemeSwitcher: true,
};

// Helper functions
export function getGmailComposeUrl(customSubject?: string, customBody?: string) {
  const subject = encodeURIComponent(customSubject || emailConfig.subject);
  const body = encodeURIComponent(customBody || emailConfig.body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${emailConfig.to}&su=${subject}&body=${body}`;
}

export function getMailtoUrl(customSubject?: string, customBody?: string) {
  const subject = encodeURIComponent(customSubject || emailConfig.subject);
  const body = encodeURIComponent(customBody || emailConfig.body);
  return `mailto:${emailConfig.to}?subject=${subject}&body=${body}`;
}

export function getResumeDownloadUrl() {
  return portfolioConfig.personal.resumeUrl;
}

// CV/Resume data for AI chatbot RAG - ONLY THIS DATA SHOULD BE USED
export const resumeData = {
  name: portfolioConfig.personal.name,
  title: portfolioConfig.personal.title,
  email: portfolioConfig.personal.email,
  phone: portfolioConfig.personal.phone,
  location: portfolioConfig.personal.location,
  address: portfolioConfig.personal.address,
  website: portfolioConfig.personal.website,
  github: portfolioConfig.personal.github,
  linkedin: portfolioConfig.personal.linkedin,
  summary: portfolioConfig.about.longBio,
  skills: portfolioConfig.skills,
  experience: portfolioConfig.experience,
  education: portfolioConfig.education,
  projects: portfolioConfig.projects,
  stats: portfolioConfig.stats,
  languages: portfolioConfig.languages,
  references: portfolioConfig.references,
  availability: portfolioConfig.availability,
};
