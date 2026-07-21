"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validators/contact";
import { toast } from "sonner";
import { useState } from "react";

const FETCH_TIMEOUT = 15_000;

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(FETCH_TIMEOUT),
            });

            if (!res.ok) throw new Error();

            toast.success("Message sent successfully!");
            reset();
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative w-full min-h-screen flex items-center bg-[#020617] text-white px-6 md:px-20 py-24 overflow-hidden">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto w-full">

                {/* LEFT SIDE */}
                <div>
                    <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
                        Got a project?
                        <br />
                        Let&apos;s talk.
                    </h1>

                    <p className="text-gray-400 mt-6 max-w-md text-[15px] leading-relaxed">
                        Tell me what you&apos;re building. I&apos;ll tell you honestly if I can help — and how long it&apos;ll take.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-[#0f172a] px-4 py-2 rounded-full border border-white/10">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-300">Open to new projects</span>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="mt-10 space-y-6 text-sm">
                        <div>
                            <p className="text-white font-medium">Email</p>
                            <p className="text-gray-400">hello@mcwachira.dev</p>
                        </div>

                        <div>
                            <p className="text-white font-medium">Phone</p>
                            <p className="text-gray-400">+254 700 000 000</p>
                        </div>
                    </div>

                    <blockquote className="mt-10 border-l-2 border-blue-500 pl-6 text-gray-300 italic">
                        &ldquo;I work across Python, Java, C#, JavaScript and more — I&apos;ll recommend the right stack for your project.&rdquo;
                    </blockquote>
                </div>

                {/* RIGHT SIDE FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative bg-[#020617]/70 border border-white/10 rounded-2xl p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                    noValidate
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                {...register("name")}
                                placeholder="Name"
                                className="input"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && <p id="name-error" className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                {...register("email")}
                                placeholder="Email"
                                className="input"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && <p id="email-error" className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="projectType" className="sr-only">Type of project</label>
                        <select
                            id="projectType"
                            {...register("projectType")}
                            className="input"
                            aria-invalid={!!errors.projectType}
                            aria-describedby={errors.projectType ? "projectType-error" : undefined}
                        >
                            <option value="">Type of project</option>
                            <option>Web App</option>
                            <option>SaaS</option>
                            <option>API</option>
                        </select>
                        {errors.projectType && <p id="projectType-error" className="text-xs text-red-400 mt-1">{errors.projectType.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="stack" className="sr-only">Preferred stack</label>
                        <select
                            id="stack"
                            {...register("stack")}
                            className="input"
                            aria-invalid={!!errors.stack}
                            aria-describedby={errors.stack ? "stack-error" : undefined}
                        >
                            <option value="">Preferred stack</option>
                            <option>Next.js</option>
                            <option>Laravel</option>
                            <option>Node.js</option>
                        </select>
                        {errors.stack && <p id="stack-error" className="text-xs text-red-400 mt-1">{errors.stack.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="budget" className="sr-only">Budget range</label>
                        <select
                            id="budget"
                            {...register("budget")}
                            className="input"
                            aria-invalid={!!errors.budget}
                            aria-describedby={errors.budget ? "budget-error" : undefined}
                        >
                            <option value="">Budget range</option>
                            <option>$1k–$5k</option>
                            <option>$5k–$10k</option>
                            <option>$10k+</option>
                        </select>
                        {errors.budget && <p id="budget-error" className="text-xs text-red-400 mt-1">{errors.budget.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="message" className="sr-only">Tell me about your project</label>
                        <textarea
                            id="message"
                            {...register("message")}
                            placeholder="Tell me about your project..."
                            rows={4}
                            className="input"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : undefined}
                        />
                        {errors.message && <p id="message-error" className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 active:scale-[0.98] transition rounded-xl py-3 font-medium shadow-lg shadow-blue-500/20"
                    >
                        {loading ? "Sending..." : "Send message — I\u2019ll reply today \u2192"}
                    </button>
                </form>
            </div>
        </section>
    );
}
