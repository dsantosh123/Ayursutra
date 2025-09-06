"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Star, Clock, ArrowRight, CheckCircle, Leaf, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface Treatment {
  id: string
  name: string
  description: string
  duration: string
  sessions: number
  price: number
  benefits: string[]
  suitability: number
}

interface RecommendationPackage {
  id: string
  name: string
  description: string
  treatments: Treatment[]
  totalDuration: string
  totalPrice: number
  successRate: number
  aiConfidence: number
}

export default function AIRecommendations() {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  // Mock AI-generated recommendations
  const recommendations: RecommendationPackage[] = [
    {
      id: "stress-relief",
      name: "Stress Relief & Mental Wellness",
      description: "Comprehensive package targeting stress, anxiety, and mental fatigue based on your profile",
      treatments: [
        {
          id: "abhyanga",
          name: "Abhyanga (Full Body Massage)",
          description: "Therapeutic oil massage to reduce stress and improve circulation",
          duration: "60 minutes",
          sessions: 7,
          price: 3500,
          benefits: ["Stress reduction", "Better sleep", "Improved circulation"],
          suitability: 95,
        },
        {
          id: "shirodhara",
          name: "Shirodhara",
          description: "Continuous oil pouring on forehead for deep relaxation",
          duration: "45 minutes",
          sessions: 5,
          price: 4000,
          benefits: ["Mental clarity", "Anxiety relief", "Better focus"],
          suitability: 92,
        },
        {
          id: "meditation",
          name: "Guided Meditation Sessions",
          description: "Personalized meditation practice for stress management",
          duration: "30 minutes",
          sessions: 10,
          price: 1500,
          benefits: ["Stress management", "Emotional balance", "Inner peace"],
          suitability: 88,
        },
      ],
      totalDuration: "3 weeks",
      totalPrice: 9000,
      successRate: 94,
      aiConfidence: 96,
    },
    {
      id: "digestive-wellness",
      name: "Digestive Health Restoration",
      description: "Targeted treatments for improving digestive function and gut health",
      treatments: [
        {
          id: "virechana",
          name: "Virechana (Therapeutic Purgation)",
          description: "Gentle detoxification therapy for digestive system",
          duration: "3 days",
          sessions: 1,
          price: 8000,
          benefits: ["Digestive cleansing", "Toxin removal", "Metabolism boost"],
          suitability: 85,
        },
        {
          id: "basti",
          name: "Medicated Enema Therapy",
          description: "Specialized treatment for digestive and nervous system",
          duration: "45 minutes",
          sessions: 5,
          price: 5000,
          benefits: ["Gut health", "Nutrient absorption", "System balance"],
          suitability: 82,
        },
      ],
      totalDuration: "2 weeks",
      totalPrice: 13000,
      successRate: 89,
      aiConfidence: 87,
    },
    {
      id: "complete-wellness",
      name: "Complete Panchakarma Program",
      description: "Full traditional Panchakarma for comprehensive health transformation",
      treatments: [
        {
          id: "full-panchakarma",
          name: "Traditional Panchakarma",
          description: "Complete 5-step detoxification and rejuvenation program",
          duration: "21 days",
          sessions: 21,
          price: 25000,
          benefits: ["Complete detox", "System reset", "Longevity", "Vitality"],
          suitability: 78,
        },
      ],
      totalDuration: "3 weeks",
      totalPrice: 25000,
      successRate: 96,
      aiConfidence: 82,
    },
  ]

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const proceedToBooking = () => {
    if (selectedPackage) {
      router.push(`/booking?package=${selectedPackage}`)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-accent" />
            <Badge variant="secondary" className="text-sm">
              AI-Powered Analysis Complete
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Personalized Treatment Plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your health profile and Ayurvedic assessment, our AI has curated the most suitable treatment
            packages for you
          </p>
        </div>

        {/* AI Analysis Summary */}
        <Card className="mb-8 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              AI Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">Vata-Pitta</div>
                <div className="text-sm text-muted-foreground">Dominant Constitution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">Stress & Digestion</div>
                <div className="text-sm text-muted-foreground">Primary Focus Areas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">3-4 weeks</div>
                <div className="text-sm text-muted-foreground">Recommended Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Packages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recommended Treatment Packages</h2>

          {recommendations.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedPackage === pkg.id ? "ring-2 ring-accent border-accent" : "hover:shadow-lg"
              } ${index === 0 ? "border-accent/50" : ""}`}
              onClick={() => handleSelectPackage(pkg.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      {index === 0 && <Badge variant="secondary">Recommended</Badge>}
                      {selectedPackage === pkg.id && <CheckCircle className="h-5 w-5 text-accent" />}
                    </div>
                    <CardDescription className="text-base">{pkg.description}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-foreground">₹{pkg.totalPrice.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{pkg.totalDuration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{pkg.successRate}% Success Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-accent" />
                    <span className="text-sm">{pkg.aiConfidence}% AI Confidence</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Included Treatments:</h4>
                  {pkg.treatments.map((treatment) => (
                    <div key={treatment.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-foreground">{treatment.name}</h5>
                        <div className="text-right">
                          <div className="font-semibold">₹{treatment.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{treatment.sessions} sessions</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{treatment.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{treatment.suitability}% match</span>
                          </div>
                        </div>
                        <Progress value={treatment.suitability} className="w-20 h-2" />
                      </div>

                      <div className="mt-3">
                        <div className="text-sm font-medium text-foreground mb-1">Key Benefits:</div>
                        <div className="flex flex-wrap gap-1">
                          {treatment.benefits.map((benefit) => (
                            <Badge key={benefit} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            Modify Assessment
          </Button>
          <Button onClick={proceedToBooking} disabled={!selectedPackage} size="lg" className="flex items-center gap-2">
            Proceed to Booking
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Additional Info */}
        <Card className="mt-8 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Leaf className="h-8 w-8 text-accent mx-auto" />
              <h3 className="font-semibold">Why These Recommendations?</h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Our AI analyzed your stress levels, digestive health scores, and Ayurvedic constitution to recommend
                treatments with the highest success probability for your specific profile. Each package is designed to
                address your primary concerns while supporting overall wellness.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
