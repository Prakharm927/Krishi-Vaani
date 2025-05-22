"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, User } from "lucide-react"
import { useLanguage, languages } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { currentLanguage, setLanguage, translate } = useLanguage()

  // Main navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Krishi Vaani Logo"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <span className="font-bold text-green-800 text-lg">Krishi Vaani</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {translate(item.name)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Globe size={16} />
                  <span className="hidden sm:inline">{currentLanguage.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang)}
                    className={lang.code === currentLanguage.code ? "bg-green-50 text-green-800" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/Register */}
            <div className="hidden md:block">
              <Link href="/login">
                <Button variant="outline" size="sm" className="mr-2">
                  {translate("Login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  {translate("Register")}
                </Button>
              </Link>
            </div>

            {/* Mobile Login Icon */}
            <div className="md:hidden">
              <Link href="/login">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <User size={18} />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden bg-green-50 text-green-800 p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-3 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-green-100 text-green-800"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {translate(item.name)}
                </Link>
              ))}
              <div className="flex space-x-2 mt-2 pt-2 border-t">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    {translate("Login")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    {translate("Register")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
