"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Shield, Leaf, Heart, Brain, Star, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      const authStatus = !!token
      console.log("[v0] Auth check - token exists:", !!token)
      console.log("[v0] Setting isAuthenticated to:", authStatus)
      setIsAuthenticated(authStatus)
    }

    checkAuth()
  }, [])

  const handleAuthenticatedAction = () => {
    console.log("[v0] Button clicked - isAuthenticated:", isAuthenticated)

    if (isAuthenticated === null) {
      console.log("[v0] Auth state not determined yet, checking now...")
      const token = localStorage.getItem("authToken")
      const authStatus = !!token
      console.log("[v0] Direct auth check - token exists:", !!token)

      if (authStatus) {
        console.log("[v0] User is authenticated, redirecting to register")
        router.push("/register")
      } else {
        console.log("[v0] User is not authenticated, redirecting to login")
        router.push("/login")
      }
      return
    }

    if (isAuthenticated) {
      console.log("[v0] User is authenticated, redirecting to register")
      router.push("/register")
    } else {
      console.log("[v0] User is not authenticated, redirecting to login")
      router.push("/login")
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="border-b border-green-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-green-700 hover:text-green-800 transition-colors font-medium">
                Services
              </a>
              <Button
                variant="ghost"
                className="text-green-700 hover:text-green-800 transition-colors font-medium p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/about")}
              >
                About Ayurveda
              </Button>
              <a href="#testimonials" className="text-green-700 hover:text-green-800 transition-colors font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-green-700 hover:text-green-800 transition-colors font-medium">
                Contact
              </a>
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
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={handleAuthenticatedAction}
              >
                🌿 Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          <motion.div {...fadeInUp}>
            <Badge
              variant="secondary"
              className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium"
            >
              🌿 Traditional Ayurveda • Modern Technology ✨
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-900 mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Health with
            <span className="text-transparent bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text block mt-2">
              Authentic Panchakarma
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-green-800 mb-10 max-w-4xl mx-auto text-pretty leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience personalized Ayurvedic treatments with AI-powered recommendations, expert practitioners, and
            comprehensive wellness tracking for your complete healing journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="text-lg px-10 py-4 bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full border-0"
              onClick={handleAuthenticatedAction}
            >
              🌿 Start My Healing Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              onClick={() => router.push("/about")}
            >
              Learn More About Ayurveda
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Why Choose AyurSutra?</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
              Combining 5000-year-old Ayurvedic wisdom with cutting-edge technology for optimal health outcomes
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <Brain className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">AI-Powered Recommendations</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Get personalized treatment plans based on your unique Prakriti (constitution) and current health
                    goals through advanced AI analysis
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-amber-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">Expert Practitioners</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Connect with certified Ayurvedic doctors and experienced Panchakarma therapists with decades of
                    traditional training
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-orange-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">Smart Scheduling</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Book appointments with real-time availability, intelligent reminders, and seamless rescheduling
                    options
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-red-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">Progress Tracking</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Monitor your wellness journey with detailed analytics, daily assessments, and comprehensive health
                    insights
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">Secure & Private</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Your health data is protected with enterprise-grade security and complete privacy compliance
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">Holistic Approach</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    Complete wellness solutions including personalized diet plans, lifestyle guidance, and comprehensive
                    treatment protocols
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Packages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-100 to-amber-100">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Our Signature Treatments</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Authentic Panchakarma therapies designed to restore balance and promote deep healing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="/shirodhara-ayurveda-treatment-oil-pouring-on-foreh.jpg"
                    alt="Shirodhara Treatment"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-900">🌊 Shirodhara Package</CardTitle>
                  <CardDescription className="text-green-700">
                    Deep relaxation therapy with continuous oil pouring for stress relief and mental clarity
                  </CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-green-600">₹15,000</span>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleAuthenticatedAction}>
                      Book Now
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="/abhyanga-ayurveda-full-body-massage-with-herbal-oi.jpg"
                    alt="Abhyanga Treatment"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-900">💆‍♀️ Abhyanga Package</CardTitle>
                  <CardDescription className="text-green-700">
                    Full-body therapeutic massage with warm herbal oils for detoxification and rejuvenation
                  </CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-green-600">₹25,000</span>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleAuthenticatedAction}>
                      Book Now
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="/panchakarma-complete-detox-treatment-ayurveda-herb.jpg"
                    alt="Complete Panchakarma"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-900">🌿 Complete Panchakarma</CardTitle>
                  <CardDescription className="text-green-700">
                    Comprehensive 21-day detoxification and rejuvenation program for complete wellness
                  </CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-green-600">₹75,000</span>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleAuthenticatedAction}>
                      Book Now
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">What Our Patients Say</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Real stories from people who transformed their health with AyurSutra
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-green-800 text-base leading-relaxed">
                    "The AI recommendations were spot-on! My chronic stress and insomnia improved dramatically after the
                    Shirodhara treatment. The doctors were incredibly knowledgeable and caring."
                  </CardDescription>
                  <div className="mt-4 flex items-center">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-700 font-semibold">PR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Priya Sharma</div>
                      <div className="text-green-600 text-sm">Software Engineer, Mumbai</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-green-800 text-base leading-relaxed">
                    "Complete Panchakarma changed my life! Lost 15kg, improved digestion, and feel 10 years younger. The
                    progress tracking helped me stay motivated throughout the journey."
                  </CardDescription>
                  <div className="mt-4 flex items-center">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-amber-700 font-semibold">RK</span>
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Rajesh Kumar</div>
                      <div className="text-green-600 text-sm">Business Owner, Delhi</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-green-800 text-base leading-relaxed">
                    "As a college student, I was skeptical about Ayurveda. But AyurSutra's modern approach and the
                    convenience of online booking made it perfect for my busy schedule. Highly recommend!"
                  </CardDescription>
                  <div className="mt-4 flex items-center">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-700 font-semibold">AS</span>
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Ananya Singh</div>
                      <div className="text-green-600 text-sm">Student, Bangalore</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.div
                className="text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                5000+
              </motion.div>
              <div className="text-green-100 text-lg">Happy Patients Healed</div>
            </div>
            <div>
              <motion.div
                className="text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                50+
              </motion.div>
              <div className="text-green-100 text-lg">Expert Practitioners</div>
            </div>
            <div>
              <motion.div
                className="text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                15+
              </motion.div>
              <div className="text-green-100 text-lg">Treatment Centers</div>
            </div>
            <div>
              <motion.div
                className="text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                98%
              </motion.div>
              <div className="text-green-100 text-lg">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-100 via-green-100 to-orange-100">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Ready to Begin Your Healing Journey?</h2>
            <p className="text-xl text-green-700 mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands who have transformed their health with personalized Ayurvedic care. Start your wellness
              journey today!
            </p>
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full border-0"
              onClick={handleAuthenticatedAction}
            >
              🌿 Book Your Consultation Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-green-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
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
                  <Phone className="h-5 w-5 mr-3 text-green-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-green-200">
                  <Mail className="h-5 w-5 mr-3 text-green-400" />
                  <span>hello@ayursutra.com</span>
                </div>
                <div className="flex items-center text-green-200">
                  <MapPin className="h-5 w-5 mr-3 text-green-400" />
                  <span>Mumbai, Delhi, Bangalore</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Services</h3>
              <ul className="space-y-3 text-green-200">
                <li className="hover:text-white transition-colors cursor-pointer">🌊 Panchakarma Treatments</li>
                <li className="hover:text-white transition-colors cursor-pointer">👨‍⚕️ Expert Consultation</li>
                <li className="hover:text-white transition-colors cursor-pointer">🧘‍♀️ Wellness Programs</li>
                <li className="hover:text-white transition-colors cursor-pointer">🥗 Personalized Diet Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Company</h3>
              <ul className="space-y-3 text-green-200">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Our Practitioners</li>
                <li className="hover:text-white transition-colors cursor-pointer">Treatment Centers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-green-300 text-lg">Support</h3>
              <ul className="space-y-3 text-green-200">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
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
