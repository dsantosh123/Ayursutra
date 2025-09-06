"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  Leaf,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  processingFee?: number
}

interface BookingSummary {
  treatments: Array<{
    name: string
    duration: string
    price: number
  }>
  center: string
  doctor: string
  date: string
  time: string
  subtotal: number
  taxes: number
  total: number
}

export default function PaymentPage() {
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    walletPhone: "",
  })

  // Mock booking data
  const bookingSummary: BookingSummary = {
    treatments: [
      { name: "Abhyanga (Full Body Massage)", duration: "60 min", price: 3500 },
      { name: "Shirodhara", duration: "45 min", price: 4000 },
      { name: "Guided Meditation", duration: "30 min", price: 1500 },
    ],
    center: "AyurSutra Wellness Center - Koramangala",
    doctor: "Dr. Priya Sharma",
    date: "March 15, 2024",
    time: "10:00 AM",
    subtotal: 9000,
    taxes: 1620,
    total: 10620,
  }

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, RuPay",
      processingFee: 0,
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Google Pay, PhonePe, Paytm",
      processingFee: 0,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building className="h-5 w-5" />,
      description: "All major banks supported",
      processingFee: 15,
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
      description: "Paytm, Amazon Pay, Mobikwik",
      processingFee: 10,
    },
  ]

  const updatePaymentData = (field: keyof typeof paymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    updatePaymentData("cardNumber", formatted)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    updatePaymentData("expiryDate", formatted)
  }

  const processPayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    router.push("/payment/success")
  }

  const calculateFinalTotal = () => {
    const selectedMethod = paymentMethods.find((m) => m.id === selectedPaymentMethod)
    const processingFee = selectedMethod?.processingFee || 0
    return bookingSummary.total + processingFee
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Secure Payment</h1>
            <p className="text-muted-foreground">Complete your booking with secure payment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Badge */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-semibold text-foreground">256-bit SSL Encrypted</h3>
                    <p className="text-sm text-muted-foreground">Your payment information is secure and protected</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    <Lock className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="relative">
                        <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                        <Label
                          htmlFor={method.id}
                          className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 peer-checked:border-accent peer-checked:bg-accent/5 transition-all"
                        >
                          <div className="text-accent">{method.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.description}</div>
                            {method.processingFee && method.processingFee > 0 && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Processing fee: ₹{method.processingFee}
                              </div>
                            )}
                          </div>
                          {selectedPaymentMethod === method.id && <CheckCircle className="h-5 w-5 text-accent" />}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  {selectedPaymentMethod === "card" && "Enter your card information"}
                  {selectedPaymentMethod === "upi" && "Enter your UPI ID"}
                  {selectedPaymentMethod === "netbanking" && "Select your bank"}
                  {selectedPaymentMethod === "wallet" && "Enter your wallet details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Credit/Debit Card Form */}
                {selectedPaymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => updatePaymentData("cvv", e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => updatePaymentData("cardholderName", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* UPI Form */}
                {selectedPaymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={paymentData.upiId}
                        onChange={(e) => updatePaymentData("upiId", e.target.value)}
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You will receive a payment request on your UPI app. Please approve it to complete the payment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Net Banking Form */}
                {selectedPaymentMethod === "netbanking" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Your Bank</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((bank) => (
                          <Button key={bank} variant="outline" className="justify-start bg-transparent">
                            {bank}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to your bank's secure login page to complete the payment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Wallet Form */}
                {selectedPaymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="walletPhone">Mobile Number</Label>
                      <Input
                        id="walletPhone"
                        placeholder="+91 98765 43210"
                        value={paymentData.walletPhone}
                        onChange={(e) => updatePaymentData("walletPhone", e.target.value)}
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        An OTP will be sent to your registered mobile number for verification.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Button onClick={processPayment} disabled={isProcessing} size="lg" className="w-full text-lg py-6">
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay ₹${calculateFinalTotal().toLocaleString()}`
              )}
            </Button>

            {/* Security Info */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Your payment is protected by 256-bit SSL encryption</p>
              <p>We never store your payment information</p>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-accent" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Appointment Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Appointment Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Center:</span>
                        <span className="font-medium text-right">{bookingSummary.center}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="font-medium">{bookingSummary.doctor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time:</span>
                        <span className="font-medium">
                          {bookingSummary.date}, {bookingSummary.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Treatments */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Selected Treatments</h4>
                    <div className="space-y-2">
                      {bookingSummary.treatments.map((treatment, index) => (
                        <div key={index} className="flex justify-between items-start text-sm">
                          <div className="flex-1">
                            <div className="font-medium">{treatment.name}</div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {treatment.duration}
                            </div>
                          </div>
                          <span className="font-medium">₹{treatment.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>₹{bookingSummary.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes (18% GST):</span>
                      <span>₹{bookingSummary.taxes.toLocaleString()}</span>
                    </div>
                    {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.processingFee && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span>₹{paymentMethods.find((m) => m.id === selectedPaymentMethod)?.processingFee}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total:</span>
                      <span className="text-accent">₹{calculateFinalTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Refund Policy */}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Cancellation Policy</h5>
                  <p className="text-xs text-muted-foreground">
                    Free cancellation up to 24 hours before appointment. 50% refund for cancellations within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
