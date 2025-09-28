// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

function generatePatientId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `AYU-2025-${randomNum}`;
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, gender, password } =
      await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate patientId
    const patientId = generatePatientId();

    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      password_hash: hashedPassword,
      role: "patient",
      patientId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        patientId: user.patientId, // ✅ send exact ID back
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[register] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
