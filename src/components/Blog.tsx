"use client";

import { Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const featured = {
    category: "Software Engineering",
    categoryColor: "ts",
    title: "Choosing the Right Backend Stack: When to Use Python vs Java vs Node.js",
    excerpt:
        "An honest, project-based comparison of three of the most common backend stacks — with real trade-offs around team size, performance, hiring, and long-term maintenance.",
    date: "Apr 14, 2026",
    readTime: "12 min read",
};

const posts = [
    {
        category: "Python",
        categoryColor: "python",
        title: "Building Production REST APIs with Django REST Framework",
        excerpt:
            "Authentication, throttling, idempotency keys, and the patterns that actually matter once you're past the tutorial stage.",
        date: "Mar 28, 2026",
        readTime: "9 min",
    },
    {
        category: "Java",
        categoryColor: "java",
        title: "Spring Boot for People Who Hate XML",
        excerpt:
            "A practical, modern Spring Boot setup using Java 21, records, and zero ceremony — with a working CRUD app to follow along.",
        date: "Mar 12, 2026",
        readTime: "11 min",
    },
    {
        category: "JavaScript",
        categoryColor: "js",
        title: "A Deep Dive into Event Emitters in Node.js",
        excerpt:
            "How EventEmitters work under the hood, when to reach for them, and the memory-leak pitfalls every Node dev should know.",
        date: "Feb 24, 2026",
        readTime: "8 min",
    },
    {
        category: "C# & .NET",
        categoryColor: "csharp",
        title: "Minimal APIs in ASP.NET Core: The Good Parts",
        excerpt:
            "Why minimal APIs deserve a serious look in 2026 — and where they still fall short compared to MVC.",
        date: "Feb 09, 2026",
        readTime: "7 min",
    },
    {
        category: "Web Dev",
        categoryColor: "ts",
        title: "Designing UIs That Don't Look Like Every Other Tailwind Site",
        excerpt:
            "Practical techniques for breaking out of the cookie-cutter Tailwind look without throwing away the productivity.",
        date: "Jan 22, 2026",
        readTime: "6 min",
    },
    {
        category: "Business",
        categoryColor: "neutral",
        title: "How I Price Freelance Software Projects (And What I Got Wrong)",
        excerpt:
            "Three years of freelance pricing experiments, what worked, what didn't, and the framework I use today.",
        date: "Jan 08, 2026",
        readTime: "10 min",
    },
];

const catClasses: Record<string, string> = {
    python: "bg-lang-python/15 text-lang-python border-lang-python/30",
    java: "bg-lang-java/15 text-lang-java border-lang-java/30",
    csharp: "bg-lang-csharp/15 text-lang-csharp border-lang-csharp/30",
    js: "bg-lang-js/15 text-lang-js border-lang-js/30",
    ts: "bg-lang-ts/15 text-lang-ts border-lang-ts/30",
    neutral: "bg-secondary/60 text-muted-foreground border-border",
};

// Animation Variants
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const Blog = () => {
    return (
        <section id="blog" className="py-16 sm:py-20 lg:py-24 relative">
            <div className="container-tight px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
                >
                    <div className="max-w-2xl">
                        <div className="text-sm font-mono text-primary mb-3">
                            {"// From the blog"}
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                            Notes on building{" "}
                            <span className="gradient-text">
                software that ships
              </span>
                        </h2>
                    </div>

                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
                    >
                        All articles <ArrowUpRight size={16} />
                    </a>
                </motion.div>

                {/* Featured */}
                <motion.a
                    href="#"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="group block p-5 sm:p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border glow-on-hover mb-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

                        {/* Image */}
                        <div className="lg:col-span-5 aspect-[16/10] rounded-xl bg-gradient-to-br from-primary/30 via-primary-glow/10 to-secondary border border-border flex items-center justify-center">
                            <div className="font-mono text-xs text-primary-glow">
                                {`{ featured }`}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span
                    className={`text-xs font-mono px-2.5 py-1 rounded-md border ${catClasses[featured.categoryColor]}`}
                >
                  {featured.category}
                </span>
                                <span className="text-xs text-muted-foreground">
                  Featured
                </span>
                            </div>

                            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2 sm:mb-3 group-hover:text-primary-glow transition-colors">
                                {featured.title}
                            </h3>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                                {featured.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                                <span>{featured.date}</span>
                                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {featured.readTime}
                </span>
                            </div>
                        </div>
                    </div>
                </motion.a>

                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                >
                    {posts.map((p) => (
                        <motion.a
                            key={p.title}
                            href="#"
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            className="group p-4 sm:p-5 rounded-2xl bg-gradient-card border border-border glow-on-hover flex flex-col"
                        >
              <span
                  className={`self-start text-xs font-mono px-2.5 py-1 rounded-md border mb-3 sm:mb-4 ${catClasses[p.categoryColor]}`}
              >
                {p.category}
              </span>

                            <h3 className="font-display text-base sm:text-lg font-semibold leading-tight mb-2 group-hover:text-primary-glow transition-colors">
                                {p.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 sm:mb-5 flex-1">
                                {p.excerpt}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 sm:pt-4 border-t border-border">
                                <span>{p.date}</span>
                                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {p.readTime}
                </span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;