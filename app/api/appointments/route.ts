import { type NextRequest, NextResponse } from "next/server"

// Mock appointments data
const appointments = [
  {
    id: "1",
    patientId: "AYU-2024-001",
    patientName: "John Doe",
    doctorId: 1,
    doctorName: "Dr. Priya Sharma",
    centerId: 1,
    centerName: "AyurSutra Wellness Center - Koramangala",
    packageId: "stress-relief",
    packageName: "Stress Relief & Mental Wellness",
    date: "2024-03-15",
    time: "10:00 AM",
    duration: 135, // minutes
    status: "scheduled",
    totalAmount: 9000,
    paymentStatus: "paid",
    treatments: ["Abhyanga", "Shirodhara", "Consultation"],
    roomNumber: "Room 3",
    condition: "Stress Management",
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "2",
    patientId: "AYU-2024-002",
    patientName: "Sarah Johnson",
    doctorId: 2,
    doctorName: "Dr. Rajesh Kumar",
    centerId: 1,
    centerName: "AyurSutra Wellness Center - Koramangala",
    packageId: "digestive-wellness",
    packageName: "Digestive Health Restoration",
    date: "2024-03-12",
    time: "2:00 PM",
    duration: 90,
    status: "completed",
    totalAmount: 13000,
    paymentStatus: "paid",
    treatments: ["Consultation", "Abhyanga"],
    roomNumber: "Room 1",
    condition: "Digestive Issues",
    createdAt: "2024-02-28T14:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")
    const doctorId = searchParams.get("doctorId")
    const status = searchParams.get("status")
    const date = searchParams.get("date")

    let filteredAppointments = appointments

    // Filter by patient
    if (patientId) {
      filteredAppointments = filteredAppointments.filter((a) => a.patientId === patientId)
    }

    // Filter by doctor
    if (doctorId) {
      filteredAppointments = filteredAppointments.filter((a) => a.doctorId === Number.parseInt(doctorId))
    }

    // Filter by status
    if (status) {
      filteredAppointments = filteredAppointments.filter((a) => a.status === status)
    }

    // Filter by date
    if (date) {
      filteredAppointments = filteredAppointments.filter((a) => a.date === date)
    }

    return NextResponse.json({
      success: true,
      appointments: filteredAppointments,
      total: filteredAppointments.length,
    })
  } catch (error) {
    console.error("Get appointments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    const requiredFields = ["patientId", "doctorId", "date", "time"]
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const conflictingAppointment = appointments.find(
      (a) =>
        a.doctorId === appointmentData.doctorId &&
        a.date === appointmentData.date &&
        a.time === appointmentData.time &&
        a.status === "scheduled",
    )

    if (conflictingAppointment) {
      return NextResponse.json({ error: "Time slot already booked" }, { status: 409 })
    }

    const newAppointment = {
      id: (appointments.length + 1).toString(),
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName || "Patient",
      doctorId: appointmentData.doctorId,
      doctorName: appointmentData.doctorName || "Doctor",
      centerId: appointmentData.centerId || 1,
      centerName: appointmentData.centerName || "AyurSutra Wellness Center",
      packageId: appointmentData.packageId || "general-wellness",
      packageName: appointmentData.packageName || "General Wellness Package",
      date: appointmentData.date,
      time: appointmentData.time,
      treatments: appointmentData.treatments || [],
      totalAmount: appointmentData.totalAmount || 0,
      roomNumber: appointmentData.roomNumber || `Room ${Math.floor(Math.random() * 10) + 1}`,
      condition: appointmentData.condition || "General Wellness",
      status: "scheduled",
      paymentStatus: "pending",
      duration: 90, // Default duration
      createdAt: new Date().toISOString(),
    }

    appointments.push(newAppointment)

    return NextResponse.json(
      {
        success: true,
        appointment: newAppointment,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create appointment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
