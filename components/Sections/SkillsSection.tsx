"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skillCategories = {
  frontend: {
    name: "Frontend",
    color: "#61DAFB",
    skills: [
      { name: "React.js", level: 95, years: "5+" },
      { name: "JavaScript", level: 95, years: "7+" },
      { name: "jQuery", level: 90, years: "7+" },
      { name: "HTML5/CSS3", level: 95, years: "7+" },
      { name: "Bootstrap", level: 90, years: "6+" },
    ],
  },
  mobile: {
    name: "Mobile",
    color: "#61DAFB",
    skills: [
      { name: "React Native", level: 88, years: "4+" },
      { name: "Cordova", level: 85, years: "5+" },
      { name: "Framework7", level: 82, years: "4+" },
    ],
  },
  backend: {
    name: "Backend",
    color: "#339933",
    skills: [
      { name: "Laravel (PHP)", level: 95, years: "7+" },
      { name: "Node.js", level: 90, years: "5+" },
      { name: "Express.js", level: 88, years: "4+" },
      { name: "Python Flask", level: 80, years: "2+" },
      { name: "RESTful APIs", level: 92, years: "6+" },
    ],
  },
  database: {
    name: "Database",
    color: "#336791",
    skills: [
      { name: "MySQL", level: 92, years: "7+" },
      { name: "PostgreSQL", level: 85, years: "4+" },
      { name: "MongoDB", level: 80, years: "3+" },
      { name: "MSSQL", level: 82, years: "3+" },
    ],
  },
  devops: {
    name: "DevOps",
    color: "#2496ED",
    skills: [
      { name: "Docker", level: 85, years: "4+" },
      { name: "Kubernetes", level: 80, years: "2+" },
      { name: "Git/Azure DevOps", level: 92, years: "6+" },
      { name: "Linux/Windows", level: 88, years: "6+" },
      { name: "Jenkins CI/CD", level: 78, years: "3+" },
      { name: "SSL Management", level: 85, years: "4+" },
    ],
  },
  ai: {
    name: "AI & ML",
    color: "#00A67E",
    skills: [
      { name: "Python", level: 82, years: "3+" },
      { name: "OpenAI/Embeddings", level: 85, years: "2+" },
      { name: "FAISS", level: 80, years: "2+" },
      { name: "YOLO/Computer Vision", level: 75, years: "1+" },
      { name: "n8n Automation", level: 85, years: "2+" },
      { name: "Prompt Engineering", level: 88, years: "2+" },
    ],
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const currentCategory = skillCategories[activeCategory];

  return (
    <div 
      className="h-full overflow-auto"
      style={{ background: "var(--editor-bg)" }}
    >
      <div className="min-h-full px-4 md:px-12 py-8 md:py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ 
                background: "linear-gradient(135deg, var(--text-primary), var(--syntax-type))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills & Technologies
            </motion.h2>
            <p className="text-[13px] md:text-[14px]" style={{ color: "var(--text-muted)" }}>
              7+ years of experience across full-stack development, mobile apps, and AI
            </p>
          </div>

          {/* Category Tabs - Scrollable on mobile */}
          <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
            <div 
              className="flex gap-2 p-1.5 rounded-2xl inline-flex min-w-max"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
            >
              {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 text-[12px] md:text-[13px] rounded-xl transition-all font-medium"
                  style={{
                    background: activeCategory === key 
                      ? `linear-gradient(135deg, ${skillCategories[key].color}30, ${skillCategories[key].color}10)` 
                      : "transparent",
                    color: activeCategory === key ? skillCategories[key].color : "var(--text-muted)",
                    border: activeCategory === key ? `1px solid ${skillCategories[key].color}40` : "1px solid transparent",
                  }}
                >
                  {skillCategories[key].name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="p-4 md:p-5 rounded-xl transition-all cursor-default"
                style={{ 
                  background: hoveredSkill === skill.name 
                    ? `linear-gradient(135deg, ${currentCategory.color}15, ${currentCategory.color}05)` 
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hoveredSkill === skill.name ? currentCategory.color + "40" : "var(--border-subtle)"}`,
                  transform: hoveredSkill === skill.name ? "translateY(-2px)" : "none",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {skill.name}
                    </span>
                    <span 
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ 
                        background: `${currentCategory.color}20`,
                        color: currentCategory.color,
                        border: `1px solid ${currentCategory.color}30`
                      }}
                    >
                      {skill.years} yrs
                    </span>
                  </div>
                  <span 
                    className="text-[13px] font-semibold"
                    style={{ color: currentCategory.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div 
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${currentCategory.color}, ${currentCategory.color}80)`,
                      boxShadow: hoveredSkill === skill.name ? `0 0 15px ${currentCategory.color}50` : 'none'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* All Technologies Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl mb-6"
            style={{ 
              background: "linear-gradient(135deg, rgba(0,120,212,0.08), rgba(78,201,176,0.05))",
              border: "1px solid rgba(0,120,212,0.15)"
            }}
          >
            <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--accent)" }}>
              All Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(skillCategories).flatMap(cat => 
                cat.skills.map(s => ({ name: s.name, color: cat.color }))
              ).map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-[11px] md:text-[12px] rounded-lg cursor-default transition-all"
                  style={{ 
                    background: `${tech.color}15`,
                    color: tech.color,
                    border: `1px solid ${tech.color}30`
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Management & Soft Skills */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={{ 
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--syntax-function)" }}>
                Project Management
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Agile", "Scrum", "Sprint Planning", "Team Leadership", "Cross-functional Collaboration", "Azure DevOps"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-[11px] rounded-lg"
                    style={{ 
                      background: "rgba(220, 220, 170, 0.1)",
                      color: "#dcdcaa",
                      border: "1px solid rgba(220, 220, 170, 0.2)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl"
              style={{ 
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--syntax-string)" }}>
                Currently Exploring
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Deep Learning", "RAG Systems", "LangChain", "Vector Databases", "MLOps", "Go-mobile"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[11px] rounded-lg"
                    style={{ 
                      border: "1px dashed rgba(206, 145, 120, 0.4)",
                      color: "#ce9178",
                      background: "rgba(206, 145, 120, 0.05)"
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
