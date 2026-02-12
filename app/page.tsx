"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, Star, StarHalf } from "lucide-react"

export default function Home() {
  const scrollToSection = () => {
    document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
  }

  // Video testimonials state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const testimonials = ["/t1.mp4", "/t2.mp4", "/t3.mp4", "/t4.mp4", "/t5.mp4"]
  const posters = ["/t1.jpeg", "/t2.jpeg", "/t3.jpeg", "/t4.jpeg", "/t5.jpeg"]
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

  useEffect(() => {
    // Auto-advance videos every 8 seconds
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    // Play current video when index changes
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentVideoIndex])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted
      }
    })
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Carousel Section - reduced from full screen to moderate height */}
      <section className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <ProductCarousel />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-pulse-soft">
          <span className="text-white/60 text-xs sm:text-sm font-medium">Scroll to explore</span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Primary CTA directly under carousel */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 md:pt-8 px-2">
              <Link
                href="/product"
          className="px-6 md:px-8 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl text-sm md:text-base btn-cta-glow"
              >
                Buy Now
              </Link>
              <button
                onClick={scrollToSection}
                className="px-6 md:px-8 py-2.5 md:py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300 text-sm md:text-base"
              >
                Learn More
              </button>
            </div>

      {/* Guaranteed Growth Highlight - Aesthetic Design */}
      <section className="py-6 md:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-6 md:p-8 bg-gradient-to-br from-background via-card to-background border-2 border-primary/30 rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/20 rounded-full mb-3 md:mb-4">
                <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">100% Guaranteed</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 md:mb-3 premium-text">
                ✅ Guaranteed Growth Even After The Age Of 21
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Break the age barrier! Our scientifically proven formula works effectively for individuals over 21, supporting natural height increase with guaranteed results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Bar Section - After Carousel */}
      <section className="py-6 md:py-8 px-3 sm:px-4 lg:px-8 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 p-4 md:p-6 bg-background border-2 border-primary/20 rounded-xl shadow-lg">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 md:w-8 md:h-8 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : i === 4
                        ? "fill-yellow-400/70 text-yellow-400/70"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground">4.7</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            
            {/* Reviews Count */}
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-base text-muted-foreground mb-1">Total Reviews</p>
              <p className="text-xl md:text-2xl font-bold text-foreground">4789+ Reviews</p>
            </div>
            
            {/* Badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <span className="text-green-700 dark:text-green-400 font-semibold text-sm">✓ Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Headline Section */}
      <section className="py-12 md:py-20 px-3 sm:px-4 lg:px-8 overflow-hidden bg-gradient-to-b from-background to-card/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight premium-text">
              Reach Your Full Height Potential
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Formula188CM is scientifically formulated with 100% natural ingredients to support optimal bone
              development, healthy growth, and peak physical potential.
            </p>

            {/* Trust Badges - Mobile optimized */}
            <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 justify-center pt-2 md:pt-4 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>Clinically Tested</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>Fast Delivery</span>
              </div>
            </div>

          
            
          </div>
        </div>
      </section>

    
      <section id="benefits" className="py-12 md:py-20 px-3 sm:px-4 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 premium-text px-2">
              Why Choose Formula188CM?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Our carefully selected natural ingredients work synergistically to support healthy growth and development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: "🌿",
                title: "100% Natural Ingredients",
                description:
                  "Formulated with pure, clinically-tested natural ingredients without harmful additives or fillers.",
                delay: "0ms",
              },
              {
                icon: "⚗️",
                title: "Scientifically Formulated",
                description: "Developed by nutrition experts to maximize bone health and growth potential safely.",
                delay: "150ms",
              },
              {
                icon: "👥",
                title: "30k Trusted Customers",
                description:
                  "Join our satisfied customers who have experienced visible and measurable results.",
                delay: "300ms",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="p-4 md:p-8 bg-background border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-all duration-300 group"
                style={{
                  animation: `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${benefit.delay} forwards`,
                  opacity: 0,
                }}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{benefit.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{benefit.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Video Carousel) */}
      <section id="testimonials" className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 premium-text px-2">
              Real Customer Testimonials
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              100% real video reviews from our satisfied customers. Watch their authentic experiences.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="relative group max-w-md mx-auto">
            {/* Main Video Container */}
            <div className="relative w-full aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden border-2 border-border bg-black shadow-2xl">
              {testimonials.map((videoSrc, index) => (
                <video
                  key={index}
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={videoSrc}
                  poster={posters[index]}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay={index === currentVideoIndex}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ))}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

              {/* Control Buttons */}
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 md:p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Removed stuck play overlay for smoother UX on iOS */}
            </div>

            {/* Video Thumbnails/Navigation Dots */}
            <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`flex-1 max-w-[120px] h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentVideoIndex
                      ? "border-primary scale-105 shadow-lg"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <img
                    src={posters[index]}
                    alt={`Testimonial ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>



            {/* Video Counter */}
            <div className="text-center mt-4">
              <p className="text-sm md:text-base text-muted-foreground">
                Video {currentVideoIndex + 1} of {testimonials.length}
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "100%", label: "Natural" },
            ].map((stat, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.number}</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 premium-text px-2">
            Start Your Growth Journey Today
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Join thousands of satisfied customers and unlock your full height potential. Limited time offer available.
          </p>
          <Link
            href="/product"
            className="inline-block px-6 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Get Formula188CM Now
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
