"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ZoomIn, ZoomOut, RotateCw, Bookmark, Settings, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { bookQuery } from "@/sanity/lib/queries"

interface ReaderPageProps {
  params: {
    slug: string
  }
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState([100])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await client.fetch(bookQuery, { slug: params.slug })
        setBook(bookData)
      } catch (error) {
        console.error("Error fetching book:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.slug])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= 450) {
      // Default max pages
      setCurrentPage(page)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading book...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Button asChild>
            <Link href="/library">Back to Library</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Reader Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/library/${params.slug}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>

              <div className="hidden md:block">
                <h1 className="font-heading font-semibold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">
                {book.category}
              </Badge>

              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>

              {book.fileUrl && (
                <Button asChild variant="ghost" size="sm">
                  <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reader Controls */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoom([Math.max(50, zoom[0] - 25)])}>
                  <ZoomOut className="h-4 w-4" />
                </Button>

                <div className="w-24">
                  <Slider value={zoom} onValueChange={setZoom} max={200} min={50} step={25} className="w-full" />
                </div>

                <Button variant="outline" size="sm" onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}>
                  <ZoomIn className="h-4 w-4" />
                </Button>

                <span className="text-sm text-muted-foreground min-w-[3rem]">{zoom[0]}%</span>
              </div>

              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number.parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 text-sm border rounded text-center"
                    min="1"
                    max="450"
                  />
                  <span className="text-sm text-muted-foreground">of 450</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= 450}
                >
                  Next
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="container px-4 py-8 mx-auto">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {book.fileUrl ? (
                <div className="text-center space-y-4">
                  <h2 className="font-heading text-2xl font-bold">{book.title}</h2>
                  <p className="text-muted-foreground">
                    This book is stored on Google Drive. Click the button below to open it in a new tab.
                  </p>
                  <Button asChild size="lg">
                    <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Book in Google Drive
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none" style={{ fontSize: `${zoom[0]}%` }}>
                  {/* Mock content when no file URL is available */}
                  <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-muted-foreground">Page {currentPage}</p>
                  </div>

                  <div className="space-y-6 text-justify leading-relaxed">
                    <p>{book.description}</p>

                    <div className="bg-muted/50 p-4 rounded-lg mt-6">
                      <p className="text-sm text-muted-foreground italic">
                        This is a preview of the eBook reader interface. The actual book content would be loaded from
                        the Google Drive file URL when available.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
