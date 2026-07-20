"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Kimani",
        company: "Nuru Retail",
        project: "E-commerce Platform · Next.js + Node.js",
        image: "/avatars/sarah.jpg",
        quote:
            "Mcwachira delivered our storefront in 5 weeks — what other agencies quoted 3 months for. He communicates like a partner, not a contractor, and the codebase is genuinely a pleasure to maintain.",
    },
    {
        name: "Daniel Otieno",
        company: "Sasa Logistics",
        project: "Internal Dashboard · Java + Spring Boot",
        image: "/avatars/daniel.jpg",
        quote:
            "He picked up our messy legacy data, modeled it properly, and shipped a Spring Boot backend that's been running flawlessly for 8 months. Pragmatic, fast, and never over-engineered.",
    },
    {
        name: "Aisha Mwangi",
        company: "Villa Jahawi",
        project: "Booking Website · Next.js + Sanity",
        image: "/avatars/aisha.jpg",
        quote:
            "Direct bookings 9×'d in two months. He understood our brand, gave honest advice on what to skip, and built something we're genuinely proud of. Worth every shilling.",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
};

const Testimonials = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll for mobile
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let scrollAmount = 0;

        const interval = setInterval(() => {
            if (window.innerWidth >= 640) return; // only mobile

            scrollAmount += el.offsetWidth * 0.85;

            if (scrollAmount >= el.scrollWidth - el.clientWidth) {
                scrollAmount = 0;
            }

            el.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 sm:py-20 lg:py-24 relative">
            <div className="container-tight px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12 lg:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-4">
                        <span className="font-mono">10+ clients shipped</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                        Trusted by startups and businesses across{" "}
                        <span className="gradient-text">East Africa</span>
                    </h2>
                </div>

                {/* Mobile Carousel */}
                <div
                    ref={scrollRef}
                    className="flex sm:hidden overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
                >
                    {testimonials.map((t, i) => (
                        <motion.article
                            key={t.name}
                            variants={cardVariants}
                            initial="hidden"
                            animate="show"
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="min-w-[85%] snap-center p-5 rounded-2xl bg-gradient-card border border-border flex flex-col"
                        >
                            <Quote size={22} className="text-primary/40 mb-3" />

                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-sm text-foreground/90 leading-relaxed flex-1">
                                "{t.quote}"
                            </p>

                            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />

                                <div className="min-w-0">
                                    <div className="text-sm font-semibold truncate">{t.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {t.company}
                                    </div>
                                    <div className="text-xs font-mono text-primary truncate">
                                        {t.project}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Desktop Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                >
                    {testimonials.map((t) => (
                        <motion.article
                            key={t.name}
                            variants={cardVariants}
                            className="p-6 rounded-2xl bg-gradient-card border border-border flex flex-col h-full"
                        >
                            <Quote size={24} className="text-primary/40 mb-4" />

                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-foreground/90 text-sm leading-relaxed flex-1">
                                "{t.quote}"
                            </p>

                            <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />

                                <div className="min-w-0">
                                    <div className="text-sm font-semibold truncate">{t.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {t.company}
                                    </div>
                                    <div className="text-xs font-mono text-primary truncate">
                                        {t.project}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Stats */}
                <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { value: "7+", label: "Years of professional experience" },
                        { value: "15+", label: "Clients shipped & supported" },
                        { value: "8", label: "Languages worked in production" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="p-5 sm:p-6 rounded-2xl border border-border bg-card/40 text-center"
                        >
                            <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-1">
                                {s.value}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;