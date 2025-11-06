// app/page.tsx
import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { MovieGrid } from '@/components/movie-style-cards'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { booksQuery, postsQuery } from '@/sanity/lib/queries'

// Loading components
function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="aspect-[2/3] bg-muted animate-pulse">
          <CardContent className="p-0 h-full bg-gradient-to-b from-muted to-muted/50 rounded-lg" />
        </Card>
      ))}
    </div>
  )
}

// Data fetching functions with error handling
async function getFeaturedBooks() {
  try {
    const books = await client.fetch(`
      *[_type == "book" && featured == true] | order(publishedAt desc)[0...6] {
        _id,
        title,
        author,
        description,
        category,
        tags,
        coverImage,
        fileUrl,
        publishedAt,
        featured,
        slug,
        fileType
      }
    `)
    
    return books.map((book: any) => ({
      id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      coverImage: book.coverImage ? urlFor(book.coverImage).url() : null,
      publishedDate: book.publishedAt,
      tags: book.tags || [],
      format: book.fileType?.toUpperCase() || 'PDF',
      slug: book.slug?.current,
      featured: book.featured
    }))
  } catch (error) {
    console.error('Error fetching featured books:', error)
    return []
  }
}

async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post" && featured == true] | order(publishedAt desc)[0...6] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        author->{
          name,
          image
        },
        categories[]->{
          title
        }
      }
    `)
    
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author?.name || 'EduHansa Team',
      publishedDate: post.publishedAt,
      readTime: `${Math.ceil((post.excerpt?.length || 0) / 200)} min read`,
      category: post.categories?.[0]?.title || 'General',
      coverImage: post.mainImage ? urlFor(post.mainImage).url() : null,
      slug: post.slug?.current,
      featured: true
    }))
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Component for featured books
async function FeaturedBooks() {
  const books = await getFeaturedBooks()
  
  if (!books.length) {
    return (
      <section className="py-16 bg-gradient-to-b from-background via-red-50/20 to-background dark:via-red-950/20">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-md mx-auto">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">No Books Available</h3>
            <p className="text-muted-foreground mb-6">
              We're working on adding amazing books to our collection. Check back soon!
            </p>
            <Button asChild>
              <Link href="/library">Browse All Books</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <MovieGrid 
      items={books} 
      type="book" 
      title="Featured Books" 
      viewAllLink="/library"
    />
  )
}

// Component for featured blog posts
async function FeaturedPosts() {
  const posts = await getFeaturedPosts()
  
  if (!posts.length) {
    return (
      <section className="py-16 bg-gradient-to-b from-background via-blue-50/20 to-background dark:via-blue-950/20">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-md mx-auto">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">No Articles Available</h3>
            <p className="text-muted-foreground mb-6">
              Our team is working on creating engaging content for you. Stay tuned!
            </p>
            <Button asChild>
              <Link href="/blog">Visit Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <MovieGrid 
      items={posts} 
      type="blog" 
      title="Featured Articles" 
      viewAllLink="/blog"
    />
  )
}

// Stats section
function StatsSection() {
  const stats = [
    {
      icon: BookOpen,
      value: "100+",
      label: "eBooks Available",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: "500+",
      label: "Active Learners",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Star,
      value: "100+",
      label: "Subject Areas",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "User Satisfaction",
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of learners and discover why EduHansa is the preferred choice for digital education
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-gradient-to-b from-background to-muted/50 border-primary/10 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Categories showcase
function CategoriesSection() {
  const categories = [
    { name: "Technology", count: "2,500+", color: "from-blue-500 to-cyan-500", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop" },
    { name: "Business", count: "1,800+", color: "from-green-500 to-emerald-500", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" },
    { name: "Science", count: "3,200+", color: "from-purple-500 to-pink-500", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop" },
    { name: "Arts", count: "1,500+", color: "from-yellow-500 to-orange-500", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop" },
    { name: "Education", count: "2,200+", color: "from-red-500 to-pink-500", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
    { name: "Health", count: "1,100+", color: "from-teal-500 to-cyan-500", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop" }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover books and articles across various subjects tailored to your interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/library?category=${category.name.toLowerCase()}`}>
              <Card className="group relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-70 group-hover:opacity-50 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                      {category.count} books
                    </Badge>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main page component
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      
      <Suspense fallback={
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
            <GridSkeleton />
          </div>
        </section>
      }>
        <FeaturedBooks />
      </Suspense>
      
      <CategoriesSection />
      
      <Suspense fallback={
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <GridSkeleton />
          </div>
        </section>
      }>
        <FeaturedPosts />
      </Suspense>
    </main>
  )
}