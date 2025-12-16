"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getGitHubUser, getGitHubRepos, GitHubUser, GitHubRepo, languageColors } from "@/lib/github";

export default function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [userData, repoData] = await Promise.all([
        getGitHubUser(),
        getGitHubRepos(),
      ]);
      setUser(userData);
      setRepos(repoData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Generate contribution-like grid
  const generateContributions = () => {
    return Array.from({ length: 7 }, () =>
      Array.from({ length: 52 }, () => Math.floor(Math.random() * 5))
    );
  };

  const contributions = generateContributions();

  const getContributionColor = (level: number) => {
    const colors = [
      "var(--list-active)",
      "rgba(78, 201, 176, 0.25)",
      "rgba(78, 201, 176, 0.5)",
      "rgba(78, 201, 176, 0.75)",
      "rgba(78, 201, 176, 1)",
    ];
    return colors[level];
  };

  // Language stats
  const languageStats = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalLangCount = topLanguages.reduce((acc, [, count]) => acc + count, 0);

  return (
    <div 
      className="h-full overflow-auto"
      style={{ background: "var(--editor-bg)" }}
    >
      <div className="min-h-full px-4 md:px-12 py-6 md:py-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 md:mb-8">
            <div>
              <h2 
                className="text-2xl md:text-3xl font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                GitHub Profile
              </h2>
              <p 
                className="text-[13px]"
                style={{ color: "var(--text-muted)" }}
              >
                Open source contributions and activity
              </p>
            </div>
            <a
              href="https://github.com/wymdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] transition-colors"
              style={{ 
                background: "var(--list-active)", 
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              View on GitHub
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </a>
          </div>

          {loading ? (
            <div 
              className="h-40 rounded animate-pulse"
              style={{ background: "var(--sidebar-bg)" }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Profile Card */}
              <div 
                className="p-6 rounded"
                style={{ 
                  background: "var(--sidebar-bg)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                {user?.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name || "Profile"}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                )}
                <h3 
                  className="text-lg font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user?.name || "Wai Yan Maing"}
                </h3>
                <p 
                  className="text-[13px] mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  @{user?.login || "wymdev"}
                </p>
                
                {user?.bio && (
                  <p 
                    className="text-[13px] mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {user.bio}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p 
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user?.public_repos || repos.length}
                    </p>
                    <p 
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Repos
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user?.followers || 0}
                    </p>
                    <p 
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Followers
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user?.following || 0}
                    </p>
                    <p 
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Following
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats & Activity */}
              <div className="md:col-span-2 space-y-6">
                {/* Contribution Graph */}
                <div 
                  className="p-4 rounded"
                  style={{ 
                    background: "var(--sidebar-bg)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <p 
                    className="text-[11px] uppercase tracking-wider mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Contribution Activity
                  </p>
                  <div className="overflow-x-auto">
                    <div className="flex flex-col gap-[2px] min-w-fit">
                      {contributions.map((week, i) => (
                        <div key={i} className="flex gap-[2px]">
                          {week.map((day, j) => (
                            <div
                              key={j}
                              className="w-[10px] h-[10px] rounded-sm"
                              style={{ background: getContributionColor(day) }}
                              title={`${day * 3} contributions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="w-[10px] h-[10px] rounded-sm"
                        style={{ background: getContributionColor(level) }}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>

                {/* Language Stats */}
                <div 
                  className="p-4 rounded"
                  style={{ 
                    background: "var(--sidebar-bg)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <p 
                    className="text-[11px] uppercase tracking-wider mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Most Used Languages
                  </p>
                  <div className="h-2 rounded-full overflow-hidden flex mb-3">
                    {topLanguages.map(([lang, count]) => (
                      <div
                        key={lang}
                        style={{
                          width: `${(count / totalLangCount) * 100}%`,
                          background: languageColors[lang] || "#888",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {topLanguages.map(([lang, count]) => (
                      <div key={lang} className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: languageColors[lang] || "#888" }}
                        />
                        <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                          {lang}
                        </span>
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {((count / totalLangCount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Repos */}
                <div 
                  className="p-4 rounded"
                  style={{ 
                    background: "var(--sidebar-bg)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <p 
                    className="text-[11px] uppercase tracking-wider mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Popular Repositories
                  </p>
                  <div className="space-y-2">
                    {repos.slice(0, 5).map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded transition-colors"
                        style={{ background: "var(--editor-bg)" }}
                      >
                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: languageColors[repo.language] || "#888" }}
                            />
                          )}
                          <span className="text-[13px]" style={{ color: "var(--accent)" }}>
                            {repo.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                          <span>★ {repo.stargazers_count}</span>
                          <span>⑂ {repo.forks_count}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
