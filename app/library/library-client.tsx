"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, BookOpen, User, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Book {
  id: string
  title: string
  author: string
  description: string
  category: string
  coverImage: string
  publishedDate: string
  tags: string[]
  pages: number
  format: string
  slug: string
  featured: boolean
}

interface LibraryClientProps {
  books: Book[]
}

const categories = ["All", "Technology", "Business", "Arts", "Science", "Education", "Health"]

export default function LibraryClient({ books }: LibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
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

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">EduHansa Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore our comprehensive collection of educational eBooks across various disciplines. Find the perfect
          resource for your learning journey.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, author, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="author">Author A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredBooks.length} of {books.length} books
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {book.format}
                </Badge>
              </div>
              {book.featured && (
                <div className="absolute top-2 left-2">
                  <Badge className="text-xs bg-primary">Featured</Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-lg line-clamp-2">{book.title}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{book.author}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <CardDescription className="line-clamp-3 mb-3">{book.description}</CardDescription>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="h-3 w-3" />
                <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
                {book.pages > 0 && (
                  <>
                    <span>•</span>
                    <span>{book.pages} pages</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {book.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/library/${book.slug || book.id}`}>
                    <BookOpen className="h-3 w-3 mr-1" />
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">
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
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
