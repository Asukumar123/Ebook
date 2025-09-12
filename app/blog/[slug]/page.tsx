import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { client, urlFor } from "@/sanity/lib/client"
import { postQuery, postsQuery } from "@/sanity/lib/queries"
import { PortableText } from "@portabletext/react"

export const revalidate = 60

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug })
    return post
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

async function getRelatedPosts(currentPostId: string) {
  try {
    const posts = await client.fetch(postsQuery)
    return posts.filter((post: any) => post._id !== currentPostId).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post._id)

  // Transform related posts data
  const transformedRelatedPosts = relatedPosts.map((relatedPost: any) => ({
    id: relatedPost._id,
    title: relatedPost.title,
    slug: relatedPost.slug?.current,
    author: relatedPost.author?.name || "EduHansa Team",
    readTime: `${Math.ceil((relatedPost.excerpt?.length || 0) / 200)} min read`,
    coverImage: relatedPost.mainImage ? urlFor(relatedPost.mainImage).url() : "/blog-post-cover.png",
  }))

  const readTime = `${Math.ceil((post.excerpt?.length || 0) / 200)} min read`

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <article className="mb-12">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {post.categories?.[0] && <Badge variant="outline">{post.categories[0].title}</Badge>}
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-balance">{post.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {post.author?.image ? (
                    <img
                      src={urlFor(post.author.image).width(32).height(32).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{post.author?.name || "EduHansa Team"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories?.map((category: any) => (
                <Badge key={category._id} variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {category.title}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cover Image */}
          {post.mainImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <img
                src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4">
            {post.body ? <PortableText value={post.body} /> : <p className="text-muted-foreground">{post.excerpt}</p>}
          </div>
        </article>

        {/* Author Bio */}
        {post.author && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-heading">About the Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {post.author.image ? (
                    <img
                      src={urlFor(post.author.image).width(64).height(64).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-2">{post.author.name}</h3>
                  <div className="text-muted-foreground text-sm">
                    {post.author.bio ? (
                      <PortableText value={post.author.bio} />
                    ) : (
                      <p>
                        An expert in educational technology with years of experience in digital learning platforms and
                        instructional design. Passionate about making education more accessible and engaging through
                        technology.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Posts */}
        {transformedRelatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-heading font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {transformedRelatedPosts.map((relatedPost: any) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="h-3 w-3" />
                      <span>{relatedPost.author}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                      <Link href={`/blog/${relatedPost.slug}`}>Read Article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading font-bold mb-4">Explore Our eBook Library</h3>
            <p className="text-muted-foreground mb-6">
              Discover thousands of educational resources to support your learning journey.
            </p>
            <Button asChild size="lg">
              <Link href="/library">Browse Library</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
