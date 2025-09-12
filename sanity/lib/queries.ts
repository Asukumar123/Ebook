import { groq } from "next-sanity"

// Book queries
export const booksQuery = groq`
  *[_type == "book"] | order(publishedAt desc) {
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
    slug
  }
`

export const bookQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
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
    content
  }
`

// Blog queries
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
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
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title
    },
    body
  }
`
