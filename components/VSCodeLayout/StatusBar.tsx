"use client";

import { Icons } from "@/components/Icons";
import { ThemePicker } from "@/components/ThemePicker";
import { Theme } from "@/lib/themes";

interface StatusBarProps {
  activeFile: string;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onTerminalToggle: () => void;
  isTerminalOpen: boolean;
}

export default function StatusBar({ 
  activeFile, 
  currentTheme, 
  onThemeChange,
  onTerminalToggle,
  isTerminalOpen
}: StatusBarProps) {
  const getLanguage = (file: string) => {
    const ext = file.split(".").pop();
    const languages: Record<string, string> = {
      tsx: "TypeScript React",
      ts: "TypeScript",
      jsx: "JavaScript React",
      js: "JavaScript",
      css: "CSS",
      json: "JSON",
      md: "Markdown",
      py: "Python",
    };
    return languages[ext || ""] || "Plain Text";
  };

  return (
    <div 
      className="flex items-center justify-between h-[28px] md:h-[22px] px-2 text-[11px] md:text-[12px] select-none"
      style={{ 
        background: "var(--statusbar-bg)",
        color: "var(--statusbar-fg)"
      }}
    >
      {/* Left side */}
      <div className="flex items-center h-full">
        {/* Remote indicator - Desktop only */}
        <button className="hidden md:flex items-center gap-1 px-2 hover:bg-white/10 h-full">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M12.5 7.5V6l3 2.5-3 2.5V9.5h-3v-2h3zM10 3H4v10h6v1H3V2h7v1z" />
          </svg>
        </button>

        {/* Branch */}
        <button className="flex items-center gap-1 px-2 hover:bg-white/10 h-full">
          {Icons.gitBranch}
          <span>main</span>
        </button>

        {/* Sync - Desktop only */}
        <button className="hidden md:flex items-center gap-1 px-2 hover:bg-white/10 h-full">
          {Icons.sync}
        </button>

        {/* Problems - Desktop only */}
        <button className="hidden md:flex items-center gap-2 px-2 hover:bg-white/10 h-full">
          <span className="flex items-center gap-0.5">
            {Icons.error}
            <span>0</span>
          </span>
          <span className="flex items-center gap-0.5">
            {Icons.warning}
            <span>0</span>
          </span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center h-full">
        {/* Terminal Toggle */}
        <button 
          onClick={onTerminalToggle}
          className="flex items-center gap-1 md:gap-1.5 px-2 hover:bg-white/10 h-full"
          title="Toggle Terminal (Ctrl+`)"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M6 9l-4-4 .7-.7L6 7.6 9.3 4.3l.7.7-4 4z" />
            <path d="M14 2H2v12h12V2zM3 13V3h10v10H3z" />
          </svg>
          <span className="hidden sm:inline">Terminal</span>
          {isTerminalOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          )}
        </button>

        {/* Line/Col - Desktop only */}
        <button className="hidden md:block px-2 hover:bg-white/10 h-full">
          Ln 1, Col 1
        </button>
        
        {/* Spaces - Desktop only */}
        <button className="hidden md:block px-2 hover:bg-white/10 h-full">
          Spaces: 2
        </button>
        
        {/* Encoding - Desktop only */}
        <button className="hidden lg:block px-2 hover:bg-white/10 h-full">
          UTF-8
        </button>
        
        {/* Language */}
        <button className="hidden sm:block px-2 hover:bg-white/10 h-full">
          {getLanguage(activeFile)}
        </button>
        
        {/* Theme Picker */}
        <ThemePicker 
          currentTheme={currentTheme} 
          onThemeChange={onThemeChange} 
        />

        {/* Bell - Desktop only */}
        <button className="hidden md:flex items-center gap-1 px-2 hover:bg-white/10 h-full">
          {Icons.bell}
        </button>
      </div>
    </div>
  );
}
