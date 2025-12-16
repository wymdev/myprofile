"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getGitHubRepos, GitHubRepo, languageColors } from "@/lib/github";

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchRepos() {
      const data = await getGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    fetchRepos();
  }, []);

  const languages = ["all", ...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];
  const filteredRepos = filter === "all" 
    ? repos 
    : repos.filter((r) => r.language === filter);

  return (
    <div 
      className="h-full overflow-auto"
      style={{ background: "var(--editor-bg)" }}
    >
      <div className="min-h-full px-12 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 
                className="text-3xl font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Projects
              </h2>
              <p 
                className="text-[13px]"
                style={{ color: "var(--text-muted)" }}
              >
                Open source projects from GitHub
              </p>
            </div>
            <a
              href="https://github.com/wymdev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-[12px]"
            >
              View GitHub Profile →
            </a>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {languages.slice(0, 8).map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className="px-3 py-1.5 text-[12px] rounded transition-colors"
                style={{
                  background: filter === lang ? "var(--accent)" : "var(--list-active)",
                  color: filter === lang ? "var(--accent-fg)" : "var(--text-secondary)",
                }}
              >
                {lang === "all" ? "All" : lang}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded animate-pulse"
                  style={{ background: "var(--sidebar-bg)" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded transition-all group"
                  style={{ 
                    background: "var(--sidebar-bg)",
                    border: "1px solid var(--border-subtle)"
                  }}
                  whileHover={{ 
                    borderColor: "var(--accent)",
                    y: -2
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 
                      className="font-medium text-[14px] group-hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      <span>★ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                    </div>
                  </div>
                  
                  <p 
                    className="text-[12px] mb-4 line-clamp-2 min-h-[32px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {repo.description || "No description"}
                  </p>

                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ background: languageColors[repo.language] || "#888" }}
                        />
                        <span 
                          className="text-[11px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <span 
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-[10px] rounded"
                          style={{ 
                            background: "var(--list-active)",
                            color: "var(--text-muted)"
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredRepos.length === 0 && (
            <div 
              className="text-center py-12"
              style={{ color: "var(--text-muted)" }}
            >
              No projects found with this filter.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
