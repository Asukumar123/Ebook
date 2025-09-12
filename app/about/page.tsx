import { BookOpen, Users, Target, Award, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Educational technology expert with 15+ years of experience in digital learning platforms.",
      expertise: ["EdTech Strategy", "Learning Science", "Product Development"],
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Content",
      bio: "Former university professor specializing in curriculum development and educational content creation.",
      expertise: ["Curriculum Design", "Content Strategy", "Academic Writing"],
    },
    {
      name: "Dr. Emma Thompson",
      role: "Chief Learning Officer",
      bio: "Cognitive scientist focused on understanding how people learn and retain information.",
      expertise: ["Learning Psychology", "User Research", "Assessment Design"],
    },
    {
      name: "Lisa Park",
      role: "Head of Technology",
      bio: "Full-stack developer passionate about creating accessible and user-friendly educational platforms.",
      expertise: ["Web Development", "UX Design", "Accessibility"],
    },
  ]

  const values = [
    {
      icon: BookOpen,
      title: "Knowledge Accessibility",
      description:
        "We believe quality education should be accessible to everyone, regardless of location or background.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Learning is enhanced through collaboration and shared experiences within supportive communities.",
    },
    {
      icon: Target,
      title: "Continuous Innovation",
      description:
        "We constantly evolve our platform to incorporate the latest research in learning science and technology.",
    },
    {
      icon: Award,
      title: "Excellence in Education",
      description: "We maintain the highest standards in content quality and educational effectiveness.",
    },
  ]

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About EduHansa</h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Empowering minds through accessible digital learning resources. We're on a mission to democratize education
            and make quality learning materials available to everyone, everywhere.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold text-primary">EduHansa</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To break down barriers to quality education by providing a comprehensive digital library of educational
                resources that are accessible, engaging, and effective. We strive to create a platform where learners of
                all backgrounds can discover, access, and benefit from world-class educational content.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-secondary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where geographical, economic, and social barriers don't limit access to quality education. We
                envision a future where every individual has the opportunity to learn, grow, and reach their full
                potential through accessible digital learning resources.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do at EduHansa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">Our Story</h2>
          <div className="prose prose-gray max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              EduHansa was founded in 2020 with a simple yet powerful idea: that everyone deserves access to quality
              educational resources, regardless of their circumstances. Our founders, a group of educators and
              technologists, recognized the growing need for accessible digital learning platforms.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              What started as a small collection of curated eBooks has grown into a comprehensive educational platform
              serving thousands of learners worldwide. We've partnered with leading educational institutions,
              publishers, and content creators to build one of the most diverse and high-quality digital libraries
              available today.
            </p>
            <p className="text-lg leading-relaxed">
              Today, EduHansa continues to evolve, incorporating the latest research in learning science and educational
              technology to provide the best possible learning experience for our users. We're proud to be part of the
              global movement toward more accessible and inclusive education.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind EduHansa's mission to democratize education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-heading">{member.name}</CardTitle>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">eBooks Available</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-2">50,000+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Subject Areas</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info */}
      <section>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Get in Touch</CardTitle>
            <p className="text-muted-foreground">Have questions about EduHansa? We'd love to hear from you.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span className="font-medium">Email</span>
                <span className="text-sm text-muted-foreground">hello@eduhansa.com</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-medium">Phone</span>
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-medium">Address</span>
                <span className="text-sm text-muted-foreground">San Francisco, CA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
