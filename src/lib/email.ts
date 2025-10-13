import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export function generatePasswordResetEmail(
  email: string,
  resetToken: string
): EmailOptions {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  return {
    to: email,
    subject: "Reset Your Password - Watch with Senpai",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #ffd3ac;
              margin-bottom: 10px;
            }
            .button {
              display: inline-block;
              background: #ffd3ac;
              color: #000;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background: #ffb5ab;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Watch with Senpai</div>
              <h1>Reset Your Password</h1>
            </div>
            
            <p>Hello!</p>
            
            <p>We received a request to reset your password for your Watch with Senpai account. If you didn't make this request, you can safely ignore this email.</p>
            
            <p>To reset your password, click the button below:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
              ${resetUrl}
            </p>
            
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            
            <div class="footer">
              <p>If you have any questions, feel free to contact us.</p>
              <p>Best regards,<br>The Watch with Senpai Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Your Password - Watch with Senpai
      
      Hello!
      
      We received a request to reset your password for your Watch with Senpai account. If you didn't make this request, you can safely ignore this email.
      
      To reset your password, visit this link:
      ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you have any questions, feel free to contact us.
      
      Best regards,
      The Watch with Senpai Team
    `,
  };
}

export function generateWelcomeEmail(
  name: string,
  email: string
): EmailOptions {
  return {
    to: email,
    subject: "Welcome to Watch with Senpai!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #ffd3ac;
              margin-bottom: 10px;
            }
            .button {
              display: inline-block;
              background: #ffd3ac;
              color: #000;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background: #ffb5ab;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Watch with Senpai</div>
              <h1>Welcome to Watch with Senpai!</h1>
            </div>
            
            <p>Hello ${name}!</p>
            
            <p>Welcome to Watch with Senpai! We're excited to have you join our community of anime enthusiasts.</p>
            
            <p>With your account, you can:</p>
            <ul>
              <li>Create and manage your personal watchlist</li>
              <li>Discover new anime based on your preferences</li>
              <li>Track your watching progress</li>
              <li>Get personalized recommendations</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL}" class="button">Start Exploring</a>
            </div>
            
            <div class="footer">
              <p>If you have any questions, feel free to contact us.</p>
              <p>Happy watching!<br>The Watch with Senpai Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Watch with Senpai!
      
      Hello ${name}!
      
      Welcome to Watch with Senpai! We're excited to have you join our community of anime enthusiasts.
      
      With your account, you can:
      - Create and manage your personal watchlist
      - Discover new anime based on your preferences
      - Track your watching progress
      - Get personalized recommendations
      
      Start exploring: ${process.env.NEXTAUTH_URL}
      
      If you have any questions, feel free to contact us.
      
      Happy watching!
      The Watch with Senpai Team
    `,
  };
}
