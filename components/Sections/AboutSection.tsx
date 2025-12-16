"use client";

import { motion } from "framer-motion";

const LINKEDIN_URL = "https://www.linkedin.com/in/waiyanmaing-dev";
const GITHUB_URL = "https://github.com/wymdev";
const EMAIL = "waiyanmaing.dev@gmail.com";
const WEBSITE = "https://waiyanmaing.me";

export default function AboutSection() {
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
                background: "linear-gradient(135deg, var(--text-primary), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About Me
            </motion.h2>
            <p className="text-[13px] md:text-[14px]" style={{ color: "var(--text-muted)" }}>
              Full Stack Developer & AI Enthusiast based in Bangkok, Thailand
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div 
                className="p-6 rounded-2xl sticky top-4"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                {/* Avatar */}
                <div className="text-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl font-bold"
                    style={{ 
                      background: "linear-gradient(135deg, var(--accent), var(--syntax-type))",
                      color: "#fff",
                      boxShadow: "0 8px 30px rgba(0,120,212,0.3)",
                    }}
                  >
                    WY
                  </motion.div>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                    Wai Yan Maing
                  </h3>
                  <p className="text-[13px]" style={{ color: "var(--syntax-type)" }}>
                    Full Stack Developer & AI Architect
                  </p>
                </div>
                
                {/* Info */}
                <div className="space-y-3 text-[13px]">
                  {[
                    { label: "Location", value: "Bangkok, Thailand" },
                    { label: "Experience", value: "7+ Years" },
                    { label: "Education", value: "B.C.Sc. (Computer Science)" },
                    { label: "Current", value: "Thai Beverage" },
                    { label: "Status", value: "Open to opportunities" },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <p style={{ color: "var(--text-muted)" }} className="text-[10px] uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p style={{ color: "var(--text-primary)" }} className="font-medium">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-4 grid grid-cols-2 gap-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  {[
                    { name: "GitHub", url: GITHUB_URL },
                    { name: "LinkedIn", url: LINKEDIN_URL },
                    { name: "Website", url: WEBSITE },
                    { name: "Email", url: `mailto:${EMAIL}` },
                  ].map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 text-[11px] rounded-lg transition-colors text-center"
                      style={{ 
                        background: "var(--list-active)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl"
                style={{ 
                  background: "linear-gradient(135deg, rgba(0,120,212,0.1), rgba(78,201,176,0.05))",
                  border: "1px solid rgba(0,120,212,0.2)"
                }}
              >
              <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--accent)" }}>
                About
              </h4>
                <p className="text-[14px] md:text-[15px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  I am a <strong style={{ color: "var(--text-primary)" }}>Full Stack Developer</strong> with strong expertise in 
                  <span style={{ color: "var(--syntax-keyword)" }}> Laravel</span>, 
                  <span style={{ color: "var(--syntax-type)" }}> Node.js</span>, 
                  <span style={{ color: "var(--syntax-function)" }}> React</span>, 
                  <span style={{ color: "var(--syntax-string)" }}> React Native</span>, 
                  jQuery, and JavaScript, specializing in delivering scalable and user-friendly web and mobile applications.
                </p>
                <p className="text-[14px] md:text-[15px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  I have experience as a <strong style={{ color: "var(--syntax-type)" }}>Team Lead</strong>, driving projects with Agile methodologies 
                  to ensure effective collaboration and timely delivery.
                </p>
                <p className="text-[14px] md:text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Beyond software development, I am passionate about <strong style={{ color: "var(--accent)" }}>AI research and development</strong>, 
                  focusing on RAG-based knowledge bots and Sales Forecasting AI Agents with n8n, aiming to integrate intelligent automation into business solutions.
                </p>
              </motion.div>

              {/* Experience Timeline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl"
                style={{ 
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
              <h4 className="text-[11px] uppercase tracking-wider mb-6" style={{ color: "var(--syntax-type)" }}>
                Work Experience
              </h4>
                <div className="space-y-0">
                  {[
                    {
                      role: "AI Solution Architect & Research Developer",
                      company: "Thai Beverage Public Company Limited",
                      period: "2025 - Present",
                      description: "Building AI computer vision for warehouse inventory using YOLO & deep learning",
                      color: "#4ec9b0",
                      current: true,
                    },
                    {
                      role: "Software Development Executive",
                      company: "Grand Royal Group International",
                      period: "2023 - 2025",
                      description: "Led web/mobile development, built AI chatbot with OpenAI & FAISS, Sales Forecasting AI",
                      color: "#0078d4",
                    },
                    {
                      role: "Senior Team Lead",
                      company: "DirAce Technology (Japan)",
                      period: "Feb - Mar 2023",
                      description: "Managed testing environments with international teams from Japan",
                      color: "#ce9178",
                    },
                    {
                      role: "Web Developer, Full-Stack Developer, Team Leader",
                      company: "AGGA.IO",
                      period: "2018 - 2023",
                      description: "5 years building web & mobile apps with Laravel, React Native, server management",
                      color: "#dcdcaa",
                    },
                  ].map((exp, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative pl-6 pb-6"
                      style={{ 
                        borderLeft: `2px solid ${exp.color}40`,
                      }}
                    >
                      {/* Timeline dot */}
                      <div 
                        className="absolute left-[-7px] top-0 w-3 h-3 rounded-full"
                        style={{ 
                          background: exp.color,
                          boxShadow: exp.current ? `0 0 10px ${exp.color}` : 'none'
                        }}
                      />
                      
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                        <h5 className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>{exp.role}</h5>
                        <span 
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ 
                            background: `${exp.color}20`,
                            color: exp.color,
                            border: `1px solid ${exp.color}40`
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-[13px] mb-1" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                      <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
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
                Education & Certifications
              </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      degree: "B.C.Sc.",
                      field: "Computer Science",
                      school: "University of Computer Studies Taungngu",
                      year: "2013-2018",
                    },
                    {
                      degree: "DHIS 2 Certificates",
                      field: "Fundamental & Data Quality",
                      school: "University of Oslo",
                      year: "2020-2021",
                    },
                    {
                      degree: "English Program",
                      field: "Enhancement Certificate",
                      school: "ACM Knowledge School",
                      year: "2022",
                    },
                  ].map((edu, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl"
                      style={{ background: "var(--list-active)" }}
                    >
                      <p className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>{edu.degree}</p>
                      <p className="text-[12px]" style={{ color: "var(--syntax-type)" }}>{edu.field}</p>
                      <p className="text-[11px] mt-2" style={{ color: "var(--text-muted)" }}>{edu.school}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interests & Languages */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 rounded-2xl"
                  style={{ 
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--syntax-function)" }}>
                  Interests
                </h4>
                  <div className="flex flex-wrap gap-2">
                    {["AI/ML", "Computer Vision", "RAG Systems", "Full Stack", "Mobile Apps", "DevOps", "Team Leadership"].map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 text-[11px] rounded-full"
                        style={{ 
                          background: "var(--list-active)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-secondary)"
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="p-6 rounded-2xl"
                  style={{ 
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                <h4 className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--syntax-keyword)" }}>
                  Languages
                </h4>
                  <div className="space-y-3">
                    {[
                      { lang: "Myanmar", level: "Native", percent: 100 },
                      { lang: "English", level: "Professional", percent: 67 },
                    ].map((item) => (
                      <div key={item.lang}>
                        <div className="flex justify-between text-[12px] mb-1">
                          <span style={{ color: "var(--text-primary)" }}>{item.lang}</span>
                          <span style={{ color: "var(--text-muted)" }}>{item.level}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--list-active)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--accent), var(--syntax-type))" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
