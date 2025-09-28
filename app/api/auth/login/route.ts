import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password, loginType } = await request.json();

    if (!identifier || !password || !loginType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await dbConnect();

    let user = null;

    if (loginType === "patient") {
      // find patient by patientId
      user = await User.findOne({ role: "patient", patientId: identifier });
    } else if (loginType === "doctor") {
      user = await User.findOne({ role: "doctor", email: identifier });
    } else if (loginType === "admin") {
      user = await User.findOne({ role: "admin", email: identifier });
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // check password with bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // prepare JWT payload
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      ...(user.patientId && { patientId: user.patientId }),
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "fallback_secret", {
      expiresIn: "24h",
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        ...(user.patientId && { patientId: user.patientId }),
      },
    });
  } catch (error) {
    console.error("[login] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
