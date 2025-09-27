"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import React from "react"

const ArrowLeft = ({ className }: { className?: string }) => <span className={className}>←</span>

const ArrowRight = ({ className }: { className?: string }) => <span className={className}>→</span>

const User = ({ className }: { className?: string }) => <span className={className}>👤</span>

const CheckCircle = ({ className }: { className?: string }) => <span className={className}>✅</span>

const Home = ({ className }: { className?: string }) => <span className={className}>🏠</span>

const Leaf = ({ className }: { className?: string }) => <span className={className}>🌿</span>

interface PatientData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
}

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Registration Complete", icon: CheckCircle },
]

export default function PatientRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  })

  const updatePatientData = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateCurrentStep = (): boolean => {
    const errors: string[] = []

    if (currentStep === 1) {
      if (!patientData.firstName.trim()) errors.push("First name is required")
      if (!patientData.lastName.trim()) errors.push("Last name is required")
      if (!patientData.email.trim()) errors.push("Email address is required")
      if (!patientData.phone.trim()) errors.push("Phone number is required")
      if (!patientData.dateOfBirth) errors.push("Date of birth is required")
      if (!patientData.gender) errors.push("Gender is required")

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (patientData.email && !emailRegex.test(patientData.email)) {
        errors.push("Please enter a valid email address")
      }
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return
    }

    if (currentStep === 1) {
      completeRegistration()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    setValidationErrors([])
  }

  const generatePatientId = (): string => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 900) + 100 // 3-digit number between 100-999
    return `AYU-${year}-${randomNum}`
  }

  const completeRegistration = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsLoading(true)

    try {
      const patientId = generatePatientId()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setGeneratedPatientId(patientId)
      setRegistrationComplete(true)
      setCurrentStep(2)
      setIsLoading(false)
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
    }
  }

  const progress = (currentStep / 2) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">🌿 Patient Registration</h1>
            <p className="text-green-700 text-lg">Create your account to access personalized Ayurvedic care</p>
          </motion.div>
        </div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Progress value={progress} className="h-3 mb-6 bg-green-100" />
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep >= step.id
              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                        : "bg-white border-2 border-green-200 text-green-600"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? "text-green-900" : "text-green-600"}`}>
                    {step.title}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <h4 className="text-red-800 font-medium mb-2">Please fix the following errors:</h4>
            <ul className="text-red-700 text-sm space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-green-200 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-amber-50 border-b border-green-100">
              <CardTitle className="text-2xl text-green-900 flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-6 w-6 text-green-600",
                })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-green-700 text-base">
                {currentStep === 1 && "Please provide your basic information to get started"}
                {currentStep === 2 && registrationComplete
                  ? "Your registration is complete!"
                  : "Processing your registration..."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-green-800 font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={patientData.firstName}
                      onChange={(e) => updatePatientData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-green-800 font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={patientData.lastName}
                      onChange={(e) => updatePatientData("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-green-800 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientData.email}
                      onChange={(e) => updatePatientData("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-green-800 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={patientData.phone}
                      onChange={(e) => updatePatientData("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-green-800 font-medium">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={patientData.dateOfBirth}
                      onChange={(e) => updatePatientData("dateOfBirth", e.target.value)}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-green-800 font-medium">
                      Gender *
                    </Label>
                    <Select value={patientData.gender} onValueChange={(value) => updatePatientData("gender", value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Registration Complete */}
              {currentStep === 2 && (
                <motion.div
                  className="text-center space-y-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {isLoading ? (
                    <div className="space-y-6">
                      <motion.div
                        className="animate-spin rounded-full h-20 w-20 border-4 border-green-200 border-t-green-600 mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-green-900">🧠 Processing Registration...</h3>
                        <p className="text-green-700 text-lg max-w-md mx-auto">
                          Creating your unique Patient ID and setting up your profile...
                        </p>
                      </div>
                    </div>
                  ) : registrationComplete ? (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <div className="text-6xl">✅</div>
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-green-900">✅ Registration Successful!</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto">
                          We have sent your Patient ID and password to your registered email. Please check your inbox.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button
                          onClick={() => router.push("/login")}
                          size="lg"
                          className="text-lg px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full mr-4"
                        >
                          🚀 Login Now
                        </Button>
                        <Button
                          onClick={() => router.push("/")}
                          variant="outline"
                          size="lg"
                          className="text-lg px-10 py-4 border-green-600 text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full"
                        >
                          🏠 Back to Home
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              )}

              {currentStep === 1 && (
                <div className="flex justify-between pt-8 border-t border-green-100">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50 disabled:opacity-50 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? "Processing..." : "Complete Registration"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
