"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Stethoscope, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("patient")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [patientForm, setPatientForm] = useState({
    patientId: "",
    password: "",
  })

  const [doctorForm, setDoctorForm] = useState({
    email: "",
    password: "",
  })

  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
  })

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Bypass password validation - accept any password
      if (patientForm.patientId) {
        // Simulate successful login without API call
        const mockResponse = {
          token: "mock-token-patient",
          user: {
            id: "patient-123",
            role: "patient"
          }
        }
        
        localStorage.setItem("authToken", mockResponse.token)
        localStorage.setItem("userRole", mockResponse.user.role)
        localStorage.setItem("userId", mockResponse.user.id)
        router.push("/dashboard")
      } else {
        setError("Please enter a Patient ID")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Bypass password validation - accept any password
      if (doctorForm.email) {
        // Simulate successful login without API call
        const mockResponse = {
          token: "mock-token-doctor",
          user: {
            id: "doctor-123",
            role: "doctor"
          }
        }
        
        localStorage.setItem("authToken", mockResponse.token)
        localStorage.setItem("userRole", mockResponse.user.role)
        localStorage.setItem("userId", mockResponse.user.id)
        router.push("/doctor/dashboard")
      } else {
        setError("Please enter an email address")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Bypass password validation - accept any password
      if (adminForm.email) {
        // Simulate successful login without API call
        const mockResponse = {
          token: "mock-token-admin",
          user: {
            id: "admin-123",
            role: "admin"
          }
        }
        
        localStorage.setItem("authToken", mockResponse.token)
        localStorage.setItem("userRole", mockResponse.user.role)
        localStorage.setItem("userId", mockResponse.user.id)
        router.push("/clinic")
      } else {
        setError("Please enter an email address")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AyurSutra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">Sign in to your AyurSutra account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="patient" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Doctor
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                {error && (
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Patient Login */}
                <TabsContent value="patient">
                  <form onSubmit={handlePatientLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        placeholder="AYU-2024-001"
                        value={patientForm.patientId}
                        onChange={(e) => setPatientForm({ ...patientForm, patientId: e.target.value })}
                        required
                        className="bg-white"
                      />
                      <p className="text-xs text-gray-500">Enter your unique Patient ID (e.g., AYU-2024-001)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientPassword">Password</Label>
                      <Input
                        id="patientPassword"
                        type="password"
                        placeholder="Enter any password"
                        value={patientForm.password}
                        onChange={(e) => setPatientForm({ ...patientForm, password: e.target.value })}
                        className="bg-white"
                      />
                      <p className="text-xs text-green-600">Any password will work for testing</p>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In as Patient"
                      )}
                    </Button>
                  </form>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                        Register here
                      </Link>
                    </p>
                  </div>
                </TabsContent>

                {/* Doctor Login */}
                <TabsContent value="doctor">
                  <form onSubmit={handleDoctorLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorEmail">Email</Label>
                      <Input
                        id="doctorEmail"
                        type="email"
                        placeholder="doctor@ayursutra.com"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorPassword">Password</Label>
                      <Input
                        id="doctorPassword"
                        type="password"
                        placeholder="Enter any password"
                        value={doctorForm.password}
                        onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                        className="bg-white"
                      />
                      <p className="text-xs text-blue-600">Any password will work for testing</p>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In as Doctor"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Admin Login */}
                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@ayursutra.com"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Password</Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder="Enter any password"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="bg-white"
                      />
                      <p className="text-xs text-purple-600">Any password will work for testing</p>
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In as Admin"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}