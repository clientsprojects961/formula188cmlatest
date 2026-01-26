"use client"

import { useEffect, useState } from "react"

interface CarouselSlide {
  id: number
  image: string
}

const defaultSlides: CarouselSlide[] = [
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
  {
    id: 4,
    image: "/c4.jpeg",
  },
  {
    id: 5,
    image: "/c5.jpeg",
  },
  {
    id: 6,
    image: "/c6.jpeg",
  },
]

export function ProductCarousel({ slides = defaultSlides }: { slides?: CarouselSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [autoPlay, slides.length])

  const nextSlide = () => {
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 2000)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 2000)
  }

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setCurrentSlide(index)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 2000)
  }

  return (
    <div className="relative w-full h-full group bg-black overflow-hidden rounded-2xl shadow-2xl">
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-98"
            }`}
          >
            {/* Image container with proper aspect ratio and no cutting */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 md:p-8">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={`Product image ${slide.id}`}
                className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-lg text-white p-2.5 sm:p-3 md:p-4 rounded-full transition-all duration-300 opacity-100 hover:scale-125 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl border border-white/40"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-lg text-white p-2.5 sm:p-3 md:p-4 rounded-full transition-all duration-300 opacity-100 hover:scale-125 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl border border-white/40"
        aria-label="Next slide"
      >
        ❯
      </button>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-500 backdrop-blur-md border border-white/40 ${
              index === currentSlide
                ? "w-8 sm:w-9 md:w-10 h-3 sm:h-3.5 md:h-4 bg-white shadow-xl scale-110"
                : "w-2.5 sm:w-3 md:w-3.5 h-2.5 sm:h-3 md:h-3.5 bg-white/40 hover:bg-white/70 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
