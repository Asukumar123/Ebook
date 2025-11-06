// app/library/improved-library-client.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, BookOpen, User, Calendar, Tag, Download, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Book {
  id: string
  title: string
  author: string
  description: string
  category: string
  coverImage: string | null
  publishedDate: string
  tags: string[]
  pages: number
  format: string
  slug: string
  featured: boolean
  fileUrl?: string
}

interface LibraryClientProps {
  books: Book[]
}

const categories = ["All", "Technology", "Business", "Arts", "Science", "Education", "Health"]

const gradients = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-600', 
  'from-pink-500 to-red-600',
  'from-red-500 to-orange-600',
  'from-orange-500 to-yellow-600',
  'from-green-500 to-blue-600',
  'from-indigo-500 to-purple-600',
  'from-teal-500 to-cyan-600'
]

// Movie-style book card component
function MovieBookCard({ book, gradient }: { book: Book; gradient: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="group relative overflow-hidden bg-black border-0 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={book.coverImage || `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop&crop=center`}
          alt={book.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop&crop=center`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-80 transition-all duration-500`} />
        
        {/* Featured Badge */}
        {book.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Format Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge 
            variant="secondary" 
            className="bg-black/50 text-white backdrop-blur-sm border-0 font-medium"
          >
            {book.format}
          </Badge>
        </div>

        {/* Action Buttons Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            asChild
            size="sm"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
          >
            <Link href={`/library/${book.slug}`}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Link>
          </Button>
          
          {book.fileUrl && (
            <Button 
              asChild
              size="sm"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
            >
              <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            </Button>
          )}
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-base leading-tight mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
          {book.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <User className="h-3 w-3" />
          <span className="truncate">{book.author}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(book.publishedDate).getFullYear()}</span>
          </div>
          
          <Button 
            asChild 
            size="sm" 
            className={`bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 px-4 py-1 text-xs`}
          >
            <Link href={`/library/${book.slug}`}>
              <BookOpen className="h-3 w-3 mr-1" />
              Read
            </Link>
          </Button>
        </div>
      </div>

      {/* Hover Details Panel */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 p-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-end">
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
            {book.title}
          </h3>
          
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {book.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {book.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-gray-300 border-gray-600 bg-black/30">
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User className="h-3 w-3" />
              <span className="truncate">{book.author}</span>
            </div>
            
            <div className="flex gap-2">
              {book.fileUrl && (
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 px-3 py-1 text-xs"
                >
                  <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3" />
                  </a>
                </Button>
              )}
              
              <Button 
                asChild 
                size="sm" 
                className={`bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 px-3 py-1 text-xs`}
              >
                <Link href={`/library/${book.slug}`}>
                  <BookOpen className="h-3 w-3 mr-1" />
                  Read
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function ImprovedLibraryClient({ books = [] }: LibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === "All" || book.category.toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
          case "oldest":
            return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
          case "title":
            return a.title.localeCompare(b.title)
          case "author":
            return a.author.localeCompare(b.author)
          default:
            return 0
        }
      })
  }, [books, searchTerm, selectedCategory, sortBy])

  if (books.length === 0) {
    return (
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No Books Available</h2>
          <p className="text-muted-foreground mb-6">
            We're working on adding amazing books to our library. Check back soon for exciting content!
          </p>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            EduHansa Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of educational eBooks across various disciplines. 
            Find the perfect resource for your learning journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by title, author, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-background/50 border-primary/20 focus:border-primary/40"
            />
          </div>

          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] h-12 bg-background/50 border-primary/20">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-12 bg-background/50 border-primary/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredBooks.length}</span> of <span className="font-semibold text-foreground">{books.length}</span> books
          </p>
          
          {filteredBooks.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Grid View
              </Badge>
            </div>
          )}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBooks.map((book, index) => (
              <MovieBookCard 
                key={book.id} 
                book={book} 
                gradient={gradients[index % gradients.length]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No books found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {books.length === 0
                ? "No books are available in the library yet. Check back later!"
                : "Try adjusting your search terms or filters to find what you're looking for."}
            </p>
            {books.length > 0 && (
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Featured Categories */}
        {books.length > 0 && (
          <section className="mt-20 py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Explore by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our collection by subject to find exactly what you're looking for
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(1).map((category, index) => {
                const categoryCount = books.filter(book => book.category.toLowerCase() === category.toLowerCase()).length
                const gradient = gradients[index % gradients.length]
                
                return (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`h-auto flex-col p-6 bg-gradient-to-br ${gradient} text-white border-0 hover:scale-105 transition-all duration-300 ${
                      selectedCategory === category ? 'ring-2 ring-white shadow-lg' : ''
                    }`}
                  >
                    <div className="text-2xl font-bold mb-1">{categoryCount}</div>
                    <div className="text-sm opacity-90">{category}</div>
                  </Button>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}