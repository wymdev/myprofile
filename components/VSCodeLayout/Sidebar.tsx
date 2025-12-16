"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Icons, getFileIcon } from "@/components/Icons";

interface FileItem {
  name: string;
  type: "file" | "folder";
  section: string;
  children?: FileItem[];
}

const fileTree: FileItem[] = [
  {
    name: "src",
    type: "folder",
    section: "",
    children: [
      { name: "home.tsx", type: "file", section: "home" },
      { name: "about.tsx", type: "file", section: "about" },
      { name: "projects.ts", type: "file", section: "projects" },
      { name: "skills.json", type: "file", section: "skills" },
      { name: "contact.css", type: "file", section: "contact" },
      { name: "games.py", type: "file", section: "games" },
      { name: "README.md", type: "file", section: "github" },
    ],
  },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["src"]);
  const [activeIcon, setActiveIcon] = useState("files");

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        {item.type === "folder" ? (
          <>
            <button
              onClick={() => toggleFolder(item.name)}
              className="w-full flex items-center h-[22px] hover:bg-[var(--list-hover)] group"
              style={{ paddingLeft: `${depth * 8 + 8}px` }}
            >
              <span 
                className="mr-1 transition-transform"
                style={{ 
                  transform: expandedFolders.includes(item.name) ? "rotate(90deg)" : "rotate(0deg)",
                  color: "var(--text-muted)"
                }}
              >
                {Icons.chevronRight}
              </span>
              <span className="mr-1.5" style={{ color: "#C09553" }}>
                {expandedFolders.includes(item.name) ? Icons.folderOpen : Icons.folder}
              </span>
              <span style={{ color: "var(--text-primary)", fontSize: "13px" }}>
                {item.name}
              </span>
            </button>
            {expandedFolders.includes(item.name) && item.children && (
              <div>{renderFileTree(item.children, depth + 1)}</div>
            )}
          </>
        ) : (
          <button
            onClick={() => onSectionChange(item.section)}
            className="w-full flex items-center h-[22px] transition-colors"
            style={{ 
              paddingLeft: `${depth * 8 + 24}px`,
              background: activeSection === item.section ? "var(--list-active)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.section) {
                e.currentTarget.style.background = "var(--list-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.section) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <span className="mr-1.5">{getFileIcon(item.name)}</span>
            <span style={{ color: "var(--text-primary)", fontSize: "13px" }}>
              {item.name}
            </span>
          </button>
        )}
      </div>
    ));
  };

  const activityIcons = [
    { id: "files", icon: Icons.files, label: "Explorer" },
    { id: "search", icon: Icons.search, label: "Search" },
    { id: "git", icon: Icons.git, label: "Source Control" },
    { id: "extensions", icon: Icons.extensions, label: "Extensions" },
  ];

  return (
    <div className="flex h-full">
      {/* Activity Bar */}
      <div
        className="w-12 flex flex-col items-center py-1"
        style={{ 
          background: "var(--activitybar-bg)",
          borderRight: "1px solid var(--border-subtle)"
        }}
      >
        {activityIcons.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveIcon(item.id)}
            className="w-12 h-12 flex items-center justify-center relative group"
            style={{
              color: activeIcon === item.id ? "var(--text-primary)" : "var(--text-muted)",
            }}
            title={item.label}
          >
            {activeIcon === item.id && (
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6"
                style={{ background: "var(--text-primary)" }}
              />
            )}
            {item.icon}
          </button>
        ))}
        
        <div className="flex-1" />
        
        <button
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          title="Accounts"
        >
          {Icons.account}
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          title="Settings"
        >
          {Icons.settings}
        </button>
      </div>

      {/* Explorer Panel */}
      <div
        className="w-60 flex flex-col"
        style={{ 
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border-subtle)"
        }}
      >
        {/* Header */}
        <div 
          className="h-[35px] flex items-center justify-between px-4 text-[11px] uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Explorer</span>
          <button style={{ color: "var(--text-muted)" }}>
            {Icons.more}
          </button>
        </div>

        {/* Project Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-1">
            <button
              className="w-full flex items-center h-[22px] px-2 text-[11px] uppercase tracking-wider font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              <span 
                className="mr-1"
                style={{ color: "var(--text-muted)" }}
              >
                {Icons.chevronDown}
              </span>
              antigravity-portfolio
            </button>
            <div className="mt-1">
              {renderFileTree(fileTree)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
