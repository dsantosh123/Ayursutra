import { type NextRequest, NextResponse } from "next/server"

// Mock analytics data
const clinicAnalytics = {
  overview: {
    totalPatients: 1247,
    activePatients: 892,
    newPatientsThisMonth: 156,
    totalDoctors: 12,
    monthlyRevenue: 2450000,
    appointmentsToday: 24,
    completionRate: 94.2,
    averageRating: 4.8,
    totalReviews: 1247,
  },
  revenueData: [
    { month: "Jan", revenue: 1800000, patients: 180, appointments: 240 },
    { month: "Feb", revenue: 2100000, patients: 210, appointments: 280 },
    { month: "Mar", revenue: 2450000, patients: 245, appointments: 320 },
    { month: "Apr", revenue: 2200000, patients: 220, appointments: 290 },
    { month: "May", revenue: 2600000, patients: 260, appointments: 340 },
    { month: "Jun", revenue: 2800000, patients: 280, appointments: 360 },
  ],
  treatmentDistribution: [
    { name: "Panchakarma", value: 35, revenue: 850000, sessions: 120 },
    { name: "Abhyanga", value: 25, revenue: 600000, sessions: 200 },
    { name: "Shirodhara", value: 20, revenue: 480000, sessions: 150 },
    { name: "Consultation", value: 15, revenue: 360000, sessions: 300 },
    { name: "Others", value: 5, revenue: 120000, sessions: 50 },
  ],
  doctorPerformance: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      totalPatients: 156,
      revenue: 780000,
      rating: 4.9,
      completionRate: 96.5,
      averageSessionDuration: 75,
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      totalPatients: 89,
      revenue: 445000,
      rating: 4.7,
      completionRate: 94.2,
      averageSessionDuration: 68,
    },
    {
      id: 3,
      name: "Dr. Meera Nair",
      totalPatients: 203,
      revenue: 1015000,
      rating: 4.8,
      completionRate: 95.8,
      averageSessionDuration: 82,
    },
  ],
  patientSatisfaction: {
    overallRating: 4.8,
    treatmentEffectiveness: 94.2,
    facilityRating: 4.6,
    staffRating: 4.9,
    recommendationRate: 92.5,
  },
  operationalMetrics: {
    averageWaitTime: 12, // minutes
    appointmentUtilization: 87.3, // percentage
    noShowRate: 5.8,
    cancellationRate: 8.2,
    rebookingRate: 78.5,
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "month"
    const centerId = searchParams.get("centerId")

    // In real implementation, filter data based on parameters
    let analyticsData = clinicAnalytics

    // Mock filtering by center
    if (centerId) {
      // Adjust data for specific center
      analyticsData = {
        ...clinicAnalytics,
        overview: {
          ...clinicAnalytics.overview,
          totalPatients: Math.floor(clinicAnalytics.overview.totalPatients * 0.4),
          activePatients: Math.floor(clinicAnalytics.overview.activePatients * 0.4),
          monthlyRevenue: Math.floor(clinicAnalytics.overview.monthlyRevenue * 0.4),
        },
      }
    }

    return NextResponse.json({
      success: true,
      analytics: analyticsData,
      timeframe,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
