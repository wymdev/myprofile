"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getDevToArticles, DevToArticle } from "@/lib/devto";

export default function BlogSection() {
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            const data = await getDevToArticles();
            setArticles(data);
            setLoading(false);
        }
        fetchArticles();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="h-full overflow-auto" style={{ background: "var(--editor-bg)" }}>
            <div className="min-h-full px-4 md:px-12 py-8 md:py-12 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                        <div>
                            <h2
                                className="text-2xl md:text-3xl font-semibold mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Blog & Articles
                            </h2>
                            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                                Technical writings and tutorials from Dev.to
                            </p>
                        </div>
                        <a
                            href="https://dev.to/wymdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] transition-colors"
                            style={{
                                background: "var(--list-active)",
                                color: "var(--text-secondary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .65-.08.83-.23.17-.15.26-.35.26-.6v-2.7c0-.25-.09-.45-.26-.6zm8.17-.03c-.2 0-.38.05-.53.15-.15.1-.26.23-.32.4v2.86c.06.17.17.3.32.4.15.1.33.15.53.15.21 0 .39-.05.55-.15.15-.1.23-.24.23-.4v-2.86c0-.17-.08-.31-.23-.4-.16-.1-.34-.15-.55-.15z" />
                                <path d="M20.16 3H3.84C2.82 3 2 3.82 2 4.84v14.32c0 1.02.82 1.84 1.84 1.84h16.32c1.02 0 1.84-.82 1.84-1.84V4.84C22 3.82 21.18 3 20.16 3zM8.85 14.4H7.25V9.6h1.6v4.8zm6.8-.45c0 .47-.2.88-.6 1.23-.4.35-.9.52-1.5.52-.6 0-1.1-.17-1.5-.52-.4-.35-.6-.76-.6-1.23v-2.1c0-.47.2-.88.6-1.23.4-.35.9-.52 1.5-.52.6 0 1.1.17 1.5.52.4.35.6.76.6 1.23v2.1zm4.2.45h-1.6v-2.3l-1.3 2.3h-1.6V9.6h1.6v2.3l1.3-2.3h1.6v4.8z" />
                            </svg>
                            View on Dev.to
                        </a>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-5 h-5 rounded-full animate-spin"
                                    style={{ border: "2px solid var(--border-color)", borderTopColor: "var(--accent)" }}
                                />
                                <span style={{ color: "var(--text-muted)" }}>Loading articles...</span>
                            </div>
                        </div>
                    )}

                    {/* No Articles */}
                    {!loading && articles.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-lg mb-2" style={{ color: "var(--text-muted)" }}>
                                No articles yet
                            </p>
                            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                                Check back soon for new content!
                            </p>
                        </div>
                    )}

                    {/* Articles Grid */}
                    {!loading && articles.length > 0 && (
                        <div className="grid gap-4 md:gap-6">
                            {articles.map((article, index) => (
                                <motion.a
                                    key={article.id}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="group block p-4 md:p-6 rounded-xl transition-all"
                                    style={{
                                        background: "var(--sidebar-bg)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {/* Cover Image */}
                                        {article.cover_image && (
                                            <div className="w-full md:w-48 h-32 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
                                                <img
                                                    src={article.cover_image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className="text-lg font-semibold mb-2 group-hover:underline line-clamp-2"
                                                style={{ color: "var(--accent)" }}
                                            >
                                                {article.title}
                                            </h3>
                                            <p
                                                className="text-[13px] mb-3 line-clamp-2"
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                {article.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {article.tag_list.slice(0, 4).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded text-[10px]"
                                                        style={{
                                                            background: "var(--list-active)",
                                                            color: "var(--syntax-keyword)",
                                                        }}
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Meta */}
                                            <div
                                                className="flex items-center gap-4 text-[11px]"
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                <span>{formatDate(article.published_at)}</span>
                                                <span>·</span>
                                                <span>{article.reading_time_minutes} min read</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                    </svg>
                                                    {article.positive_reactions_count}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                                                        <path d="M21 6h-2V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM6 5h12v2H6V5zm14 13H4V8h16v10z" />
                                                    </svg>
                                                    {article.comments_count}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
