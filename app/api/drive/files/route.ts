import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { listDriveFiles } from "@/lib/google-drive"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get("folderId")

    const files = await listDriveFiles(folderId || undefined)

    return NextResponse.json({
      success: true,
      files,
    })
  } catch (error) {
    console.error("List files error:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}
