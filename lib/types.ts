// Shared TypeScript types for the AyurSutra application

export interface User {
  id: number
  email: string
  role: "patient" | "doctor" | "admin"
  createdAt: string
  updatedAt: string
}

export interface Patient {
  id: number
  patientId: string // Format: AYU-YYYY-###
  userId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  height?: number
  weight?: number
  bloodType?: string
  allergies?: string
  currentMedications?: string
  medicalHistory?: string
  constitution: string
  primaryConcerns: string[]
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number
  dietType?: string
  exerciseFrequency?: string
  smokingStatus?: string
  alcoholConsumption?: string
  status: "active" | "inactive" | "new"
  totalSessions: number
  createdAt: string
  updatedAt: string
}

export interface Doctor {
  id: number
  userId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string[]
  experience: number
  rating: number
  totalPatients: number
  availability: string[]
  consultationFee: number
  bio?: string
  imageUrl?: string
  centerId: number
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Center {
  id: number
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email: string
  rating: number
  facilities: string[]
  imageUrl?: string
  operatingHours: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Treatment {
  id: number
  name: string
  description: string
  duration: number
  price: number
  category: string
  benefits: string[]
  contraindications?: string[]
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Package {
  id: number
  name: string
  description: string
  treatments: number[]
  duration: number
  totalPrice: number
  discountedPrice?: number
  category: string
  suitableFor: string[]
  benefits: string[]
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  centerId: number
  packageId?: number
  treatmentIds: number[]
  appointmentDate: string
  startTime: string
  endTime: string
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"
  notes?: string
  totalAmount: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  appointmentId: number
  patientId: number
  amount: number
  paymentMethod: string
  transactionId: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentDate: string
  createdAt: string
  updatedAt: string
}

export interface HealthMetric {
  id: number
  patientId: number
  metricType: "stress" | "sleep" | "digestion" | "energy" | "weight" | "blood_pressure"
  value: number
  unit: string
  recordedDate: string
  notes?: string
  createdAt: string
}

export interface AIRecommendation {
  id: number
  patientId: number
  recommendedPackages: number[]
  confidenceScore: number
  reasoning: string
  factors: string[]
  createdAt: string
}

export interface Feedback {
  id: number
  appointmentId: number
  patientId: number
  doctorId: number
  rating: number
  comment?: string
  treatmentEffectiveness: number
  facilityRating: number
  overallExperience: number
  createdAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface PatientRegistrationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  height?: number
  weight?: number
  bloodType?: string
  allergies?: string
  currentMedications?: string
  medicalHistory?: string
  constitution: string
  primaryConcerns: string[]
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number
  dietType?: string
  exerciseFrequency?: string
  smokingStatus?: string
  alcoholConsumption?: string
}

export interface BookingForm {
  packageId: number
  centerId: number
  doctorId: number
  appointmentDate: string
  startTime: string
  customizations?: string[]
  specialRequests?: string
}

export interface PaymentForm {
  paymentMethod: "card" | "upi" | "netbanking" | "wallet"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  upiId?: string
  bankName?: string
  walletType?: string
}

// Dashboard types
export interface DashboardStats {
  totalPatients: number
  totalAppointments: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  growthRate: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
}

export interface DoctorPatient {
  id: number
  patientId: string
  name: string
  condition: string
  packageName: string
  progressPercentage: number
  lastVisit: string
  nextAppointment?: string
  status: "active" | "completed" | "paused"
  totalSessions: number
  completedSessions: number
}
