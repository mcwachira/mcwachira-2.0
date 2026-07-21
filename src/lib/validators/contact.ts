// lib/validators/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    projectType: z.string().min(1),
    stack: z.string().min(1),
    budget: z.string().min(1),
    message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;