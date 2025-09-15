'use client';

import { ArrowLeft, Shield, FileText, Users, CreditCard, Copyright, AlertTriangle, Ban, RefreshCw, Scale, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
  const router = useRouter();

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: Shield,
      content: "By accessing and using AyurSutra, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service."
    },
    {
      title: "Description of Service",
      icon: FileText,
      content: "AyurSutra provides Ayurvedic consultation services, educational content, and health recommendations based on traditional Ayurvedic principles. Our platform connects users with qualified Ayurvedic practitioners and provides personalized wellness guidance."
    },
    {
      title: "Medical Disclaimer",
      icon: AlertTriangle,
      content: "The information and services provided by AyurSutra are for educational and wellness purposes only and are not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making any health-related decisions."
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: "You are responsible for providing accurate information about your health and wellness concerns. You agree to use the service lawfully and not to misuse or abuse the platform. You must not share your account credentials with others."
    },
    {
      title: "Practitioner Relationships",
      icon: Users,
      content: "AyurSutra facilitates connections between users and Ayurvedic practitioners but does not directly provide medical services. The relationship is between you and the practitioner. We verify practitioner credentials but are not responsible for the quality of individual consultations."
    },
    {
      title: "Payment and Refunds",
      icon: CreditCard,
      content: "Payment for consultation services is required in advance. Refunds may be provided at our discretion in cases where services cannot be delivered as promised. Please contact our support team for refund requests within 7 days of payment."
    },
    {
      title: "Intellectual Property",
      icon: Copyright,
      content: "All content on AyurSutra, including text, graphics, logos, and software, is the property of AyurSutra or its content suppliers and is protected by copyright and other intellectual property laws."
    },
    {
      title: "Limitation of Liability",
      icon: Shield,
      content: "AyurSutra shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service. Our total liability is limited to the amount you paid for the service in the past 12 months."
    },
    {
      title: "Termination",
      icon: Ban,
      content: "We may terminate or suspend your account at any time for violation of these terms. You may also terminate your account at any time by contacting us. Upon termination, your right to use the service will cease immediately."
    },
    {
      title: "Changes to Terms",
      icon: RefreshCw,
      content: "We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the service after changes constitutes acceptance of the new terms."
    },
    {
      title: "Governing Law",
      icon: Scale,
      content: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AyurSutra operates, without regard to conflict of law principles."
    },
    {
      title: "Contact Information",
      icon: Mail,
      content: "If you have any questions about these Terms of Service, please contact us at legal@ayursutra.com or through our Help Center."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-200 mb-4 sm:mb-0 sm:mr-6 group w-fit touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm sm:text-base font-medium">Back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 leading-tight">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Welcome to AyurSutra
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                These Terms of Service govern your use of AyurSutra's platform and services. 
                Please read them carefully as they contain important information about your rights and obligations.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 sm:space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Need Help?
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              If you have questions about these terms or need clarification on any aspect of our service, 
              we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="mailto:legal@ayursutra.com"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium shadow-sm touch-manipulation"
              >
                Contact Legal Team
              </a>
              <button className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium touch-manipulation">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}