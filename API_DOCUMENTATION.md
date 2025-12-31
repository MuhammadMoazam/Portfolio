# Contact API Documentation

## Overview

The Contact API provides a secure endpoint for handling contact form submissions with server-side validation, rate limiting, spam protection, and email notifications.

## Endpoint

```
POST /api/contact
```

## Features

1. ✅ **Server-side validation** with Zod
2. ✅ **XSS protection** via input sanitization
3. ✅ **Rate limiting** (5 requests per IP per hour)
4. ✅ **Honeypot spam protection**
5. ✅ **Email notifications** (Resend/Nodemailer)
6. ✅ **TypeScript types** for request/response
7. ✅ **Graceful error handling**
8. ✅ **Proper HTTP status codes**

## Request

### Headers

```
Content-Type: application/json
```

### Body Parameters

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | 2-100 characters |
| `email` | string | Yes | Valid email format, max 255 chars |
| `subject` | string | No | Max 200 characters |
| `message` | string | Yes | 10-5000 characters |
| `honeypot` | string | No | Must be empty (spam trap) |

### Example Request

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'I would like to discuss a project with you.',
    honeypot: '', // Always leave empty
  }),
});

const data = await response.json();
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

**Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 2024-01-01T12:00:00.000Z
```

### Validation Error (400)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": ["Please provide a valid email address"],
    "message": ["Message must be at least 10 characters"]
  }
}
```

### Rate Limit Exceeded (429)

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

**Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2024-01-01T12:00:00.000Z
Retry-After: 3600
```

### Server Error (500)

```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again later."
}
```

## Rate Limiting

The API implements per-IP rate limiting:

- **Limit:** 5 requests per hour
- **Window:** Rolling 1-hour window
- **Headers:** Rate limit info included in all responses
- **Status:** 429 when limit exceeded

### Rate Limit Headers

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | ISO timestamp when limit resets |
| `Retry-After` | Seconds until retry (on 429 only) |

## Security Features

### 1. Input Validation

Uses Zod schema for strict validation:
- Name: 2-100 characters, trimmed
- Email: Valid email format, lowercase, trimmed
- Message: 10-5000 characters, trimmed
- All fields sanitized for XSS prevention

### 2. XSS Protection

All inputs are sanitized:
```typescript
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};
```

### 3. Honeypot Spam Protection

Hidden field that bots typically fill:
```html
<input type="text" name="honeypot" style="display: none" />
```

If honeypot is filled, request is silently rejected (returns 200 but no email sent).

### 4. Rate Limiting

In-memory rate limiter tracks requests per IP:
- Automatically cleans up old entries
- Prevents abuse and DDoS attacks
- For production, consider Redis-based solution

## Email Configuration

### Option 1: Resend (Recommended)

```bash
# .env
RESEND_API_KEY=your_api_key_here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your_email@example.com
```

```typescript
// In lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: options.from,
  to: options.to,
  subject: options.subject,
  html: options.html,
  replyTo: options.replyTo,
});
```

### Option 2: Nodemailer (SMTP)

```bash
# .env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_TO=your_email@example.com
```

```typescript
// In lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail(options);
```

## Error Handling

The API handles all errors gracefully:

1. **JSON Parse Errors:** Returns 400 with "Invalid JSON" message
2. **Validation Errors:** Returns 400 with field-specific error details
3. **Rate Limit:** Returns 429 with retry information
4. **Email Failures:** Returns 500 with generic error message
5. **Unexpected Errors:** Logged server-side, returns 500 to client

## TypeScript Types

```typescript
// Request body
interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

// Success response
interface SuccessResponse {
  success: true;
  message: string;
}

// Error response
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

type ApiResponse = SuccessResponse | ErrorResponse;
```

## Testing

### Test with cURL

```bash
# Valid request
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message"
  }'

# Test rate limiting (run 6 times)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test",
      "email": "test@example.com",
      "message": "Testing rate limit"
    }'
done

# Test validation error
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email",
    "message": "Short"
  }'
```

## Production Considerations

1. **Rate Limiting:** Use Redis for distributed rate limiting
2. **Email Service:** Set up Resend or configure SMTP properly
3. **Environment Variables:** Set all required env vars
4. **Monitoring:** Add logging and error tracking (Sentry, etc.)
5. **CORS:** Configure if API used from different domains
6. **IP Detection:** Verify IP detection works with your hosting provider
7. **Database:** Consider storing submissions in database for backup

## Installation

1. Install dependencies:
```bash
npm install zod
```

2. Copy `.env.example` to `.env.local` and fill in values:
```bash
cp .env.example .env.local
```

3. Configure email service (Resend or Nodemailer)

4. Test the API endpoint

## Support

For issues or questions about the Contact API, please refer to the project documentation or create an issue in the repository.



