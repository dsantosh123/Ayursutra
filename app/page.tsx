"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Shield,
  Leaf,
  Heart,
  Brain,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken")
        setIsAuthenticated(!!token)
      }
    }

    checkAuth()
  }, [])

  const handleAuthenticatedAction = () => {
    if (typeof window === "undefined") return

    if (isAuthenticated === null) {
      const token = localStorage.getItem("authToken")
      const authStatus = !!token

      if (authStatus) {
        router.push("/register")
      } else {
        router.push("/login")
      }
      return
    }

    if (isAuthenticated) {
      router.push("/register")
    } else {
      router.push("/login")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const TreatmentCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const treatments = [
      {
        image: "/abhyanga.png",
        title: "Abhyanga (Full Body Oil Massage)",
        description:
          "Traditional full-body massage with warm herbal oils that deeply nourishes tissues and promotes circulation for complete rejuvenation.",
      },
      {
        image: "/shirodhara.jpg",
        title: "Shirodhara (Oil Pouring Therapy)",
        description:
          "Continuous stream of warm oil poured on the forehead to calm the nervous system and achieve deep mental relaxation.",
      },
      {
        image: "/swedana.png",
        title: "Swedana (Herbal Steam Bath)",
        description:
          "Therapeutic steam treatment with medicinal herbs that opens pores, eliminates toxins, and improves skin health.",
      },
      {
        image: "/pizhichil.png",
        title: "Pizhichil (Oil Bath Therapy)",
        description:
          "Royal treatment combining oil massage with warm medicated oil pouring for ultimate luxury and therapeutic benefits.",
      },
      {
        image: "/udvarthana.png",
        title: "Udvarthana (Herbal Powder Massage)",
        description:
          "Invigorating massage with herbal powders that reduces excess fat, improves skin texture, and enhances circulation.",
      },
      {
        image: "/netra tarpana.png",
        title: "Netra Tarpana (Eye Care Therapy)",
        description:
          "Specialized eye treatment with medicated ghee that strengthens vision, reduces eye strain, and prevents eye disorders.",
      },
      {
        image: "/karna purana.png",
        title: "Karna Purana (Ear Oil Therapy)",
        description:
          "Therapeutic ear treatment with warm medicated oils that improves hearing, reduces ear problems, and calms the mind.",
      },
      {
        image: "/shiro abhyanga.png",
        title: "Shiro Abhyanga (Head Massage)",
        description:
          "Specialized head and scalp massage that promotes hair growth, reduces stress, and improves mental clarity and focus.",
      },
      {
        image: "/padabhyanga.png",
        title: "Padabhyanga (Foot Massage)",
        description:
          "Therapeutic foot massage that stimulates vital points, improves circulation, and provides deep relaxation throughout the body.",
      },
      {
        image: "/marma therapy .png",
        title: "Marma Therapy (Energy Point Healing)",
        description:
          "Ancient healing technique targeting vital energy points to restore balance, enhance vitality, and promote natural healing.",
      },
    ]

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % treatments.length)
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + treatments.length) % treatments.length)
    }

    const goToSlide = (index: number) => {
      setCurrentSlide(index)
    }

    // Auto-slide functionality
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000) // Auto-slide every 5 seconds
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="relative max-w-4xl mx-auto">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {treatments.map((treatment, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="mx-2 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 sm:h-80">
                    <Image
                      src={treatment.image || "/placeholder.svg"}
                      alt={treatment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-green-900 text-xl font-bold">{treatment.title}</CardTitle>
                    <CardDescription className="text-green-700 leading-relaxed">
                      {treatment.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-600 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          aria-label="Previous treatment"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-600 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          aria-label="Next treatment"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {treatments.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-green-600 scale-110" : "bg-green-300 hover:bg-green-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="border-b border-green-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-green-700 hover:text-green-800 transition-colors font-medium"
              >
                Services
              </button>
              <Button
                variant="ghost"
                className="text-green-700 hover:text-green-800 transition-colors font-medium p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/about")}
              >
                About Ayurveda
              </Button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-green-700 hover:text-green-800 transition-colors font-medium"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-green-700 hover:text-green-800 transition-colors font-medium"
              >
                Contact
              </button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAuthenticatedAction}
              >
                🌿 Get Started
              </Button>
            </div>
            {/* Mobile menu button could go here */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/serene-ayurveda-spa-with-woman-receiving-shirodhar.jpg"
            alt="Ayurveda Treatment Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-amber-900/20"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium"
          >
            🌿 Traditional Ayurveda • Modern Technology ✨
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-green-900 mb-6 leading-tight">
            Transform Your Health with
            <span className="text-transparent bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text block mt-2">
              Authentic Panchakarma
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-green-800 mb-10 max-w-4xl mx-auto leading-relaxed">
            Experience personalized Ayurvedic treatments with AI-powered recommendations, expert practitioners, and
            comprehensive wellness tracking for your complete healing journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              className="text-base sm:text-lg px-8 sm:px-10 py-4 bg-green-600 hover:bg-green-700 text-white shadow-2xl transition-all duration-300 rounded-full"
              onClick={handleAuthenticatedAction}
            >
              🌿 Start My Healing Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-8 sm:px-10 py-4 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 shadow-lg transition-all duration-300 rounded-full"
              onClick={() => router.push("/about")}
            >
              Learn More About Ayurveda
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-900 mb-6">Why Choose AyurSutra?</h2>
            <p className="text-lg sm:text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
              Combining 5000-year-old Ayurvedic wisdom with cutting-edge technology for optimal health outcomes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Recommendations",
                description:
                  "Get personalized treatment plans based on your unique Prakriti (constitution) and current health goals through advanced AI analysis",
                bgColor: "from-white to-green-50",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              },
              {
                icon: Users,
                title: "Expert Practitioners",
                description:
                  "Connect with certified Ayurvedic doctors and experienced Panchakarma therapists with decades of traditional training",
                bgColor: "from-white to-amber-50",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description:
                  "Book appointments with real-time availability, intelligent reminders, and seamless rescheduling options",
                bgColor: "from-white to-orange-50",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600",
              },
              {
                icon: Heart,
                title: "Progress Tracking",
                description:
                  "Monitor your wellness journey with detailed analytics, daily assessments, and comprehensive health insights",
                bgColor: "from-white to-red-50",
                iconBg: "bg-red-100",
                iconColor: "text-red-600",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Your health data is protected with enterprise-grade security and complete privacy compliance",
                bgColor: "from-white to-blue-50",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              },
              {
                icon: Leaf,
                title: "Holistic Approach",
                description:
                  "Complete wellness solutions including personalized diet plans, lifestyle guidance, and comprehensive treatment protocols",
                bgColor: "from-white to-green-50",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-green-200 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${feature.bgColor} h-full`}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 ${feature.iconBg} rounded-full w-fit`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-green-900 text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Packages Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-100 to-amber-100">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-900 mb-6">Our Signature Treatments</h2>
            <p className="text-lg sm:text-xl text-green-700 max-w-3xl mx-auto">
              Authentic Panchakarma therapies designed to restore balance and promote deep healing
            </p>
          </div>

          <TreatmentCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/80">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-900 mb-6">What Our Patients Say</h2>
            <p className="text-lg sm:text-xl text-green-700 max-w-3xl mx-auto">
              Real stories from people who transformed their health with AyurSutra
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Software Engineer, Mumbai",
                initials: "PS",
                bgColor: "from-green-50 to-white",
                borderColor: "border-green-200",
                avatarBg: "bg-green-200",
                avatarText: "text-green-700",
                testimonial:
                  "The AI recommendations were spot-on! My chronic stress and insomnia improved dramatically after the Shirodhara treatment. The doctors were incredibly knowledgeable and caring.",
              },
              {
                name: "Rajesh Kumar",
                role: "Business Owner, Delhi",
                initials: "RK",
                bgColor: "from-amber-50 to-white",
                borderColor: "border-amber-200",
                avatarBg: "bg-amber-200",
                avatarText: "text-amber-700",
                testimonial:
                  "Complete Panchakarma changed my life! Lost 15kg, improved digestion, and feel 10 years younger. The progress tracking helped me stay motivated throughout the journey.",
              },
              {
                name: "Ananya Singh",
                role: "Student, Bangalore",
                initials: "AS",
                bgColor: "from-orange-50 to-white",
                borderColor: "border-orange-200",
                avatarBg: "bg-orange-200",
                avatarText: "text-orange-700",
                testimonial:
                  "As a college student, I was skeptical about Ayurveda. But AyurSutra's modern approach and the convenience of online booking made it perfect for my busy schedule. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${testimonial.bgColor} ${testimonial.borderColor} h-full`}
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-green-800 text-base leading-relaxed">
                    &quot;{testimonial.testimonial}&quot;
                  </CardDescription>
                  <div className="mt-4 flex items-center">
                    <div
                      className={`w-12 h-12 ${testimonial.avatarBg} rounded-full flex items-center justify-center mr-3`}
                    >
                      <span className={`${testimonial.avatarText} font-semibold`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">{testimonial.name}</div>
                      <div className="text-green-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "5000+", label: "Happy Patients Healed" },
              { number: "50+", label: "Expert Practitioners" },
              { number: "15+", label: "Treatment Centers" },
              { number: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm sm:text-base md:text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-100 via-green-100 to-orange-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-900 mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-lg sm:text-xl text-green-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have transformed their health with personalized Ayurvedic care. Start your wellness
            journey today!
          </p>
          <Button
            size="lg"
            className="text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-6 bg-green-600 hover:bg-green-700 text-white shadow-2xl transition-all duration-300 rounded-full"
            onClick={handleAuthenticatedAction}
          >
            🌿 Book Your Consultation Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-green-900 text-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">AyurSutra</span>
              </div>
              <p className="text-green-200 leading-relaxed mb-6">
                Transforming lives through authentic Ayurvedic wisdom and modern technology. Your journey to wellness
                starts here.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-green-200">
                  <Phone className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-green-200">
                  <Mail className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                  <span>hello@ayursutra.com</span>
                </div>
                <div className="flex items-center text-green-200">
                  <MapPin className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                  <span>Mumbai, Delhi, Bangalore</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Services</h3>
              <ul className="space-y-3 text-green-200">
                <li>🌊 Panchakarma Treatments</li>
                <li>👨‍⚕️ Expert Consultation</li>
                <li>🧘‍♀️ Wellness Programs</li>
                <li>🥗 Personalized Diet Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Company</h3>
              <ul className="space-y-3 text-green-200">
                <li>About Us</li>
                <li>Our Practitioners</li>
                <li>Treatment Centers</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Support</h3>
              <ul className="space-y-3 text-green-200">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => router.push("/help")}>
                  Help Center
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => router.push("/privacy")}
                >
                  Privacy Policy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => router.push("/terms")}>
                  Terms of Service
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-green-200 hover:text-white hover:bg-transparent"
                    onClick={handleAuthenticatedAction}
                  >
                    🌿 Book Appointment
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-300">
            <p>&copy; 2024 AyurSutra. All rights reserved. Made with 💚 for your wellness journey.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
