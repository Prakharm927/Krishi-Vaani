"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color?: string
}

export default function FeatureCard({ title, description, icon, href, color = "bg-green-50" }: FeatureCardProps) {
  const { translate } = useLanguage()

  return (
    <Link href={href} className="block h-full">
      <Card className={`h-full hover:shadow-md transition-shadow ${color}`}>
        <CardHeader>
          <div className="mb-2">{icon}</div>
          <CardTitle className="text-lg">{translate(title)}</CardTitle>
          <CardDescription>{translate(description)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-right">
            <span className="text-green-600 font-medium">{translate("Learn More")} →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
