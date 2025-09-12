"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Edit, Trash2, Eye, Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for existing books
const mockBooks = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    author: "Dr. Sarah Chen",
    category: "Technology",
    status: "Published",
    uploadDate: "2024-01-15",
    views: 1250,
    downloads: 340,
  },
  {
    id: "2",
    title: "Modern Business Strategy",
    author: "Michael Rodriguez",
    category: "Business",
    status: "Published",
    uploadDate: "2023-11-20",
    views: 890,
    downloads: 210,
  },
  {
    id: "3",
    title: "Creative Writing Masterclass",
    author: "Emma Thompson",
    category: "Arts",
    status: "Draft",
    uploadDate: "2024-02-10",
    views: 45,
    downloads: 12,
  },
]

export default function ManageBooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || book.status === statusFilter
    const matchesCategory = categoryFilter === "All" || book.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold">Manage eBooks</h1>
            <p className="text-muted-foreground">View and manage all eBooks in the library</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/books/upload">
            <Plus className="h-4 w-4 mr-2" />
            Upload New Book
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">eBooks ({filteredBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-primary/10 rounded flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{book.category}</Badge>
                      <Badge variant={book.status === "Published" ? "default" : "secondary"}>{book.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="font-medium">{book.views}</div>
                    <div className="text-xs">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{book.downloads}</div>
                    <div className="text-xs">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{new Date(book.uploadDate).toLocaleDateString()}</div>
                    <div className="text-xs">Uploaded</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "All" || categoryFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "Upload your first eBook to get started"}
              </p>
              <Button asChild>
                <Link href="/admin/books/upload">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Book
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
