"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/sanity/queries";

export default function ProjectCard({ project, index }: { project: Project; index?: number }) {
    const isReverse = (index ?? 0) % 2 === 1;

    return (
        <motion.article
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (index ?? 0) * 0.08 }}
            className={`grid md:grid-cols-2 gap-10 items-center`}
        >
            {/* IMAGE */}
            <Link
                href={`/work/${project.slug}`}
                className={`block ${isReverse ? "md:order-2" : ""}`}
            >
                <div className="aspect-[4/3] rounded-2xl border bg-gradient-card flex items-center justify-center text-4xl font-display text-muted-foreground/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                    {project.title.split(" ")[0]}
                </div>
            </Link>

            {/* CONTENT */}
            <div>
                <p className="text-xs text-primary mb-2">{project.category}</p>

                <h2 className="text-3xl font-bold mb-3">{project.title}</h2>

                <p className="text-muted-foreground mb-4 max-w-md">
                    {project.description}
                </p>

                {/* RESULTS */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {(project.results ?? []).slice(0, 3).map((r: string) => (
                        <span
                            key={r}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                        >
              {r}
            </span>
                    ))}
                </div>

                {/* TECH */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {(project.tech ?? []).map((t: string) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 rounded-full text-xs border bg-muted/40"
                        >
              {t}
            </span>
                    ))}
                </div>

                <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    Read the case study →
                </Link>
            </div>
        </motion.article>
    );
}