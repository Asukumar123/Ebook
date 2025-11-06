// app/blog/page.tsx
import { Suspense } from 'react'
import ImprovedBlogClient from './improved-blog-client'
import { Card, CardContent } from '@/components/ui/card'
import { client, urlFor } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"

export const revalidate = 60 // Revalidate every minute

// Loading skeleton for blog posts
function BlogSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mb-12">
        <div className="h-12 bg-gradient-to-r from-muted to-muted/50 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-muted rounded w-96 mx-auto animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="aspect-[16/10] bg-muted animate-pulse">
            <CardContent className="p-0 h-full bg-gradient-to-b from-muted to-muted/50 rounded-lg" />
          </Card>
        ))}
      </div>
    </div>
  )
}

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts || []
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

async function BlogContent() {
  const posts = await getPosts()

  // Transform Sanity data to match the expected format
  const transformedPosts = posts.map((post: any) => ({
    id: post._id,
    title: post.title || 'Untitled Article',
    slug: post.slug?.current || '',
    excerpt: post.excerpt || 'No excerpt available.',
    author: post.author?.name || "EduHansa Team",
    authorImage: post.author?.image ? urlFor(post.author.image).url() : null,
    publishedDate: post.publishedAt || new Date().toISOString(),
    readTime: `${Math.ceil((post.excerpt?.length || 300) / 200)} min read`,
    category: post.categories?.[0]?.title || "General",
    tags: post.categories?.map((cat: any) => cat.title) || [],
    coverImage: post.mainImage ? urlFor(post.mainImage).url() : null,
    featured: post.featured || false,
  }))

  return <ImprovedBlogClient posts={transformedPosts} />
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent />
    </Suspense>
  )
}