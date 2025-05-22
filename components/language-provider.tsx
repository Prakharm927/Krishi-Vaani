"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = {
  code: string
  name: string
}

export const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "mr", name: "मराठी (Marathi)" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  translate: (text: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  translate: (text) => text,
})

export const useLanguage = () => useContext(LanguageContext)

// Mock translations for demonstration
const translations: Record<string, Record<string, string>> = {
  hi: {
    Home: "होम",
    About: "हमारे बारे में",
    Contact: "संपर्क करें",
    Login: "लॉगिन",
    Register: "रजिस्टर",
    "Made with": "बनाया गया",
    by: "द्वारा",
    "Krishi Vaani Team": "कृषि वाणी टीम",
    "All rights reserved.": "सर्वाधिकार सुरक्षित।",
    "AGRI NEWS": "कृषि समाचार",
    "Voice-Based Q&A": "आवाज-आधारित प्रश्नोत्तर",
    "Crop Disease Detection": "फसल रोग पहचान",
    "Weather Alerts": "मौसम अलर्ट",
    "Smart Irrigation": "स्मार्ट सिंचाई",
    "Market Prices": "बाजार मूल्य",
    "Government Schemes": "सरकारी योजनाएं",
    "Ask your farming questions by voice in any language": "किसी भी भाषा में आवाज से अपने कृषि प्रश्न पूछें",
    "Upload crop photos to identify diseases": "रोगों की पहचान के लिए फसल की तस्वीरें अपलोड करें",
    "Get hyperlocal weather forecasts and alerts": "हाइपरलोकल मौसम पूर्वानुमान और अलर्ट प्राप्त करें",
    "Personalized irrigation schedules for your crops": "आपकी फसलों के लिए व्यक्तिगत सिंचाई कार्यक्रम",
    "AI-powered market price predictions": "AI-संचालित बाजार मूल्य भविष्यवाणियां",
    "Get notified about relevant government schemes": "प्रासंगिक सरकारी योजनाओं के बारे में सूचित रहें",
    "Voice-First Agricultural Advisory for Rural Farmers": "ग्रामीण किसानों के लिए आवाज-प्रथम कृषि सलाह",
    "Krishi Vaani provides AI-powered agricultural advice through voice in 10+ Indian languages, designed for rural farmers with limited connectivity.":
      "कृषि वाणी 10+ भारतीय भाषाओं में आवाज के माध्यम से AI-संचालित कृषि सलाह प्रदान करती है, जो सीमित कनेक्टिविटी वाले ग्रामीण किसानों के लिए डिज़ाइन की गई है।",
    "Get Started": "शुरू करें",
    "Learn More": "और जानें",
  },
  // Add other languages as needed
}

// Simple translation function
function translateText(text: string, langCode: string): string {
  if (langCode === "en") return text
  return translations[langCode]?.[text] || text
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem("language")
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("language", lang.code)
  }

  const translate = (text: string) => {
    return translateText(text, currentLanguage.code)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>{children}</LanguageContext.Provider>
  )
}
