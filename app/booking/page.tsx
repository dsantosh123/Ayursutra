"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Star,
  Clock,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle,
  Leaf,
  Phone,
  Mail,
  Navigation,
  Loader2,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface Treatment {
  id: string
  name: string
  duration: string
  price: number
  included: boolean
  optional?: boolean
}

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  reviews: number
  image: string
  languages: string[]
  availability: string[]
}

interface Center {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  reviews: number
  facilities: string[]
  doctors: Doctor[]
  coordinates?: { lat: number; lng: number }
}

interface TimeSlot {
  time: string
  available: boolean
  viewingCount: number
}

export default function BookingFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")

  const [currentStep, setCurrentStep] = useState(0) // Start with location step
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [viewingCounts, setViewingCounts] = useState<{ [key: string]: number }>({})

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationInput, setLocationInput] = useState("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [nearbyCenters, setNearbyCenters] = useState<Center[]>([])

  // Mock data based on package selection
  const packageTreatments: Treatment[] = [
    { id: "abhyanga", name: "Abhyanga (Full Body Massage)", duration: "60 min", price: 3500, included: true },
    { id: "shirodhara", name: "Shirodhara", duration: "45 min", price: 4000, included: true },
    { id: "meditation", name: "Guided Meditation", duration: "30 min", price: 1500, included: true },
    { id: "nasya", name: "Nasya Therapy", duration: "30 min", price: 2000, included: false, optional: true },
    { id: "karna-purana", name: "Karna Purana", duration: "20 min", price: 1200, included: false, optional: true },
    {
      id: "udvartana",
      name: "Udvartana (Herbal Scrub)",
      duration: "45 min",
      price: 2500,
      included: false,
      optional: true,
    },
  ]

  const allCenters: Center[] = [
    {
      id: "center-1",
      name: "AyurSutra Wellness Center - Koramangala",
      address: "123 Koramangala, Bangalore, Karnataka 560034",
      distance: 2.5,
      rating: 4.8,
      reviews: 324,
      facilities: ["Parking", "AC Rooms", "Herbal Pharmacy", "Consultation Rooms"],
      coordinates: { lat: 12.9352, lng: 77.6245 },
      doctors: [
        {
          id: "dr-1",
          name: "Dr. Priya Sharma",
          specialization: "Panchakarma Specialist",
          experience: 12,
          rating: 4.9,
          reviews: 156,
          image: "/female-doctor.png",
          languages: ["English", "Hindi", "Kannada"],
          availability: ["Morning", "Evening"],
        },
        {
          id: "dr-2",
          name: "Dr. Rajesh Kumar",
          specialization: "Ayurvedic Physician",
          experience: 8,
          rating: 4.7,
          reviews: 89,
          image: "/male-doctor.png",
          languages: ["English", "Hindi"],
          availability: ["Morning", "Afternoon"],
        },
      ],
    },
    {
      id: "center-2",
      name: "AyurSutra Healing Center - Indiranagar",
      address: "456 Indiranagar, Bangalore, Karnataka 560038",
      distance: 4.2,
      rating: 4.6,
      reviews: 198,
      facilities: ["Valet Parking", "Premium Rooms", "Yoga Studio", "Cafe"],
      coordinates: { lat: 12.9719, lng: 77.6412 },
      doctors: [
        {
          id: "dr-3",
          name: "Dr. Meera Nair",
          specialization: "Stress Management Expert",
          experience: 15,
          rating: 4.8,
          reviews: 203,
          image: "/female-ayurveda-doctor.jpg",
          languages: ["English", "Malayalam", "Tamil"],
          availability: ["Morning", "Evening"],
        },
      ],
    },
    {
      id: "center-3",
      name: "AyurSutra Premium Center - Whitefield",
      address: "789 Whitefield, Bangalore, Karnataka 560066",
      distance: 8.5,
      rating: 4.9,
      reviews: 412,
      facilities: ["Luxury Suites", "Spa Services", "Organic Cafe", "Meditation Garden"],
      coordinates: { lat: 12.9698, lng: 77.75 },
      doctors: [
        {
          id: "dr-4",
          name: "Dr. Arjun Patel",
          specialization: "Detox Specialist",
          experience: 10,
          rating: 4.8,
          reviews: 178,
          image: "/male-doctor.png",
          languages: ["English", "Hindi", "Gujarati"],
          availability: ["Morning", "Afternoon", "Evening"],
        },
      ],
    },
    {
      id: "center-4",
      name: "AyurSutra Traditional Center - Jayanagar",
      address: "321 Jayanagar, Bangalore, Karnataka 560011",
      distance: 6.2,
      rating: 4.7,
      reviews: 289,
      facilities: ["Traditional Rooms", "Herbal Garden", "Library", "Consultation Rooms"],
      coordinates: { lat: 12.9279, lng: 77.5937 },
      doctors: [
        {
          id: "dr-5",
          name: "Dr. Lakshmi Iyer",
          specialization: "Women's Health Expert",
          experience: 18,
          rating: 4.9,
          reviews: 234,
          image: "/female-ayurveda-doctor.jpg",
          languages: ["English", "Tamil", "Kannada"],
          availability: ["Morning", "Evening"],
        },
      ],
    },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true, viewingCount: 3 },
    { time: "10:00 AM", available: true, viewingCount: 7 },
    { time: "11:00 AM", available: false, viewingCount: 0 },
    { time: "02:00 PM", available: true, viewingCount: 2 },
    { time: "03:00 PM", available: true, viewingCount: 5 },
    { time: "04:00 PM", available: true, viewingCount: 1 },
    { time: "05:00 PM", available: false, viewingCount: 0 },
  ]

  const searchLocation = async () => {
    if (!locationInput.trim()) return

    setIsLoadingLocation(true)

    try {
      // Mock geocoding based on common Indian cities
      const cityCoordinates = {
        bangalore: { lat: 12.9716, lng: 77.5946 },
        mumbai: { lat: 19.076, lng: 72.8777 },
        delhi: { lat: 28.7041, lng: 77.1025 },
        chennai: { lat: 13.0827, lng: 80.2707 },
        hyderabad: { lat: 17.385, lng: 78.4867 },
        pune: { lat: 18.5204, lng: 73.8567 },
        kolkata: { lat: 22.5726, lng: 88.3639 },
      }

      const searchTerm = locationInput.toLowerCase()
      let foundLocation = null

      // Check if input matches any city
      for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (searchTerm.includes(city)) {
          foundLocation = coords
          break
        }
      }

      // Default to Bangalore if no match found
      const location = foundLocation || { lat: 12.9716, lng: 77.5946 }

      setUserLocation(location)
      findNearbyCenters(location)
      setIsLoadingLocation(false)
    } catch (error) {
      console.error("Error searching location:", error)
      setIsLoadingLocation(false)
    }
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          findNearbyCenters(location)
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Geolocation error:", error)
          setIsLoadingLocation(false)

          // Better fallback handling
          alert("Unable to get your location. Please enter your city manually or allow location access.")

          // Fallback to Bangalore coordinates
          const fallbackLocation = { lat: 12.9716, lng: 77.5946 }
          setUserLocation(fallbackLocation)
          findNearbyCenters(fallbackLocation)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      )
    } else {
      setIsLoadingLocation(false)
      alert("Geolocation is not supported by this browser. Please enter your location manually.")
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const findNearbyCenters = (location: { lat: number; lng: number }) => {
    const centersWithDistance = allCenters
      .map((center) => ({
        ...center,
        distance: center.coordinates
          ? calculateDistance(location.lat, location.lng, center.coordinates.lat, center.coordinates.lng)
          : Math.random() * 10 + 1, // Fallback random distance
      }))
      .sort((a, b) => a.distance - b.distance)

    setNearbyCenters(centersWithDistance)
  }

  useEffect(() => {
    // Initialize selected treatments with included ones
    const includedTreatments = packageTreatments.filter((t) => t.included).map((t) => t.id)
    setSelectedTreatments(includedTreatments)

    // Simulate real-time viewing count updates
    const interval = setInterval(() => {
      setViewingCounts((prev) => {
        const newCounts = { ...prev }
        timeSlots.forEach((slot) => {
          if (slot.available) {
            newCounts[slot.time] = Math.max(
              0,
              (newCounts[slot.time] || slot.viewingCount) + Math.floor(Math.random() * 3) - 1,
            )
          }
        })
        return newCounts
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleTreatment = (treatmentId: string) => {
    const treatment = packageTreatments.find((t) => t.id === treatmentId)
    if (treatment?.included) return // Can't remove included treatments

    setSelectedTreatments((prev) =>
      prev.includes(treatmentId) ? prev.filter((id) => id !== treatmentId) : [...prev, treatmentId],
    )
  }

  const calculateTotal = () => {
    return packageTreatments.filter((t) => selectedTreatments.includes(t.id)).reduce((total, t) => total + t.price, 0)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const proceedToPayment = async () => {
    try {
      const patientData = JSON.parse(localStorage.getItem("user") || "{}")
      const selectedCenterData = nearbyCenters.find((c) => c.id === selectedCenter)
      const selectedDoctorData = selectedCenterData?.doctors.find((d) => d.id === selectedDoctor)

      const appointmentData = {
        patientId: localStorage.getItem("userId") || "AYU-2024-001",
        patientName: patientData.name || "Patient",
        doctorId: selectedDoctor === "dr-1" ? 1 : selectedDoctor === "dr-2" ? 2 : 3,
        doctorName: selectedDoctorData?.name || "Dr. Priya Sharma",
        centerName: selectedCenterData?.name || "AyurSutra Wellness Center",
        date: selectedDate?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
        time: selectedTime || "09:00 AM",
        treatments: packageTreatments.filter((t) => selectedTreatments.includes(t.id)).map((t) => t.name),
        totalAmount: calculateTotal(),
        status: "confirmed",
        roomNumber: `Room ${Math.floor(Math.random() * 10) + 1}`,
        condition: "Stress Management",
        location: locationInput || "Current Location",
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        // Store booking details for payment page
        localStorage.setItem("bookingDetails", JSON.stringify(appointmentData))
        router.push("/payment")
      } else {
        alert("Failed to create appointment. Please try again.")
      }
    } catch (error) {
      console.error("Error creating appointment:", error)
      alert("Failed to create appointment. Please try again.")
    }
  }

  const steps = [
    "Find Nearby Centers",
    "Customize Package",
    "Select Center",
    "Choose Doctor & Time",
    "Review & Confirm",
  ]

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground">Find nearby centers and schedule your personalized treatment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 md:space-x-4 min-w-max">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > index
                      ? "bg-accent text-accent-foreground"
                      : currentStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > index ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={`ml-2 text-xs md:text-sm ${currentStep >= index ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 md:mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 0: Location Selection */}
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    Find Nearby AyurSutra Centers
                  </CardTitle>
                  <CardDescription>
                    Let us suggest the best Ayurveda centers near your location for convenient treatment access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={getCurrentLocation}
                      disabled={isLoadingLocation}
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                      variant="outline"
                    >
                      {isLoadingLocation ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <Navigation className="h-6 w-6" />
                      )}
                      <span className="font-medium">Use Current Location</span>
                      <span className="text-xs text-muted-foreground">Get GPS location automatically</span>
                    </Button>

                    <div className="space-y-2">
                      <Input
                        placeholder="Enter your area, city or pincode"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                      />
                      <Button
                        onClick={searchLocation}
                        disabled={isLoadingLocation || !locationInput.trim()}
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        {isLoadingLocation ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-2" />
                        )}
                        Search Location
                      </Button>
                    </div>
                  </div>

                  {nearbyCenters.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">🎯 AI Recommended Centers Near You</h3>
                      <div className="grid gap-4">
                        {nearbyCenters.slice(0, 3).map((center, index) => (
                          <Card key={center.id} className="border-accent/20">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    {index === 0 && <Badge className="bg-accent text-accent-foreground">Closest</Badge>}
                                    {center.rating >= 4.8 && <Badge variant="outline">⭐ Top Rated</Badge>}
                                  </div>
                                  <h4 className="font-semibold text-foreground">{center.name}</h4>
                                  <p className="text-sm text-muted-foreground">{center.address}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-accent">
                                    {center.distance.toFixed(1)} km away
                                  </div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    <span>{center.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {center.facilities.slice(0, 3).map((facility) => (
                                  <Badge key={facility} variant="outline" className="text-xs">
                                    {facility}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <strong>{center.doctors.length}</strong> specialist doctors available
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">🤖 AI Recommendation</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on your location and treatment needs, we recommend{" "}
                          <strong>{nearbyCenters[0]?.name}</strong> for optimal convenience and excellent patient
                          reviews. This center specializes in your selected treatments and has the highest success rate
                          in your area.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 1: Customize Package */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customize Your Treatment Package</CardTitle>
                  <CardDescription>Modify your selected treatments or add optional therapies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {packageTreatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className={`border rounded-lg p-4 ${
                        selectedTreatments.includes(treatment.id) ? "border-accent bg-accent/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedTreatments.includes(treatment.id)}
                            onCheckedChange={() => toggleTreatment(treatment.id)}
                            disabled={treatment.included}
                          />
                          <div>
                            <h4 className="font-medium text-foreground">{treatment.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {treatment.duration}
                              </span>
                              {treatment.included && <Badge variant="secondary">Included</Badge>}
                              {treatment.optional && <Badge variant="outline">Optional</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{treatment.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Center */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Select Treatment Center</h2>
                {nearbyCenters.map((center) => (
                  <Card
                    key={center.id}
                    className={`cursor-pointer transition-all ${
                      selectedCenter === center.id ? "ring-2 ring-accent border-accent" : "hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedCenter(center.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{center.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{center.address}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-accent font-medium">
                              {center.distance.toFixed(1)} km away
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{center.rating}</span>
                            <span className="text-sm text-muted-foreground">({center.reviews})</span>
                          </div>
                          {selectedCenter === center.id && <CheckCircle className="h-5 w-5 text-accent mt-2" />}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Facilities</h4>
                          <div className="flex flex-wrap gap-2">
                            {center.facilities.map((facility) => (
                              <Badge key={facility} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Available Doctors</h4>
                          <div className="flex gap-2">
                            {center.doctors.map((doctor) => (
                              <div key={doctor.id} className="flex items-center gap-2">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={doctor.image || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {doctor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{doctor.name}</div>
                                  <div className="text-xs text-muted-foreground">{doctor.specialization}</div>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span>{doctor.experience} years experience</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500" />
                                      <span>
                                        {doctor.rating} ({doctor.reviews} reviews)
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    {doctor.languages.map((lang) => (
                                      <Badge key={lang} variant="outline" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 3: Choose Doctor & Time */}
            {currentStep === 3 && selectedCenter && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">Select Doctor</h2>
                  <div className="grid gap-4">
                    {nearbyCenters
                      .find((c) => c.id === selectedCenter)
                      ?.doctors.map((doctor) => (
                        <Card
                          key={doctor.id}
                          className={`cursor-pointer transition-all ${
                            selectedDoctor === doctor.id ? "ring-2 ring-accent border-accent" : "hover:shadow-lg"
                          }`}
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={doctor.image || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {doctor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                                  <p className="text-muted-foreground">{doctor.specialization}</p>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span>{doctor.experience} years experience</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500" />
                                      <span>
                                        {doctor.rating} ({doctor.reviews} reviews)
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    {doctor.languages.map((lang) => (
                                      <Badge key={lang} variant="outline" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {selectedDoctor === doctor.id && <CheckCircle className="h-5 w-5 text-accent" />}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {selectedDoctor && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">Select Date & Time</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Choose Date</h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Available Time Slots</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className="h-auto p-3 flex flex-col items-center"
                            >
                              <span className="font-medium">{slot.time}</span>
                              {slot.available && (
                                <div className="flex items-center gap-1 text-xs mt-1 opacity-70">
                                  <Eye className="h-3 w-3" />
                                  <span>{viewingCounts[slot.time] || slot.viewingCount} viewing</span>
                                </div>
                              )}
                              {!slot.available && <span className="text-xs mt-1 opacity-70">Booked</span>}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                  <CardDescription>Please review all details before confirming</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Selected Treatments</h3>
                    <div className="space-y-2">
                      {packageTreatments
                        .filter((t) => selectedTreatments.includes(t.id))
                        .map((treatment) => (
                          <div
                            key={treatment.id}
                            className="flex justify-between items-center py-2 border-b border-border"
                          >
                            <div>
                              <span className="font-medium">{treatment.name}</span>
                              <span className="text-sm text-muted-foreground ml-2">({treatment.duration})</span>
                            </div>
                            <span className="font-medium">₹{treatment.price.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Appointment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{locationInput || "Current Location"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Center:</span>
                        <span className="font-medium">{nearbyCenters.find((c) => c.id === selectedCenter)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="font-medium">
                          {
                            nearbyCenters
                              .find((c) => c.id === selectedCenter)
                              ?.doctors.find((d) => d.id === selectedDoctor)?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold text-accent">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-accent" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStep > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Selected Treatments</h4>
                    <div className="space-y-1 text-sm">
                      {packageTreatments
                        .filter((t) => selectedTreatments.includes(t.id))
                        .map((treatment) => (
                          <div key={treatment.id} className="flex justify-between">
                            <span className="text-muted-foreground">{treatment.name}</span>
                            <span>₹{treatment.price.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {currentStep > 0 && <Separator />}

                {currentStep > 0 && (
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span className="text-lg text-accent">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                )}

                {currentStep === 4 && (
                  <Button onClick={proceedToPayment} className="w-full" size="lg">
                    Proceed to Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>support@ayursutra.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentStep < 4 && (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 0 && nearbyCenters.length === 0) ||
                (currentStep === 2 && !selectedCenter) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTime))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
