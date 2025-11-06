"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, BookOpen, User, X, Sun, Moon, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-context"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, loading, signInWithGoogle, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-background/95 via-primary/5 to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gradient-to-b from-background to-muted">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/library" className="text-lg font-medium hover:text-primary transition-colors">
                Library
              </Link>
              <Link href="/blog" className="text-lg font-medium hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary group-hover:scale-110 transition-transform">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EduHansa
          </span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary relative group">
            Home
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link href="/library" className="font-medium transition-colors hover:text-primary relative group">
            Library
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link href="/blog" className="font-medium transition-colors hover:text-primary relative group">
            Blog
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link href="/about" className="font-medium transition-colors hover:text-primary relative group">
            About
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
       
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input 
                type="search" 
                placeholder="Search eBooks..." 
                className="w-[200px] md:w-[300px] bg-gradient-to-r from-background to-muted border-primary/20" 
                autoFocus 
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* {loading ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gradient-to-b from-background to-muted">
                <DropdownMenuItem className="font-medium">
                  {user.displayName || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={signInWithGoogle} 
              variant="ghost" 
              size="icon"
              className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
            >
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Button>
          )}*/}
        </div> 
      </div>
    </header>
  )
}