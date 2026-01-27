"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes, Theme, applyTheme } from "@/lib/themes";

interface MenuBarProps {
  onHelpClick?: () => void;
  onMenuClick?: () => void;
  onTerminalToggle?: () => void;
  currentTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

interface SubMenuItem {
  label: string;
  action: () => void;
  active: boolean;
}

interface MenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  shortcut?: string;
  submenu?: SubMenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export default function MenuBar({
  onHelpClick,
  onMenuClick,
  onTerminalToggle,
  currentTheme,
  onThemeChange
}: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (theme: Theme) => {
    applyTheme(theme);
    localStorage.setItem("portfolio-theme", theme.id);
    onThemeChange?.(theme);
    setActiveMenu(null);
  };

  const menuItems: MenuGroup[] = [
    {
      label: "File",
      items: [
        { label: "Download CV/Resume", icon: "↓", action: () => window.open(process.env.NEXT_PUBLIC_RESUME_URL || "https://drive.google.com/file/d/1xfSFPUVxTxV80_wksD6FJgczfDhIcqE9/view?usp=sharing", "_blank") },
        { label: "divider" },
        { label: "View on GitHub", icon: "→", action: () => window.open("https://github.com/wymdev", "_blank") },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Copy Email", icon: "⎘", action: () => navigator.clipboard.writeText("waiyanmaing.dev@gmail.com") },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Theme", icon: "◐", submenu: themes.map(t => ({
            label: t.name,
            action: () => handleThemeChange(t),
            active: currentTheme?.id === t.id
          }))
        },
      ],
    },
    {
      label: "Terminal",
      items: [
        { label: "New Terminal", icon: ">_", shortcut: "Ctrl+`", action: onTerminalToggle },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Keyboard Shortcuts", icon: "⌘", action: onHelpClick },
        { label: "About", icon: "i", action: onHelpClick },
      ],
    },
  ];

  return (
    <div
      ref={menuRef}
      className="flex items-center h-[44px] md:h-[30px] select-none relative z-50"
      style={{
        background: "var(--titlebar-bg)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center w-10 h-full hover:bg-white/10 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      {/* Window Controls (macOS style) - Desktop only */}
      <div className="hidden md:flex items-center gap-2 px-3">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 cursor-pointer" />
      </div>

      {/* Menu Items - Desktop only */}
      <div className="hidden md:flex items-center h-full">
        {menuItems.map((menu) => (
          <div key={menu.label} className="relative h-full">
            <button
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              className="h-full px-2.5 text-[13px] transition-colors"
              style={{
                color: activeMenu === menu.label ? "var(--text-primary)" : "var(--text-secondary)",
                background: activeMenu === menu.label ? "var(--list-active)" : "transparent",
              }}
            >
              {menu.label}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {activeMenu === menu.label && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-0 min-w-[200px] py-1 rounded-md shadow-xl z-[100]"
                  style={{
                    background: "var(--sidebar-bg)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  }}
                >
                  {menu.items.map((item, idx) => (
                    item.label === "divider" ? (
                      <div
                        key={idx}
                        className="my-1 mx-2 h-px"
                        style={{ background: "var(--border-subtle)" }}
                      />
                    ) : item.submenu ? (
                      <div key={idx} className="relative group">
                        <button
                          className="w-full flex items-center justify-between px-3 py-1.5 text-[13px] hover:bg-[var(--list-active)]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-4 text-center">{item.icon}</span>
                            {item.label}
                          </span>
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                          </svg>
                        </button>
                        {/* Theme Submenu */}
                        <div
                          className="absolute left-full top-0 min-w-[180px] py-1 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                          style={{
                            background: "var(--sidebar-bg)",
                            border: "1px solid var(--border-color)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                          }}
                        >
                          {item.submenu.map((subItem, subIdx) => (
                            <button
                              key={subIdx}
                              onClick={subItem.action}
                              className="w-full flex items-center justify-between px-3 py-1.5 text-[13px] hover:bg-[var(--list-active)]"
                              style={{ color: "var(--text-primary)" }}
                            >
                              <span>{subItem.label}</span>
                              {subItem.active && (
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: "var(--accent)" }}>
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-[13px] hover:bg-[var(--list-active)]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-4 text-center">{item.icon}</span>
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <span className="text-[11px] opacity-60">{item.shortcut}</span>
                        )}
                      </button>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Title */}
      <div
        className="flex-1 text-center text-[12px] md:-ml-20"
        style={{ color: "var(--text-secondary)" }}
      >
        <span className="hidden md:inline">Wai Yan Maing — Full Stack Developer & AI Architect</span>
        <span className="md:hidden">Portfolio</span>
      </div>

      {/* Mobile Help Button */}
      <button
        onClick={onHelpClick}
        className="md:hidden flex items-center justify-center w-10 h-full hover:bg-white/10 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </svg>
      </button>
    </div>
  );
}
