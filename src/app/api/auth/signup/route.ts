import { NextRequest, NextResponse } from "next/server";
import { userOperations } from "@/lib/db-utils";
import { hashPassword, generateToken } from "@/lib/auth";
import { sendEmail, generateWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userOperations.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await userOperations.createUser({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    // Send welcome email
    try {
      await sendEmail(generateWelcomeEmail(user.name, user.email));
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the signup if email fails
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
