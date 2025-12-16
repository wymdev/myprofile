"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio.config";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "success" | "info";
  content: string;
  prompt?: string;
}

const WELCOME_MESSAGE = `Welcome to ${portfolioConfig.personal.name}'s Portfolio Terminal v1.0.0
Type 'help' for available commands.
`;

const HELP_TEXT = `
Available Commands:
──────────────────────────────────────────
  help          Show this help message
  clear         Clear the terminal
  whoami        Display user information
  about         Show about me
  skills        List technical skills
  projects      Show recent projects
  contact       Display contact information
  
  ping <host>   Ping a host
  echo <text>   Print text to terminal
  date          Show current date and time
  pwd           Print working directory
  ls            List directory contents
  cat <file>    Display file contents
  cd <dir>      Change directory
  neofetch      Display system information
  
  theme         Show available themes
  history       Show command history
  exit          Close terminal
──────────────────────────────────────────
`;

const FILE_SYSTEM: Record<string, Record<string, string>> = {
  "~": {
    "about.txt": `Name: ${portfolioConfig.personal.name}
Role: ${portfolioConfig.personal.title}
Location: ${portfolioConfig.personal.location}
Experience: ${portfolioConfig.stats.yearsExperience} years

${portfolioConfig.about.shortBio}`,
    "skills.json": `{
  "frontend": ${JSON.stringify(portfolioConfig.skills.frontend.slice(0, 4))},
  "backend": ${JSON.stringify(portfolioConfig.skills.backend.slice(0, 4))},
  "tools": ${JSON.stringify(portfolioConfig.skills.devops.slice(0, 4))}
}`,
    "contact.md": `# Contact Information

- Email: ${portfolioConfig.personal.email}
- GitHub: ${portfolioConfig.personal.github}
- LinkedIn: ${portfolioConfig.personal.linkedin}`,
    "projects": "directory",
    "documents": "directory",
  },
  "~/projects": {
    "README.md": `# Projects

${portfolioConfig.projects.map((p, i) => `${i + 1}. ${p.name} - ${p.tech.join(", ")}`).join("\n")}`,
  },
  "~/documents": {
    "resume.txt": `Resume available at ${portfolioConfig.personal.resumeUrl || portfolioConfig.personal.website}`,
  },
};

