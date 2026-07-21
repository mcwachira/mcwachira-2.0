import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 🚫 Honeypot spam check
        if (body.company) {
            return NextResponse.json({ ok: true }); // silently ignore bots
        }

        const { name, email, message, projectType, stack, budget } = body;

        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "hello@mcwachira.com",
            subject: `New message from ${name}`,
            replyTo: email,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${projectType}</p>
        <p><strong>Stack:</strong> ${stack}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}