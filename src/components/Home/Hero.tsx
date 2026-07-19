"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const techBadges = [
    "Python", "Java", "C#", "JavaScript", "TypeScript",
    "React", "Next.js", "Node.js", "Django", "Spring Boot",
    ".NET", "PostgreSQL", "MongoDB", "Tailwind", "AWS",
];

const cyclingWords = ["fast", "scalable", "reliable", "production-ready"];

const Hero = () => {
    const [wordIdx, setWordIdx] = useState(0);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const id = setInterval(() => {
            setWordIdx((i) => (i + 1) % cyclingWords.length);
        }, 2200);

        return () => clearInterval(id);
    }, []);

    return (
        <section
            id="home"
            className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
            <div className="absolute top-1/3 -left-32 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="container-tight relative text-center lg:text-left">

                {/* Status */}
                <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
                    <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
                    Available for new projects
                    <span className="w-px h-3 bg-border mx-1" />
                    <MapPin size={12} /> Nairobi, KE
                </div>

                {/* Heading */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-5xl mx-auto lg:mx-0">
                    I build{" "}
                    <span key={wordIdx} className="gradient-text transition-all duration-300">
            {cyclingWords[wordIdx]}
          </span>{" "}
                    software — websites, APIs, and apps
                    <span className="block mt-3 text-muted-foreground">
            whatever stack fits the job.
          </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                    Based in Nairobi. 7+ years building real products for real clients.
                    I work in Python, Java, C#, and JavaScript — I’ll pick what’s right for your project.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full font-medium shadow-glow w-full sm:w-auto"
                    >
                        <Link href="#contact">
                            <Calendar className="mr-2" size={18} />
                            Book a free call
                            <ArrowUpRight className="ml-1" size={16} />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full font-medium border-border hover:bg-secondary w-full sm:w-auto"
                    >
                        <Link href="#work">
                            See my projects
                            <ArrowRight className="ml-2" size={18} />
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-10 text-sm text-muted-foreground">
                    <div className="text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                            7+
                        </div>
                        <div>Years experience</div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-border" />

                    <div className="text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                            15+
                        </div>
                        <div>Clients shipped</div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-border" />

                    <div className="text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                            8
                        </div>
                        <div>Languages</div>
                    </div>
                </div>

                {/* Tech Marquee */}
                <div className="mt-16 sm:mt-20 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-20 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-20 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-3 marquee whitespace-nowrap">
                        {[...techBadges, ...techBadges].map((t, i) => (
                            <span
                                key={i}
                                className="px-4 sm:px-5 py-2 rounded-full border border-border bg-card/40 text-xs sm:text-sm font-mono text-muted-foreground"
                            >
                {t}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;