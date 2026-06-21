"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";

interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  color: string;
  isBlocked: boolean;
  icon: React.ReactNode;
  tech?: string[];
}

// Project-specific SVG icons
const ProjectIcons = {
  viralflow: (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="vf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ec9b0" />
          <stop offset="100%" stopColor="#2d9980" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#vf-grad)" />
      <path d="M14 34L24 14L34 34" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18 28L24 18L30 28" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
      <circle cx="24" cy="12" r="2" fill="#fff" />
    </svg>
  ),
  kansan: (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="ks-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078d4" />
          <stop offset="100%" stopColor="#005a9e" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#ks-grad)" />
      <rect x="10" y="12" width="8" height="24" rx="2" fill="#fff" opacity="0.9" />
      <rect x="20" y="16" width="8" height="20" rx="2" fill="#fff" opacity="0.7" />
      <rect x="30" y="20" width="8" height="16" rx="2" fill="#fff" opacity="0.5" />
    </svg>
  ),
  hmaryu: (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="hm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ce9178" />
          <stop offset="100%" stopColor="#a06848" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#hm-grad)" />
      <path d="M14 18h20v16a2 2 0 01-2 2H16a2 2 0 01-2-2V18z" fill="#fff" opacity="0.9" />
      <path d="M12 14h24l-2 4H14l-2-4z" fill="#fff" />
      <circle cx="24" cy="26" r="3" fill="url(#hm-grad)" />
    </svg>
  ),
  hexguard: (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="hg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="#030303" />
      <path d="M24 8L36 15v14l-12 7-12-7V15l12-7z" stroke="url(#hg-grad)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M24 12L33 17v10l-9 5-9-5V17l9-5z" stroke="url(#hg-grad)" strokeWidth="2" fill="rgba(6,182,212,0.1)" />
      <path d="M24 18v8M20 22h8" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="22" r="6" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
};

const projects: Project[] = [
  {
    id: "viralflow",
    name: "Viral Flow",
    url: "https://viralflow.xynotechmm.online/",
    description: "Marketing and Viral Flow Automation System",
    color: "#4ec9b0",
    isBlocked: true,
    icon: ProjectIcons.viralflow,
    tech: ["React", "Node.js", "Automation"],
  },
  {
    id: "kansan",
    name: "Kansan",
    url: "https://kansan.xynotechmm.online/",
    description: "Kansan Online Platform",
    color: "#0078d4",
    isBlocked: true,
    icon: ProjectIcons.kansan,
    tech: ["Laravel", "React", "MySQL"],
  },
  {
    id: "beebudget",
    name: "BeeBudget",
    url: "https://play.google.com/store/apps/details?id=com.xynotechmm.beebudget",
    description: "Smart Personal Finance App (Production)",
    color: "#fbbf24",
    isBlocked: true,
    icon: null, // Uses Play Store image
    tech: ["React Native", "Expo", "SQLite", "Gemini AI"],
  },
  {
    id: "hmaryu",
    name: "Hmaryu Store",
    url: "https://hmaryu.store/",
    description: "E-commerce platform for fashion and accessories",
    color: "#ce9178",
    isBlocked: true,
    icon: ProjectIcons.hmaryu,
    tech: ["Next.js", "Laravel", "Node.js"],
  },
  {
    id: "hexguard",
    name: "HexGuard",
    url: "https://hexguard.up.railway.app/",
    description: "Hacking Surface Scanner — runs responsible security checks and produces actionable reports",
    color: "#22d3ee",
    isBlocked: true,
    icon: ProjectIcons.hexguard,
    tech: ["React", "Vite", "Security", "Python"],
  },
];

// Loading skeleton component
function IframeLoader({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117]">
      <div className="relative mb-6">
        <div
          className="w-12 h-12 rounded-xl animate-pulse"
          style={{ background: `${color}30` }}
        />
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `2px solid ${color}` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="space-y-2 w-48">
        <div className="h-2 rounded-full animate-pulse" style={{ background: `${color}20` }} />
        <div className="h-2 rounded-full animate-pulse w-3/4 mx-auto" style={{ background: `${color}15` }} />
      </div>
      <p className="text-xs mt-4 font-mono" style={{ color: `${color}80` }}>Loading project...</p>
    </div>
  );
}

