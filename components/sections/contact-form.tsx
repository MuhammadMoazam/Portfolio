"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useAnnounce } from "@/components/ui/announce";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const { showToast } = useToast();
  const { announce } = useAnnounce();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!validateForm()) {
      showToast("error", "Validation Error", "Please fix the errors in the form");
      announce("Form validation failed. Please fix the errors and try again.", "assertive");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success
        const successMessage = data.message || "Thank you for reaching out. I'll get back to you soon!";
        showToast("success", "Message Sent!", successMessage);
        announce(successMessage, "polite");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
        setTouched({});
      } else {
        // Handle API errors
        let errorMessage = "";
        if (response.status === 429) {
          errorMessage = "Too many requests. Please wait a while before trying again.";
          showToast("error", "Too Many Requests", errorMessage);
        } else if (data.details) {
          errorMessage = "Validation error. Please check your inputs and try again.";
          showToast("error", "Validation Error", errorMessage);
        } else {
          errorMessage = data.error || "Something went wrong. Please try again later.";
          showToast("error", "Failed to Send", errorMessage);
        }
        announce(errorMessage, "assertive");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = "Network error. Unable to connect. Please check your internet connection.";
      showToast("error", "Network Error", errorMessage);
      announce(errorMessage, "assertive");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <FloatingLabelInput
        label="Your Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        error={touched.name ? errors.name : undefined}
        required
        disabled={isSubmitting}
        aria-label="Your name"
        aria-required="true"
        aria-invalid={!!errors.name}
      />

      {/* Email Field */}
      <FloatingLabelInput
        label="Your Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")}
        error={touched.email ? errors.email : undefined}
        required
        disabled={isSubmitting}
        aria-label="Your email address"
        aria-required="true"
        aria-invalid={!!errors.email}
      />

      {/* Subject Field */}
      <FloatingLabelInput
        label="Subject (Optional)"
        name="subject"
        type="text"
        value={formData.subject}
        onChange={handleChange}
        disabled={isSubmitting}
        aria-label="Message subject"
      />

      {/* Message Field */}
      <FloatingLabelTextarea
        label="Your Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={() => handleBlur("message")}
        error={touched.message ? errors.message : undefined}
        required
        disabled={isSubmitting}
        rows={5}
        aria-label="Your message"
        aria-required="true"
        aria-invalid={!!errors.message}
      />

      {/* Honeypot Field (hidden) */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>
    </form>
  );
}

// Floating Label Input Component
function FloatingLabelInput({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const hasValue = !!props.value;
  const errorId = error ? `${props.name}-error` : undefined;

  return (
    <div className="relative">
      <input
        {...props}
        className={`peer w-full px-4 pt-6 pb-2 bg-muted/50 border-2 rounded-lg outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border focus:border-primary"
        } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        placeholder=" "
        aria-describedby={errorId}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          hasValue || props.placeholder === " "
            ? "top-2 text-xs text-foreground-secondary"
            : "top-1/2 -translate-y-1/2 text-base text-foreground-secondary"
        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
          error ? "text-red-500 peer-focus:text-red-500" : ""
        }`}
      >
        {label} {props.required && <span className="text-red-500" aria-label="required">*</span>}
      </label>
      {error && (
        <motion.p
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Floating Label Textarea Component
function FloatingLabelTextarea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
}) {
  const hasValue = !!props.value;
  const errorId = error ? `${props.name}-error` : undefined;

  return (
    <div className="relative">
      <textarea
        {...props}
        className={`peer w-full px-4 pt-6 pb-2 bg-muted/50 border-2 rounded-lg outline-none transition-all resize-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border focus:border-primary"
        } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        placeholder=" "
        aria-describedby={errorId}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          hasValue || props.placeholder === " "
            ? "top-2 text-xs text-foreground-secondary"
            : "top-6 text-base text-foreground-secondary"
        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
          error ? "text-red-500 peer-focus:text-red-500" : ""
        }`}
      >
        {label} {props.required && <span className="text-red-500" aria-label="required">*</span>}
      </label>
      {error && (
        <motion.p
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

