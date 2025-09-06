import { type NextRequest, NextResponse } from "next/server"

// Mock data for doctor's assigned patients
const doctorPatients = [
  {
    id: 1,
    patientId: "AYU-2024-001",
    name: "John Doe",
    condition: "Chronic Stress & Insomnia",
    packageName: "Stress Relief Panchakarma",
    progressPercentage: 75,
    lastVisit: "2024-03-10",
    nextAppointment: "2024-03-15",
    status: "active" as const,
    totalSessions: 12,
    completedSessions: 9,
    doctorId: 1,
    phone: "+91 98765 43210",
    email: "john.doe@email.com",
    constitution: "Vata-Pitta",
    treatmentNotes: "Patient showing excellent progress. Stress levels reduced significantly.",
  },
  {
    id: 2,
    patientId: "AYU-2024-002",
    name: "Sarah Johnson",
    condition: "Digestive Issues & Low Energy",
    packageName: "Detox & Rejuvenation Package",
    progressPercentage: 60,
    lastVisit: "2024-03-12",
    nextAppointment: "2024-03-18",
    status: "active" as const,
    totalSessions: 10,
    completedSessions: 6,
    doctorId: 1,
    phone: "+91 98765 43211",
    email: "sarah.johnson@email.com",
    constitution: "Pitta-Kapha",
    treatmentNotes: "Good response to Abhyanga. Continue with current treatment plan.",
  },
  {
    id: 3,
    patientId: "AYU-2024-003",
    name: "Mike Wilson",
    condition: "Joint Pain & Stiffness",
    packageName: "Pain Management Therapy",
    progressPercentage: 90,
    lastVisit: "2024-03-08",
    nextAppointment: "2024-03-20",
    status: "completed" as const,
    totalSessions: 8,
    completedSessions: 8,
    doctorId: 1,
    phone: "+91 98765 43212",
    email: "mike.wilson@email.com",
    constitution: "Vata",
    treatmentNotes: "Treatment completed successfully. Patient reports 80% pain reduction.",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Extract doctor ID from URL params
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")

    if (!doctorId) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 })
    }

    // In real implementation, verify JWT token and get doctor ID from token
    // For now, mock authentication

    // Filter patients assigned to this doctor
    const assignedPatients = doctorPatients.filter((patient) => patient.doctorId === Number.parseInt(doctorId))

    // Calculate summary statistics
    const totalPatients = assignedPatients.length
    const activePatients = assignedPatients.filter((p) => p.status === "active").length
    const completedTreatments = assignedPatients.filter((p) => p.status === "completed").length
    const averageProgress = assignedPatients.reduce((sum, p) => sum + p.progressPercentage, 0) / totalPatients

    return NextResponse.json({
      success: true,
      patients: assignedPatients,
      summary: {
        totalPatients,
        activePatients,
        completedTreatments,
        averageProgress: Math.round(averageProgress),
      },
    })
  } catch (error) {
    console.error("Get doctor patients error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get individual patient details
export async function POST(request: NextRequest) {
  try {
    const { patientId, doctorId } = await request.json()

    if (!patientId || !doctorId) {
      return NextResponse.json({ error: "Patient ID and Doctor ID are required" }, { status: 400 })
    }

    // Find patient assigned to this doctor
    const patient = doctorPatients.find((p) => p.patientId === patientId && p.doctorId === Number.parseInt(doctorId))

    if (!patient) {
      return NextResponse.json({ error: "Patient not found or not assigned to this doctor" }, { status: 404 })
    }

    // Mock treatment history
    const treatmentHistory = [
      {
        date: "2024-03-10",
        treatment: "Abhyanga + Shirodhara",
        duration: "90 minutes",
        notes: "Patient responded well. Stress levels decreased.",
        rating: 5,
      },
      {
        date: "2024-03-08",
        treatment: "Panchakarma Session 2",
        duration: "120 minutes",
        notes: "Continued detox process. Patient feeling more energetic.",
        rating: 4,
      },
      {
        date: "2024-03-05",
        treatment: "Initial Consultation + Abhyanga",
        duration: "60 minutes",
        notes: "Baseline assessment completed. Started treatment plan.",
        rating: 5,
      },
    ]

    return NextResponse.json({
      success: true,
      patient: {
        ...patient,
        treatmentHistory,
      },
    })
  } catch (error) {
    console.error("Get patient details error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
