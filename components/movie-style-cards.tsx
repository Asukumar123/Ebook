"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, User, Calendar, Tag, Play, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: string
  title: string
  author: string
  description: string
  category: string
  coverImage: string
  publishedDate: string
  tags: string[]
  format: string
  slug: string
  featured: boolean
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  publishedDate: string
  readTime: string
  category: string
  coverImage: string
  slug: string
  featured: boolean
}

interface MovieStyleCardProps {
  item: Book | BlogPost
  type: "book" | "blog"
}

const gradients = [
  "from-blue-500 via-purple-500 to-pink-500",
  "from-purple-600 via-pink-600 to-red-500",
  "from-indigo-500 via-blue-500 to-teal-400",
  "from-orange-400 via-pink-500 to-red-500",
  "from-green-400 via-teal-500 to-blue-500",
]

export function MovieStyleCard({ item, type }: MovieStyleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const gradient = gradients[Math.floor(Math.random() * gradients.length)]

  return (
    <Card
      className="
        group relative overflow-hidden border-0 rounded-2xl cursor-pointer
        transition-all duration-500 
        bg-white dark:bg-black
        shadow-md dark:shadow-none
        hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
        <img
          src={item.coverImage || `/api/placeholder/300/450`}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-60 transition-all duration-500`}
        />

        {/* Featured Badge */}
        {"featured" in item && item.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 shadow-md">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            className="
              bg-white/80 text-gray-800 
              dark:bg-black/60 dark:text-white 
              backdrop-blur-md border border-gray-300 dark:border-white/20 font-medium
            "
          >
            {type === "book" ? (item as Book).format : (item as BlogPost).category}
          </Badge>
        </div>

        {/* Play Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-black/20 dark:bg-white/20 backdrop-blur-sm rounded-full p-5 hover:bg-white/30 transition-all duration-300 shadow-xl">
            <Play className="h-8 w-8 text-white fill-current" />
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-black dark:text-white">
        <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 transition-colors duration-300">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
          <User className="h-3 w-3" />
          <span className="truncate">
            {type === "book" ? (item as Book).author : (item as BlogPost).author}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(item.publishedDate).getFullYear()}</span>
          </div>

          {/* ✅ Fixed Gradient Button */}
          <Button
            asChild
            size="sm"
            className={`
              bg-gradient-to-r ${gradient} text-white
              shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105
              transition-all duration-300
            `}
          >
            <Link href={type === "book" ? `/library/${item.slug}` : `/blog/${item.slug}`}>
              {type === "book" ? "Read" : "View"}
            </Link>
          </Button>
        </div>
      </div>

      {/* Hover Detail Panel */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-end">
          <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {type === "book" ? (item as Book).description : (item as BlogPost).excerpt}
          </p>

          {"tags" in item && (
            <div className="flex flex-wrap gap-1 mb-4">
              {(item as Book).tags?.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs text-gray-300 border-gray-600 bg-white/10 dark:bg-black/40 backdrop-blur-sm"
                >
                  <Tag className="h-2 w-2 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User className="h-3 w-3" />
              <span>{type === "book" ? (item as Book).author : (item as BlogPost).author}</span>
            </div>

            <Button
              asChild
              size="sm"
              className={`bg-gradient-to-r ${gradient} text-white shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300`}
            >
              <Link href={type === "book" ? `/library` : `/blog/${item.slug}`}>
                <BookOpen className="h-3 w-3 mr-1" />
                {type === "book" ? "Read Now" : "Read Article"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

interface MovieGridProps {
  items: (Book | BlogPost)[]
  type: "book" | "blog"
  title: string
  viewAllLink: string
}

export function MovieGrid({ items, type, title, viewAllLink }: MovieGridProps) {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-black transition-colors duration-300">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore trending {type === "book" ? "ebooks" : "articles"} handpicked for you
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="
              border border-gray-300 text-gray-800 hover:bg-gray-200 hover:text-gray-900
              dark:border-white/30 dark:text-white dark:hover:bg-white/10
              backdrop-blur-md transition-all duration-300
            "
          >
            <Link href={viewAllLink}>View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {items.map((item) => (
            <MovieStyleCard key={item.id} item={item} type={type} />
          ))}
        </div>
      </div>
    </section>
  )
}
