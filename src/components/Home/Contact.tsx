"use client";

import { Mail, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


// ✅ Zod schema
const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Tell me more about your project"),
    projectType: z.string().optional(),
    stack: z.string().optional(),
    budget: z.string().optional(),
    company: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error();

            toast.success("Message sent", {
                description: "Thanks — I'll get back to you within 1 hour on weekdays.",
            });
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-50" />

            <div className="container-tight relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-success/30 bg-success/10 text-xs text-success mb-6">
                            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
                            Open to new projects
                        </div>

                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                            Let's build something{" "}
                            <span className="gradient-text">great together</span>
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                            I work across Python, Java, C#, JavaScript, and more — tell me about your project and I'll recommend the right stack.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:hello@mcwachira.com" className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/40 transition-colors group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Mail size={18} className="text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold">Email me</div>
                                    <div className="text-sm text-muted-foreground">hello@mcwachira.com</div>
                                    <div className="text-xs text-muted-foreground mt-1">I reply within 1 hour on weekdays</div>
                                </div>
                            </a>

                            <a href="tel:+254726601941" className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/40 transition-colors group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Phone size={18} className="text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold">Call me</div>
                                    <div className="text-sm text-muted-foreground">+254 726 601 941</div>
                                    <div className="text-xs text-muted-foreground mt-1">Weekdays, 8am–6pm EAT</div>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT FORM */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border space-y-5 w-full"
                    >
                        {/* 🛡️ Honeypot */}
                        <input type="text" {...register("company")} className="hidden" />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input {...register("name")} placeholder="Jane Doe" className="bg-background/60" />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input {...register("email")} placeholder="jane@company.com" className="bg-background/60" />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Type of project</Label>
                            <Select onValueChange={(v) => setValue("projectType", v)}>
                                <SelectTrigger className="bg-background/60">
                                    <SelectValue placeholder="Choose one..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="website">New website</SelectItem>
                                    <SelectItem value="webapp">Web app or SaaS</SelectItem>
                                    <SelectItem value="api">REST API</SelectItem>
                                    <SelectItem value="enterprise">Enterprise</SelectItem>
                                    <SelectItem value="consulting">Consulting</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Preferred stack</Label>
                                <Select onValueChange={(v) => setValue("stack", v)}>
                                    <SelectTrigger className="bg-background/60">
                                        <SelectValue placeholder="No preference" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">No preference</SelectItem>
                                        <SelectItem value="python">Python</SelectItem>
                                        <SelectItem value="java">Java</SelectItem>
                                        <SelectItem value="csharp">C#</SelectItem>
                                        <SelectItem value="js">JavaScript</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Budget</Label>
                                <Select onValueChange={(v) => setValue("budget", v)}>
                                    <SelectTrigger className="bg-background/60">
                                        <SelectValue placeholder="Select range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="500">Under $500</SelectItem>
                                        <SelectItem value="2k">$500–$2k</SelectItem>
                                        <SelectItem value="5k">$2k–$5k</SelectItem>
                                        <SelectItem value="5kp">$5k+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tell me about your project</Label>
                            <Textarea
                                {...register("message")}
                                rows={5}
                                placeholder="What it does, your timeline, and any tech requirements..."
                                className="bg-background/60 resize-none"
                            />
                            {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full rounded-full font-medium shadow-glow"
                        >
                            {isSubmitting ? "Sending..." : "Send message"}
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}