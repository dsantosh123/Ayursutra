'use client';

import { ArrowLeft, Shield, Eye, Database, Users, Lock, Globe, AlertTriangle, UserCheck, RefreshCw, Scale, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us, such as when you create an account, schedule consultations, or contact us. This includes your name, email address, phone number, health information, and Ayurvedic assessment data. We also automatically collect certain information about your device and usage patterns."
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: "We use your information to provide and improve our Ayurvedic consultation services, match you with qualified practitioners, send appointment reminders, provide personalized wellness recommendations, and communicate with you about our services. We may also use aggregated, non-identifiable data for research purposes."
    },
    {
      title: "Health Information Privacy",
      icon: Shield,
      content: "Your health information is highly sensitive and protected under applicable privacy laws. We implement strict security measures to protect your medical data, limit access to authorized personnel only, and never sell your health information to third parties. All practitioners are bound by confidentiality agreements."
    },
    {
      title: "Information Sharing",
      icon: Users,
      content: "We do not sell, rent, or lease your personal information to third parties. We may share your information with qualified Ayurvedic practitioners for consultation purposes, trusted service providers who assist us, or as required by law. All third parties are contractually bound to protect your privacy."
    },
    {
      title: "Data Security",
      icon: Lock,
      content: "We use industry-standard security measures including encryption, secure servers, and regular security audits to protect your information. However, no method of transmission over the internet is 100% secure. We continuously update our security practices to protect against unauthorized access, alteration, or destruction of data."
    },
    {
      title: "Cookies and Tracking",
      icon: Globe,
      content: "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze site usage. You can control cookie settings through your browser, though this may affect some functionality. We do not use cookies for behavioral advertising without your consent."
    },
    {
      title: "Data Retention",
      icon: AlertTriangle,
      content: "We retain your personal information for as long as your account is active or as needed to provide services. Health information may be retained longer as required by law or professional standards. You can request deletion of your data, subject to legal and regulatory requirements."
    },
    {
      title: "Your Privacy Rights",
      icon: UserCheck,
      content: "You have the right to access, update, or delete your personal information. You can also object to certain processing, request data portability, and withdraw consent where applicable. To exercise these rights, please contact our privacy team through the provided channels."
    },
    {
      title: "International Data Transfers",
      icon: Globe,
      content: "If you access our services from outside our primary jurisdiction, your information may be transferred to and processed in countries with different privacy laws. We ensure appropriate safeguards are in place to protect your information during such transfers."
    },
    {
      title: "Updates to This Policy",
      icon: RefreshCw,
      content: "We may update this privacy policy periodically to reflect changes in our practices or applicable laws. We will notify you of material changes through email or prominent notices on our platform. Your continued use after changes indicates acceptance of the updated policy."
    },
    {
      title: "Legal Compliance",
      icon: Scale,
      content: "This privacy policy complies with applicable privacy laws including GDPR, CCPA, and local healthcare privacy regulations. We are committed to transparency and accountability in our data handling practices and regularly review our compliance procedures."
    },
    {
      title: "Contact Our Privacy Team",
      icon: Mail,
      content: "If you have questions about this privacy policy, want to exercise your privacy rights, or have concerns about how we handle your information, please contact our dedicated privacy team at privacy@ayursutra.com or through our secure Help Center."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-green-200 hover:text-white transition-all duration-200 mb-4 sm:mb-0 sm:mr-6 group w-fit touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm sm:text-base font-medium">Back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-green-200">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 hover:bg-white/15 transition-all duration-200">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg flex-shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-200" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Your Privacy Matters to AyurSutra
              </h2>
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                This Privacy Policy explains how AyurSutra collects, uses, and protects your personal information. 
                We are committed to maintaining the highest standards of privacy and data protection for our users.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4 sm:space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 hover:border-green-300/30 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg flex-shrink-0 group-hover:bg-green-400/25 transition-colors duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-200 group-hover:text-green-100 transition-colors duration-200" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-green-50 transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-green-300/20">
          <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-green-200" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Privacy Questions?
              </h3>
            </div>
            <p className="text-sm sm:text-base text-green-100 mb-4 leading-relaxed">
              If you have questions about this privacy policy, want to exercise your privacy rights, 
              or have concerns about how we handle your information, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="mailto:privacy@ayursutra.com"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors duration-200 text-sm font-medium shadow-lg backdrop-blur-sm touch-manipulation"
              >
                Contact Privacy Team
              </a>
              <button className="inline-flex items-center justify-center px-4 py-2.5 border border-green-300/30 text-green-100 rounded-lg hover:bg-white/10 transition-colors duration-200 text-sm font-medium backdrop-blur-sm touch-manipulation">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}