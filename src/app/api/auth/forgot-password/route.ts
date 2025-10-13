import { NextRequest, NextResponse } from "next/server";
import { userOperations } from "@/lib/db-utils";
import { generatePasswordResetToken } from "@/lib/auth";
import { sendEmail, generatePasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await userOperations.findUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Generate password reset token
    const resetToken = generatePasswordResetToken(email);

    // Send password reset email
    const emailSent = await sendEmail(
      generatePasswordResetEmail(email, resetToken)
    );

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send password reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "If an account with that email exists, we've sent a password reset link.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
