"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onUploadComplete?: (file: any) => void
  folderId?: string
}

export function FileUpload({ onUploadComplete, folderId }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      if (folderId) {
        formData.append("folderId", folderId)
      }

      const response = await fetch("/api/drive/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      setProgress(100)
      onUploadComplete?.(data.file)
      setFile(null)

      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload eBook File</Label>
        <Input
          id="file-upload"
          type="file"
          accept=".pdf,.epub,.docx"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <p className="text-sm text-muted-foreground">Supported formats: PDF, EPUB, DOCX (max 50MB)</p>
      </div>

      {file && (
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
          <FileText className="h-4 w-4" />
          <span className="text-sm font-medium">{file.name}</span>
          <span className="text-sm text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">Uploading to Google Drive...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Uploading..." : "Upload to Google Drive"}
      </Button>
    </div>
  )
}
