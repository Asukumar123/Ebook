"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "hello@eduhansa.com",
      action: "mailto:hello@eduhansa.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team during business hours",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come visit our headquarters in San Francisco",
      contact: "123 Education St, San Francisco, CA 94105",
      action: "#",
    },
  ]

  const faqs = [
    {
      question: "How do I access eBooks on EduHansa?",
      answer:
        "Simply browse our library, select any eBook, and click 'Read Online' to start reading immediately in your browser.",
    },
    {
      question: "Is EduHansa free to use?",
      answer: "Yes! EduHansa offers free access to our entire library of educational eBooks and resources.",
    },
    {
      question: "Can I download eBooks for offline reading?",
      answer: "Yes, most eBooks in our library can be downloaded for offline reading in PDF or EPUB format.",
    },
    {
      question: "How often is new content added?",
      answer: "We add new eBooks and educational resources weekly, covering a wide range of subjects and topics.",
    },
  ]

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Contact EduHansa</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, suggestions, or need support? We're here to help and would love to hear from you.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting EduHansa. We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold mb-1">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                      <a href={info.action} className="text-sm font-medium text-primary hover:underline">
                        {info.contact}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monday - Friday</span>
                <span className="text-muted-foreground">9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Saturday</span>
                <span className="text-muted-foreground">10:00 AM - 4:00 PM PST</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sunday</span>
                <span className="text-muted-foreground">Closed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Quick answers to common questions about EduHansa</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="font-heading text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Notice */}
      <section className="mt-16">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-heading font-bold mb-4">Need Immediate Help?</h3>
            <p className="text-muted-foreground mb-6">
              For urgent technical issues or account problems, please email us directly at{" "}
              <a href="mailto:support@eduhansa.com" className="text-primary font-medium hover:underline">
                support@eduhansa.com
              </a>{" "}
              and we'll respond within 2 hours during business hours.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
