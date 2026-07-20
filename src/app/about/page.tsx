"use client";

import Link from "next/link";
import { ArrowRight, Code2, Globe, Server, Database } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import testimonials from "@/content/testimonials.json";
import { Button } from "@/components/ui/button";

const skills = [
    {
        title: "Languages",
        icon: Code2,
        items: [
            { name: "Python", exp: "4 yrs" },
            { name: "Java", exp: "3 yrs" },
            { name: "C#", exp: "3 yrs" },
            { name: "JavaScript", exp: "5 yrs" },
            { name: "TypeScript", exp: "4 yrs" },
            { name: "Go", exp: "2 yrs" },
        ],
    },
    {
        title: "Frontend",
        icon: Globe,
        items: [
            { name: "React", exp: "5 yrs" },
            { name: "Next.js", exp: "3 yrs" },
            { name: "Tailwind CSS", exp: "4 yrs" },
            { name: "HTML/CSS", exp: "6 yrs" },
        ],
    },
    {
        title: "Backend & APIs",
        icon: Server,
        items: [
            { name: "Node.js", exp: "5 yrs" },
            { name: "Django", exp: "4 yrs" },
            { name: "Spring Boot", exp: "3 yrs" },
            { name: "ASP.NET", exp: "3 yrs" },
            { name: "REST", exp: "5 yrs" },
            { name: "GraphQL", exp: "3 yrs" },
        ],
    },
    {
        title: "Databases & Cloud",
        icon: Database,
        items: [
            { name: "MongoDB", exp: "4 yrs" },
            { name: "PostgreSQL", exp: "4 yrs" },
            { name: "MySQL", exp: "5 yrs" },
            { name: "Firebase", exp: "3 yrs" },
            { name: "AWS", exp: "3 yrs" },
        ],
    },
];

const timeline = [
    { year: "2026", role: "Senior Fullstack Developer (Freelance)", body: "Shipping production systems for Kenyan and international clients." },
    { year: "2024", role: "Lead Developer · Acacia Microfinance", body: "Built FinTrack, replacing spreadsheet workflows." },
    { year: "2023", role: "Backend Engineer · SwiftRoute", body: "Unified 7 carrier APIs with Spring Boot." },
    { year: "2022", role: "Fullstack Developer", body: "Started freelance after 2 years of full-time dev work." },
];

const values = [
    { title: "Excellence", body: "Readable code. Real tests." },
    { title: "Speed", body: "Ship fast. Iterate faster." },
    { title: "Responsiveness", body: "Same-day replies. No ghosting." },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    const timelineRef = useRef(null);

    // 🔥 SCROLL LINE ANIMATION
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end end"],
    });

    return (
        <main className="container-tight pt-28 pb-20">

            {/* HERO */}
            <motion.section
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.15 }}
                className="mb-20 max-w-2xl"
            >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card text-xs mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for projects
                </motion.div>

                <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold mb-3">
                    Hi, I&apos;m Mcwachira.
                </motion.h1>

                <motion.p variants={fadeUp} className="text-muted-foreground mb-6">
                    Senior Fullstack Developer · Nairobi, Kenya
                </motion.p>

                <motion.p variants={fadeUp} className="mb-4 text-sm text-muted-foreground">
                    I&apos;ve been building software for 4 years — working on e-commerce platforms,
                    dashboards, APIs, and business systems across Kenya and East Africa.
                </motion.p>

                <motion.blockquote variants={fadeUp} className="text-lg italic border-l-2 border-primary pl-4 text-muted-foreground">
                    &quot;I&apos;ve tried a lot of tools. These are the ones I&apos;d bet a project on.&quot;
                </motion.blockquote>
            </motion.section>

            {/* SKILLS */}
            <section className="mb-24">
                <div className="mb-12">
                    <p className="text-sm text-primary/70 mb-2">{"// skills"}</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">What I work with.</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((group) => {
                        const Icon = group.icon;

                        return (
                            <motion.div
                                key={group.title}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="group rounded-2xl border border-border bg-card/50 p-6 space-y-5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Icon size={18} className="text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{group.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span key={skill.name} className="text-xs px-3 py-1.5 rounded-full border border-border bg-background/60">
                      {skill.name}{" "}
                                            <span className="text-muted-foreground">{skill.exp}</span>
                    </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* TIMELINE */}
            <section className="mb-24" ref={timelineRef}>
                <div className="mb-10">
                    <p className="text-sm text-primary/70 mb-2">{"// experience"}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold">A short timeline.</h2>
                </div>

                <div className="relative">
                    {/* BASE LINE */}
                    <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-border" />

                    {/* 🔥 ANIMATED LINE */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-3 top-0 w-[2px] h-full origin-top bg-primary"
                    />

                    <div className="space-y-10">
                        {timeline.map((t) => (
                            <motion.div
                                key={t.year}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="relative pl-12"
                            >
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center text-[10px]">
                                    {t.year.slice(2)}
                                </div>

                                <div>
                                    <div className="text-xs text-muted-foreground mb-1">{t.year}</div>
                                    <h3 className="font-medium">{t.role}</h3>
                                    <p className="text-sm text-muted-foreground">{t.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="mb-24">
                <div className="mb-10">
                    <p className="text-sm text-primary/70 mb-2">{"// how I work"}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold">How I work.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            transition={{ delay: i * 0.1 }}
                            className="group p-5 border border-border rounded-2xl bg-card/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]"
                        >
                            <h3 className="font-medium mb-1">{v.title}</h3>
                            <p className="text-sm text-muted-foreground">{v.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="mb-24">
                <div className="mb-10">
                    <p className="text-sm text-primary/70 mb-2">{"// testimonials"}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold">What clients say.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            transition={{ delay: i * 0.1 }}
                            className="group p-5 border border-border rounded-2xl bg-card/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]"
                        >
                            <p className="text-sm">&quot;{t.quote}&quot;</p>

                            <div className="mt-4 text-xs">
                                <div className="font-medium">{t.name}</div>
                                <div className="text-muted-foreground">{t.title}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                className="rounded-3xl border border-border p-10 text-center bg-gradient-to-br from-card to-card/40"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                    Have a project in mind? Let&apos;s figure out if I&apos;m the right fit.
                </h2>

                <p className="text-sm text-muted-foreground mb-6">
                    Tell me about your project — I&apos;ll recommend the right stack and timeline.
                </p>

                <Button asChild size="lg" className="rounded-full">
                    <Link href="/contact">
                        Send a message <ArrowRight size={16} />
                    </Link>
                </Button>
            </motion.section>

        </main>
    );
}