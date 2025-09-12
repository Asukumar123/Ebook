import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, User, Calendar, Tag, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { client, urlFor } from "@/sanity/lib/client"
import { bookQuery } from "@/sanity/lib/queries"
import { PortableText } from "@portabletext/react"

export const revalidate = 60

async function getBook(slug: string) {
  try {
    const book = await client.fetch(bookQuery, { slug })
    return book
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}

interface BookPageProps {
  params: {
    slug: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBook(params.slug)

  if (!book) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/library">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-6">
                <img
                  src={book.coverImage ? urlFor(book.coverImage).url() : "/placeholder.svg"}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{book.fileType?.toUpperCase() || "PDF"}</Badge>
                </div>
                {book.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link href={`/library/${book.slug?.current}/read`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Online
                  </Link>
                </Button>

                {book.fileUrl && (
                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                    <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                )}

                {book.fileUrl && (
                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                    <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-4">{book.title}</h1>

            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{book.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(book.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Book Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                  <dd className="text-sm capitalize">{book.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                  <dd className="text-sm">{book.fileType?.toUpperCase() || "PDF"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Language</dt>
                  <dd className="text-sm">English</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Publisher</dt>
                  <dd className="text-sm">EduHansa Press</dd>
                </div>
              </div>
            </CardContent>
          </Card>

          {book.content && (
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <PortableText value={book.content} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
