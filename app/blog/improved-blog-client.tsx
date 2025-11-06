// app/blog/improved-blog-client.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Calendar, User, ArrowRight, Tag, Clock, Search, Filter, Play, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  authorImage: string | null
  publishedDate: string
  readTime: string
  category: string
  tags: string[]
  coverImage: string
  featured: boolean
}

interface BlogClientProps {
  posts: BlogPost[]
}

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

const categories = ["All", "Technology", "Education", "Science", "Business", "Health", "Arts"]

// Movie-style blog card
function MovieBlogCard({ post, gradient }: { post: BlogPost; gradient: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="group relative overflow-hidden bg-black border-0 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.coverImage || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop&crop=center`}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop&crop=center`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-80 transition-all duration-500`} />
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 animate-pulse">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge 
            variant="secondary" 
            className="bg-black/50 text-white backdrop-blur-sm border-0 font-medium"
          >
            {post.category}
          </Badge>
        </div>

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110">
            <Eye className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-base leading-tight mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
          {post.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="truncate">{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
          
          <Button 
            asChild 
            size="sm" 
            className={`bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 px-4 py-1 text-xs`}
          >
            <Link href={`/blog/${post.slug}`}>
              Read More
            </Link>
          </Button>
        </div>
      </div>

      {/* Hover Details Panel */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 p-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-end">
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-gray-300 border-gray-600 bg-black/30">
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate">{post.author}</span>
              </div>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <Button 
              asChild 
              size="sm" 
              className={`bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 px-3 py-1 text-xs`}
            >
              <Link href={`/blog/${post.slug}`}>
                <ArrowRight className="h-3 w-3 mr-1" />
                Read Article
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Hero blog card for featured posts
function HeroBlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group relative overflow-hidden bg-black border-0 cursor-pointer col-span-2 row-span-2">
      <div className="relative aspect-[2/1] overflow-hidden">
        <img
          src={post.coverImage || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop&crop=center`}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute top-6 left-6 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 text-sm">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Featured Article
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4 line-clamp-2 group-hover:text-yellow-300 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-300 text-lg mb-6 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Link href={`/blog/${post.slug}`}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Read Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function ImprovedBlogClient({ posts = [] }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
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

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  if (posts.length === 0) {
    return (
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No Articles Available</h2>
          <p className="text-muted-foreground mb-6">
            Our team is working on creating engaging content for you. Check back soon!
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
            EduHansa Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Insights, tips, and the latest trends in educational technology and learning science. 
            Stay informed with expert perspectives on the future of education.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search articles by title, author, or tags..."
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
            Showing <span className="font-semibold text-foreground">{filteredPosts.length}</span> of <span className="font-semibold text-foreground">{posts.length}</span> articles
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  {featuredPosts[0] && <HeroBlogCard post={featuredPosts[0]} />}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {featuredPosts.slice(1, 5).map((post, index) => (
                      <MovieBlogCard 
                        key={post.id} 
                        post={post} 
                        gradient={gradients[index % gradients.length]}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {featuredPosts.length > 0 ? 'Latest Articles' : 'All Articles'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {regularPosts.map((post, index) => (
                    <MovieBlogCard 
                      key={post.id} 
                      post={post} 
                      gradient={gradients[index % gradients.length]}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-20 py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl">
          <div className="text-center max-w-2xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Subscribe to our newsletter to receive the latest insights on educational technology and learning science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 bg-background/50 border-primary/20"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-12 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}