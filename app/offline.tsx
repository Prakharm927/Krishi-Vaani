"use client"

import Link from "next/link"
import { Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Offline() {
  return (
    <div className="min-h-screen bg-[#f8f5eb] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">You're offline</h1>
        <p className="text-gray-600 mb-6">
          Krishi Vaani requires an internet connection for some features. However, you can still access previously
          visited pages and use basic voice features in offline mode.
        </p>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full bg-green-600 hover:bg-green-700">
            <Wifi className="mr-2 h-4 w-4" />
            Try to reconnect
          </Button>

          <Link href="/" passHref>
            <Button variant="outline" className="w-full">
              Go to home page
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="font-medium text-gray-700 mb-2">Available offline:</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Basic voice recognition (limited)</li>
            <li>• Previously loaded crop disease information</li>
            <li>• Cached weather data</li>
            <li>• Irrigation calculations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
