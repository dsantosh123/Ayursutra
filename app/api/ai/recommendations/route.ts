import { type NextRequest, NextResponse } from "next/server"

interface PatientProfile {
  constitution: string
  primaryConcerns: string[]
  stressLevel: number
  sleepQuality: number
  digestiveHealth: number
  energyLevel: number
  age: number
  gender: string
}

interface TreatmentPackage {
  id: string
  name: string
  description: string
  targetConditions: string[]
  successRate: number
  duration: string
  price: number
}

// Mock treatment packages
const treatmentPackages: TreatmentPackage[] = [
  {
    id: "stress-relief",
    name: "Stress Relief & Mental Wellness",
    description: "Comprehensive package targeting stress, anxiety, and mental fatigue",
    targetConditions: ["stress", "anxiety", "sleep problems", "mental fatigue"],
    successRate: 94,
    duration: "3 weeks",
    price: 9000,
  },
  {
    id: "digestive-wellness",
    name: "Digestive Health Restoration",
    description: "Targeted treatments for improving digestive function and gut health",
    targetConditions: ["digestive issues", "acidity", "IBS", "poor appetite"],
    successRate: 89,
    duration: "2 weeks",
    price: 13000,
  },
  {
    id: "complete-panchakarma",
    name: "Complete Panchakarma Program",
    description: "Full traditional Panchakarma for comprehensive health transformation",
    targetConditions: ["complete detox", "chronic conditions", "rejuvenation"],
    successRate: 96,
    duration: "3 weeks",
    price: 25000,
  },
  {
    id: "energy-vitality",
    name: "Energy & Vitality Boost",
    description: "Treatments focused on increasing energy levels and overall vitality",
    targetConditions: ["fatigue", "low energy", "weakness", "immunity"],
    successRate: 91,
    duration: "2 weeks",
    price: 11000,
  },
]

function calculatePackageScore(patientProfile: PatientProfile, package_: TreatmentPackage): number {
  let score = 0

  // Base score from success rate
  score += package_.successRate * 0.3

  // Constitution-based scoring
  if (patientProfile.constitution.includes("Vata")) {
    if (package_.id === "stress-relief" || package_.id === "energy-vitality") {
      score += 20
    }
  }
  if (patientProfile.constitution.includes("Pitta")) {
    if (package_.id === "stress-relief" || package_.id === "complete-panchakarma") {
      score += 15
    }
  }
  if (patientProfile.constitution.includes("Kapha")) {
    if (package_.id === "energy-vitality" || package_.id === "digestive-wellness") {
      score += 15
    }
  }

  // Health metrics scoring
  if (patientProfile.stressLevel >= 7 && package_.id === "stress-relief") {
    score += 25
  }
  if (patientProfile.sleepQuality <= 5 && package_.id === "stress-relief") {
    score += 20
  }
  if (patientProfile.digestiveHealth <= 6 && package_.id === "digestive-wellness") {
    score += 25
  }
  if (patientProfile.energyLevel <= 5 && package_.id === "energy-vitality") {
    score += 25
  }

  // Age-based adjustments
  if (patientProfile.age > 50 && package_.id === "complete-panchakarma") {
    score += 10
  }

  // Primary concerns matching
  patientProfile.primaryConcerns.forEach((concern) => {
    const concernLower = concern.toLowerCase()
    package_.targetConditions.forEach((condition) => {
      if (condition.toLowerCase().includes(concernLower) || concernLower.includes(condition.toLowerCase())) {
        score += 15
      }
    })
  })

  return Math.min(score, 100) // Cap at 100
}

export async function POST(request: NextRequest) {
  try {
    const patientProfile: PatientProfile = await request.json()

    // Validate required fields
    if (!patientProfile.constitution || !patientProfile.primaryConcerns) {
      return NextResponse.json({ error: "Patient constitution and primary concerns are required" }, { status: 400 })
    }

    // Calculate scores for each package
    const packageScores = treatmentPackages.map((package_) => ({
      ...package_,
      aiConfidence: calculatePackageScore(patientProfile, package_),
      reasoning: generateReasoning(patientProfile, package_),
    }))

    // Sort by confidence score
    packageScores.sort((a, b) => b.aiConfidence - a.aiConfidence)

    // Generate overall analysis
    const analysis = {
      dominantConstitution: patientProfile.constitution,
      primaryFocusAreas: identifyFocusAreas(patientProfile),
      recommendedDuration: calculateRecommendedDuration(patientProfile),
      riskFactors: identifyRiskFactors(patientProfile),
    }

    return NextResponse.json({
      success: true,
      recommendations: packageScores,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI recommendations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateReasoning(profile: PatientProfile, package_: TreatmentPackage): string {
  const reasons = []

  if (profile.stressLevel >= 7 && package_.id === "stress-relief") {
    reasons.push("High stress levels indicate need for stress management")
  }
  if (profile.sleepQuality <= 5 && package_.id === "stress-relief") {
    reasons.push("Poor sleep quality can be improved with relaxation therapies")
  }
  if (profile.digestiveHealth <= 6 && package_.id === "digestive-wellness") {
    reasons.push("Digestive health scores suggest need for gut-focused treatments")
  }
  if (profile.energyLevel <= 5 && package_.id === "energy-vitality") {
    reasons.push("Low energy levels indicate need for vitality-boosting treatments")
  }

  if (profile.constitution.includes("Vata") && package_.id === "stress-relief") {
    reasons.push("Vata constitution benefits from calming and grounding therapies")
  }

  return reasons.join(". ") || "Based on overall health profile and constitution analysis"
}

function identifyFocusAreas(profile: PatientProfile): string[] {
  const areas = []

  if (profile.stressLevel >= 7) areas.push("Stress Management")
  if (profile.sleepQuality <= 5) areas.push("Sleep Quality")
  if (profile.digestiveHealth <= 6) areas.push("Digestive Health")
  if (profile.energyLevel <= 5) areas.push("Energy & Vitality")

  return areas.length > 0 ? areas : ["General Wellness"]
}

function calculateRecommendedDuration(profile: PatientProfile): string {
  const severityScore = 10 - profile.stressLevel + profile.sleepQuality + profile.digestiveHealth + profile.energyLevel

  if (severityScore <= 20) return "4-6 weeks"
  if (severityScore <= 30) return "3-4 weeks"
  return "2-3 weeks"
}

function identifyRiskFactors(profile: PatientProfile): string[] {
  const risks = []

  if (profile.stressLevel >= 8) risks.push("High stress levels")
  if (profile.sleepQuality <= 4) risks.push("Severe sleep issues")
  if (profile.digestiveHealth <= 4) risks.push("Poor digestive health")

  return risks
}
