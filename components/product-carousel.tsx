"use client"

import { useEffect, useState } from "react"

interface CarouselSlide {
  id: number
  image: string
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/33k-3NmR7Ht0sVJ6PVqkfe6l8MvSekXSCK.jpg",
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22-ElqzjDe5ZGHnB0ZWAHP0xfF0vshXPp.jpg",
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/44-RbEPHe3M0S5KP0t7hcALao98TIPCpV.jpg",
  },
]

export function ProductCarousel({ slides = defaultSlides }: { slides?: CarouselSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-4">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={`Product image ${slide.id}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        aria-label="Next slide"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-2 bg-gray-800"
                : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
