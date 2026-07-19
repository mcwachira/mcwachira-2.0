"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socials = [
    { icon: Mail, label: "Email me", href: "mailto:hello@mcwachira.com" },
    { icon: FaGithub, label: "Github", href: "#" },
    { icon: FaLinkedin, label: "LinkedIn", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
];

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
];

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Footer() {
    return (
        <footer className="py-14 border-t border-border">
            <div className="container-tight">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-10 items-start"
                >
                    {/* LEFT */}
                    <motion.div variants={item}>
                        <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                            Let's make something
                            <br />
                            great together.
                        </h3>

                        <Link
                            href="#contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Book a call <ArrowUpRight size={16} />
                        </Link>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        variants={container}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                        {socials.map((s) => {
                            const Icon = s.icon;

                            return (
                                <motion.div key={s.label} variants={item}>
                                    <Link
                                        href={s.href}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card/50 text-sm hover:border-primary/40 transition-colors w-full"
                                    >
                                        <Icon size={14} />
                                        {s.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* BOTTOM */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground"
                >
                    <div className="flex flex-wrap justify-center md:justify-start gap-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="text-center md:text-right">
                        © {new Date().getFullYear()} Mcwachira · Built in Nairobi
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}