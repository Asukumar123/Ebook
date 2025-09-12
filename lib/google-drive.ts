import { google } from "googleapis"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export async function getGoogleDriveClient() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error("No access token available")
  }

  const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

  auth.setCredentials({
    access_token: session.accessToken,
  })

  return google.drive({ version: "v3", auth })
}

export async function uploadFileToDrive(file: Buffer, fileName: string, mimeType: string, folderId?: string) {
  const drive = await getGoogleDriveClient()

  const fileMetadata: any = {
    name: fileName,
  }

  if (folderId) {
    fileMetadata.parents = [folderId]
  }

  const media = {
    mimeType,
    body: Buffer.from(file),
  }

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id,name,webViewLink,webContentLink",
  })

  // Make file publicly readable
  await drive.permissions.create({
    fileId: response.data.id!,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  })

  return response.data
}

export async function getFileFromDrive(fileId: string) {
  const drive = await getGoogleDriveClient()

  const response = await drive.files.get({
    fileId,
    fields: "id,name,mimeType,size,webViewLink,webContentLink",
  })

  return response.data
}

export async function downloadFileFromDrive(fileId: string) {
  const drive = await getGoogleDriveClient()

  const response = await drive.files.get({
    fileId,
    alt: "media",
  })

  return response.data
}

export async function listDriveFiles(folderId?: string) {
  const drive = await getGoogleDriveClient()

  const query = folderId ? `'${folderId}' in parents` : undefined

  const response = await drive.files.list({
    q: query,
    fields: "files(id,name,mimeType,size,createdTime,webViewLink)",
    orderBy: "createdTime desc",
  })

  return response.data.files || []
}

export async function createDriveFolder(name: string, parentFolderId?: string) {
  const drive = await getGoogleDriveClient()

  const fileMetadata: any = {
    name,
    mimeType: "application/vnd.google-apps.folder",
  }

  if (parentFolderId) {
    fileMetadata.parents = [parentFolderId]
  }

  const response = await drive.files.create({
    requestBody: fileMetadata,
    fields: "id,name",
  })

  return response.data
}
