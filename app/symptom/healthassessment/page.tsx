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
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface HealthData {
  // Health Info
  height: string
  weight: string
  bloodType: string
  allergies: string
  currentMedications: string
  medicalHistory: string

  // Ayurvedic Assessment
  primaryConcerns: string[]
  customConcern: string
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number
  dietType: string
  exerciseFrequency: string
}

const steps = [
  { id: 1, title: "Health Assessment", icon: "❤️" },
  { id: 2, title: "Ayurvedic Profile", icon: "🌿" },
  { id: 3, title: "Assessment Complete", icon: "✅" },
]

export default function HealthAssessment() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showCustomConcern, setShowCustomConcern] = useState(false)

  const [healthData, setHealthData] = useState<HealthData>({
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    currentMedications: "",
    medicalHistory: "",
    primaryConcerns: [],
    customConcern: "",
    stressLevel: 5,
    sleepQuality: 5,
    digestiveHealth: 5,
    energyLevel: 5,
    dietType: "",
    exerciseFrequency: "",
  })

  const updateHealthData = (field: keyof HealthData, value: any) => {
    setHealthData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateCurrentStep = (): boolean => {
    const errors: string[] = []

    if (currentStep === 2) {
      if (healthData.primaryConcerns.length === 0 && !healthData.customConcern.trim()) {
        errors.push("Please select at least one primary health concern or add a custom concern")
      }
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleConcernToggle = (concern: string) => {
    const currentConcerns = healthData.primaryConcerns
    if (currentConcerns.includes(concern)) {
      updateHealthData(
        "primaryConcerns",
        currentConcerns.filter((c) => c !== concern),
      )
    } else {
      updateHealthData("primaryConcerns", [...currentConcerns, concern])
    }
  }

  const addCustomConcern = () => {
    if (healthData.customConcern.trim()) {
      const newConcerns = [...healthData.primaryConcerns, healthData.customConcern.trim()]
      updateHealthData("primaryConcerns", newConcerns)
      updateHealthData("customConcern", "")
      setShowCustomConcern(false)
    }
  }

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    setValidationErrors([])
  }

  const completeAssessment = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false)
        setCurrentStep(3)
      }, 2000)
    } catch (error) {
      console.error("Assessment error:", error)
      setIsLoading(false)
    }
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
            >
              ← Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              🌿
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">Health Assessment</h1>
            <p className="text-green-700 text-lg">
              Complete your health profile for personalized Ayurvedic recommendations
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
                    <span className="text-xl">{step.icon}</span>
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
                <span className="text-2xl">{steps[currentStep - 1].icon}</span>
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-green-700 text-base">
                {currentStep === 1 && "Tell us about your current health status and medical history"}
                {currentStep === 2 && "Help us understand your Ayurvedic constitution and lifestyle"}
                {currentStep === 3 && "Your health assessment is complete!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Step 1: Health Assessment */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        value={healthData.height}
                        onChange={(e) => updateHealthData("height", e.target.value)}
                        placeholder="Enter height in cm"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        value={healthData.weight}
                        onChange={(e) => updateHealthData("weight", e.target.value)}
                        placeholder="Enter weight in kg"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={healthData.bloodType}
                      onValueChange={(value) => updateHealthData("bloodType", value)}
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
                      value={healthData.allergies}
                      onChange={(e) => updateHealthData("allergies", e.target.value)}
                      placeholder="List any known allergies"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="currentMedications"
                      value={healthData.currentMedications}
                      onChange={(e) => updateHealthData("currentMedications", e.target.value)}
                      placeholder="List current medications and supplements"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={healthData.medicalHistory}
                      onChange={(e) => updateHealthData("medicalHistory", e.target.value)}
                      placeholder="Describe any significant medical history"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Ayurvedic Profile */}
              {currentStep === 2 && (
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
                            checked={healthData.primaryConcerns.includes(concern)}
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
                          ➕ Add Custom Health Concern
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            value={healthData.customConcern}
                            onChange={(e) => updateHealthData("customConcern", e.target.value)}
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
                              updateHealthData("customConcern", "")
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Display selected concerns */}
                    {healthData.primaryConcerns.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm text-green-700">Selected Concerns:</Label>
                        <div className="flex flex-wrap gap-2">
                          {healthData.primaryConcerns.map((concern, index) => (
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
                        value={[healthData.stressLevel]}
                        onValueChange={(value) => updateHealthData("stressLevel", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Low</span>
                        <span>Current: {healthData.stressLevel}</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Sleep Quality (1-10)</Label>
                      <Slider
                        value={[healthData.sleepQuality]}
                        onValueChange={(value) => updateHealthData("sleepQuality", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Poor</span>
                        <span>Current: {healthData.sleepQuality}</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Digestive Health (1-10)</Label>
                      <Slider
                        value={[healthData.digestiveHealth]}
                        onValueChange={(value) => updateHealthData("digestiveHealth", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Poor</span>
                        <span>Current: {healthData.digestiveHealth}</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Energy Level (1-10)</Label>
                      <Slider
                        value={[healthData.energyLevel]}
                        onValueChange={(value) => updateHealthData("energyLevel", value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Low</span>
                        <span>Current: {healthData.energyLevel}</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Diet Type</Label>
                      <Select
                        value={healthData.dietType}
                        onValueChange={(value) => updateHealthData("dietType", value)}
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
                        value={healthData.exerciseFrequency}
                        onValueChange={(value) => updateHealthData("exerciseFrequency", value)}
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

              {/* Step 3: Assessment Complete */}
              {currentStep === 3 && (
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
                        <h3 className="text-2xl font-semibold text-green-900">🧠 Processing Assessment...</h3>
                        <p className="text-green-700 text-lg max-w-md mx-auto">
                          Analyzing your health profile and generating personalized recommendations...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <span className="text-8xl">✅</span>
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-green-900">Assessment Complete!</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto">
                          Your health profile has been analyzed. View your personalized Ayurvedic recommendations.
                        </p>
                      </div>

                      <div className="max-w-md mx-auto">
                        <Button
                          onClick={() => router.push("/recommendations")}
                          size="lg"
                          className="w-full text-lg py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full"
                        >
                          🌿 View Health Recommendations
                        </Button>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg border border-green-200 max-w-lg mx-auto">
                        <h5 className="font-semibold text-green-900 mb-2">Your Recommendations Include:</h5>
                        <ul className="text-sm text-green-800 space-y-1 text-left">
                          <li>• Personalized Ayurvedic treatment plan</li>
                          <li>• Dietary and lifestyle recommendations</li>
                          <li>• Herbal medicine suggestions</li>
                          <li>• Suitable clinic and practitioner matches</li>
                        </ul>
                      </div>
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
                  ← Previous Step
                </Button>

                {currentStep < 2 && (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Next Step →
                  </Button>
                )}

                {currentStep === 2 && (
                  <Button
                    onClick={completeAssessment}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Complete Assessment →
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
