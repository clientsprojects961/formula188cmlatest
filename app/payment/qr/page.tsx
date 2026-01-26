"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Copy, Check, Mail, ArrowLeft, Download } from "lucide-react"

const UPI_ID = "ayushyaduvanshi56441@okicici"
const UPI_MERCHANT_NAME = "Ayush Kumar"
const WHATSAPP_NUMBER = "918989252740"
const SUPPORT_EMAIL = "formula188cm@gmail.com"

function QRPaymentContent() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0"
  const quantity = searchParams.get("quantity") || "1"

  const [copiedUPI, setCopiedUPI] = useState(false)
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false)
  const [useGeneratedQR, setUseGeneratedQR] = useState(false)

  const copyToClipboard = (text: string, setState: (value: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setState(true)
    setTimeout(() => setState(false), 2000)
  }

  const openWhatsApp = () => {
    const message = `I have completed the payment for Formula188CM order. Amount: ₹${total}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const downloadQRCode = () => {
    const totalNum = Number(total) || 0
    const amount = totalNum.toFixed(2)
    const staticSrc = `/${Math.round(totalNum)}.jpeg`
    const generatedSrc = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_MERCHANT_NAME)}&am=${amount}&cu=INR`
    
    const qrSrc = useGeneratedQR ? generatedSrc : staticSrc
    
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = qrSrc
    link.download = `formula188cm-qr-code-${total}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/payment" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={20} />
            Back to Payment
          </Link>

          <h1 className="text-4xl font-bold mb-2 premium-text">QR Code Payment</h1>
          <p className="text-muted-foreground mb-8">Scan QR code or send payment screenshot to confirm</p>

          {/* Order Details */}
          <div className="p-6 bg-card border border-border rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="text-3xl font-bold text-primary">₹{total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                <p className="text-3xl font-bold">{quantity}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
              <p>
                <span className="font-semibold">Note:</span> Please ensure you send the exact amount mentioned above.
              </p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-8 bg-card border border-border rounded-lg text-center mb-8">
            <h2 className="text-xl font-bold mb-6">Scan this QR Code</h2>
            <div className="inline-block p-4 sm:p-6 bg-white rounded-lg mb-4 border border-border">
              {(() => {
                // Total already includes quantity (1099 * quantity), use it directly
                const totalNum = Number(total) || 0
                const amount = totalNum.toFixed(2)
                const staticSrc = `/${Math.round(totalNum)}.jpeg`
                // Include merchant name in QR code
                const generatedSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_MERCHANT_NAME)}&am=${amount}&cu=INR`
                return (
                  <img
                    id="qr-code-image"
                    src={useGeneratedQR ? generatedSrc : staticSrc}
                    alt="UPI QR Code"
                    className="w-64 h-64 object-contain"
                    onError={() => setUseGeneratedQR(true)}
                  />
                )
              })()}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <p className="text-muted-foreground text-sm">Use your phone camera or any UPI app to scan</p>
              <button
                onClick={downloadQRCode}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>

          {/* Manual UPI ID */}
          <div className="p-6 bg-card border border-border rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Manual UPI Transfer</h2>
            <p className="text-muted-foreground mb-4">If QR code scan doesn't work, use this UPI ID:</p>

            <div className="p-4 bg-muted rounded-lg flex items-center gap-3 mb-4">
              <span className="font-mono text-lg font-semibold flex-1 break-all">{UPI_ID}</span>
              <button
                onClick={() => copyToClipboard(UPI_ID, setCopiedUPI)}
                className="p-2 hover:bg-background rounded transition-colors flex-shrink-0"
                aria-label="Copy UPI ID"
              >
                {copiedUPI ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
              <p className="font-semibold mb-2">Payment Details:</p>
              <p>UPI ID: {UPI_ID}</p>
              <p>Amount: ₹{total}</p>
              <p>Reference: Formula188CM Order</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-4">After Payment</h2>
            <ol className="space-y-3 text-green-900 text-sm">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>Take a screenshot of your payment confirmation</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>Send it to us via WhatsApp or Email</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>We will verify and process your order immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">4.</span>
                <span>Receive your tracking details via email</span>
              </li>
            </ol>
          </div>

          {/* Contact Options */}
          <div className="space-y-4">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
                Send Payment Screenshot via WhatsApp
              </h3>
              <button
                onClick={openWhatsApp}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Open WhatsApp
              </button>
              <div className="mt-3 p-3 bg-muted rounded text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>WhatsApp Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">+918989252740</span>
                    <button
                      onClick={() => copyToClipboard(WHATSAPP_NUMBER, setCopiedWhatsApp)}
                      className="p-1 hover:bg-background rounded"
                    >
                      {copiedWhatsApp ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Send Payment Screenshot via Email
              </h3>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Payment Screenshot - Formula188CM Order (₹${total})&body=Please find my payment screenshot attached. Order Amount: ₹${total}`}
                className="w-full inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Send Email
              </a>
              <div className="mt-3 p-3 bg-muted rounded text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold">Email:</span> {SUPPORT_EMAIL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function QRPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRPaymentContent />
    </Suspense>
  )
}
