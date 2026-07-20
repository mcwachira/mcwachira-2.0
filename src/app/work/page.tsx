"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/getProjects";
import ProjectCard from "@/components/Projects/ProjectCard";
import { motion } from "framer-motion";

const filters = [
    "All",
    "Web App",
    "API & Backend",
    "Custom Website",
];

export default function Work() {
    const [projects, setProjects] = useState<any[]>([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    // ✅ Future-proof data loading (works with async later)
    useEffect(() => {
        const data = getProjects();
        setProjects(data);
        setLoading(false);
    }, []);

    const filtered =
        filter === "All"
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <section className="container-tight pt-32 pb-20 px-4">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <p className="text-sm text-primary mb-2">// projects</p>

                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Selected work.
                </h1>

                <p className="text-muted-foreground max-w-xl">
                    Here's what I've actually shipped. Real projects, real results.
                </p>
            </motion.div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2 mb-12">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm border transition ${
                            filter === f
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-card hover:bg-secondary"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* LOADING STATE */}
            {loading && (
                <div className="text-muted-foreground text-sm">
                    Loading projects...
                </div>
            )}

            {/* PROJECTS */}
            {!loading && (
                <div className="space-y-20">
                    {filtered.map((p, i) => (
                        <ProjectCard
                            key={p.slug}
                            project={p}
                            index={i}
                            prefetch // ⚡ ensures Next preloads dynamic routes
                        />
                    ))}
                </div>
            )}
        </section>
    );
}