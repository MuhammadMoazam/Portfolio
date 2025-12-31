// Email sending utility
// This example uses a simple console log for demo
// In production, integrate with Resend, SendGrid, Nodemailer, etc.

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email using your preferred email service
 * 
 * For Resend:
 * ```
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * await resend.emails.send(options);
 * ```
 * 
 * For Nodemailer:
 * ```
 * import nodemailer from 'nodemailer';
 * const transporter = nodemailer.createTransport({ ... });
 * await transporter.sendMail(options);
 * ```
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // DEMO MODE: Just log the email
    console.log("=== EMAIL SENT ===");
    console.log("From:", options.from);
    console.log("To:", options.to);
    console.log("Subject:", options.subject);
    console.log("Reply-To:", options.replyTo);
    console.log("Message:", options.text);
    console.log("==================");

    // In production, replace with actual email service:
    
    // Option 1: Resend (recommended)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const { data, error } = await resend.emails.send({
    //   from: options.from,
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html,
    //   replyTo: options.replyTo,
    // });
    // if (error) throw error;

    // Option 2: Nodemailer
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    // await transporter.sendMail(options);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Generate HTML email template for contact form
 */
export function generateContactEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px;">You have received a new message from your website contact form:</p>
              
              <!-- Details Table -->
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f8f9fa; border-radius: 4px; padding: 15px;">
                    <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: bold;">${data.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; border-radius: 4px; padding: 15px;">
                    <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: bold;">
                      <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
                ${data.subject ? `
                <tr>
                  <td style="background-color: #f8f9fa; border-radius: 4px; padding: 15px;">
                    <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: bold;">${data.subject}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="background-color: #f8f9fa; border-radius: 4px; padding: 15px;">
                    <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px;">Reply to ${data.name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666666; font-size: 12px;">This email was sent from your website contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email for contact form
 */
export function generateContactEmailText(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}\n` : ''}
Message:
${data.message}

---
This email was sent from your website contact form.
Reply directly to this email to respond to ${data.name}.
  `.trim();
}



