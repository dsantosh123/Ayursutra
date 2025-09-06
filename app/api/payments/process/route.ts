import { type NextRequest, NextResponse } from "next/server"

interface PaymentRequest {
  appointmentId: string
  amount: number
  paymentMethod: "card" | "upi" | "netbanking" | "wallet"
  paymentDetails: {
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    upiId?: string
    bankAccount?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentRequest = await request.json()

    // Validate required fields
    if (!paymentData.appointmentId || !paymentData.amount || !paymentData.paymentMethod) {
      return NextResponse.json({ error: "Appointment ID, amount, and payment method are required" }, { status: 400 })
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock payment processing (90% success rate)
    const isSuccessful = Math.random() > 0.1

    if (!isSuccessful) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment failed. Please try again.",
          transactionId: null,
        },
        { status: 400 },
      )
    }

    // Generate mock transaction ID
    const transactionId = "TXN" + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()

    // Mock payment record
    const paymentRecord = {
      id: Date.now(),
      appointmentId: paymentData.appointmentId,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      transactionId,
      status: "success",
      gatewayResponse: {
        gateway: "razorpay", // Mock gateway
        gatewayTransactionId: "pay_" + Math.random().toString(36).substr(2, 14),
        processedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      payment: paymentRecord,
      transactionId,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
