"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, Heart, Brain, Leaf, Home, CheckCircle, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import React from "react"

interface PatientData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string

  // Health Info
  height: string
  weight: string
  bloodType: string
  allergies: string
  currentMedications: string
  medicalHistory: string

  // Ayurvedic Assessment
  constitution: string
  primaryConcerns: string[]
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number

  // Lifestyle
  dietType: string
  exerciseFrequency: string
  smokingStatus: string
  alcoholConsumption: string
}

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Health Assessment", icon: Heart },
  { id: 3, title: "Ayurvedic Profile", icon: Leaf },
  { id: 4, title: "Registration Complete", icon: CheckCircle },
]

export default function PatientRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    currentMedications: "",
    medicalHistory: "",
    constitution: "",
    primaryConcerns: [],
    stressLevel: 5,
    sleepQuality: 5,
    digestiveHealth: 5,
    energyLevel: 5,
    dietType: "",
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholConsumption: "",
  })

  const updatePatientData = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConcernToggle = (concern: string) => {
    const currentConcerns = patientData.primaryConcerns
    if (currentConcerns.includes(concern)) {
      updatePatientData(
        "primaryConcerns",
        currentConcerns.filter((c) => c !== concern),
      )
    } else {
      updatePatientData("primaryConcerns", [...currentConcerns, concern])
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateRecommendations = async () => {
    setIsLoading(true)

    try {
      // Register patient and generate unique ID
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedPatientId(data.patientId)
        setRegistrationComplete(true)
        setIsLoading(false)
      } else {
        throw new Error(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      // Handle error appropriately
    }
  }

  const copyPatientId = () => {
    navigator.clipboard.writeText(generatedPatientId)
  }

  const goToLogin = () => {
    router.push("/login")
  }

  const progress = (currentStep / 4) * 100

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
            <p className="text-green-700 text-lg">
              Help us understand your health needs for personalized Ayurvedic care
            </p>
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
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                        : "bg-white border-2 border-green-200 text-green-600"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-sm font-medium ${currentStep >= step.id ? "text-green-900" : "text-green-600"}`}
                  >
                    {step.title}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-green-200 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-amber-50 border-b border-green-100">
              <CardTitle className="text-2xl text-green-900 flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 text-green-600" })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-green-700 text-base">
                {currentStep === 1 && "Please provide your basic information to get started"}
                {currentStep === 2 && "Tell us about your current health status and medical history"}
                {currentStep === 3 && "Help us understand your Ayurvedic constitution and lifestyle"}
                {currentStep === 4 && registrationComplete
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

              {/* Step 2: Health Assessment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        value={patientData.height}
                        onChange={(e) => updatePatientData("height", e.target.value)}
                        placeholder="Enter height in cm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        value={patientData.weight}
                        onChange={(e) => updatePatientData("weight", e.target.value)}
                        placeholder="Enter weight in kg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={patientData.bloodType}
                      onValueChange={(value) => updatePatientData("bloodType", value)}
                    >
                      <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={patientData.allergies}
                      onChange={(e) => updatePatientData("allergies", e.target.value)}
                      placeholder="List any known allergies"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="currentMedications"
                      value={patientData.currentMedications}
                      onChange={(e) => updatePatientData("currentMedications", e.target.value)}
                      placeholder="List current medications and supplements"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={patientData.medicalHistory}
                      onChange={(e) => updatePatientData("medicalHistory", e.target.value)}
                      placeholder="Describe any significant medical history"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Ayurvedic Profile */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Primary Health Concerns</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Stress & Anxiety",
                        "Digestive Issues",
                        "Sleep Problems",
                        "Joint Pain",
                        "Skin Conditions",
                        "Weight Management",
                        "Fatigue",
                        "Headaches",
                        "Respiratory Issues",
                      ].map((concern) => (
                        <div key={concern} className="flex items-center space-x-2">
                          <Checkbox
                            id={concern}
                            checked={patientData.primaryConcerns.includes(concern)}
                            onCheckedChange={() => handleConcernToggle(concern)}
                          />
                          <Label htmlFor={concern} className="text-sm">
                            {concern}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Stress Level (1-10)</Label>
                      <Slider
                        value={[patientData.stressLevel]}
                        onValueChange={(value) => updatePatientData("stressLevel", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Low</span>
                        <span>Current: {patientData.stressLevel}</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Sleep Quality (1-10)</Label>
                      <Slider
                        value={[patientData.sleepQuality]}
                        onValueChange={(value) => updatePatientData("sleepQuality", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Poor</span>
                        <span>Current: {patientData.sleepQuality}</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Digestive Health (1-10)</Label>
                      <Slider
                        value={[patientData.digestiveHealth]}
                        onValueChange={(value) => updatePatientData("digestiveHealth", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Poor</span>
                        <span>Current: {patientData.digestiveHealth}</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Energy Level (1-10)</Label>
                      <Slider
                        value={[patientData.energyLevel]}
                        onValueChange={(value) => updatePatientData("energyLevel", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Low</span>
                        <span>Current: {patientData.energyLevel}</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Diet Type</Label>
                      <Select
                        value={patientData.dietType}
                        onValueChange={(value) => updatePatientData("dietType", value)}
                      >
                        <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Exercise Frequency</Label>
                      <Select
                        value={patientData.exerciseFrequency}
                        onValueChange={(value) => updatePatientData("exerciseFrequency", value)}
                      >
                        <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="3-4-times">3-4 times per week</SelectItem>
                          <SelectItem value="1-2-times">1-2 times per week</SelectItem>
                          <SelectItem value="rarely">Rarely</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Registration Complete */}
              {currentStep === 4 && (
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
                        <CheckCircle className="h-20 w-20 text-green-600 mx-auto" />
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-green-900">🎉 Registration Successful!</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto">
                          Welcome to AyurSutra! Your unique Patient ID has been generated.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-amber-50 p-8 rounded-xl border-2 border-green-200 max-w-md mx-auto">
                        <h4 className="text-lg font-semibold text-green-900 mb-4">Your Unique Patient ID</h4>
                        <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg border border-green-200">
                          <span className="text-2xl font-bold text-green-800 font-mono">{generatedPatientId}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyPatientId}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-green-700 mt-3">
                          💡 Save this ID - you'll need it to log in to your account
                        </p>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 max-w-lg mx-auto">
                        <h5 className="font-semibold text-blue-900 mb-2">Next Steps:</h5>
                        <ul className="text-sm text-blue-800 space-y-1 text-left">
                          <li>• Use your Patient ID and password to log in</li>
                          <li>• Complete your health assessment</li>
                          <li>• Get AI-powered treatment recommendations</li>
                          <li>• Book appointments with our expert doctors</li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={goToLogin}
                          size="lg"
                          className="text-lg px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full"
                        >
                          🚀 Login to Your Account
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => router.push("/recommendations")}
                          size="lg"
                          className="text-lg px-8 py-4 border-green-600 text-green-700 hover:bg-green-50 rounded-full"
                        >
                          🌿 View Recommendations
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <Brain className="h-20 w-20 text-green-600 mx-auto" />
                      </motion.div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-green-900">🌿 Complete Your Registration</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto">
                          Click below to complete your registration and receive your unique Patient ID
                        </p>
                      </div>
                      <Button
                        onClick={generateRecommendations}
                        size="lg"
                        className="text-lg px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full"
                      >
                        🎯 Complete Registration
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

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

                {currentStep < 4 && (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
