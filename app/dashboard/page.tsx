"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  TrendingUp,
  Heart,
  Brain,
  Leaf,
  Star,
  Bell,
  Settings,
  Download,
  Plus,
  Activity,
  Target,
  LogOut,
  Gift,
  MessageCircle,
} from "lucide-react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface Appointment {
  id: string
  date: string
  time: string
  doctor: string
  treatment: string
  status: "upcoming" | "completed" | "cancelled"
  center: string
}

interface HealthMetric {
  name: string
  current: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  color: string
}

interface PatientData {
  patientId: string
  name: string
  email: string
  phone: string
  constitution: string
  joinDate: string
  totalSessions: number
  completedTreatments: number
}

export default function PatientDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userRole = localStorage.getItem("userRole")

    if (!token || userRole !== "patient") {
      router.push("/login")
      return
    }

    // Load patient data from localStorage or API
    const mockPatientData: PatientData = {
      patientId: localStorage.getItem("patientId") || "AYU-2024-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      constitution: "Vata-Pitta",
      joinDate: "January 2024",
      totalSessions: 12,
      completedTreatments: 8,
    }
    setPatientData(mockPatientData)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    localStorage.removeItem("patientId")
    router.push("/login")
  }

  const handleBookNewAppointment = () => {
    router.push("/booking")
  }

  const handleContactDoctor = () => {
    // Get current doctor info from appointments or localStorage
    const message = `Hi Dr. Priya, I'm ${patientData?.name} (Patient ID: ${patientData?.patientId}). I have a question about my treatment.`

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShareReferral = () => {
    const referralCode = "AYUR-JOHN-2024"
    const referralMessage = `🌿 Join me on AyurSutra for authentic Ayurveda treatments! Use my referral code: ${referralCode} and get ₹500 off your first treatment. Download the app: https://ayursutra.com`

    if (navigator.share) {
      navigator.share({
        title: "AyurSutra Referral",
        text: referralMessage,
        url: "https://ayursutra.com",
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(referralMessage).then(() => {
        alert("Referral message copied to clipboard!")
      })
    }
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Mock patient data
  const patientInfo = patientData

  const upcomingAppointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-15",
      time: "10:00 AM",
      doctor: "Dr. Priya Sharma",
      treatment: "Abhyanga + Shirodhara",
      status: "upcoming",
      center: "Koramangala Center",
    },
    {
      id: "2",
      date: "2024-03-18",
      time: "02:00 PM",
      doctor: "Dr. Rajesh Kumar",
      treatment: "Follow-up Consultation",
      status: "upcoming",
      center: "Koramangala Center",
    },
  ]

  const recentAppointments: Appointment[] = [
    {
      id: "3",
      date: "2024-03-10",
      time: "10:00 AM",
      doctor: "Dr. Priya Sharma",
      treatment: "Panchakarma Session 3",
      status: "completed",
      center: "Koramangala Center",
    },
    {
      id: "4",
      date: "2024-03-08",
      time: "11:00 AM",
      doctor: "Dr. Priya Sharma",
      treatment: "Panchakarma Session 2",
      status: "completed",
      center: "Koramangala Center",
    },
  ]

  const healthMetrics: HealthMetric[] = [
    { name: "Stress Level", current: 3, target: 2, unit: "/10", trend: "down", color: "#ef4444" },
    { name: "Sleep Quality", current: 8, target: 9, unit: "/10", trend: "up", color: "#22c55e" },
    { name: "Energy Level", current: 7, target: 8, unit: "/10", trend: "up", color: "#f59e0b" },
    { name: "Digestive Health", current: 8, target: 9, unit: "/10", trend: "stable", color: "#3b82f6" },
  ]

  const progressData = [
    { week: "Week 1", stress: 7, sleep: 5, energy: 4, digestion: 6 },
    { week: "Week 2", stress: 6, sleep: 6, energy: 5, digestion: 7 },
    { week: "Week 3", stress: 5, sleep: 7, energy: 6, digestion: 7 },
    { week: "Week 4", stress: 4, sleep: 7, energy: 7, digestion: 8 },
    { week: "Week 5", stress: 3, sleep: 8, energy: 7, digestion: 8 },
  ]

  const treatmentProgress = [
    { treatment: "Abhyanga", completed: 5, total: 7 },
    { treatment: "Shirodhara", completed: 3, total: 5 },
    { treatment: "Meditation", completed: 8, total: 10 },
    { treatment: "Nasya", completed: 2, total: 3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {patientInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {patientInfo.name.split(" ")[0]}!</h1>
                <p className="text-muted-foreground">
                  Patient ID: {patientInfo.patientId} • Track your wellness journey
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Current Treatment Course</h3>
                    <p className="text-green-600">Panchakarma Detox Program - Week 5 of 8</p>
                    <div className="mt-2">
                      <Progress value={62.5} className="h-3 w-64" />
                      <p className="text-sm text-green-600 mt-1">62% Complete</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleContactDoctor}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Doctor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="text-2xl font-bold text-foreground">{patientInfo.totalSessions}</p>
                    </div>
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-foreground">{patientInfo.completedTreatments}</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Constitution</p>
                      <p className="text-lg font-semibold text-foreground">{patientInfo.constitution}</p>
                    </div>
                    <Leaf className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Referral Points</p>
                      <p className="text-2xl font-bold text-yellow-600">250</p>
                    </div>
                    <Gift className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  Current Health Metrics
                </CardTitle>
                <CardDescription>Your latest wellness indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {healthMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {metric.current}
                            {metric.unit}
                          </span>
                          <TrendingUp
                            className={`h-4 w-4 ${
                              metric.trend === "up"
                                ? "text-green-500"
                                : metric.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          />
                        </div>
                      </div>
                      <Progress value={(metric.current / 10) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {metric.current}</span>
                        <span>Target: {metric.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{appointment.treatment}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">Dr. {appointment.doctor}</div>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Upcoming
                      </Badge>
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline" onClick={handleBookNewAppointment}>
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treatment Progress</CardTitle>
                  <CardDescription>Your current treatment plan progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatmentProgress.map((treatment) => (
                    <div key={treatment.treatment} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{treatment.treatment}</span>
                        <span className="text-muted-foreground">
                          {treatment.completed}/{treatment.total}
                        </span>
                      </div>
                      <Progress value={(treatment.completed / treatment.total) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Progress Over Time</CardTitle>
                <CardDescription>Track your wellness journey week by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((week) => (
                    <div key={week.week} className="space-y-2">
                      <h4 className="font-medium">{week.week}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Stress</span>
                          <Progress value={(week.stress / 10) * 100} className="h-2" />
                          <span className="text-xs">{week.stress}/10</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Sleep</span>
                          <Progress value={(week.sleep / 10) * 100} className="h-2" />
                          <span className="text-xs">{week.sleep}/10</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Energy</span>
                          <Progress value={(week.energy / 10) * 100} className="h-2" />
                          <span className="text-xs">{week.energy}/10</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Digestion</span>
                          <Progress value={(week.digestion / 10) * 100} className="h-2" />
                          <span className="text-xs">{week.digestion}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Completion Rate</CardTitle>
                <CardDescription>Progress across different treatment types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatmentProgress.map((treatment) => (
                    <div key={treatment.treatment} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{treatment.treatment}</span>
                        <span className="text-muted-foreground">
                          {treatment.completed}/{treatment.total}
                        </span>
                      </div>
                      <Progress value={(treatment.completed / treatment.total) * 100} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
              <Button onClick={handleBookNewAppointment}>
                <Plus className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="font-semibold text-foreground">{appointment.treatment}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.doctor} • {appointment.center}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Upcoming</Badge>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="font-semibold text-foreground">{appointment.treatment}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.doctor} • {appointment.center}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Completed
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Rate
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Health Reports</h2>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download All Reports
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Summary</CardTitle>
                  <CardDescription>Your wellness journey overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overall Progress:</span>
                      <span className="font-semibold text-green-600">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stress Reduction:</span>
                      <span className="font-semibold">57% improvement</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sleep Quality:</span>
                      <span className="font-semibold">60% improvement</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Energy Levels:</span>
                      <span className="font-semibold">75% improvement</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treatment Effectiveness</CardTitle>
                  <CardDescription>How well treatments are working for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Abhyanga:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-20 h-2" />
                        <span className="text-sm font-medium">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shirodhara:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Meditation:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Treatment Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AI Insights & Recommendations</CardTitle>
                  <CardDescription>Personalized suggestions based on your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                      <Brain className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Continue Current Treatment Plan</div>
                        <div className="text-sm text-muted-foreground">
                          Your stress levels have improved significantly. Continue with Abhyanga and Shirodhara for
                          optimal results.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                      <Leaf className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Dietary Adjustment Suggested</div>
                        <div className="text-sm text-muted-foreground">
                          Consider adding more warm, cooked foods to balance your Vata constitution and improve
                          digestion.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                      <Heart className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Lifestyle Recommendation</div>
                        <div className="text-sm text-muted-foreground">
                          Your sleep quality has improved. Maintain your current bedtime routine and consider adding
                          evening meditation.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Referral Program</h2>
              <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={handleShareReferral}>
                <Gift className="h-4 w-4 mr-2" />
                Share Referral Code
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Stats</CardTitle>
                  <CardDescription>Earn rewards by referring friends and family</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">AYUR-JOHN-2024</div>
                    <p className="text-sm text-yellow-700">Your Referral Code</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Referrals:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Points Earned:</span>
                      <span className="font-semibold text-yellow-600">250 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rewards Claimed:</span>
                      <span className="font-semibold">₹500 discount</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Redeem your referral points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">₹200 Treatment Discount</div>
                        <div className="text-sm text-muted-foreground">100 points required</div>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Free Consultation</div>
                        <div className="text-sm text-muted-foreground">150 points required</div>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Ayurvedic Medicine Kit</div>
                        <div className="text-sm text-muted-foreground">300 points required</div>
                      </div>
                      <Button size="sm" variant="outline" disabled>
                        Need 50 more
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">Joined 2 days ago • +50 points</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Mike Chen</div>
                      <div className="text-sm text-muted-foreground">Joined 1 week ago • +50 points</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Emma Wilson</div>
                      <div className="text-sm text-muted-foreground">Registered yesterday</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
