import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/client"
import { booksQuery } from "@/sanity/lib/queries"
import LibraryClient from "./library-client"

export const revalidate = 60 // Revalidate every minute

async function getBooks() {
  try {
    const books = await client.fetch(booksQuery)
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

export default async function LibraryPage() {
  const books = await getBooks()

  // Transform Sanity data to match the expected format
  const transformedBooks = books.map((book: any) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    description: book.description,
    category: book.category,
    coverImage: book.coverImage ? urlFor(book.coverImage).url() : "/placeholder.svg",
    publishedDate: book.publishedAt,
    tags: book.tags || [],
    pages: book.pages || 0,
    format: book.fileType?.toUpperCase() || "PDF",
    slug: book.slug?.current,
    featured: book.featured || false,
  }))

  return <LibraryClient books={transformedBooks} />
}
