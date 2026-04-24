"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuBar,
  Sidebar,
  TabBar,
  StatusBar,
  Breadcrumb,
} from "@/components/VSCodeLayout";
import {
  HomeSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  GamesSection,
  GitHubSection,
  BlogSection,
  RealWorldProjectsSection,
  ResumeSection,
} from "@/components/Sections";


import { Terminal } from "@/components/Terminal";
import { AIChat, AIButton } from "@/components/AI";
import { themes, Theme, applyTheme } from "@/lib/themes";
import { portfolioConfig } from "@/config/portfolio.config";

const fileMap: Record<string, string> = {
  home: "home.tsx",
  about: "about.tsx",
  projects: "projects.ts",
  resume: "resume.pdf",
  realworldprojects: "realworldprojects.ts",

  skills: "skills.json",
  contact: "contact.css",
  games: "games.py",
  github: "README.md",
  blog: "blog.mdx",
};


const sectionComponents: Record<string, React.ComponentType> = {
  home: HomeSection,
  about: AboutSection,
  projects: ProjectsSection,
  realworldprojects: RealWorldProjectsSection,
  resume: ResumeSection,
  skills: SkillsSection,


  contact: ContactSection,
  games: GamesSection,
  github: GitHubSection,
  blog: BlogSection,
};

// SVG Icons for Mobile Nav
const NavIcons = {
  home: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  games: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  realworldprojects: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
    </svg>
  ),

  github: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  ),
};

// Mobile Navigation Menu
function MobileNav({
  isOpen,
  onClose,
  activeSection,
  onSectionChange
}: {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "realworldprojects", label: "Real World" },
    { id: "skills", label: "Skills" },

    { id: "contact", label: "Contact" },
    { id: "games", label: "Games" },
    { id: "github", label: "GitHub" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-72 z-50 md:hidden"
            style={{
              background: "var(--sidebar-bg)",
              borderRight: "1px solid var(--border-color)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--accent), var(--syntax-type))" }}
                >
                  Dev
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {portfolioConfig.personal.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {portfolioConfig.personal.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <div className="p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1"
                  style={{
                    background: activeSection === section.id ? "var(--list-active)" : "transparent",
                    color: activeSection === section.id ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  <span style={{ color: activeSection === section.id ? "var(--accent)" : "var(--text-muted)" }}>
                    {NavIcons[section.id as keyof typeof NavIcons]}
                  </span>
                  <span className="text-sm font-medium">{section.label}</span>
                  {activeSection === section.id && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Beautiful Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    const texts = [
      "Initializing",
      "Loading modules",
      "Compiling TypeScript",
      "Starting dev server",
      "Almost ready",
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        const textIndex = Math.min(Math.floor(next / 25), texts.length - 1);
        setLoadingText(texts[textIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #0078d4 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, #4ec9b0 0%, transparent 50%)
            `,
            filter: "blur(100px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #0078d4, #4ec9b0)",
              boxShadow: "0 0 60px rgba(0, 120, 212, 0.5)",
            }}
          >
            Dev
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-white mb-2"
        >
          {portfolioConfig.personal.name}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-400 mb-8"
        >
          {portfolioConfig.personal.title}
        </motion.p>

        {/* Progress */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-[450px] w-full"
        >
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0078d4, #4ec9b0)",
              }}
            />
          </div>
          <div className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
            <span>{loadingText}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="font-mono text-[#0078d4]">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
      `}</style>
    </motion.div>
  );
}

// Help Dialog Component
function HelpDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-6 rounded-2xl max-h-[80vh] overflow-y-auto"
        style={{
          background: "var(--sidebar-bg)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Features & Shortcuts
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl" style={{ background: "var(--list-active)" }}>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--accent)" }}>Terminal</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
              Menu: <strong>Terminal → New Terminal</strong> or use:
            </p>
            <kbd className="px-2 py-1 rounded text-xs" style={{ background: "var(--editor-bg)", color: "var(--text-primary)" }}>
              Ctrl + `
            </kbd>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--list-active)" }}>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--syntax-type)" }}>Theme</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Menu: <strong>View → Theme</strong> or click palette icon in status bar
            </p>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--list-active)" }}>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--syntax-string)" }}>Download CV</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Menu: <strong>File → Download CV/Resume</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--list-active)" }}>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--syntax-function)" }}>AI Assistant</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Click the chat button (bottom right) - Trained on my CV/Resume with OpenAI
            </p>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--list-active)" }}>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--syntax-function)" }}>Navigation</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Use sidebar icons or swipe menu on mobile
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
          style={{
            background: "var(--accent)",
            color: "var(--accent-fg)",
          }}
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem("portfolio-theme");
    if (savedThemeId) {
      const savedTheme = themes.find((t) => t.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        applyTheme(savedTheme);
      }
    } else {
      applyTheme(themes[0]);
    }

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowHelp(false);
        setIsAIChatOpen(false);
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ActiveSectionComponent = sectionComponents[activeSection] || HomeSection;

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col overflow-hidden relative"
        style={{ background: "var(--editor-bg)" }}
      >
        {/* Menu Bar */}
        <MenuBar
          onHelpClick={() => setShowHelp(true)}
          onMenuClick={() => setIsMobileNavOpen(true)}
          onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Tab Bar - Hidden on mobile */}
            <div className="hidden md:block">
              <TabBar activeTab={activeSection} onTabChange={setActiveSection} />
            </div>

            {/* Breadcrumb - Simplified on mobile */}
            <Breadcrumb activeFile={fileMap[activeSection] || "home.tsx"} />

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <ActiveSectionComponent />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Terminal */}
            <Terminal
              isOpen={isTerminalOpen}
              onClose={() => setIsTerminalOpen(false)}
              onMinimize={() => setIsTerminalOpen(false)}
            />
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar
          activeFile={fileMap[activeSection] || "home.tsx"}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
          isTerminalOpen={isTerminalOpen}
        />

        {/* AI Chat Button */}
        <AIButton
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          isOpen={isAIChatOpen}
        />

        {/* AI Chat */}
        <AIChat
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
        />

        {/* Help Dialog */}
        <AnimatePresence>
          {showHelp && <HelpDialog isOpen={showHelp} onClose={() => setShowHelp(false)} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
