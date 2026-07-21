"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { categoryColor } from "@/lib/lang";

const formatDate = (d?: string) =>
    d
        ? new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "";

const coverUrl = (p: BlogPost) =>
    p.coverImage
        ? urlFor(p.coverImage).width(800).auto("format").url()
        : null;

const primaryCategory = (p: BlogPost) =>
    p.categories?.[0]?.title || "Uncategorized";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const [cat, setCat] = useState("All");

    const categories = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((p) =>
            p.categories?.forEach((c) => set.add(c.title))
        );
        return ["All", ...Array.from(set).sort()];
    }, [posts]);

    const visible =
        cat === "All"
            ? posts
            : posts.filter((p) =>
                p.categories?.some((c) => c.title === cat)
            );

    const featured =
        visible.find((p) => p.isFeatured) || visible[0];

    const rest = visible.filter((p) => p._id !== featured?._id);

    return (
        <section className="container-tight pt-32 pb-20">
            {/* HEADER */}
            <header className="mb-10">
                <div className="text-sm font-mono text-primary mb-2">// blog</div>

                <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
                    Things I've learned the hard way.
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mb-6">
                    I write about Python, Java, JavaScript, and building software
                    for a living. No fluff — just stuff I actually found useful.
                </p>
            </header>

            {/* CATEGORY FILTER */}
            <div className="sticky top-20 z-30 -mx-6 px-6 py-3 bg-background/80 backdrop-blur-xl border-y border-border mb-10 overflow-x-auto">
                <div className="flex gap-2 whitespace-nowrap">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCat(c)}
                            className={`px-3 py-1.5 rounded-full text-sm border flex items-center gap-2 transition ${
                                cat === c
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                        >
              <span
                  className={`w-2 h-2 rounded-full ${
                      c === "All"
                          ? "bg-primary"
                          : categoryColor[c] || "bg-primary"
                  }`}
              />
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* EMPTY STATE */}
            {visible.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                    No published posts yet.
                </div>
            )}

            {/* FEATURED */}
            {featured && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="block rounded-3xl border border-border bg-card overflow-hidden glow-on-hover mb-12"
                    >
                        <div className="grid md:grid-cols-2">
                            <div className="aspect-[16/10] relative">
                                {coverUrl(featured) ? (
                                    <Image
                                        src={coverUrl(featured)!}
                                        alt={featured.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        Featured
                                    </div>
                                )}
                            </div>

                            <div className="p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-xs mb-3">
                  <span
                      className={`w-2 h-2 rounded-full ${
                          categoryColor[primaryCategory(featured)] ||
                          "bg-primary"
                      }`}
                  />
                                    <span className="text-muted-foreground">
                    {primaryCategory(featured)}
                  </span>
                                </div>

                                <h2 className="font-display text-3xl font-bold mb-3">
                                    {featured.title}
                                </h2>

                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {featured.excerpt}
                                </p>

                                <div className="text-xs text-muted-foreground mb-6">
                                    {formatDate(featured.publishedAt)}
                                </div>

                                <span className="text-primary inline-flex items-center gap-2">
                  Read article <ArrowRight size={14} />
                </span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {rest.map((p, i) => {
                    const cover = coverUrl(p);
                    const catName = primaryCategory(p);

                    return (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={`/blog/${p.slug}`}
                                className="rounded-2xl border border-border bg-card overflow-hidden glow-on-hover group"
                            >
                                <div className="aspect-[16/10] relative">
                                    {cover ? (
                                        <Image
                                            src={cover}
                                            alt={p.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            {catName}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-xs mb-3">
                    <span
                        className={`w-2 h-2 rounded-full ${
                            categoryColor[catName] || "bg-primary"
                        }`}
                    />
                                        <span className="text-muted-foreground">
                      {catName}
                    </span>
                                    </div>

                                    <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">
                                        {p.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {p.excerpt}
                                    </p>

                                    <div className="text-xs text-muted-foreground flex justify-between">
                                        <span>{formatDate(p.publishedAt)}</span>

                                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Read <ArrowRight size={12} />
                    </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}