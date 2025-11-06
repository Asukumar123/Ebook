// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduHansa - Digital Learning Library",
  description: "Access thousands of educational eBooks and resources. Learn at your own pace with our comprehensive digital library.",
  keywords: ["education", "ebooks", "learning", "digital library", "online books", "educational resources"],
  authors: [{ name: "EduHansa Team" }],
  creator: "EduHansa",
  publisher: "EduHansa",
  openGraph: {
    title: "EduHansa - Digital Learning Library",
    description: "Access thousands of educational eBooks and resources. Learn at your own pace with our comprehensive digital library.",
    url: "https://eduhansa.com",
    siteName: "EduHansa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EduHansa - Digital Learning Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHansa - Digital Learning Library",
    description: "Access thousands of educational eBooks and resources. Learn at your own pace with our comprehensive digital library.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}