"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio.config";

export default function ResumeSection() {
  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ background: "var(--editor-bg)" }}>
       {/* PDF UI Header */}
      <div className="px-6 py-3 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Curriculum Vitae</h2>
          <p className="text-xs text-gray-500">Preview & Download local PDF resume</p>
        </div>
        <a 
          href={portfolioConfig.personal.resumeUrl}
          download={portfolioConfig.personal.resumeFileName}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-[#1e1e1e] relative">
        <iframe
          src={`${portfolioConfig.personal.resumeUrl}#toolbar=0`}
          className="w-full h-full border-none"
          title="Resume PDF Viewer"
        />
        
        {/* Subtle overlay to guide user if needed */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white font-mono flex items-center gap-2"
           >
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             LOCAL_PDF_SERVER_ACTIVE
           </motion.div>
        </div>
      </div>
    </div>
  );
}
