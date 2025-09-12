import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { downloadFileFromDrive, getFileFromDrive } from "@/lib/google-drive"

export async function GET(request: NextRequest, { params }: { params: { fileId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { fileId } = params

    // Get file metadata first
    const fileInfo = await getFileFromDrive(fileId)

    // Download file content
    const fileContent = await downloadFileFromDrive(fileId)

    return new NextResponse(fileContent as any, {
      headers: {
        "Content-Type": fileInfo.mimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileInfo.name}"`,
      },
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
  }
}