export default function Terminal({ 
  isOpen, 
  onClose,
  onMinimize 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onMinimize: () => void;
}) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: "info", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(1);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const addLine = useCallback((type: TerminalLine["type"], content: string, prompt?: string) => {
    const id = lineIdRef.current++;
    setLines((prev) => [...prev, { id, type, content, prompt }]);
  }, []);

  const typeOutput = useCallback(async (text: string, type: TerminalLine["type"] = "output", delay = 10) => {
    setIsTyping(true);
    const chars = text.split("");
    let current = "";
    const id = lineIdRef.current++;
    
    setLines((prev) => [...prev, { id, type, content: "" }]);
    
    for (const char of chars) {
      current += char;
      setLines((prev) => 
        prev.map((line) => 
          line.id === id ? { ...line, content: current } : line
        )
      );
      await new Promise((r) => setTimeout(r, delay));
    }
    setIsTyping(false);
  }, []);

  const simulatePing = useCallback(async (host: string) => {
    addLine("info", `PING ${host} (${host === "localhost" ? "127.0.0.1" : "93.184.216.34"}): 56 data bytes`);
    
    for (let i = 0; i < 4; i++) {
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
      const time = (10 + Math.random() * 50).toFixed(1);
      addLine("success", `64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${time} ms`);
    }
    
    await new Promise((r) => setTimeout(r, 500));
    addLine("info", `--- ${host} ping statistics ---`);
    addLine("info", `4 packets transmitted, 4 packets received, 0.0% packet loss`);
  }, [addLine]);

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Show input
    addLine("input", trimmed, `${currentDir} $`);

    const [command, ...args] = trimmed.split(" ");
    const arg = args.join(" ");

    switch (command.toLowerCase()) {
      case "help":
        addLine("output", HELP_TEXT);
        break;

      case "clear":
        setLines([]);
        break;

      case "whoami":
        addLine("success", portfolioConfig.personal.name.toLowerCase().replace(" ", ""));
        break;

      case "about":
        await typeOutput(`
╔══════════════════════════════════════════╗
║           ${portfolioConfig.personal.name.toUpperCase().padEnd(26)}║
║       ${portfolioConfig.personal.title.padEnd(32)}║
╠══════════════════════════════════════════╣
║  • ${portfolioConfig.stats.yearsExperience} years of experience                ║
║  • Based in ${portfolioConfig.personal.location.padEnd(24)}║
║  • Building web & mobile apps            ║
║  • Open source enthusiast                ║
╚══════════════════════════════════════════╝
`, "info", 5);
        break;

      case "skills":
        addLine("output", `
Technical Skills:
─────────────────
Frontend:  ${portfolioConfig.skills.frontend.join(", ")}
Backend:   ${portfolioConfig.skills.backend.join(", ")}
Database:  ${portfolioConfig.skills.database.join(", ")}
DevOps:    ${portfolioConfig.skills.devops.join(", ")}
`);
        break;

      case "projects":
        const projectsList = portfolioConfig.projects.map((p, i) => 
          `${i + 1}. ${p.name.padEnd(22)} │ ${p.tech.join(", ")}`
        ).join("\n");
        addLine("output", `
Recent Projects:
────────────────
${projectsList}

Visit ${portfolioConfig.personal.github} for more projects.
`);
        break;

      case "contact":
        addLine("output", `
Contact Information:
────────────────────
📧 Email:    ${portfolioConfig.personal.email}
🔗 GitHub:   ${portfolioConfig.personal.github}
💼 LinkedIn: ${portfolioConfig.personal.linkedin}
🌐 Website:  ${portfolioConfig.personal.website}
`);
        break;

      case "ping":
        if (!arg) {
          addLine("error", "Usage: ping <host>");
        } else {
          await simulatePing(arg);
        }
        break;

      case "echo":
        addLine("output", arg || "");
        break;

      case "date":
        addLine("success", new Date().toString());
        break;

      case "pwd":
        addLine("output", currentDir);
        break;

      case "ls":
        const dir = FILE_SYSTEM[currentDir];
        if (dir) {
          const items = Object.entries(dir).map(([name, content]) => {
            if (content === "directory") {
              return `📁 ${name}/`;
            }
            return `📄 ${name}`;
          });
          addLine("output", items.join("  "));
        }
        break;

      case "cd":
        if (!arg || arg === "~") {
          setCurrentDir("~");
        } else if (arg === "..") {
          if (currentDir !== "~") {
            const parts = currentDir.split("/");
            parts.pop();
            setCurrentDir(parts.join("/") || "~");
          }
        } else {
          const newDir = currentDir === "~" ? `~/${arg}` : `${currentDir}/${arg}`;
          if (FILE_SYSTEM[newDir]) {
            setCurrentDir(newDir);
          } else {
            addLine("error", `cd: no such directory: ${arg}`);
          }
        }
        break;

      case "cat":
        if (!arg) {
          addLine("error", "Usage: cat <filename>");
        } else {
          const dir = FILE_SYSTEM[currentDir];
          if (dir && dir[arg] && dir[arg] !== "directory") {
            addLine("output", dir[arg]);
          } else {
            addLine("error", `cat: ${arg}: No such file`);
          }
        }
        break;

      case "neofetch":
        await typeOutput(`
        ████████████████  ${portfolioConfig.personal.name.toLowerCase().replace(" ", "")}@portfolio
        ████████████████  ─────────────────────
        ████████████████  OS: macOS 14.0
        ████████████████  Host: Portfolio v1.0
        ████████████████  Kernel: Next.js 16.0
        ████████████████  Shell: zsh 5.9
        ████████████████  Terminal: web-terminal
        ████████████████  CPU: Full Stack Dev
        ████████████████  Memory: ∞ ideas
                          
                          ●  ●  ●  ●  ●  ●  ●  ●
`, "info", 3);
        break;

      case "theme":
        addLine("output", `
Available Themes:
─────────────────
• dark-default  - Dark+ (Default)
• monokai       - Monokai
• dracula       - Dracula  
• github-dark   - GitHub Dark
• one-dark      - One Dark Pro
• nord          - Nord
• light         - Light+

Use the theme picker in the status bar to change themes.
`);
        break;

      case "history":
        if (history.length === 0) {
          addLine("info", "No commands in history");
        } else {
          const historyText = history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n");
          addLine("output", historyText);
        }
        break;

      case "exit":
        onClose();
        break;

      default:
        addLine("error", `Command not found: ${command}. Type 'help' for available commands.`);
    }
  }, [currentDir, history, addLine, typeOutput, simulatePing, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTyping) {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      addLine("input", input + "^C", `${currentDir} $`);
      setInput("");
    }
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "error": return "var(--terminal-red)";
      case "success": return "var(--terminal-green)";
      case "info": return "var(--terminal-blue)";
      default: return "var(--terminal-fg)";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t"
          style={{ 
            background: "var(--terminal-bg)",
            borderColor: "var(--border-subtle)"
          }}
        >
          {/* Terminal Header */}
          <div 
            className="h-[35px] flex items-center justify-between px-3 md:px-4 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <span 
                className="text-[12px]"
                style={{ color: "var(--text-primary)" }}
              >
                Terminal
              </span>
              <span 
                className="text-[11px] hidden sm:inline"
                style={{ color: "var(--text-muted)" }}
              >
                zsh
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onMinimize}
                className="p-1.5 rounded hover:bg-[var(--list-hover)]"
                style={{ color: "var(--text-muted)" }}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M14 8v1H3V8h11z" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-[var(--list-hover)]"
                style={{ color: "var(--text-muted)" }}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            className="h-[200px] md:h-[265px] overflow-auto p-3 md:p-4 font-code text-[12px] md:text-[13px] cursor-text"
            onClick={() => inputRef.current?.focus()}
            style={{ color: "var(--terminal-fg)" }}
          >
            {lines.map((line) => (
              <div key={line.id} className="leading-[1.4]">
                {line.prompt && (
                  <span style={{ color: "var(--terminal-green)" }}>
                    {line.prompt}{" "}
                  </span>
                )}
                <span 
                  style={{ color: getLineColor(line.type) }}
                  className="whitespace-pre-wrap break-words"
                >
                  {line.content}
                </span>
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center">
              <span style={{ color: "var(--terminal-green)" }}>
                {currentDir} ${" "}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent outline-none min-w-0"
                style={{ color: "var(--terminal-fg)" }}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              <span 
                className="w-2 h-4 cursor-blink flex-shrink-0"
                style={{ background: "var(--terminal-fg)" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
