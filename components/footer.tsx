"use client"

import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { translate } = useLanguage()

  return (
    <footer className="bg-green-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-green-100">
          {translate("Made with")} ❤️ {translate("by")} {translate("Krishi Vaani Team")}
        </p>
        <p className="text-xs text-green-200 mt-1">© 2024 Krishi Vaani. {translate("All rights reserved.")}</p>
      </div>
    </footer>
  )
}
