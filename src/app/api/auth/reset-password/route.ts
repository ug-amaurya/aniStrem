import { NextRequest, NextResponse } from "next/server";
import { userOperations } from "@/lib/db-utils";
import { verifyPasswordResetToken, hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    // Verify reset token
    const tokenData = verifyPasswordResetToken(token);
    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await userOperations.findUserByEmail(tokenData.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    await userOperations.updateUser(user._id, { password: hashedPassword });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
