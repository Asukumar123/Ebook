"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Clock, User, MessageSquare, Trash2, Award as MarkAsRead } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MessagesPage() {
  const [messages] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Question about Machine Learning eBook",
      message:
        "Hi, I'm interested in the Machine Learning eBook. Can you provide more details about the content and prerequisites?",
      timestamp: "2024-03-15T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      subject: "Bulk licensing inquiry",
      message:
        "Hello, I represent a university and we're interested in bulk licensing for your educational content. Could we discuss pricing options?",
      timestamp: "2024-03-14T15:45:00Z",
      read: true,
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      subject: "Technical issue with download",
      message:
        "I'm having trouble downloading the PDF version of the Business Strategy book. The download keeps failing. Can you help?",
      timestamp: "2024-03-13T09:15:00Z",
      read: false,
    },
  ])

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`${!message.read ? "border-primary/50 bg-primary/5" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-heading text-lg">{message.subject}</CardTitle>
                    {!message.read && (
                      <Badge variant="default" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{message.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{message.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MarkAsRead className="h-4 w-4 mr-2" />
                    {message.read ? "Mark Unread" : "Mark Read"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">{message.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Contact form submissions will appear here.</p>
        </div>
      )}
    </div>
  )
}
