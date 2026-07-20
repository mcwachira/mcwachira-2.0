"use client";

import { Sparkles } from "lucide-react";

const groups = [
    {
        title: "Languages",
        items: [
            { name: "Python", years: 4, color: "python" },
            { name: "Java", years: 3, color: "java" },
            { name: "C#", years: 2, color: "csharp" },
            { name: "JavaScript", years: 5, color: "js" },
            { name: "TypeScript", years: 4, color: "ts" },
            { name: "Go", years: 1, color: "go" },
        ],
    },
    {
        title: "Frontend",
        items: [
            { name: "React", years: 4, color: "ts" },
            { name: "Next.js", years: 3, color: "ts" },
            { name: "Tailwind CSS", years: 3, color: "ts" },
            { name: "HTML/CSS", years: 5, color: "neutral" },
        ],
    },
    {
        title: "Backend & APIs",
        items: [
            { name: "Node.js", years: 4, color: "js" },
            { name: "Django", years: 3, color: "python" },
            { name: "Spring Boot", years: 2, color: "java" },
            { name: "ASP.NET", years: 2, color: "csharp" },
            { name: "REST / GraphQL", years: 4, color: "neutral" },
        ],
    },
    {
        title: "Databases & Cloud",
        items: [
            { name: "PostgreSQL", years: 4, color: "neutral" },
            { name: "MongoDB", years: 4, color: "neutral" },
            { name: "MySQL", years: 3, color: "neutral" },
            { name: "Firebase", years: 2, color: "neutral" },
            { name: "AWS", years: 2, color: "neutral" },
        ],
    },
];

const langDot: Record<string, string> = {
    python: "bg-lang-python",
    java: "bg-lang-java",
    csharp: "bg-lang-csharp",
    js: "bg-lang-js",
    ts: "bg-lang-ts",
    go: "bg-lang-go",
    neutral: "bg-muted-foreground",
};

const About = () => {
    return (
        <section id="about" className="py-20 sm:py-24 relative">
            <div className="container-tight">
                <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">

                    {/* LEFT */}
                    <div className="max-w-2xl">
                        <div className="text-sm font-mono text-primary mb-3">
                            {"// About"}
                        </div>

                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            A{" "}
                            <span className="gradient-text">
                stack-agnostic
              </span>{" "}
                            engineer who picks the right tool for the job
                        </h2>

                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                            <p>
                                I'm Mcwachira — a senior fullstack developer based in Nairobi. I've spent the last 4+ years shipping production software across half a dozen languages and even more frameworks.
                            </p>

                            <p>
                                Most developers are tied to one ecosystem. I'm not. I've built REST APIs in{" "}
                                <span className="text-foreground">Django</span>, enterprise systems in{" "}
                                <span className="text-foreground">Spring Boot</span>, internal tools in{" "}
                                <span className="text-foreground">.NET</span>, and high-traffic web apps in{" "}
                                <span className="text-foreground">Next.js</span> — because the right answer changes from project to project.
                            </p>

                            <p>
                                When you hire me, you get an engineer who'll honestly tell you whether your idea needs Python or Node, a monolith or microservices, and a fast MVP or something built to last.
                            </p>
                        </div>

                        {/* Highlight */}
                        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-glow/5 border border-primary/30">
                            <div className="flex gap-3 items-start">
                                <Sparkles size={20} className="text-primary shrink-0 mt-0.5" />
                                <p className="font-display font-semibold text-foreground text-sm sm:text-base">
                                    I choose the stack that fits your project — not the other way around.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-5">
                        {groups.map((g) => (
                            <div
                                key={g.title}
                                className="p-5 rounded-2xl bg-gradient-card border border-border"
                            >
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-mono">
                                    {g.title}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {g.items.map((s) => (
                                        <div
                                            key={s.name}
                                            className="flex items-center gap-2.5 text-sm"
                                        >
                      <span
                          className={`w-2 h-2 rounded-full ${langDot[s.color]} shrink-0`}
                      />
                                            <span className="font-medium">{s.name}</span>
                                            <span className="text-muted-foreground text-xs ml-auto">
                        {s.years}y
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;