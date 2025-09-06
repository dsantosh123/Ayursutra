"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Calendar, MapPin, Clock, User, Leaf, Share2, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentSuccess() {
  const router = useRouter()
  const [bookingId] = useState("AYS" + Math.random().toString(36).substr(2, 9).toUpperCase())

  const bookingDetails = {
    id: bookingId,
    amount: 10620,
    paymentMethod: "Credit Card",
    transactionId: "TXN" + Math.random().toString(36).substr(2, 12).toUpperCase(),
    treatments: [
      { name: "Abhyanga (Full Body Massage)", duration: "60 min" },
      { name: "Shirodhara", duration: "45 min" },
      { name: "Guided Meditation", duration: "30 min" },
    ],
    center: {
      name: "AyurSutra Wellness Center - Koramangala",
      address: "123 Koramangala, Bangalore, Karnataka 560034",
      phone: "+91 98765 43210",
    },
    doctor: "Dr. Priya Sharma",
    date: "March 15, 2024",
    time: "10:00 AM",
    duration: "2 hours 15 minutes",
  }

  const downloadReceipt = () => {
    // Mock download functionality
    const receiptData = `
AyurSutra - Payment Receipt
Booking ID: ${bookingDetails.id}
Transaction ID: ${bookingDetails.transactionId}
Amount Paid: ₹${bookingDetails.amount.toLocaleString()}
Date: ${new Date().toLocaleDateString()}
    `
    const blob = new Blob([receiptData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `AyurSutra-Receipt-${bookingDetails.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: "AyurSutra Booking Confirmation",
        text: `My Ayurveda treatment is booked for ${bookingDetails.date} at ${bookingDetails.time}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Your Ayurveda treatment has been successfully booked</p>
          <Badge variant="secondary" className="mt-2">
            Booking ID: {bookingDetails.id}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{bookingDetails.date}</div>
                        <div className="text-sm text-muted-foreground">Date</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{bookingDetails.time}</div>
                        <div className="text-sm text-muted-foreground">Time ({bookingDetails.duration})</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{bookingDetails.doctor}</div>
                        <div className="text-sm text-muted-foreground">Ayurvedic Physician</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-medium">{bookingDetails.center.name}</div>
                        <div className="text-sm text-muted-foreground">{bookingDetails.center.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Booked Treatments</h4>
                  <div className="space-y-2">
                    {bookingDetails.treatments.map((treatment, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium">{treatment.name}</span>
                        <span className="text-sm text-muted-foreground">{treatment.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-sm">{bookingDetails.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>{bookingDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-semibold text-accent">₹{bookingDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-accent">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Confirmation SMS & Email</div>
                    <div className="text-sm text-muted-foreground">
                      You'll receive booking confirmation and appointment details shortly
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Pre-treatment Instructions</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed preparation guidelines will be sent 24 hours before your appointment
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Arrive 15 Minutes Early</div>
                    <div className="text-sm text-muted-foreground">
                      Please arrive early for consultation and preparation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={downloadReceipt} variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={shareBooking} variant="outline" className="w-full justify-start bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Booking
                </Button>
                <Button onClick={() => router.push("/dashboard")} className="w-full">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>{bookingDetails.center.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>support@ayursutra.com</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  For any queries about your appointment or treatment, feel free to contact us.
                </div>
              </CardContent>
            </Card>

            {/* Reminder */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Preparation Reminder</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Avoid heavy meals 2 hours before treatment. Wear comfortable, loose clothing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button onClick={() => router.push("/booking")}>Book Another Appointment</Button>
          </div>
          <p className="text-sm text-muted-foreground">Thank you for choosing AyurSutra for your wellness journey!</p>
        </div>
      </div>
    </div>
  )
}
