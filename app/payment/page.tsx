"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CheckCircle2, Building2, QrCode, Copy, Check } from "lucide-react"

const WHATSAPP_NUMBER = "918989252740"
const SUPPORT_EMAIL = "formula188cm@gmail.com"
const UPI_ID = "ayushyaduvanshi56441@okicici"
const UPI_MERCHANT_NAME = "Ayush Kumar"
const PRICE_PER_UNIT = 1

function PaymentContent() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0"
  const method = searchParams.get("method") || "online"
  const quantity = searchParams.get("quantity") || "1"

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [copiedUPI, setCopiedUPI] = useState(false)

  const handlePaymentSubmit = (paymentType: string) => {
    setSelectedMethod(paymentType)
  }

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopiedUPI(true)
    setTimeout(() => setCopiedUPI(false), 2000)
  }

  const openWhatsApp = () => {
    const message = `Hi, I need help with my Formula188CM order (₹${total})`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  // Generate UPI payment links for different apps
  const generateUPILink = (app: string) => {
    const amount = Number(total) || 0
    const encodedUPI = encodeURIComponent(UPI_ID)
    const encodedName = encodeURIComponent(UPI_MERCHANT_NAME)
    const amountStr = amount.toFixed(2)

    const links: { [key: string]: string } = {
      phonepe: `phonepe://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
      gpay: `tez://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
      paytm: `paytmmp://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
      bhim: `bhim://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
      whatsapp: `whatsapp://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
      default: `upi://pay?pa=${encodedUPI}&pn=${encodedName}&am=${amountStr}&cu=INR`,
    }

    return links[app] || links.default
  }

  const handleAppPayment = (app: string) => {
    const link = generateUPILink(app)
    // Try to open the app-specific deep link
    try {
      // Create a temporary anchor element for better compatibility
      const anchor = document.createElement('a')
      anchor.href = link
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      
      // Fallback to universal UPI link if app-specific doesn't work
      setTimeout(() => {
        const universalLink = generateUPILink("default")
        window.location.href = universalLink
      }, 500)
    } catch (error) {
      // If deep link fails, use universal UPI link
      const universalLink = generateUPILink("default")
      window.location.href = universalLink
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. You wil receive a call from our team shortly with your order details.
            </p>
            <p className="text-2xl font-bold text-primary mb-4">₹{total}</p>
            <p className="text-sm text-muted-foreground mb-8">Quantity: {quantity}</p>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6 text-sm text-green-900">
              <p className="font-semibold mb-2">Order Confirmation:</p>
              <p>Check your email for receipt and shipping details.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={openWhatsApp}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
                Chat on WhatsApp
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 premium-text">Payment Method</h1>
          <p className="text-muted-foreground mb-12">Choose your preferred payment method to complete your order</p>

          {/* Order Details Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-2xl font-bold">₹{total}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Quantity</p>
              <p className="text-2xl font-bold">{quantity}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Delivery</p>
              <p className="text-2xl font-bold">4-5 Days</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Payment Type</p>
              <p className="text-lg font-bold capitalize">{method}</p>
            </div>
          </div>

          {/* Payment Methods */}
          {method === "online" && (
            <>
              {/* Direct UPI App Payments */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Pay with UPI Apps</h2>
                <p className="text-muted-foreground mb-6">Click on your preferred UPI app to pay directly</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                  {/* PhonePe */}
                  <button
                    onClick={() => handleAppPayment("phonepe")}
                    className="p-6 bg-gradient-to-br from-[#5F259F] to-[#7B3FA3] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#5F259F]">
                      P
                    </div>
                    <span className="font-semibold text-sm">PhonePe</span>
                  </button>

                  {/* Google Pay */}
                  <button
                    onClick={() => handleAppPayment("gpay")}
                    className="p-6 bg-gradient-to-br from-[#4285F4] to-[#34A853] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">G</span>
                    </div>
                    <span className="font-semibold text-sm">Google Pay</span>
                  </button>

                  {/* Paytm */}
                  <button
                    onClick={() => handleAppPayment("paytm")}
                    className="p-6 bg-gradient-to-br from-[#00BAF2] to-[#002970] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#002970]">
                      P
                    </div>
                    <span className="font-semibold text-sm">Paytm</span>
                  </button>

                  {/* BHIM */}
                  <button
                    onClick={() => handleAppPayment("bhim")}
                    className="p-6 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#FF6B35]">
                      B
                    </div>
                    <span className="font-semibold text-sm">BHIM</span>
                  </button>

                  {/* WhatsApp Pay */}
                  <button
                    onClick={() => handleAppPayment("whatsapp")}
                    className="p-6 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Image src="/wp.png" alt="WhatsApp" width={40} height={40} className="rounded-full" />
                    </div>
                    <span className="font-semibold text-sm">WhatsApp Pay</span>
                  </button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                  <p className="font-semibold mb-1">Amount: ₹{total}</p>
                  <p className="text-xs">Clicking an app will open it with payment details pre-filled. Just confirm to complete payment.</p>
                </div>
              </div>

              {/* Manual UPI Payment */}
              <div
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all mb-12 ${
                  selectedMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => handlePaymentSubmit("upi")}
              >
                <h3 className="text-xl font-bold mb-4">Manual UPI Transfer</h3>
                <p className="text-muted-foreground mb-6">Copy the UPI ID and send payment from your bank app</p>

                <div className="p-4 bg-muted rounded-lg mb-4 flex items-center gap-3">
                  <span className="font-mono text-lg font-semibold flex-1 break-all">{UPI_ID}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      copyUPI()
                    }}
                    className="p-2 hover:bg-background rounded transition-colors flex-shrink-0"
                    aria-label="Copy UPI ID"
                  >
                    {copiedUPI ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                  <p className="font-semibold mb-1">Amount to Send:</p>
                  <p className="text-xl font-bold text-primary">₹{total}</p>
                </div>

                {selectedMethod === "upi" && (
                  <button
                    onClick={() => {
                      setTimeout(() => setShowSuccess(true), 1500)
                    }}
                    className="w-full mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    I've Sent the Payment
                  </button>
                )}
              </div>

              {/* Bank Transfer */}
              <div
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all mb-12 ${
                  selectedMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => handlePaymentSubmit("bank")}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Bank Transfer</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Account Holder</span>
                    <span className="font-semibold">AYUSH KUMAR</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Bank Name</span>
                    <span className="font-semibold">Yes Bank</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Account Number</span>
                    <span className="font-semibold">067961900000815</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">IFSC Code</span>
                    <span className="font-semibold">YESB0000679</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Account Type</span>
                    <span className="font-semibold">Current</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="text-lg font-bold text-primary">₹{total}</span>
                  </div>
                </div>

                {selectedMethod === "bank" && (
                  <button
                    onClick={() => {
                      setTimeout(() => setShowSuccess(true), 1500)
                    }}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Confirm Payment Sent
                  </button>
                )}
              </div>

              {/* QR Code Payment */}
              <div
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all mb-12 ${
                  selectedMethod === "qr" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => handlePaymentSubmit("qr")}
              >
                <div className="flex items-center gap-2 mb-4">
                  <QrCode className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">QR Code Payment</h3>
                </div>

                {selectedMethod === "qr" && (
                  <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-6">Click below to proceed to QR code payment page</p>
                    <Link
                      href={`/payment/qr?total=${total}&quantity=${quantity}`}
                      className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Go to QR Code Payment
                    </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {method === "cod" && (
            <div className="p-8 bg-green-50 border-2 border-green-200 rounded-lg mb-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3 text-green-900">Cash on Delivery Selected</h2>
              <p className="text-green-900 mb-6 max-w-2xl mx-auto">
                You will pay ₹{total} when you receive your order. Our delivery partner will collect the payment at your
                doorstep.
              </p>

              <button
                onClick={() => {
                  setTimeout(() => setShowSuccess(true), 1500)
                }}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Confirm COD Order
              </button>
            </div>
          )}

          {/* Help & Support Section */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
                Chat on WhatsApp
              </button>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
