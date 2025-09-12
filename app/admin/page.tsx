"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, FileText, MessageSquare, Users, Upload, Settings, BarChart3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { client } from "@/sanity/lib/client"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalBlogPosts: 0,
    totalUsers: 0,
    pendingMessages: 0,
    monthlyUploads: 0,
    monthlyViews: 0,
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [books, posts] = await Promise.all([
          client.fetch('count(*[_type == "book"])'),
          client.fetch('count(*[_type == "post"])'),
        ])

        const recentBooks = await client.fetch(`
          *[_type == "book"] | order(_createdAt desc)[0...3] {
            _id,
            title,
            _createdAt,
            _updatedAt
          }
        `)

        const recentPosts = await client.fetch(`
          *[_type == "post"] | order(_createdAt desc)[0...3] {
            _id,
            title,
            _createdAt,
            _updatedAt
          }
        `)

        const activity = [
          ...recentBooks.map((book: any) => ({
            type: "book",
            title: book.title,
            action: "uploaded",
            time: new Date(book._createdAt).toLocaleDateString(),
          })),
          ...recentPosts.map((post: any) => ({
            type: "blog",
            title: post.title,
            action: "published",
            time: new Date(post._createdAt).toLocaleDateString(),
          })),
        ]
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 4)

        setStats({
          totalBooks: books,
          totalBlogPosts: posts,
          totalUsers: 12543, // Mock data - would come from user management system
          pendingMessages: 23, // Mock data - would come from contact form submissions
          monthlyUploads: books, // Simplified - would be filtered by date
          monthlyViews: 89234, // Mock data - would come from analytics
        })

        setRecentActivity(activity as any)
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: "Upload New eBook",
      description: "Add a new eBook to the library",
      icon: Upload,
      href: "/admin/books/upload",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Sanity Studio",
      description: "Manage content with Sanity CMS",
      icon: ExternalLink,
      href: "/admin/studio",
      color: "bg-secondary/10 text-secondary",
      external: true,
    },
    {
      title: "Manage Books",
      description: "Edit or remove existing eBooks",
      icon: BookOpen,
      href: "/admin/books",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "View Messages",
      description: "Check contact form submissions",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your EduHansa platform</p>
        </div>
        <Button asChild>
          <Link href="/admin/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Books</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalBlogPosts}</p>
                <p className="text-xs text-muted-foreground">Blog Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.pendingMessages}</p>
                <p className="text-xs text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.monthlyUploads}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      {action.external ? (
                        <a href={action.href} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold mb-1">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <Link href={action.href} className="block">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold mb-1">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Recent Activity</CardTitle>
              <CardDescription>Latest platform updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity: any, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {activity.type === "book" && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === "blog" && <FileText className="h-4 w-4 text-secondary" />}
                        {activity.type === "message" && <MessageSquare className="h-4 w-4 text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
