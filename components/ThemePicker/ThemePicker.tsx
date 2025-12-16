"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes, Theme, applyTheme } from "@/lib/themes";

interface ThemePickerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemePicker({ currentTheme, onThemeChange }: ThemePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Fallback to first theme if currentTheme is undefined
  const theme = currentTheme || themes[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeSelect = (t: Theme) => {
    applyTheme(t);
    onThemeChange(t);
    setIsOpen(false);
    localStorage.setItem("portfolio-theme", t.id);
  };

  return (
    <div ref={ref} className="relative h-full flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 h-full hover:bg-white/10 transition-colors"
        title="Change Theme"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0112 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 00-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 012.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/>
          <circle cx="6.5" cy="11.5" r="1.5"/>
          <circle cx="9.5" cy="7.5" r="1.5"/>
          <circle cx="14.5" cy="7.5" r="1.5"/>
          <circle cx="17.5" cy="11.5" r="1.5"/>
        </svg>
        <span className="hidden sm:inline text-[12px]">{theme.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 right-0 w-56 rounded-lg overflow-hidden shadow-2xl z-[100]"
            style={{ 
              background: "var(--sidebar-bg)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div 
              className="px-3 py-2 text-[11px] uppercase tracking-wider font-medium"
              style={{ 
                color: "var(--text-muted)",
                borderBottom: "1px solid var(--border-subtle)",
                background: "var(--list-active)",
              }}
            >
              Color Theme
            </div>
            <div className="max-h-64 overflow-y-auto py-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeSelect(t)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--list-hover)] transition-colors"
                >
                  <div className="flex gap-1">
                    <span
                      className="w-4 h-4 rounded"
                      style={{ background: t.colors.editorBg, border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                    <span
                      className="w-4 h-4 rounded"
                      style={{ background: t.colors.accent }}
                    />
                  </div>
                  <span 
                    className="text-[13px] flex-1 text-left"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </span>
                  {theme.id === t.id && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: "var(--accent)" }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
