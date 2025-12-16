"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const roles = [
  "Full Stack Developer",
  "AI Solution Architect",
  "Team Lead",
  "React Native Developer",
  "Laravel Expert",
];

const RESUME_URL = "https://drive.google.com/file/d/1bysMrKppwp4xCgqJbOo2-tqJ488H30Ux/view?usp=sharing";
const GITHUB_URL = "https://github.com/wymdev";
const LINKEDIN_URL = "https://www.linkedin.com/in/waiyanmaing-dev";
const EMAIL = "waiyanmaing.dev@gmail.com";

export default function HomeSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Mouse tracking
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const getGmailUrl = () => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Job Inquiry from Portfolio`;
  };

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-auto relative"
      style={{ background: "var(--editor-bg)" }}
    >
      {/* Static gradient background - subtle, no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #0078d4 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, #4ec9b0 0%, transparent 45%)
            `,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="min-h-full flex flex-col justify-center px-4 md:px-12 py-8 md:py-12 max-w-6xl mx-auto relative z-10">
        {/* Main Hero Card */}
        <motion.div
          style={!isMobile ? {
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 1000,
          } : {}}
          className="mb-6 md:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative p-6 md:p-10 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >

            <div className="relative z-10">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(78, 201, 176, 0.2), rgba(78, 201, 176, 0.1))",
                  border: "1px solid rgba(78, 201, 176, 0.4)",
                }}
              >
                <motion.span 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#4ec9b0" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[12px] font-medium" style={{ color: "#4ec9b0" }}>
                  Open to Opportunities • Bangkok, Thailand
                </span>
              </motion.div>

              {/* Name with gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold mb-4"
                style={{ 
                  background: "linear-gradient(135deg, #fff 0%, #ccc 50%, var(--accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Wai Yan Maing
              </motion.h1>

              {/* Typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center text-xl md:text-3xl mb-6 font-mono"
              >
                <span style={{ color: "var(--syntax-keyword)" }}>const</span>
                <span style={{ color: "var(--text-primary)" }}>&nbsp;role&nbsp;=&nbsp;</span>
                <span style={{ color: "var(--syntax-string)" }}>&quot;</span>
                <span style={{ color: "var(--syntax-string)" }}>{displayText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-0.5 h-6 md:h-8 ml-0.5"
                  style={{ background: "var(--accent)" }}
                />
                <span style={{ color: "var(--syntax-string)" }}>&quot;</span>
                <span style={{ color: "var(--text-primary)" }}>;</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm md:text-lg max-w-3xl mb-8 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Stack Developer with <strong style={{ color: "var(--accent)" }}>7+ years</strong> of experience in Laravel, Node.js, React & React Native. 
                Currently working as <strong style={{ color: "var(--syntax-type)" }}>AI Solution Architect</strong> at Thai Beverage, 
                building computer vision systems and RAG-based AI solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href={getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--accent)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] md:text-[15px] transition-all flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), #0066b3)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(0, 120, 212, 0.4)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Hire Me
                </motion.a>
                <motion.a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] md:text-[15px] transition-all flex items-center gap-2"
                  style={{
                    background: "rgba(78, 201, 176, 0.15)",
                    border: "1px solid rgba(78, 201, 176, 0.4)",
                    color: "#4ec9b0",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                  Download CV
                </motion.a>
                <motion.a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] md:text-[15px] transition-all flex items-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.a>
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] md:text-[15px] transition-all flex items-center gap-2"
                  style={{
                    background: "rgba(10, 102, 194, 0.15)",
                    border: "1px solid rgba(10, 102, 194, 0.4)",
                    color: "#0a66c2",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          {[
            { value: "7+", label: "Years Experience", color: "#0078d4" },
            { value: "4", label: "Companies", color: "#4ec9b0" },
            { value: "50+", label: "Projects", color: "#ce9178" },
            { value: "AI", label: "Researcher", color: "#dcdcaa" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-4 md:p-6 rounded-2xl text-center transition-all cursor-default group"
              style={{
                background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                border: `1px solid ${stat.color}30`,
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div 
                className="text-[10px] md:text-[12px] uppercase tracking-wider font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Role Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="p-4 md:p-6 rounded-2xl mb-8"
          style={{
            background: "rgba(0,120,212,0.08)",
            border: "1px solid rgba(0,120,212,0.15)",
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(0,120,212,0.15)" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="var(--accent)">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Current Position
              </p>
              <h3 className="text-lg md:text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                AI Solution Architect & Research Developer
              </h3>
              <p className="text-sm" style={{ color: "var(--syntax-type)" }}>
                Thai Beverage Public Company Limited • 2025 - Present
              </p>
              <p className="text-[13px] mt-2" style={{ color: "var(--text-secondary)" }}>
                Building AI computer vision for warehouse inventory detection using YOLO & deep learning
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <p 
            className="text-[10px] md:text-[11px] uppercase tracking-widest mb-4 font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Technologies I Work With
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              { name: "React", color: "#61DAFB" },
              { name: "Laravel", color: "#FF2D20" },
              { name: "Node.js", color: "#339933" },
              { name: "React Native", color: "#61DAFB" },
              { name: "Python", color: "#3776AB" },
              { name: "YOLO", color: "#00FFFF" },
              { name: "Docker", color: "#2496ED" },
              { name: "Kubernetes", color: "#326CE5" },
              { name: "PostgreSQL", color: "#336791" },
              { name: "OpenAI", color: "#00A67E" },
            ].map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-[13px] font-medium cursor-default transition-all"
                style={{
                  background: `${tech.color}18`,
                  border: `1px solid ${tech.color}40`,
                  color: tech.color,
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
