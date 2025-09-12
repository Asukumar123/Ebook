"use client"

import { signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/admin")
      }
    })
  }, [router])

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn("google", { callbackUrl: "/admin" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign In to EduHansa Admin</CardTitle>
          <CardDescription>Sign in with your Google account to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} disabled={loading} className="w-full" size="lg">
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
