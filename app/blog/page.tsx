import Link from "next/link"
import { Calendar, User, ArrowRight, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { client, urlFor } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"

export const revalidate = 60 // Revalidate every minute

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  // Transform Sanity data to match the expected format
  const transformedPosts = posts.map((post: any) => ({
    id: post._id,
    title: post.title,
    slug: post.slug?.current,
    excerpt: post.excerpt,
    author: post.author?.name || "EduHansa Team",
    authorImage: post.author?.image ? urlFor(post.author.image).url() : null,
    publishedDate: post.publishedAt,
    readTime: `${Math.ceil((post.excerpt?.length || 0) / 200)} min read`, // Estimate read time
    category: post.categories?.[0]?.title || "General",
    tags: post.categories?.map((cat: any) => cat.title) || [],
    coverImage: post.mainImage ? urlFor(post.mainImage).url() : "/blog-post-cover.png",
    featured: post.featured || false,
  }))

  const featuredPosts = transformedPosts.filter((post: any) => post.featured)
  const regularPosts = transformedPosts.filter((post: any) => !post.featured)

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">EduHansa Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, tips, and the latest trends in educational technology and learning science. Stay informed with
          expert perspectives on the future of education.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post: any) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="font-heading line-clamp-2">{post.title}</CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3 mb-4">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-heading font-bold mb-8">
          {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
        </h2>
        {regularPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post: any) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="font-heading line-clamp-2">{post.title}</CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-heading font-semibold mb-2">No articles yet</h3>
            <p className="text-muted-foreground">
              {featuredPosts.length > 0
                ? "Check back soon for more articles!"
                : "We're working on bringing you great content. Check back soon!"}
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16 py-12 bg-muted/30 rounded-lg">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-heading font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to receive the latest insights on educational technology and learning science.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
