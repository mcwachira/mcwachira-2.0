"use client";

import { Globe, Server, Cpu, Layers, Database, Cloud } from "lucide-react";

const services = [
    {
        icon: Globe,
        title: "Web Applications",
        desc: "Marketing sites, SaaS dashboards, and full e-commerce platforms built with React, Next.js, and Tailwind.",
        stack: ["React", "Next.js", "TypeScript"],
    },
    {
        icon: Server,
        title: "REST APIs & Backends",
        desc: "Robust, secure backends and APIs in Node.js, Django, Spring Boot, or .NET — picked to fit your scale.",
        stack: ["Node.js", "Django", "Spring Boot"],
    },
    {
        icon: Cpu,
        title: "Custom Software & Systems",
        desc: "Internal tools, automation scripts, and enterprise systems in Python, Java, or C# — whatever the problem demands.",
        stack: ["Python", "Java", "C# .NET"],
    },
    {
        icon: Layers,
        title: "Frontend Engineering",
        desc: "Pixel-perfect, accessible interfaces with thoughtful interactions and performance built in from day one.",
        stack: ["React", "Tailwind", "shadcn/ui"],
    },
    {
        icon: Database,
        title: "Database & Data Modeling",
        desc: "Schema design, query optimization, and migrations across PostgreSQL, MongoDB, and MySQL.",
        stack: ["PostgreSQL", "MongoDB", "Prisma"],
    },
    {
        icon: Cloud,
        title: "Cloud & Deployment",
        desc: "CI/CD pipelines, containerization, and deployment to AWS, Vercel, or your platform of choice.",
        stack: ["AWS", "Docker", "Vercel"],
    },
];

const Services = () => {
    return (
        <section id="services" className="py-20 sm:py-24 relative">
            <div className="container-tight">
                <div className="max-w-2xl mb-14">
                    <div className="text-sm font-mono text-primary mb-3">
                        // What I build
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Services tailored to your{" "}
                        <span className="gradient-text">stack and scale</span>
                    </h2>

                    <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                        I'm stack-agnostic. I'll recommend the right tools for your project — not the ones I'm tied to.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((s) => (
                        <div
                            key={s.title}
                            className="group p-6 rounded-2xl bg-gradient-card border border-border glow-on-hover transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                <s.icon size={22} className="text-primary shrink-0" />
                            </div>

                            <h3 className="font-display text-xl font-semibold mb-2">
                                {s.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                {s.desc}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {s.stack.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground"
                                    >
                    {t}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;