"use client";

import { motion } from "framer-motion";
import { Icons, getFileIcon } from "@/components/Icons";

interface Tab {
  id: string;
  name: string;
}

const tabs: Tab[] = [
  { id: "home", name: "home.tsx" },
  { id: "about", name: "about.tsx" },
  { id: "projects", name: "projects.ts" },
  { id: "skills", name: "skills.json" },
  { id: "contact", name: "contact.css" },
  { id: "games", name: "games.py" },
  { id: "github", name: "README.md" },
  { id: "blog", name: "blog.mdx" },
];

interface TabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      className="flex items-center h-[35px] overflow-x-auto"
      style={{
        background: "var(--tab-inactive-bg)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="group relative flex items-center h-full px-3 text-[13px] shrink-0"
            style={{
              background: isActive ? "var(--tab-active-bg)" : "transparent",
              borderRight: "1px solid var(--border-subtle)",
            }}
          >
            {/* Active tab top border */}
            {isActive && (
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "var(--accent)" }}
              />
            )}

            {/* File icon */}
            <span className="mr-2">{getFileIcon(tab.name)}</span>

            {/* File name */}
            <span style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {tab.name}
            </span>

            {/* Close button */}
            <span
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-[var(--list-hover)] rounded p-0.5"
              style={{ color: "var(--text-muted)" }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle close
              }}
            >
              {Icons.close}
            </span>

            {/* Modified dot */}
            {isActive && (
              <span
                className="absolute top-1/2 right-1 -translate-y-1/2 w-2 h-2 rounded-full opacity-0"
                style={{ background: "var(--text-muted)" }}
              />
            )}
          </button>
        );
      })}

      {/* Tab bar actions */}
      <div className="flex items-center ml-auto px-2 gap-1">
        <button
          className="p-1 rounded hover:bg-[var(--list-hover)]"
          style={{ color: "var(--text-muted)" }}
        >
          {Icons.splitHorizontal}
        </button>
        <button
          className="p-1 rounded hover:bg-[var(--list-hover)]"
          style={{ color: "var(--text-muted)" }}
        >
          {Icons.more}
        </button>
      </div>
    </div>
  );
}
