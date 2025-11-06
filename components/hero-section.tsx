"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles } from "lucide-react"

const heroImages = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1080&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop&crop=center",
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-20">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Overlay for readability in both modes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40 dark:from-black/80 dark:via-black/70 dark:to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/70 dark:via-transparent dark:to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium animate-fade-in">
          <Sparkles className="h-4 w-4" />
          Welcome to the Future of Learning
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Discover
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Knowledge
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Everywhere
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Access thousands of educational eBooks, articles, and resources. Learn at your own pace with our comprehensive digital library designed for curious minds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {/* Gradient Button */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                       text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl 
                       hover:scale-105 transition-transform duration-300"
          >
            <Link href="/library">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Library
            </Link>
          </Button>

          {/* Outline Button (fixed for both themes) */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="
              border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900 
              dark:border-white/40 dark:text-white dark:hover:bg-white/20 dark:hover:text-white 
              backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-xl 
              hover:scale-105 transition-transform duration-300
            "
          >
            <Link href="/blog">Start Learning</Link>
          </Button>
        </div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-pulse delay-2000" />
    </section>
  )
}
