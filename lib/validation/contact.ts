import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .max(200, "Subject must be less than 200 characters")
    .trim()
    .optional()
    .default(""),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
  honeypot: z.string().optional().default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitize HTML to prevent XSS attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Sanitize all contact form data
export function sanitizeContactData(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeInput(data.name),
    email: data.email.toLowerCase().trim(), // Email doesn't need HTML sanitization
    subject: data.subject ? sanitizeInput(data.subject) : "",
    message: sanitizeInput(data.message),
    honeypot: data.honeypot || "",
  };
}



