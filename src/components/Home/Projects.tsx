"use client";

import { ArrowUpRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";

import ecommerce from "@/assets/project-ecommerce.jpg";
import dashboard from "@/assets/project-dashboard.jpg";
import api from "@/assets/project-api.jpg";
import travel from "@/assets/project-travel.jpg";

type LangColor = "python" | "java" | "csharp" | "js" | "ts" | "go";

interface Project {
    title: string;
    category: string;
    image: StaticImageData;
    challenge: string;
    solution: string;
    result: string;
    metric: string;
    url: string;
    featured?: boolean;
    stack: { name: string; color: LangColor | "neutral" }[];
}

const projects: Project[] = [
    {
        title: "Fullstack Next.js E-commerce Platform",
        category: "Web App",
        image: ecommerce,
        url: "#",
        challenge:
            "Client needed a custom storefront with complex product variants, inventory sync, and Stripe payments — out-of-the-box solutions couldn't handle it.",
        solution:
            "Built a fullstack Next.js 14 app with Prisma, PostgreSQL, and Stripe Checkout. Server components for SEO, optimistic UI for cart actions.",
        result:
            "Cut page load times from 4.2s to 1.3s and increased checkout conversion by 38% in the first month.",
        metric: "3× faster load time",
        featured: true,
        stack: [
            { name: "Next.js", color: "ts" },
            { name: "TypeScript", color: "ts" },
            { name: "PostgreSQL", color: "neutral" },
            { name: "Tailwind", color: "neutral" },
        ],
    },
    {
        title: "Logistics Analytics Dashboard",
        category: "Enterprise System",
        image: dashboard,
        url: "#",
        challenge:
            "A logistics startup was running reports manually in Excel — a 6-hour weekly job with frequent errors.",
        solution:
            "Built a Java Spring Boot backend that ingests shipment data, paired with a React dashboard for real-time KPIs and exports.",
        result:
            "Replaced manual reporting entirely. The ops team now gets fresh data every 15 minutes instead of weekly.",
        metric: "Reduced reporting time by 95%",
        stack: [
            { name: "Java", color: "java" },
            { name: "Spring Boot", color: "java" },
            { name: "React", color: "ts" },
            { name: "PostgreSQL", color: "neutral" },
        ],
    },
    {
        title: "REST API for SaaS Billing Platform",
        category: "REST API",
        image: api,
        url: "#",
        challenge:
            "A B2B SaaS needed a metered-billing API that could handle 100k+ events/day with idempotency and audit trails.",
        solution:
            "Designed a Python Django REST API with Celery workers, Redis queues, and PostgreSQL — fully documented with OpenAPI.",
        result:
            "API handles 250k events/day comfortably with p99 latency under 120ms.",
        metric: "p99 latency < 120ms",
        stack: [
            { name: "Python", color: "python" },
            { name: "Django", color: "python" },
            { name: "PostgreSQL", color: "neutral" },
            { name: "Redis", color: "neutral" },
        ],
    },
    {
        title: "Villa Jahawi — Boutique Hotel Site",
        category: "Custom Website",
        image: travel,
        url: "#",
        challenge:
            "A boutique villa in Diani needed a website that converted browsers into bookings, with seasonal pricing and a CMS the owner could update.",
        solution:
            "Built a Next.js + Sanity CMS site with image optimization, multilingual support, and a custom booking-inquiry funnel.",
        result:
            "Direct booking inquiries went from 3/month to 27/month within 60 days of launch.",
        metric: "9× more direct bookings",
        stack: [
            { name: "Next.js", color: "ts" },
            { name: "Sanity", color: "neutral" },
            { name: "JavaScript", color: "js" },
        ],
    },
];

const langClasses: Record<LangColor | "neutral", string> = {
    python: "bg-lang-python/15 text-lang-python border-lang-python/30",
    java: "bg-lang-java/15 text-lang-java border-lang-java/30",
    csharp: "bg-lang-csharp/15 text-lang-csharp border-lang-csharp/30",
    js: "bg-lang-js/15 text-lang-js border-lang-js/30",
    ts: "bg-lang-ts/15 text-lang-ts border-lang-ts/30",
    go: "bg-lang-go/15 text-lang-go border-lang-go/30",
    neutral: "bg-secondary/60 text-muted-foreground border-border",
};

const ProjectCard = ({ project }: { project: Project }) => {
    const p = project;

    return (
        <motion.article
            aria-labelledby={`project-${p.title}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group rounded-2xl overflow-hidden bg-gradient-card border border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium border border-border">
                {p.category}
            </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3
                    id={`project-${p.title}`}
                    className="font-display text-lg sm:text-xl font-semibold mb-4 leading-tight"
                >
                    {p.title}
                </h3>

                <div className="space-y-4 text-sm flex-1">
                    {/* Challenge */}
                    <div className="flex gap-3">
                        <Target size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                Challenge
                            </div>
                            <p className="text-foreground/90 line-clamp-3">{p.challenge}</p>
                        </div>
                    </div>

                    {/* Solution */}
                    <div className="flex gap-3">
                        <Lightbulb size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                Solution
                            </div>
                            <p className="text-foreground/90 line-clamp-3">{p.solution}</p>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                        <TrendingUp size={16} className="text-primary mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                Result
                            </div>
                            <p className="text-foreground/90 line-clamp-3">{p.result}</p>
                        </div>
                    </div>
                </div>

                {/* Metric */}
                <div className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                    <TrendingUp size={14} className="text-primary" />
                    <span className="font-display font-semibold text-primary-glow">
            {p.metric}
          </span>
                </div>

                {/* Stack */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                        <span
                            key={s.name}
                            className={`text-xs font-mono px-2.5 py-1 rounded-md border ${langClasses[s.color]}`}
                        >
              {s.name}
            </span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
                >
                    View project <ArrowUpRight size={16} />
                </a>
            </div>
        </motion.article>
    );
};

const Projects = () => {
    return (
        <section id="work" className="py-20 sm:py-24 relative">
            <div className="container-tight">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-14">
                    <div className="max-w-2xl">
                        <div className="text-sm font-mono text-primary mb-3">
                            {"// Selected work"}
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Real problems,{" "}
                            <span className="gradient-text">measurable results</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-md">
                        Each project is a case study — the problem, what I built, and what
                        changed for the client.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {[...projects]
                        .sort((a, b) => Number(b.featured) - Number(a.featured))
                        .map((p) => (
                            <ProjectCard key={p.title} project={p} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;