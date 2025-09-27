"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Brain, ArrowRight, ArrowLeft, CheckCircle, Lightbulb, Target, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AboutAyurvedaPage() {
  const router = useRouter()

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

  const doshas = [
    {
      name: "Vata",
      element: "Air + Space",
      characteristics: "Movement, Creativity, Flexibility",
      color: "from-blue-400 to-cyan-400",
      icon: "💨",
      description: "Governs movement, breathing, circulation, and nervous system functions",
    },
    {
      name: "Pitta",
      element: "Fire + Water",
      characteristics: "Metabolism, Intelligence, Transformation",
      color: "from-red-400 to-orange-400",
      img : "C:\Users\sdona\OneDrive\Desktop\AyuSutra\Ayursutra\public\herbal_leaf-removebg-preview.png",
      description: "Controls digestion, metabolism, body temperature, and mental clarity",
    },
    {
      name: "Kapha",
      element: "Earth + Water",
      characteristics: "Structure, Stability, Immunity",
      color: "from-green-400 to-emerald-400",
      icon: "🌱",
      description: "Provides structure, lubrication, immunity, and emotional stability",
    },
  ]

  const panchakarmaTreatments = [
    {
      name: "Vamana",
      description: "Therapeutic vomiting to eliminate excess Kapha dosha",
      benefits: "Respiratory disorders, skin diseases, obesity",
      image: "/herbal_leaf-removebg-preview.png",
    },
    {
      name: "Virechana",
      description: "Purgation therapy to cleanse excess Pitta dosha",
      benefits: "Liver disorders, skin problems, digestive issues",
      icon: "💊",
    },
    {
      name: "Basti",
      description: "Medicated enemas for Vata-related disorders",
      benefits: "Joint pain, neurological disorders, constipation",
      icon: "💧",
    },
    {
      name: "Nasya",
      description: "Nasal administration of medicines",
      benefits: "Headaches, sinusitis, mental clarity",
      icon: "👃",
    },
    {
      name: "Raktamokshana",
      description: "Blood purification therapy",
      benefits: "Skin disorders, blood-related diseases",
      icon: "🩸",
    },
  ]

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-green-700 hover:text-green-800 hover:bg-green-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </motion.div>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/register")}
            >
              🌿 Start Your Journey
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-amber-900/10"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <Badge
              variant="secondary"
              className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium"
            >
              🕉️ Ancient Wisdom • Modern Application ✨
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-900 mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Complete Guide to
            <span className="text-transparent bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text block mt-2">
              Ayurveda
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-green-800 mb-10 max-w-4xl mx-auto text-pretty leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the 5000-year-old science of life that combines natural healing, personalized medicine, and
            holistic wellness for complete mind-body harmony.
          </motion.p>
        </div>
      </section>

      {/* What is Ayurveda */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">What is Ayurveda?</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-lg text-green-800 leading-relaxed">
                  Ayurveda, literally meaning "knowledge of life" (Ayus = Life, Veda = Knowledge), is the world's oldest
                  healing system originating in India over 5,000 years ago. This comprehensive medical science treats
                  not just symptoms but addresses the root cause of illness.
                </p>
                <p className="text-lg text-green-800 leading-relaxed">
                  Unlike modern medicine's one-size-fits-all approach, Ayurveda recognizes that each person is unique.
                  It focuses on prevention, personalized treatment, and maintaining the delicate balance between mind,
                  body, and consciousness.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">🌱 Natural Healing</Badge>
                  <Badge className="bg-amber-100 text-amber-800 px-4 py-2">⚖️ Personalized Medicine</Badge>
                  <Badge className="bg-orange-100 text-orange-800 px-4 py-2">🧘‍♀️ Holistic Approach</Badge>
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🔬 Evidence-Based</Badge>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-br from-green-50 to-amber-50 border-green-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">🕉️</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Core Principles</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">Prevention is better than cure</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">Treat the person, not the disease</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">Balance of mind, body & spirit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">Natural remedies with no side effects</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Doshas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-100 to-amber-100">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">The Three Doshas</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              According to Ayurveda, every person has a unique constitution (Prakriti) determined by three bio-energies
              called Doshas
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {doshas.map((dosha, index) => (
              <motion.div key={dosha.name} variants={fadeInUp}>
                <Card className="border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${dosha.color}`}></div>
                  <CardHeader className="text-center p-8">
                    <div className="text-6xl mb-4">{dosha.icon}</div>
                    <CardTitle className="text-green-900 text-2xl mb-2">{dosha.name}</CardTitle>
                    <Badge className="mb-4 bg-gray-100 text-gray-700">{dosha.element}</Badge>
                    <CardDescription className="text-green-700 text-base leading-relaxed mb-4">
                      {dosha.description}
                    </CardDescription>
                    <div className="text-sm font-medium text-green-800 bg-green-50 p-3 rounded-lg">
                      <strong>Key Qualities:</strong> {dosha.characteristics}
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Understanding Your Constitution</h3>
              <p className="text-green-800 leading-relaxed mb-6">
                Everyone has all three doshas, but in different proportions. Your unique combination determines your
                physical characteristics, mental tendencies, and susceptibility to certain health issues. When doshas
                are in balance, you experience optimal health. When imbalanced, disease manifests.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push("/register")}>
                <Target className="mr-2 h-4 w-4" />
                Discover Your Dosha Type
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Panchakarma Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Panchakarma: The Ultimate Detox</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Panchakarma (Five Actions) is Ayurveda's most powerful detoxification and rejuvenation therapy, designed
              to eliminate toxins and restore natural balance
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {panchakarmaTreatments.map((treatment, index) => (
              <motion.div key={treatment.name} variants={fadeInUp}>
                <Card className="border-green-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 h-full">
                  <CardHeader className="text-center p-6">
                    <div className="text-4xl mb-3">{treatment.icon}</div>
                    <CardTitle className="text-green-900 text-xl mb-3">{treatment.name}</CardTitle>
                    <CardDescription className="text-green-700 leading-relaxed mb-4">
                      {treatment.description}
                    </CardDescription>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-800">
                        <strong>Benefits:</strong> {treatment.benefits}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Why Choose Panchakarma?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>Deep cellular detoxification</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>Boosts immunity and energy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>Reduces stress and anxiety</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>Improves digestion and sleep</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>Promotes longevity and vitality</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🌿</div>
                <p className="text-green-100 mb-6">
                  Experience the transformative power of authentic Panchakarma treatments
                </p>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50"
                  onClick={() => router.push("/register")}
                >
                  Book Panchakarma Treatment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Science Validation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Validated by Modern Science</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Thousands of research studies have validated Ayurvedic principles and treatments, proving their
              effectiveness in treating various health conditions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <Card className="bg-white border-green-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Neurological Benefits</h4>
                      <p className="text-green-700 text-sm">
                        Studies show Ayurvedic treatments improve cognitive function, reduce anxiety, and help manage
                        neurodegenerative diseases.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white border-green-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Cardiovascular Health</h4>
                      <p className="text-green-700 text-sm">
                        Research proves Ayurvedic herbs and treatments effectively reduce blood pressure, cholesterol,
                        and heart disease risk.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white border-green-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Metabolic Disorders</h4>
                      <p className="text-green-700 text-sm">
                        Clinical trials demonstrate Ayurveda's effectiveness in managing diabetes, obesity, and
                        digestive disorders.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-green-200 p-8 text-center">
                <Lightbulb className="h-16 w-16 text-amber-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-green-900 mb-4">Research Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-600">15,000+</div>
                    <div className="text-sm text-green-700">Published Studies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-600">95%</div>
                    <div className="text-sm text-green-700">Patient Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">180+</div>
                    <div className="text-sm text-green-700">Countries Using</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">0</div>
                    <div className="text-sm text-green-700">Side Effects</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">Benefits of Ayurvedic Treatment</h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Experience comprehensive healing that addresses not just symptoms but the root cause of health issues
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌱", title: "Natural Healing", desc: "100% natural remedies with no harmful side effects" },
              { icon: "⚖️", title: "Personalized Care", desc: "Treatments customized to your unique constitution" },
              { icon: "🧘‍♀️", title: "Stress Relief", desc: "Proven techniques for mental peace and relaxation" },
              { icon: "💪", title: "Immunity Boost", desc: "Strengthen your body's natural defense system" },
              { icon: "🌟", title: "Anti-Aging", desc: "Rejuvenation therapies for youthful vitality" },
              { icon: "🎯", title: "Chronic Care", desc: "Effective management of long-term conditions" },
              { icon: "⚡", title: "Energy Boost", desc: "Restore natural energy and enthusiasm" },
              { icon: "😌", title: "Mental Clarity", desc: "Improve focus, memory, and cognitive function" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-green-200 hover:shadow-lg transition-all duration-300 text-center p-6 h-full">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="font-bold text-green-900 mb-2">{benefit.title}</h4>
                  <p className="text-green-700 text-sm">{benefit.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands who have discovered the healing power of authentic Ayurveda. Start your personalized
              wellness journey with AI-powered recommendations today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="text-xl px-12 py-6 bg-white text-green-600 hover:bg-green-50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full border-0"
                onClick={() => router.push("/register")}
              >
                🌿 Start My Healing Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-12 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                onClick={() => router.push("/")}
              >
                Explore AyurSutra Platform
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-green-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">AyurSutra</span>
          </div>
          <p className="text-green-200 mb-6">
            Transforming lives through authentic Ayurvedic wisdom and modern technology
          </p>
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              className="text-green-200 hover:text-white hover:bg-green-800"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-green-200 hover:text-white hover:bg-green-800"
              onClick={() => router.push("/register")}
            >
              Get Started
            </Button>
          </div>
          <div className="border-t border-green-800 mt-8 pt-6 text-green-300 text-sm">
            <p>&copy; 2024 AyurSutra. All rights reserved. Made with 💚 for your wellness journey.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
