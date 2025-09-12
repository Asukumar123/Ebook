"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, ImageIcon, Tag, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/file-upload"
import { client } from "@/sanity/lib/client"

export default function UploadBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    isbn: "",
    publisher: "",
    publishedDate: "",
    pages: "",
    language: "English",
  })

  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [uploadedFile, setUploadedFile] = useState<any>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const categories = ["technology", "business", "science", "arts", "education", "health"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUploadComplete = (file: any) => {
    setUploadedFile(file)
    setError(null)
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const uploadCoverImageToSanity = async (file: File) => {
    try {
      const asset = await client.assets.upload("image", file, {
        filename: file.name,
      })
      return asset
    } catch (error) {
      console.error("Error uploading cover image:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!uploadedFile) {
        throw new Error("Please upload a file first")
      }

      // Upload cover image to Sanity if provided
      let coverImageAsset = null
      if (coverImage) {
        coverImageAsset = await uploadCoverImageToSanity(coverImage)
      }

      // Create slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const bookDoc = {
        _type: "book",
        title: formData.title,
        slug: {
          _type: "slug",
          current: slug,
        },
        author: formData.author,
        description: formData.description,
        category: formData.category,
        tags: tags,
        fileUrl: uploadedFile.webViewLink || uploadedFile.webContentLink,
        driveFileId: uploadedFile.id,
        fileType: uploadedFile.name?.split(".").pop()?.toLowerCase() || "pdf",
        publishedAt: formData.publishedDate || new Date().toISOString(),
        featured: false,
        ...(coverImageAsset && {
          coverImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: coverImageAsset._id,
            },
          },
        }),
        ...(formData.pages && { pages: Number.parseInt(formData.pages) }),
        ...(formData.isbn && { isbn: formData.isbn }),
        ...(formData.publisher && { publisher: formData.publisher }),
        language: formData.language,
      }

      const result = await client.create(bookDoc)

      setSuccess("eBook uploaded successfully to Sanity CMS!")

      // Reset form
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        isbn: "",
        publisher: "",
        publishedDate: "",
        pages: "",
        language: "English",
      })
      setTags([])
      setUploadedFile(null)
      setCoverImage(null)
    } catch (error) {
      console.error("Upload error:", error)
      setError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold">Upload New eBook</h1>
          <p className="text-muted-foreground">Add a new eBook to the EduHansa library</p>
        </div>
      </div>

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  File Upload
                </CardTitle>
                <CardDescription>Upload the eBook file to Google Drive and cover image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>eBook File (PDF, EPUB, DOCX) *</Label>
                  <div className="mt-2">
                    <FileUpload onUploadComplete={handleFileUploadComplete} />
                    {uploadedFile && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{uploadedFile.name}</span>
                        <Badge variant="outline">Google Drive</Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                  <div className="mt-2">
                    <input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90"
                    />
                    {coverImage && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                        <span>{coverImage.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Basic Information</CardTitle>
                <CardDescription>Essential details about the eBook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter book description"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Additional Details</CardTitle>
                <CardDescription>Optional metadata for better organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      placeholder="978-0-123456-78-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      id="pages"
                      name="pages"
                      type="number"
                      value={formData.pages}
                      onChange={handleInputChange}
                      placeholder="250"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input
                      id="publishedDate"
                      name="publishedDate"
                      type="date"
                      value={formData.publishedDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Publisher name"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center mb-4">
                  {coverImage ? (
                    <img
                      src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                      alt="Cover preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Cover image preview</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold">{formData.title || "Book Title"}</h3>
                  <p className="text-sm text-muted-foreground">{formData.author || "Author Name"}</p>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {formData.description || "Book description will appear here..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <Button type="submit" className="w-full" disabled={isUploading || !uploadedFile}>
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading to Sanity...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Upload eBook
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" className="w-full bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
