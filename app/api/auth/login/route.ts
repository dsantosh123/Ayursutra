import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in real implementation, use actual database
const users = [
  {
    id: 1,
    email: "admin@ayursutra.com",
    password_hash: "$2b$10$example_hash_admin",
    role: "admin",
  },
  {
    id: 2,
    email: "dr.priya@ayursutra.com",
    password_hash: "$2b$10$example_hash_doctor1",
    role: "doctor",
  },
  {
    id: 3,
    email: "dr.rajesh@ayursutra.com",
    password_hash: "$2b$10$example_hash_doctor2",
    role: "doctor",
  },
  {
    id: 5,
    email: "john.doe@email.com",
    password_hash: "$2b$10$example_hash_patient1",
    role: "patient",
    patientId: "AYU-2024-001",
  },
  {
    id: 6,
    email: "jane.smith@email.com",
    password_hash: "$2b$10$example_hash_patient2",
    role: "patient",
    patientId: "AYU-2024-002",
  },
  {
    id: 7,
    email: "test.patient@email.com",
    password_hash: "$2b$10$example_hash_patient3",
    role: "patient",
    patientId: "AYU-2024-003",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { identifier, password, loginType } = await request.json()

    console.log("[v0] Login attempt:", { identifier, loginType })

    if (!identifier || !password || !loginType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    let user = null

    if (loginType === "patient") {
      // Find patient by Patient ID
      user = users.find((u) => u.role === "patient" && u.patientId === identifier)
      console.log("[v0] Patient search result:", user ? "Found" : "Not found")
    } else if (loginType === "doctor") {
      // Find doctor by email
      user = users.find((u) => u.role === "doctor" && u.email === identifier)
      console.log("[v0] Doctor search result:", user ? "Found" : "Not found")
    } else if (loginType === "admin") {
      // Find admin by email
      user = users.find((u) => u.role === "admin" && u.email === identifier)
      console.log("[v0] Admin search result:", user ? "Found" : "Not found")
    }

    if (!user) {
      console.log("[v0] User not found for identifier:", identifier)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In real implementation, verify password hash
    // const isValidPassword = await bcrypt.compare(password, user.password_hash)
    const isValidPassword = password === "password123" // Mock validation

    if (!isValidPassword) {
      console.log("[v0] Invalid password for user:", user.email || user.patientId)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    let patientProfile = null
    if (user.role === "patient") {
      patientProfile = {
        id: user.id,
        patientId: user.patientId,
        userId: user.id,
        email: user.email,
      }
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      ...(user.patientId && { patientId: user.patientId }),
    }

    // Generate JWT token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "24h" })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        ...(user.patientId && { patientId: user.patientId }),
      },
      patientProfile,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
