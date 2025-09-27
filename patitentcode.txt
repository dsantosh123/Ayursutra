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
import { ArrowLeft, ArrowRight, User, Heart, Brain, Leaf, Home, CheckCircle, Copy, MapPin, Plus } from "lucide-react"
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
  customConcern: string
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number

  // Lifestyle
  dietType: string
  exerciseFrequency: string
  smokingStatus: string
  alcoholConsumption: string

  location: string
  useCurrentLocation: boolean
}

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Health Assessment", icon: Heart },
  { id: 3, title: "Ayurvedic Profile", icon: Leaf },
  { id: 4, title: "Registration Complete", icon: CheckCircle },
  { id: 5, title: "Find Nearby Clinics", icon: MapPin },
]

export default function PatientRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [locationStep, setLocationStep] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showCustomConcern, setShowCustomConcern] = useState(false)
  const [suggestedClinics, setSuggestedClinics] = useState<any[]>([])
  const [locationError, setLocationError] = useState<string | null>(null)

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
    customConcern: "",
    stressLevel: 5,
    sleepQuality: 5,
    digestiveHealth: 5,
    energyLevel: 5,
    dietType: "",
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholConsumption: "",
    location: "",
    useCurrentLocation: false,
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

    if (currentStep === 3) {
      if (patientData.primaryConcerns.length === 0 && !patientData.customConcern.trim()) {
        errors.push("Please select at least one primary health concern or add a custom concern")
      }
    }

    if (currentStep === 5) {
      if (!patientData.location.trim()) {
        errors.push("Location is required to suggest nearby clinics")
      }
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        { headers: { "Accept": "application/json" } },
      )
      if (!response.ok) return null
      const data = await response.json()
      const address = data?.address || {}
      const parts = [address.suburb, address.city || address.town || address.village, address.state, address.country]
        .filter(Boolean)
        .join(", ")
      return parts || data?.display_name || null
    } catch (e) {
      console.error("Reverse geocoding failed", e)
      return null
    }
  }

  const getCurrentLocation = () => {
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser. Please enter your location manually.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const humanReadable = await reverseGeocode(latitude, longitude)
          if (humanReadable) {
            updatePatientData("location", humanReadable)
            updatePatientData("useCurrentLocation", true)
            // Trigger clinic search automatically after auto-detect
            searchNearbyClinics()
          } else {
            updatePatientData("location", `${latitude}, ${longitude}`)
            updatePatientData("useCurrentLocation", true)
            setLocationError("Could not determine your city from GPS. Using coordinates. You can edit the location above.")
            searchNearbyClinics()
          }
        } catch (e) {
          console.error("Auto-detect handling failed", e)
          setLocationError("Auto-detect failed. Please type your city or address manually.")
        }
      },
      (error) => {
        console.error("Error getting location:", error)
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission was denied. Please enter your location manually.")
        } else {
          setLocationError("Unable to get your current location. Please enter it manually.")
        }
      },
    )
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

  const addCustomConcern = () => {
    if (patientData.customConcern.trim()) {
      const newConcerns = [...patientData.primaryConcerns, patientData.customConcern.trim()]
      updatePatientData("primaryConcerns", newConcerns)
      updatePatientData("customConcern", "")
      setShowCustomConcern(false)
    }
  }

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 4 && registrationComplete && !locationStep) {
      setCurrentStep(5)
      setLocationStep(true)
    }
  }

  const prevStep = () => {
    if (currentStep === 5) {
      setCurrentStep(4)
      setLocationStep(false)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    setValidationErrors([]) // Clear errors when going back
  }

  const generatePatientId = (): string => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 900) + 100 // 3-digit number between 100-999
    return `AYU-${year}-${randomNum}`
  }

  const generateRecommendations = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsLoading(true)

    try {
      const patientId = generatePatientId()

      // Register patient and generate unique ID
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...patientData, patientId }),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedPatientId(patientId)
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

  const searchNearbyClinics = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsLoading(true)
    setLocationError(null)

    try {
      // Mock clinic data - in real app, this would be an API call
      const mockClinics = [
        {
          id: 1,
          name: "AyurVeda Wellness Center",
          address: "123 Health Street, " + patientData.location,
          distance: "2.5 km",
          rating: 4.8,
          specialties: ["Panchakarma", "Herbal Medicine", "Yoga Therapy"],
          doctors: ["Dr. Priya Sharma", "Dr. Rajesh Kumar"],
        },
        {
          id: 2,
          name: "Holistic Ayurveda Clinic",
          address: "456 Wellness Avenue, " + patientData.location,
          distance: "3.2 km",
          rating: 4.6,
          specialties: ["Pulse Diagnosis", "Detox Therapy", "Meditation"],
          doctors: ["Dr. Meera Patel", "Dr. Arjun Singh"],
        },
        {
          id: 3,
          name: "Traditional Ayurveda Hospital",
          address: "789 Ancient Way, " + patientData.location,
          distance: "4.1 km",
          rating: 4.9,
          specialties: ["Chronic Diseases", "Women's Health", "Pediatric Care"],
          doctors: ["Dr. Sunita Gupta", "Dr. Vikram Joshi"],
        },
      ]

      // Simulate API delay
      setTimeout(() => {
        setSuggestedClinics(mockClinics)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Error fetching clinics:", error)
      setIsLoading(false)
      setLocationError("We couldn't fetch clinics right now. Please try again in a moment.")
    }
  }

  const progress = locationStep ? 100 : (currentStep / 4) * 80

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
            {steps.slice(0, locationStep ? 5 : 4).map((step, index) => {
              const Icon = step.icon
              const isActive = locationStep ? currentStep === step.id : currentStep >= step.id
              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${isActive
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
                {React.createElement(steps[locationStep && currentStep === 5 ? 4 : currentStep - 1].icon, {
                  className: "h-6 w-6 text-green-600",
                })}
                {locationStep && currentStep === 5 ? steps[4].title : steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-green-700 text-base">
                {currentStep === 1 && "Please provide your basic information to get started"}
                {currentStep === 2 && "Tell us about your current health status and medical history"}
                {currentStep === 3 && "Help us understand your Ayurvedic constitution and lifestyle"}
                {currentStep === 4 && registrationComplete
                  ? "Your registration is complete!"
                  : "Processing your registration..."}
                {currentStep === 5 && "Enter your location to find nearby Ayurvedic clinics"}
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
                    <Label className="text-green-800 font-medium text-lg">Primary Health Concerns *</Label>
                    <p className="text-sm text-green-600">Select at least one concern that applies to you</p>
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

                    <div className="space-y-3 pt-4 border-t border-green-100">
                      {!showCustomConcern ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCustomConcern(true)}
                          className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50"
                        >
                          <Plus className="h-4 w-4" />
                          Add Custom Health Concern
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            value={patientData.customConcern}
                            onChange={(e) => updatePatientData("customConcern", e.target.value)}
                            placeholder="Enter your specific health concern"
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                          <Button
                            type="button"
                            onClick={addCustomConcern}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowCustomConcern(false)
                              updatePatientData("customConcern", "")
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Display selected concerns */}
                    {patientData.primaryConcerns.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm text-green-700">Selected Concerns:</Label>
                        <div className="flex flex-wrap gap-2">
                          {patientData.primaryConcerns.map((concern, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {concern}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
                          <li>• Provide your location to find nearby clinics</li>
                          <li>• Get personalized clinic recommendations</li>
                          <li>• Book appointments with expert Ayurvedic doctors</li>
                          <li>• Access your health dashboard anytime</li>
                        </ul>
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

              {currentStep === 5 && (
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-green-600 mx-auto" />
                    <h3 className="text-2xl font-bold text-green-900">Find Nearby Ayurvedic Clinics</h3>
                    <p className="text-green-700 max-w-lg mx-auto">
                      Enter your location to discover the best Ayurvedic clinics and doctors in your area
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="location" className="text-green-800 font-medium text-lg">
                        Your Location *
                      </Label>
                      <form
                        className="flex gap-3"
                        onSubmit={(e) => {
                          e.preventDefault()
                          searchNearbyClinics()
                        }}
                      >
                        <Input
                          id="location"
                          value={patientData.location}
                          onChange={(e) => updatePatientData("location", e.target.value)}
                          placeholder="Enter your city, area, or full address"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500 text-lg p-4"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getCurrentLocation}
                          className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50 bg-transparent px-4"
                        >
                          <MapPin className="h-4 w-4" />
                          Auto-detect
                        </Button>
                      </form>
                      {locationError && (
                        <p className="text-sm text-red-600">{locationError}</p>
                      )}
                      <p className="text-sm text-green-600">
                        💡 We'll use this to suggest the most convenient clinics for you
                      </p>
                    </div>

                    {patientData.location && !isLoading && suggestedClinics.length === 0 && (
                      <Button
                        onClick={searchNearbyClinics}
                        size="lg"
                        className="w-full text-lg py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        🔍 Find Nearby Clinics
                      </Button>
                    )}

                    {isLoading && (
                      <div className="text-center space-y-4">
                        <motion.div
                          className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <p className="text-green-700">Searching for nearby clinics...</p>
                      </div>
                    )}

                    {suggestedClinics.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-green-900 text-center">
                          🏥 Recommended Clinics Near You
                        </h4>
                        <div className="space-y-3">
                          {suggestedClinics.map((clinic) => (
                            <div key={clinic.id} className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-green-900">{clinic.name}</h5>
                                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                                  ⭐ {clinic.rating}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{clinic.address}</p>
                              <p className="text-sm text-green-700 mb-2">📍 {clinic.distance} away</p>
                              <div className="text-xs text-gray-500">
                                <p>
                                  <strong>Specialties:</strong> {clinic.specialties.join(", ")}
                                </p>
                                <p>
                                  <strong>Doctors:</strong> {clinic.doctors.join(", ")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-center space-y-4 pt-4">
                          <p className="text-green-700">Great! You can now book appointments with these clinics.</p>
                          <div className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow-md p-6">
                            <div className="flex flex-col gap-4">
                              <Button
                                onClick={goToLogin}
                                size="lg"
                                className="w-full text-lg py-3 bg-gradient-to-r from-green-600 to-green-700 
                 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                🚀 Login to Book Appointment
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => router.push("/recommendations")}
                                size="lg"
                                className="w-full text-lg py-3 border-green-600 text-green-700 hover:bg-green-50"
                              >
                                🌿 View Health Recommendation
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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

                {currentStep === 4 && registrationComplete && !locationStep && (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Find Nearby Clinics
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
