// First route.js (admin verification)
import { NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(request) {
  const { key } = await request.json();

  if (process.env[key]) {
    const hash = await argon2.hash(process.env[key]);

    const response = NextResponse.json({ success: true });

    // Set a single cookie with all necessary info
    response.cookies.set("adminAuth", hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // Changed from /admin to / to be accessible everywhere
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid key" },
      { status: 401 }
    );
  }
}
