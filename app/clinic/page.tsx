"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, DollarSign, Star, Search, Download, Plus, Eye, Edit, MoreHorizontal } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  totalSessions: number
  status: "active" | "inactive" | "new"
  constitution: string
}

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  totalPatients: number
  revenue: number
  availability: string
}

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  treatment: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  revenue: number
}

export default function ClinicDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminInfo, setAdminInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    const userRole = localStorage.getItem("userRole")
    const userId = localStorage.getItem("userId")

    if (!authToken || userRole !== "admin") {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setAdminInfo({
      id: userId,
      email: "admin@ayursutra.com",
      name: "Admin User",
      role: "admin",
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const clinicStats = {
    totalPatients: 1247,
    activePatients: 892,
    totalDoctors: 12,
    monthlyRevenue: 2450000,
    appointmentsToday: 24,
    completionRate: 94.2,
    averageRating: 4.8,
    newPatientsThisMonth: 156,
  }

  const revenueData = [
    { month: "Jan", revenue: 1800000, patients: 180 },
    { month: "Feb", revenue: 2100000, patients: 210 },
    { month: "Mar", revenue: 2450000, patients: 245 },
    { month: "Apr", revenue: 2200000, patients: 220 },
    { month: "May", revenue: 2600000, patients: 260 },
    { month: "Jun", revenue: 2800000, patients: 280 },
  ]

  const treatmentData = [
    { name: "Panchakarma", value: 35, revenue: 850000 },
    { name: "Abhyanga", value: 25, revenue: 600000 },
    { name: "Shirodhara", value: 20, revenue: 480000 },
    { name: "Consultation", value: 15, revenue: 360000 },
    { name: "Others", value: 5, revenue: 120000 },
  ]

  const COLORS = ["#8b5cf6", "#22c55e", "#f59e0b", "#3b82f6", "#ef4444"]

  const patients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@email.com",
      phone: "+91 98765 43210",
      lastVisit: "2024-03-10",
      totalSessions: 12,
      status: "active",
      constitution: "Vata-Pitta",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+91 98765 43211",
      lastVisit: "2024-03-12",
      totalSessions: 8,
      status: "active",
      constitution: "Pitta-Kapha",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@email.com",
      phone: "+91 98765 43212",
      lastVisit: "2024-02-28",
      totalSessions: 3,
      status: "inactive",
      constitution: "Vata",
    },
  ]

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialization: "Panchakarma Specialist",
      rating: 4.9,
      totalPatients: 156,
      revenue: 780000,
      availability: "Available",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialization: "Ayurvedic Physician",
      rating: 4.7,
      totalPatients: 89,
      revenue: 445000,
      availability: "Busy",
    },
    {
      id: "3",
      name: "Dr. Meera Nair",
      specialization: "Stress Management Expert",
      rating: 4.8,
      totalPatients: 203,
      revenue: 1015000,
      availability: "Available",
    },
  ]

  const todayAppointments: Appointment[] = [
    {
      id: "1",
      patientName: "John Doe",
      doctorName: "Dr. Priya Sharma",
      treatment: "Abhyanga + Shirodhara",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "scheduled",
      revenue: 7500,
    },
    {
      id: "2",
      patientName: "Sarah Johnson",
      doctorName: "Dr. Rajesh Kumar",
      treatment: "Consultation",
      date: "2024-03-15",
      time: "11:00 AM",
      status: "completed",
      revenue: 2000,
    },
    {
      id: "3",
      patientName: "Mike Wilson",
      doctorName: "Dr. Meera Nair",
      treatment: "Panchakarma Session",
      date: "2024-03-15",
      time: "02:00 PM",
      status: "scheduled",
      revenue: 12000,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "scheduled":
      case "completed":
        return "bg-green-100 text-green-800"
      case "inactive":
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "no-show":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clinic Dashboard</h1>
              <p className="text-muted-foreground">Manage your Ayurveda practice and track performance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 mr-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{adminInfo?.name}</div>
                  <div className="text-xs text-muted-foreground">{adminInfo?.email}</div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold text-foreground">{clinicStats.totalPatients}</p>
                      <p className="text-xs text-green-600">+{clinicStats.newPatientsThisMonth} this month</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-foreground">
                        ₹{(clinicStats.monthlyRevenue / 100000).toFixed(1)}L
                      </p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Appointments</p>
                      <p className="text-2xl font-bold text-foreground">{clinicStats.appointmentsToday}</p>
                      <p className="text-xs text-blue-600">{clinicStats.completionRate}% completion rate</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold text-foreground">{clinicStats.averageRating}</p>
                      <p className="text-xs text-yellow-600">Based on 1,247 reviews</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue and patient count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "revenue" ? `₹${((value as number) / 100000).toFixed(1)}L` : value,
                            name === "revenue" ? "Revenue" : "Patients",
                          ]}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                        <Line type="monotone" dataKey="patients" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treatment Distribution</CardTitle>
                  <CardDescription>Revenue by treatment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={treatmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {treatmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.treatment} • {appointment.doctorName}
                        </div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">₹{appointment.revenue.toLocaleString()}</div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Patient Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Patient
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Patients Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium text-muted-foreground">Patient</th>
                        <th className="p-4 font-medium text-muted-foreground">Contact</th>
                        <th className="p-4 font-medium text-muted-foreground">Constitution</th>
                        <th className="p-4 font-medium text-muted-foreground">Sessions</th>
                        <th className="p-4 font-medium text-muted-foreground">Last Visit</th>
                        <th className="p-4 font-medium text-muted-foreground">Status</th>
                        <th className="p-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
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
                                <div className="text-sm text-muted-foreground">ID: {patient.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="text-sm">{patient.email}</div>
                              <div className="text-sm text-muted-foreground">{patient.phone}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{patient.constitution}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">{patient.totalSessions}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Doctor Performance</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Patients:</span>
                        <span className="font-medium">{doctor.totalPatients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue:</span>
                        <span className="font-medium">₹{(doctor.revenue / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge
                          className={
                            doctor.availability === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {doctor.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Appointment Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>Manage and track all patient appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.treatment} • {appointment.doctorName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">₹{appointment.revenue.toLocaleString()}</div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Business Analytics</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Revenue and patient growth trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treatment Success Rate</CardTitle>
                  <CardDescription>Patient satisfaction and treatment outcomes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Panchakarma:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "96%" }}></div>
                        </div>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Abhyanga:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shirodhara:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "98%" }}></div>
                        </div>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Consultation:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Business Insights</CardTitle>
                <CardDescription>AI-powered recommendations for clinic growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Peak Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Most appointments are booked between 10 AM - 12 PM and 2 PM - 4 PM. Consider adding more slots
                      during these times.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Popular Treatments</h4>
                    <p className="text-sm text-muted-foreground">
                      Panchakarma and Abhyanga are your top revenue generators. Consider creating package deals to
                      increase bookings.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Patient Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      89% of patients complete their treatment plans. Follow-up reminders could improve this to 95%.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Revenue Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Monthly revenue has grown 12% consistently. Consider expanding services or adding new doctors.
                    </p>
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
