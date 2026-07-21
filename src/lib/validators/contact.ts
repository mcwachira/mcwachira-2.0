// lib/validators/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email(),
    projectType: z.string().trim().min(1),
    stack: z.string().trim().min(1),
    budget: z.string().trim().min(1),
    message: z.string().trim().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;