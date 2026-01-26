"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Star, StarHalf } from "lucide-react"

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const MAX_QUANTITY = 4

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= MAX_QUANTITY) {
      setQuantity(value)
    }
  }

  const reviewBase = [
    {
      name: "Himanshu",
      text: "This is really incredible, I followed the methods for 5-6 months and gained height from 5'5 to 5'9. All I did was follow consistently.",
    },
    {
      name: "Rohit",
      text: "Using it for 3 months. I grew from 5'3 to 5'5. Just stay consistent and you will see results too.",
    },
    {
      name: "Arjun",
      text: "This really works! I was stuck at 5'4 for years, and in 4 months I reached 5'7. Just need patience and discipline.",
    },
    {
      name: "Sahil",
      text: "I didn’t believe at first, but after 3 months I can see clear results. Went from 5'6 to 5'8.",
    },
    {
      name: "Ritika",
      text: "Tried everything before, nothing worked. This actually did. From 5'2 to 5'5 in 5 months!",
    },
    {
      name: "Aman",
      text: "Bro trust me, it’s real. I started at 5'7 and now I’m 5'10 after 6 months.",
    },
    {
      name: "Karan",
      text: "I used it regularly and saw changes slowly. From 5'5 to 5'8 in around 5 months.",
    },
    {
      name: "Harsh",
      text: "At first, I thought it’s fake, but consistency made the difference. Grew 2 inches in 3 months.",
    },
    {
      name: "Priya",
      text: "Never expected it to work this well. 5'3 → 5'6 in just 4 months.",
    },
    {
      name: "Tanish",
      text: "I followed the plan daily, no excuses. From 5'6 to 5'9 now. Totally worth it!",
    },
  ]
  const surnameOptions = ["Sharma", "Patel", "Gupta", "Verma", "Iyer", "Chopra", "Nair", "Reddy", "Singh", "Bhatt"]
  const ratingOptions = [4, 4.5, 5]
  const [reviews] = useState(() =>
    reviewBase.map((review) => {
      const surname = surnameOptions[Math.floor(Math.random() * surnameOptions.length)]
      const rating = ratingOptions[Math.floor(Math.random() * ratingOptions.length)]
      return {
        ...review,
        name: `${review.name} ${surname}`,
        rating,
      }
    }),
  )

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-200 text-gray-300" />
        ))}
      </div>
    )
  }

  const price = 1999
  const discountedPrice = 1099
  const savings = price - discountedPrice
  const discountPercent = Math.round((savings / price) * 100)

  const productSlides = [
    {
      id: 1,
      image: "/c1.jpeg",
    },
    {
      id: 2,
      image: "/c2.jpeg",
    },
    {
      id: 3,
      image: "/c3.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Header - Mobile optimized layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="flex flex-col justify-center space-y-4">
              <div className="w-full h-80 md:h-[500px] rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
                <ProductCarousel slides={productSlides} />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-card rounded-lg border border-border text-center animate-fade-in-up">
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">100%</div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Natural</p>
                </div>
                <div
                  className="p-3 md:p-4 bg-card rounded-lg border border-border text-center animate-fade-in-up"
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">30000+</div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Trusted Customers</p>
                </div>
              </div>
            </div>

            {/* Product Details - Right side */}
            <div className="flex flex-col justify-center space-y-4 md:space-y-8">
              {/* In Stock Badge */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs md:text-sm font-semibold border border-green-200">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  In Stock
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                  Formula188CM
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-medium">
                  Premium Natural Height Growth Support
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 md:gap-6 pb-4 md:pb-6 border-b border-border">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg md:text-2xl text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-semibold">4.9 out of 5</span>
                  <span className="text-xs md:text-sm text-muted-foreground">(4,789 reviews)</span>
                </div>
              </div>

              {/* Price Section - Mobile optimized */}
              <div className="space-y-3 md:space-y-4 pb-4 md:pb-6 border-b border-border">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
                  <span className="text-4xl md:text-5xl font-bold text-primary">₹{discountedPrice}</span>
                  <span className="text-xl md:text-2xl text-muted-foreground line-through">₹{price}</span>
                  <span className="inline-block px-2 md:px-3 py-1 bg-red-100 text-red-700 rounded text-xs md:text-sm font-bold">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Save ₹{savings}</p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2 md:space-y-3 pb-4 md:pb-6 border-b border-border">
                <h3 className="font-semibold text-base md:text-lg">Key Benefits</h3>
                {[
                  "100% Natural & Plant-Based",
                  "Supports Bone Health",
                  "No Artificial Additives",
                  "Third-Party Tested",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 md:gap-3 group">
                    <span className="text-green-600 mt-0.5 flex-shrink-0 text-lg md:text-xl font-bold">✓</span>
                    <span className="text-sm md:text-base font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm md:text-base font-semibold">Quantity</label>
                  <span className="text-xs md:text-sm text-muted-foreground">Max {MAX_QUANTITY} per order</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 bg-muted p-2 rounded-lg w-fit border border-border">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 md:p-2.5 hover:bg-background rounded-lg transition-all text-lg md:text-xl font-bold text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={MAX_QUANTITY}
                    value={quantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value) || 1
                      handleQuantityChange(val)
                    }}
                    className="w-14 md:w-20 text-center py-2 bg-background border border-border rounded-md font-bold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= MAX_QUANTITY}
                    className="p-2 md:p-2.5 hover:bg-background rounded-lg transition-all text-lg md:text-xl font-bold text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent active:scale-95"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {/* Total Price Display */}
                <div className="flex items-center justify-between p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-sm md:text-base font-semibold text-muted-foreground">Total:</span>
                  <span className="text-xl md:text-2xl font-bold text-primary">₹{discountedPrice * quantity}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-3 pt-4 md:pt-6">
                <Link
                  href={`/checkout?quantity=${quantity}`}
                  className="block w-full px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 text-center text-sm md:text-base shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12 md:mb-20"></div>

          {/* Product Information Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 mb-12 md:mb-20">
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">About Formula188CM</h2>
                <div className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Formula188CM is a scientifically-formulated dietary supplement designed to support natural bone
                    development and growth optimization. Our product combines traditional botanical wisdom with modern
                    nutritional science.
                  </p>
                  <p>
                    Each ingredient is carefully selected for its role in supporting skeletal health, proper mineral
                    absorption, and bone density maintenance. We source only premium-grade natural components.
                  </p>
                  <p>
                    Our unique blend works synergistically to support your body's natural growth processes during peak
                    growth years and maintains long-term skeletal wellness.
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">How It Works</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    {
                      num: "1",
                      title: "Mineral Absorption",
                      desc: "Supports optimal absorption of essential minerals for bone formation",
                    },
                    {
                      num: "2",
                      title: "Skeletal Support",
                      desc: "Natural ingredients support bone strength during growth phases",
                    },
                    { num: "3", title: "Nutritional Support", desc: "Fills nutritional gaps for healthy development" },
                    { num: "4", title: "Long-Term Wellness", desc: "Promotes sustained bone health with daily use" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 md:gap-6 p-3 md:p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary">{item.num}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-base md:text-lg mb-1">{item.title}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supplement Facts & Key Ingredients */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Supplement Facts & Key Ingredients</h3>
                <div className="p-4 md:p-6 bg-card rounded-lg border border-border mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Serving Size</p>
                      <p className="font-semibold">1 Capsule</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Serving Per Container</p>
                      <p className="font-semibold">30</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Amount Per Serving</p>
                      <p className="font-semibold text-lg">500mg</p>
                      <p className="text-xs text-muted-foreground mt-1">★RDA values not established</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">Key Ingredients:</p>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">Each 500mg capsule contains extracts of:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {[
                        { name: "Withania Somnifera", dose: "50mg" },
                        { name: "Asperagus racemosus", dose: "50mg" },
                        { name: "Pueraria tuberosa", dose: "50mg" },
                        { name: "Terminalia chebula", dose: "50mg" },
                        { name: "Terminalia arjuna", dose: "50mg" },
                        { name: "Plumbago zeylanica", dose: "50mg" },
                        { name: "Piper Longum", dose: "50mg" },
                        { name: "Eletteria cardomomum", dose: "50mg" },
                        { name: "Mukuna pruriens", dose: "50mg" },
                        { name: "Nigella sativa", dose: "50mg" },
                      ].map((ingredient, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 p-2 md:p-3 bg-muted rounded border border-border"
                        >
                          <span className="text-xs md:text-sm font-medium flex-1">{ingredient.name}</span>
                          <span className="text-xs md:text-sm font-semibold text-primary">{ingredient.dose}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm md:text-base font-semibold text-yellow-900 mb-2">Caution:</p>
                  <p className="text-xs md:text-sm text-yellow-800">
                    This product is not recommended for pregnant or lactating women. Please consult your physician prior to consuming this product. To be avoided by individuals who are allergic to any of the herbs.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Info Cards */}
            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-xl md:text-2xl">⚗️</span>
                  <h4 className="font-bold text-base md:text-lg">Lab Tested</h4>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Third-party tested for purity and safety.</p>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-lg border border-green-500/20 space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-xl md:text-2xl">🌿</span>
                  <h4 className="font-bold text-base md:text-lg">100% Natural</h4>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">No artificial fillers or binders.</p>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-xl md:text-2xl">👥</span>
                  <h4 className="font-bold text-base md:text-lg">30k+ Customers</h4>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Trusted by thousands with 4.9/5 rating.</p>
              </div>

              <div className="p-4 md:p-6 bg-card border border-border rounded-lg space-y-3">
                <h4 className="font-bold text-base md:text-lg">How to Use</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold mb-1">Take water</p>
                      <p className="text-xs text-muted-foreground">Prepare a glass of normal water</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold mb-1">Take one capsule</p>
                      <p className="text-xs text-muted-foreground">Consume 1 tablet daily</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold mb-1">Drink water</p>
                      <p className="text-xs text-muted-foreground">After breakfast with normal water</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-12 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 md:space-y-4">
              {[
                {
                  q: "How long does it take to see results?",
                  a: "Most users report noticing changes within 2-3 months of consistent daily use.",
                },
                {
                  q: "Is Formula188CM safe?",
                  a: "Yes, it's made from natural ingredients and third-party tested. Consult your doctor if you have medical conditions.",
                },
                {
                  q: "Can anyone use it?",
                  a: "This product can be used by individuals under 16 or after they turn 16. Always consult a physician before use, especially if you have medical conditions.",
                },
                {
                  q: "Does it contain allergens?",
                  a: "Our formula is free from major allergens. Check the ingredient list for specific allergies.",
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group p-4 md:p-6 bg-card border border-border rounded-lg cursor-pointer hover:border-primary/30 transition-all"
                >
                  <summary className="flex items-center justify-between font-semibold text-base md:text-lg">
                    {item.q}
                    <span className="text-primary group-open:rotate-180 transition-transform text-sm md:text-base">
                      ▼
                    </span>
                  </summary>
                  <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

         {/* Reviews Section (Text testimonials) */}
   <section className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold premium-text">Real Customer Reviews</h2>
          </div>
          <div className="space-y-6">
            {reviews.map((r, idx) => (
              <div key={idx} className="p-5 md:p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  {renderStars(r.rating)}
                  <span className="text-sm font-semibold text-foreground/80">{r.rating.toFixed(1)} / 5</span>
                </div>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">{r.text}</p>
                <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">🙂</span>
                  <span>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      </section>

       
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
