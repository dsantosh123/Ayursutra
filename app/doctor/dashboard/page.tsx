"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Calendar,
  TrendingUp,
  Search,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"

interface DoctorPatient {
  id: number
  patientId: string
  name: string
  condition: string
  packageName: string
  progressPercentage: number
  lastVisit: string
  nextAppointment?: string
  status: "active" | "completed" | "paused"
  totalSessions: number
  completedSessions: number
  phone: string
  email: string
  constitution: string
  treatmentNotes: string
  appointmentTime?: string
  roomNumber?: string
  centerName?: string
}

interface PatientSummary {
  totalPatients: number
  activePatients: number
  completedTreatments: number
  averageProgress: number
}

export default function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState("patients")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [patients, setPatients] = useState<DoctorPatient[]>([])
  const [summary, setSummary] = useState<PatientSummary | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [doctorInfo, setDoctorInfo] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken")
      const userRole = localStorage.getItem("userRole")
      const userId = localStorage.getItem("userId")

      if (!authToken || !userRole || !userId) {
        router.push("/login")
        return
      }

      if (userRole !== "doctor") {
        router.push("/login")
        return
      }

      let doctorId = "1" // Default
      let doctorName = "Dr. Priya Sharma"

      if (userId === "dr.priya@ayursutra.com") {
        doctorId = "1"
        doctorName = "Dr. Priya Sharma"
      } else if (userId === "dr.rajesh@ayursutra.com") {
        doctorId = "2"
        doctorName = "Dr. Rajesh Kumar"
      }

      const doctorData = {
        id: doctorId,
        email: userId,
        role: userRole,
        name: doctorName,
        specialization: "Panchakarma Specialist",
        experience: "8+ years",
      }

      setDoctorInfo(doctorData)
      setIsAuthenticated(true)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    fetchPatients()
  }, [doctorInfo])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/appointments?doctorId=${doctorInfo?.id}`)
      const data = await response.json()

      if (data.success) {
        const transformedPatients = data.appointments.map((appointment: any) => ({
          id: appointment.id,
          patientId: appointment.patientId || `AYU-2024-${appointment.id.padStart(3, "0")}`,
          name: appointment.patientName,
          condition: getConditionFromPackage(appointment.packageId),
          packageName: appointment.packageName,
          progressPercentage: appointment.status === "completed" ? 100 : 65,
          lastVisit: appointment.appointmentDate,
          nextAppointment: appointment.status === "scheduled" ? appointment.appointmentDate : undefined,
          status: appointment.status === "scheduled" ? "active" : appointment.status,
          totalSessions: appointment.treatments?.length || 3,
          completedSessions: appointment.status === "completed" ? appointment.treatments?.length || 3 : 1,
          phone: "+91 98765 43210", // Mock data
          email: "patient@email.com", // Mock data
          constitution: "Vata-Pitta",
          treatmentNotes: "Patient responding well to treatment",
          appointmentTime: appointment.appointmentTime,
          roomNumber: `Room ${Math.floor(Math.random() * 10) + 1}`,
          centerName: appointment.centerName,
        }))

        setPatients(transformedPatients)

        const activeTreatments = transformedPatients.filter((p: any) => p.status === "active").length
        const completedTreatments = transformedPatients.filter((p: any) => p.status === "completed").length
        const avgProgress =
          transformedPatients.reduce((acc: number, p: any) => acc + p.progressPercentage, 0) /
            transformedPatients.length || 0

        setSummary({
          totalPatients: transformedPatients.length,
          activePatients: activeTreatments,
          completedTreatments: completedTreatments,
          averageProgress: Math.round(avgProgress),
        })
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const getConditionFromPackage = (packageId: string) => {
    const conditionMap: { [key: string]: string } = {
      "stress-relief": "Stress & Anxiety",
      "digestive-wellness": "Digestive Issues",
      "pain-management": "Chronic Pain",
      "detox-cleanse": "Detoxification",
      "immunity-boost": "Low Immunity",
    }
    return conditionMap[packageId] || "General Wellness"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "paused":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  if (!isAuthenticated || !doctorInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your patients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {doctorInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {doctorInfo.name}</h1>
                <p className="text-muted-foreground">
                  {doctorInfo.specialization} • {doctorInfo.experience} experience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Patients</p>
                        <p className="text-2xl font-bold text-foreground">{summary.totalPatients}</p>
                      </div>
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Treatments</p>
                        <p className="text-2xl font-bold text-foreground">{summary.activePatients}</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold text-foreground">{summary.completedTreatments}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Progress</p>
                        <p className="text-2xl font-bold text-foreground">{summary.averageProgress}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, Patient ID, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {patients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{patient.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {patient.patientId}
                            </Badge>
                            <Badge className={getStatusColor(patient.status)}>
                              {getStatusIcon(patient.status)}
                              <span className="ml-1 capitalize">{patient.status}</span>
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Condition:</p>
                              <p className="font-medium">{patient.condition}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Package:</p>
                              <p className="font-medium">{patient.packageName}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Progress:</p>
                              <div className="flex items-center gap-2">
                                <Progress value={patient.progressPercentage} className="flex-1 h-2" />
                                <span className="font-medium">{patient.progressPercentage}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>
                              Sessions: {patient.completedSessions}/{patient.totalSessions}
                            </span>
                            <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                            {patient.nextAppointment && (
                              <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {patients.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No patients found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "You don't have any assigned patients yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients
                    .filter((p) => p.status === "active" && p.nextAppointment)
                    .map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.patientId}</div>
                            <div className="text-sm text-muted-foreground">{patient.packageName}</div>
                            <div className="text-xs text-muted-foreground">{patient.centerName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{patient.appointmentTime || "10:00 AM"}</div>
                          <div className="text-sm text-muted-foreground">90 minutes</div>
                          <div className="text-xs text-muted-foreground">{patient.roomNumber}</div>
                        </div>
                      </div>
                    ))}

                  {patients.filter((p) => p.status === "active" && p.nextAppointment).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No appointments scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Success Rate</CardTitle>
                  <CardDescription>Patient outcomes and satisfaction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Stress Management:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={96} className="w-20 h-2" />
                        <span className="text-sm font-medium">96%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pain Relief:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={89} className="w-20 h-2" />
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Digestive Health:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={94} className="w-20 h-2" />
                        <span className="text-sm font-medium">94%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Feedback</CardTitle>
                  <CardDescription>Recent reviews and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Average Rating:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">4.9</span>
                        <span className="text-muted-foreground">/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>5 stars</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>4 stars</span>
                          <span>12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>3 stars</span>
                          <span>3%</span>
                        </div>
                        <Progress value={3} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
