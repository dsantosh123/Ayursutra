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

  const [patientForm, setPatientForm] = useState({ patientId: "", password: "" })
  const [doctorForm, setDoctorForm] = useState({ email: "", password: "" })
  const [adminForm, setAdminForm] = useState({ email: "", password: "" })

  const login = async (identifier: string, password: string, loginType: string, redirectPath: string) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, loginType }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Login failed")
        return
      }

      localStorage.setItem("authToken", data.token)
      localStorage.setItem("userRole", data.user.role)
      localStorage.setItem("userId", data.user.id)

      router.push(redirectPath)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(patientForm.patientId, patientForm.password, "patient", "/dashboard")
  }

  const handleDoctorLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(doctorForm.email, doctorForm.password, "doctor", "/doctor/dashboard")
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(adminForm.email, adminForm.password, "admin", "/clinic")
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

      {/* Main */}
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
                  <TabsTrigger value="patient"><User className="h-4 w-4" /> Patient</TabsTrigger>
                  <TabsTrigger value="doctor"><Stethoscope className="h-4 w-4" /> Doctor</TabsTrigger>
                  <TabsTrigger value="admin"><Shield className="h-4 w-4" /> Admin</TabsTrigger>
                </TabsList>

                {error && (
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Patient */}
                <TabsContent value="patient">
                  <form onSubmit={handlePatientLogin} className="space-y-4">
                    <Label>Patient ID</Label>
                    <Input
                      value={patientForm.patientId}
                      onChange={(e) => setPatientForm({ ...patientForm, patientId: e.target.value })}
                      required
                      placeholder="AYU-2024-001"
                    />
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={patientForm.password}
                      onChange={(e) => setPatientForm({ ...patientForm, password: e.target.value })}
                      required
                      placeholder="Enter password"
                    />
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In as Patient"}
                    </Button>
                  </form>
                 </TabsContent>

                {/* Doctor */}
                <TabsContent value="doctor">
                  <form onSubmit={handleDoctorLogin} className="space-y-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={doctorForm.email}
                      onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                      required
                    />
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={doctorForm.password}
                      onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In as Doctor"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Admin */}
                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      required
                    />
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In as Admin"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Patient Login</h1>
      {/* your login form here */}
      
      <p className="mt-4 text-sm">
        New patient?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
