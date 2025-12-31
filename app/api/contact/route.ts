import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  contactFormSchema,
  sanitizeContactData,
  type ContactFormData,
} from "@/lib/validation/contact";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sendEmail,
  generateContactEmailHtml,
  generateContactEmailText,
} from "@/lib/email";

// API Response Types
interface SuccessResponse {
  success: true;
  message: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // 2. Apply rate limiting (5 requests per hour)
    const rateLimitResult = rateLimit(clientIp, 5, 60 * 60 * 1000);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
            "Retry-After": Math.ceil(
              (rateLimitResult.reset - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    // 3. Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // 4. Validate input with Zod
    let validatedData: ContactFormData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field].push(err.message);
        });

        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: fieldErrors,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
        },
        { status: 400 }
      );
    }

    // 5. Check honeypot (spam protection)
    if (validatedData.honeypot && validatedData.honeypot.trim() !== "") {
      // Bot detected - pretend success but don't send email
      console.warn(`Honeypot triggered by IP: ${clientIp}`);
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your message!",
        },
        { status: 200 }
      );
    }

    // 6. Sanitize inputs to prevent XSS
    const sanitizedData = sanitizeContactData(validatedData);

    // 7. Send email
    const emailSent = await sendEmail({
      from: process.env.EMAIL_FROM || "noreply@example.com",
      to: process.env.EMAIL_TO || "hello@example.com",
      subject: sanitizedData.subject
        ? `Contact Form: ${sanitizedData.subject}`
        : `New message from ${sanitizedData.name}`,
      text: generateContactEmailText(sanitizedData),
      html: generateContactEmailHtml(sanitizedData),
      replyTo: sanitizedData.email,
    });

    // 8. Return response
    if (emailSent) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
        },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // 9. Handle unexpected errors gracefully
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}



