import { type NextRequest, NextResponse } from "next/server"

function generatePatientId(): string {
  const currentYear = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 999) + 1
  return `AYU-${currentYear}-${randomNum.toString().padStart(3, "0")}`
}

function findExistingPatient(email: string, phone: string) {
  return patients.find((p) => p.email === email || p.phone === phone)
}

// Mock patient data - in real implementation, fetch from database
const patients = [
  {
    id: 1,
    patientId: "AYU-2024-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    gender: "male",
    constitution: "Vata-Pitta",
    stressLevel: 7,
    sleepQuality: 5,
    digestiveHealth: 6,
    energyLevel: 4,
    status: "active",
    totalSessions: 12,
    lastVisit: "2024-03-10",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    patientId: "AYU-2024-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43211",
    dateOfBirth: "1985-08-22",
    gender: "female",
    constitution: "Pitta-Kapha",
    stressLevel: 5,
    sleepQuality: 7,
    digestiveHealth: 8,
    energyLevel: 7,
    status: "active",
    totalSessions: 8,
    lastVisit: "2024-03-12",
    createdAt: "2024-02-01",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredPatients = patients

    // Filter by status
    if (status && status !== "all") {
      filteredPatients = filteredPatients.filter((p) => p.status === status)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPatients = filteredPatients.filter(
        (p) =>
          p.firstName.toLowerCase().includes(searchLower) ||
          p.lastName.toLowerCase().includes(searchLower) ||
          p.email.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      patients: filteredPatients,
      total: filteredPatients.length,
    })
  } catch (error) {
    console.error("Get patients error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone"]
    for (const field of requiredFields) {
      if (!patientData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const existingPatient = findExistingPatient(patientData.email, patientData.phone)
    if (existingPatient) {
      return NextResponse.json({
        success: true,
        patient: existingPatient,
        message: "Patient already exists. Returning existing profile.",
        isExisting: true,
      })
    }

    let patientId = generatePatientId()
    // Ensure uniqueness (in real implementation, check database)
    while (patients.find((p) => p.patientId === patientId)) {
      patientId = generatePatientId()
    }

    // Create new patient
    const newPatient = {
      id: patients.length + 1,
      patientId,
      ...patientData,
      status: "new",
      totalSessions: 0,
      createdAt: new Date().toISOString(),
    }

    patients.push(newPatient)

    return NextResponse.json(
      {
        success: true,
        patient: newPatient,
        message: "New patient registered successfully",
        isExisting: false,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create patient error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
