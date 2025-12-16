"use client";

import { Icons, getFileIcon } from "@/components/Icons";

interface BreadcrumbProps {
  activeFile: string;
}

export default function Breadcrumb({ activeFile }: BreadcrumbProps) {
  return (
    <div 
      className="flex items-center h-[22px] px-3 text-[12px] overflow-hidden"
      style={{ 
        background: "var(--editor-bg)",
        borderBottom: "1px solid var(--border-subtle)",
        color: "var(--text-secondary)"
      }}
    >
      <span className="hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1">
        {Icons.folder}
        <span>src</span>
      </span>
      <span className="mx-1" style={{ color: "var(--text-muted)" }}>/</span>
      <span className="flex items-center gap-1 text-[var(--text-primary)]">
        {getFileIcon(activeFile)}
        <span>{activeFile}</span>
      </span>
      <span className="mx-1" style={{ color: "var(--text-muted)" }}>›</span>
      <span className="text-[var(--syntax-function)]">Portfolio</span>
    </div>
  );
}
