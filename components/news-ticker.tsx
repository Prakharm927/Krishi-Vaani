"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/components/language-provider"

// Mock news data
const newsItems = [
  {
    id: 1,
    icon: "🌾",
    text: {
      en: "Rain alert in Maharashtra—delay rice sowing",
      hi: "महाराष्ट्र में बारिश का अलर्ट—चावल की बुवाई में देरी करें",
      mr: "महाराष्ट्रात पावसाचा इशारा—तांदूळ पेरणी उशिरा करा",
      ta: "மகாராஷ்டிராவில் மழை எச்சரிக்கை—நெல் விதைப்பை தாமதப்படுத்தவும்",
      te: "మహారాష్ట్రలో వర్షం హెచ్చరిక—వరి విత్తనాలను ఆలస్యం చేయండి",
      kn: "ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಮಳೆ ಎಚ್ಚರಿಕೆ—ಭತ್ತದ ಬಿತ್ತನೆಯನ್ನು ವಿಳಂಬ ಮಾಡಿ",
      pa: "ਮਹਾਰਾਸ਼ਟਰ ਵਿੱਚ ਮੀਂਹ ਦਾ ਅਲਰਟ—ਝੋਨੇ ਦੀ ਬਿਜਾਈ ਵਿੱਚ ਦੇਰੀ ਕਰੋ",
    },
  },
  {
    id: 2,
    icon: "📢",
    text: {
      en: "₹2,000 PM-KISAN installment released",
      hi: "₹2,000 पीएम-किसान किस्त जारी की गई",
      mr: "₹2,000 पीएम-किसान हप्ता जारी",
      ta: "₹2,000 பிஎம்-கிசான் தவணை வெளியிடப்பட்டது",
      te: "₹2,000 పిఎం-కిసాన్ వాయిదా విడుదల చేయబడింది",
      kn: "₹2,000 ಪಿಎಂ-ಕಿಸಾನ್ ಕಂತು ಬಿಡುಗಡೆಯಾಗಿದೆ",
      pa: "₹2,000 ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤ ਜਾਰੀ ਕੀਤੀ ਗਈ",
    },
  },
  {
    id: 3,
    icon: "🧪",
    text: {
      en: "Fungal blight alert for banana crops in Tamil Nadu",
      hi: "तमिलनाडु में केले की फसलों के लिए फंगल ब्लाइट अलर्ट",
      mr: "तामिळनाडूमध्ये केळी पिकांसाठी बुरशीजन्य करपा सावधानता",
      ta: "தமிழ்நாட்டில் வாழைப் பயிர்களுக்கு பூஞ்சை நோய் எச்சரிக்கை",
      te: "తమిళనాడులో అరటి పంటలకు శిలీంద్ర తెగులు హెచ్చరిక",
      kn: "ತಮಿಳುನಾಡಿನಲ್ಲಿ ಬಾಳೆ ಬೆಳೆಗಳಿಗೆ ಶಿಲೀಂಧ್ರ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ",
      pa: "ਤਮਿਲਨਾਡੂ ਵਿੱਚ ਕੇਲੇ ਦੀਆਂ ਫਸਲਾਂ ਲਈ ਫੰਗਲ ਬਲਾਈਟ ਅਲਰਟ",
    },
  },
  {
    id: 4,
    icon: "🌡️",
    text: {
      en: "Heat wave warning for Gujarat—protect your crops",
      hi: "गुजरात के लिए लू की चेतावनी—अपनी फसलों की रक्षा करें",
      mr: "गुजरातसाठी उष्णतेची लाट चेतावणी—आपल्या पिकांचे संरक्षण करा",
      ta: "குஜராத்திற்கு வெப்ப அலை எச்சரிக்கை—உங்கள் பயிர்களைப் பாதுகாக்கவும்",
      te: "గుజరాత్‌కు వేడి గాలుల హెచ్చరిక—మీ పంటలను రక్షించుకోండి",
      kn: "ಗುಜರಾತ್‌ಗೆ ಶಾಖದ ಅಲೆ ಎಚ್ಚರಿಕೆ—ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ",
      pa: "ਗੁਜਰਾਤ ਲਈ ਗਰਮੀ ਦੀ ਲਹਿਰ ਦੀ ਚੇਤਾਵਨੀ—ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ",
    },
  },
  {
    id: 5,
    icon: "💧",
    text: {
      en: "New drip irrigation subsidy announced for small farmers",
      hi: "छोटे किसानों के लिए नई ड्रिप सिंचाई सब्सिडी की घोषणा",
      mr: "लहान शेतकऱ्यांसाठी नवीन ठिबक सिंचन अनुदानाची घोषणा",
      ta: "சிறு விவசாயிகளுக்கு புதிய சொட்டு நீர்ப்பாசன மானியம் அறிவிப்பு",
      te: "చిన్న రైతులకు కొత్త డ్రిప్ ఇరిగేషన్ సబ్సిడీ ప్రకటన",
      kn: "ಸಣ್ಣ ರೈತರಿಗೆ ಹೊಸ ಹನಿ ನೀರಾವರಿ ಸಬ್ಸಿಡಿ ಘೋಷಣೆ",
      pa: "ਛੋਟੇ ਕਿਸਾਨਾਂ ਲਈ ਨਵੀਂ ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਸਬਸਿਡੀ ਦਾ ਐਲਾਨ",
    },
  },
]

export default function NewsTicker() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tickerRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, translate } = useLanguage()

  // Auto-scroll news items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Get translated news text based on current language
  const getNewsText = (item: (typeof newsItems)[0]) => {
    return item.text[currentLanguage.code as keyof typeof item.text] || item.text.en
  }

  return (
    <div className="bg-yellow-100 py-2 border-b border-yellow-200 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium mr-3 whitespace-nowrap">
            {translate("AGRI NEWS")}
          </div>
          <div className="overflow-hidden relative flex-1" ref={tickerRef}>
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="min-w-full px-4 py-1 text-green-800 font-medium flex items-center whitespace-nowrap"
                >
                  <span className="mr-2">{item.icon}</span>
                  {getNewsText(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex ml-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === activeIndex ? "bg-green-600" : "bg-green-200"}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`News item ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
