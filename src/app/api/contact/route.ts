import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateMap = new Map<string, number[]>();
const RATE_WINDOW = 5 * 60 * 1000;
const RATE_MAX = 5;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (rateMap.get(ip) ?? []).filter(
        (t) => now - t < RATE_WINDOW,
    );
    if (timestamps.length >= RATE_MAX) return true;
    timestamps.push(now);
    rateMap.set(ip, timestamps);
    return false;
}

const contactSchema = z
    .object({
        name: z.string().min(1).max(200),
        email: z.string().email().max(320),
        message: z.string().min(1).max(5000),
        projectType: z.string().max(100).optional(),
        stack: z.string().max(100).optional(),
        budget: z.string().max(50).optional(),
        company: z.string().max(200).optional(),
    })
    .strict();

function esc(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const MAX_BODY = 100_000;

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json({ ok: false }, { status: 429 });
        }

        const raw = await req.text();
        if (raw.length > MAX_BODY) {
            return NextResponse.json({ ok: false }, { status: 413 });
        }

        let body: unknown;
        try {
            body = JSON.parse(raw);
        } catch {
            return NextResponse.json({ ok: false }, { status: 400 });
        }

        if (
            typeof body === "object" &&
            body !== null &&
            (body as Record<string, unknown>).company
        ) {
            return NextResponse.json({ ok: true });
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ ok: false }, { status: 400 });
        }

        const { name, email, message, projectType, stack, budget } =
            parsed.data;

        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "hello@mcwachira.com",
            subject: `New message from ${esc(name)}`,
            replyTo: esc(email),
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Project:</strong> ${esc(projectType ?? "")}</p>
        <p><strong>Stack:</strong> ${esc(stack ?? "")}</p>
        <p><strong>Budget:</strong> ${esc(budget ?? "")}</p>
        <p><strong>Message:</strong><br/>${esc(message)}</p>
      `,
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