// Blocked project showcase card
function BlockedProjectCard({ project }: { project: Project }) {
  const isBeebudget = project.id === "beebudget";

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 text-center overflow-auto">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-lg w-full relative z-10">
        {/* Project Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 relative mx-auto w-20 h-20 md:w-24 md:h-24"
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
            style={{ background: project.color }}
          />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${project.color}30` }}
          >
            {isBeebudget ? (
              <img
                src="https://play-lh.googleusercontent.com/yxWkF6NwV4bVpMe8oSo8yd-5htZnbVwAfl9nqtLdt5wrBnfzfV1cwHGcdcDcyMTt_m0z680dHcvZzexBP6VvAA=w480-h960-rw"
                alt="BeeBudget"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900/50 p-3">
                {project.icon}
              </div>
            )}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-bold text-white mb-1.5"
        >
          {isBeebudget ? "Live on Google Play" : "Security Restriction"}
        </motion.h3>

        {/* Project name tag */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
          style={{
            background: `${project.color}15`,
            border: `1px solid ${project.color}25`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: project.color }}
          />
          <span className="text-xs font-medium" style={{ color: project.color }}>
            {project.name}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-4 text-sm max-w-md mx-auto leading-relaxed"
        >
          {isBeebudget
            ? "BeeBudget is officially live! Since it's a mobile application on the Play Store, it cannot be embedded here directly."
            : `${project.name} has a strict security policy (CSP) that prevents it from being displayed inside an iframe to protect user data.`}
        </motion.p>

        {/* Tech stack chips */}
        {project.tech && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-1.5 justify-center mb-6"
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-medium"
                style={{
                  background: `${project.color}10`,
                  color: `${project.color}cc`,
                  border: `1px solid ${project.color}15`,
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-95"
            style={{
              background: project.color,
              color: project.id === "beebudget" ? "#000" : "#fff",
              boxShadow: `0 4px 20px ${project.color}40`,
            }}
          >
            {isBeebudget ? "View on Play Store" : "Launch Live Project"}
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </motion.div>

        {/* Technical error message - only for non-Play Store blocked */}
        {!isBeebudget && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-[11px] text-gray-600 font-mono tracking-wider"
          >
            ERROR: REFUSED_TO_DISPLAY (FRAMEANCESTORS_NONE)
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function RealWorldProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleProjectChange = useCallback((project: Project) => {
    setActiveProject(project);
    setIframeLoading(true);
  }, []);

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ background: "var(--editor-bg)" }}>
      {/* Header & Tabs */}
      <div className="px-4 md:px-6 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-white">Real World Projects</h2>
            <p className="text-xs text-gray-500">Live production applications and platforms</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-mono hidden md:inline">
              {projects.length} PROJECTS
            </span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectChange(project)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeProject.id === project.id
                  ? "bg-white/10 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
              style={{
                border: `1px solid ${activeProject.id === project.id ? project.color + "40" : "transparent"}`,
                boxShadow: activeProject.id === project.id ? `0 2px 8px ${project.color}15` : "none",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ background: project.color }}
              />
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Embedded View */}
      <div className="flex-1 relative bg-[#090b10]">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full flex flex-col"
        >
          {/* URL Bar */}
          <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-3 border-b border-black/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 bg-black/20 rounded-md px-3 py-1 text-xs text-gray-400 font-mono flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                {/* Security indicator */}
                <svg viewBox="0 0 24 24" className="w-3 h-3 flex-shrink-0" fill="none" stroke={activeProject.isBlocked ? "#f14c4c" : "#27c93f"} strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="truncate">{activeProject.url}</span>
              </div>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors ml-2 flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#0d1117] overflow-hidden relative">
            {activeProject.isBlocked ? (
              <BlockedProjectCard project={activeProject} />
            ) : (
              <>
                {iframeLoading && <IframeLoader color={activeProject.color} />}
                <iframe
                  src={activeProject.url}
                  className="w-full h-full border-none"
                  title={activeProject.name}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  onLoad={() => setIframeLoading(false)}
                  style={{ opacity: iframeLoading ? 0 : 1, transition: "opacity 0.3s ease" }}
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
