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

const Phone = ({ className }: { className?: string }) => <span className={className}>📱</span>

const IdCard = ({ className }: { className?: string }) => <span className={className}>🆔</span>

const Lock = ({ className }: { className?: string }) => <span className={className}>🔒</span>

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
  password: string
  confirmPassword: string
}

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Contact & OTP", icon: Phone },
  { id: 3, title: "Patient ID", icon: IdCard },
  { id: 4, title: "Success", icon: CheckCircle },
]

export default function PatientRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [phoneOtpCode, setPhoneOtpCode] = useState("")
  const [emailOtpCode, setEmailOtpCode] = useState("")
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false)
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)

const [patientData, setPatientData] = useState({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

  const updatePatientData = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

const validateCurrentStep = () => {
  const errors: string[] = []

  if (currentStep === 1) {
    if (!patientData.firstName.trim()) errors.push("First name is required")
    if (!patientData.lastName.trim()) errors.push("Last name is required")
    if (!patientData.dateOfBirth) errors.push("Date of Birth is required")
    if (!patientData.gender) errors.push("Gender is required")

    // ✅ Password validation here (since password is in Step 1 now)
    if (!patientData.password || !patientData.password.trim()) {
      errors.push("Password is required")
    } else if (patientData.password.length < 6) {
      errors.push("Password must be at least 6 characters long")
    }
  }

  if (currentStep === 2) {
    if (!patientData.phone.trim()) errors.push("Phone number is required")
    if (!patientData.email.trim()) errors.push("Email is required")
  }

  if (errors.length > 0) {
    setValidationErrors(errors)
    return false
  }

  setValidationErrors([])
  return true
}
const nextStep = async () => {
  if (!validateCurrentStep()) return;

  // Password check
  if (currentStep === 1 && patientData.password !== patientData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!completedSteps.includes(currentStep)) {
    setCompletedSteps((prev) => [...prev, currentStep]);
  }

  // ✅ When moving from Step 2 → Step 3, call backend
  if (currentStep === 2) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPatientId(data.patientId); // ✅ backend ID ready for Step 3
        setRegistrationComplete(true);
      } else {
        setValidationErrors([data.error || "Something went wrong."]);
        return;
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      setValidationErrors(["Internal server error"]);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Step 4 is now just a success page
  if (currentStep === 3) {
    setCurrentStep(4);
    return;
  }

  setCurrentStep(currentStep + 1);
};




  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    setValidationErrors([])
  }

  const generatePatientId = (): string => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 900000) + 100000
    return `AYU-${year}-${randomNum.toString().padStart(6, "0")}`
  }

  const sendPhoneOTP = async () => {
    if (!patientData.phone.trim()) {
      setValidationErrors(["Please enter your phone number first"])
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPhoneOtpSent(true)
    setIsLoading(false)
    console.log(`Phone OTP sent to ${patientData.phone}`)
  }

  const sendEmailOTP = async () => {
    if (!patientData.email.trim()) {
      setValidationErrors(["Please enter your email address first"])
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setEmailOtpSent(true)
    setIsLoading(false)
    console.log(`Email OTP sent to ${patientData.email}`)
  }

  const verifyPhoneOTP = async () => {
    if (!phoneOtpCode.trim()) {
      setValidationErrors(["Please enter the phone OTP code"])
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (phoneOtpCode.length === 4) {
      setPhoneOtpVerified(true)
      setValidationErrors([])
      console.log("Phone OTP verified successfully")
    } else {
      setValidationErrors(["Invalid phone OTP code"])
    }
    setIsLoading(false)
  }

  const verifyEmailOTP = async () => {
    if (!emailOtpCode.trim()) {
      setValidationErrors(["Please enter the email OTP code"])
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (emailOtpCode.length === 4) {
      setEmailOtpVerified(true)
      setValidationErrors([])
      console.log("Email OTP verified successfully")
    } else {
      setValidationErrors(["Invalid email OTP code"])
    }
    setIsLoading(false)
  }
const completeRegistration = async () => {
  setIsLoading(true);

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        password: patientData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Registered successfully:", data);

      // ✅ First set the patientId
      setGeneratedPatientId(data.patientId);

      // ✅ THEN move to Step 3 after ID is ready
      setTimeout(() => {
        setCurrentStep(3);
      }, 0);

      setRegistrationComplete(true);
      setValidationErrors([]);
    } else {
      console.error("❌ Registration failed:", data.error);
      setValidationErrors([data.error || "Something went wrong."]);
    }
  } catch (error) {
    console.error("❌ Registration error:", error);
    setValidationErrors(["Internal server error. Please try again later."]);
  } finally {
    setIsLoading(false);
  }
};


  const progress = (currentStep / 4) * 100

  const navigateToStep = (stepId: number) => {
    if (
      completedSteps.includes(stepId) ||
      stepId === currentStep ||
      (stepId === currentStep + 1 && completedSteps.includes(currentStep))
    ) {
      setCurrentStep(stepId)
      setValidationErrors([])
    }
  }

  const navigateToHome = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/home")}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </button>
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
              const isCompleted = completedSteps.includes(step.id)
              const isClickable =
                isCompleted ||
                step.id === currentStep ||
                (step.id === currentStep + 1 && completedSteps.includes(currentStep))

              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <button
                    onClick={() => navigateToStep(step.id)}
                    disabled={!isClickable}
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                        : isActive
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                          : "bg-white border-2 border-green-200 text-green-600"
                    } ${
                      isClickable ? "hover:scale-110 cursor-pointer hover:shadow-lg" : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
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
  {steps[currentStep - 1] && (
    <>
      {React.createElement(steps[currentStep - 1].icon, {
        className: "h-6 w-6 text-green-600",
      })}
      {steps[currentStep - 1].title}
    </>
  )}
</CardTitle>

              <CardDescription className="text-green-700 text-base">
                {currentStep === 1 && "Please provide your basic information to get started"}
{currentStep === 2 && "Enter your contact details and verify both phone and email with OTP"}
{currentStep === 3 && "Your unique Patient ID has been generated"}
{currentStep === 4 && "Your registration is complete!"}

              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
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
        <Select
          value={patientData.gender}
          onValueChange={(value) => updatePatientData("gender", value)}
        >
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

      {/* 🔹 Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-green-800 font-medium">
          Password *
        </Label>
        <Input
          id="password"
          type="password"
          value={patientData.password}
          onChange={(e) => updatePatientData("password", e.target.value)}
          placeholder="Enter password"
          className="border-green-200 focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      {/* 🔹 Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-green-800 font-medium">
          Confirm Password *
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          value={patientData.confirmPassword}
          onChange={(e) => updatePatientData("confirmPassword", e.target.value)}
          placeholder="Confirm password"
          className="border-green-200 focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
    </motion.div>
  )}

              {currentStep === 2 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-green-800 font-medium">Phone Verification</h4>
                      {!phoneOtpSent ? (
                        <Button
                          onClick={sendPhoneOTP}
                          disabled={isLoading || !patientData.phone.trim()}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white w-full"
                        >
                          {isLoading ? "Sending..." : "Send Phone OTP"}
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-green-700 text-sm">
                            OTP sent to {patientData.phone}. Please enter the 4-digit code:
                          </p>
                          <div className="flex gap-3 items-center">
                            <Input
                              value={phoneOtpCode}
                              onChange={(e) => setPhoneOtpCode(e.target.value)}
                              placeholder="Enter 4-digit OTP"
                              maxLength={4}
                              className="flex-1"
                              disabled={phoneOtpVerified}
                            />
                            {!phoneOtpVerified ? (
                              <Button
                                onClick={verifyPhoneOTP}
                                disabled={isLoading || phoneOtpCode.length !== 4}
                                size="sm"
                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                              >
                                {isLoading ? "Verifying..." : "Verify"}
                              </Button>
                            ) : (
                              <span className="text-green-600 font-medium">✅ Verified</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-blue-800 font-medium">Email Verification</h4>
                      {!emailOtpSent ? (
                        <Button
                          onClick={sendEmailOTP}
                          disabled={isLoading || !patientData.email.trim()}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full"
                        >
                          {isLoading ? "Sending..." : "Send Email OTP"}
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-blue-700 text-sm">
                            OTP sent to {patientData.email}. Please enter the 4-digit code:
                          </p>
                          <div className="flex gap-3 items-center">
                            <Input
                              value={emailOtpCode}
                              onChange={(e) => setEmailOtpCode(e.target.value)}
                              placeholder="Enter 4-digit OTP"
                              maxLength={4}
                              className="flex-1"
                              disabled={emailOtpVerified}
                            />
                            {!emailOtpVerified ? (
                              <Button
                                onClick={verifyEmailOTP}
                                disabled={isLoading || emailOtpCode.length !== 4}
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                              >
                                {isLoading ? "Verifying..." : "Verify"}
                              </Button>
                            ) : (
                              <span className="text-blue-600 font-medium">✅ Verified</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

          {currentStep === 3 && ( <motion.div className="text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} > <div className="space-y-4"> <div className="text-6xl">🆔</div> <h3 className="text-2xl font-bold text-green-900">Your Patient ID</h3> <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200"> <p className="text-3xl font-mono font-bold text-green-800 tracking-wider"> {generatedPatientId} </p> </div> <p className="text-green-700 max-w-md mx-auto"> Your unique Patient ID has been generated. This ID will be sent to your email address for future reference. </p> </div> </motion.div> )}

            

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
                        <p className="text-green-700 text-lg max-w-md mx-auto">Finalizing your account setup...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <div className="text-6xl">✅</div>
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-green-900">Registration Successful!</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto">
                          Your account has been created successfully. You can now login with your Patient ID and
                          password.
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
                  )}
                </motion.div>
              )}

              {currentStep < 4 && (
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
                    {"Next Step"}
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
