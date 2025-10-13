import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db-utils";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      message: "Database connection successful",
      status: "connected",
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        error: "Database connection failed",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
