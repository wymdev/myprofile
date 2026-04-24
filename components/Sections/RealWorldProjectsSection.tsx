"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: "viralflow",
    name: "Viral Flow",
    url: "https://viralflow.xynotechmm.online/",
    description: "Marketing and Viral Flow Automation System",
    color: "#4ec9b0",
    isBlocked: true,
  },
  {
    id: "kansan",
    name: "Kansan",
    url: "https://kansan.xynotechmm.online/",
    description: "Kansan Online Platform",
    color: "#0078d4",
    isBlocked: true,
  },
  {
    id: "beebudget",
    name: "BeeBudget",
    url: "https://play.google.com/store/apps/details?id=com.xynotechmm.beebudget",
    description: "Smart Personal Finance App (Production)",
    color: "#fbbf24",
    isBlocked: true,
  },
  {
    id: "hmaryu",
    name: "Hmaryu Store",
    url: "https://hmaryu.store/",
    description: "E-commerce platform for fashion and accessories",
    color: "#ce9178",
    isBlocked: false,
  },
  {
    id: "kidgame",
    name: "KidGame",
    url: "https://kidgame.xynotechmm.online/",
    description: "Interactive learning and gaming platform for kids",
    color: "#ffbd2e",
    isBlocked: false,
  },
];



export default function RealWorldProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ background: "var(--editor-bg)" }}>
      {/* Header & Tabs */}
      <div className="px-6 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-white">Real World Projects</h2>
            <p className="text-xs text-gray-500">Live production applications and platforms</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeProject.id === project.id
                  ? "bg-white/10 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
              style={{
                border: `1px solid ${activeProject.id === project.id ? project.color + "40" : "transparent"}`,
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
              <span className="truncate">{activeProject.url}</span>
              <a 
                href={activeProject.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Iframe or Beautiful Preview Card */}
          <div className="flex-1 bg-[#0d1117] overflow-hidden relative">
            {activeProject.isBlocked ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-gradient-to-br from-[#0d1117] to-[#161b22]">
                <div className="max-w-2xl w-full">
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="mb-4 relative mx-auto w-24 h-24"
                   >
                     <div 
                       className="absolute inset-0 rounded-2xl blur-xl opacity-20"
                       style={{ background: activeProject.color }}
                     />
                     <div className="relative w-full h-full bg-gray-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src="https://play-lh.googleusercontent.com/yxWkF6NwV4bVpMe8oSo8yd-5htZnbVwAfl9nqtLdt5wrBnfzfV1cwHGcdcDcyMTt_m0z680dHcvZzexBP6VvAA=w480-h960-rw" 
                          alt="Project Icon"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     </div>
                   </motion.div>

                    <motion.h3 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      {activeProject.id === "beebudget" ? "Live on Google Play" : "Security Restriction"}
                    </motion.h3>

                    <motion.p 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-400 mb-6 text-sm max-w-lg mx-auto"
                    >
                      {activeProject.id === "beebudget" 
                        ? "BeeBudget is officially live! Since it's a mobile application on the Play Store, it cannot be embedded here directly for security and UX reasons."
                        : `${activeProject.name} has a strict security policy (CSP) that prevents it from being displayed inside an iframe to protect user data.`}
                    </motion.p>
                   
                   <motion.div
                     initial={{ y: 10, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                   >
                     <a 
                       href={activeProject.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                     >
                       {activeProject.id === "beebudget" ? "View on Play Store" : "Launch Live Project"}
                       <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                         <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                       </svg>
                     </a>
                   </motion.div>

                   {activeProject.id !== "beebudget" && (
                     <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.5 }}
                       className="mt-12 text-xs text-gray-500 font-mono"
                     >
                       ERROR: REFUSED_TO_DISPLAY (FRAMEANCESTORS_NONE)
                     </motion.p>
                   )}
                </div>
              </div>
            ) : (
              <iframe
                src={activeProject.url}
                className="w-full h-full border-none"
                title={activeProject.name}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            )}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
