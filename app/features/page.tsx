import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, VolumeIcon as VolumeUp, Globe, Cloud, BarChart, Smartphone, Zap, Shield, Leaf } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f8f5eb]">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Krishi Vaani Logo"
            width={40}
            height={40}
            className="rounded-full bg-green-600"
          />
          <h1 className="text-xl font-bold text-green-800">Krishi Vaani</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-green-800 hover:text-green-600">
            Home
          </Link>
          <Link href="/features" className="text-green-800 hover:text-green-600 font-semibold">
            Features
          </Link>
          <Link href="/about" className="text-green-800 hover:text-green-600">
            About
          </Link>
          <Link href="/contact" className="text-green-800 hover:text-green-600">
            Contact
          </Link>
        </nav>
        <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
      </header>

      {/* Features Hero */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Powerful Features for Rural Farmers</h1>
          <p className="text-xl text-gray-700 mb-8">
            Discover how Krishi Vaani is revolutionizing agricultural advisory with voice-based AI technology.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Voice Recognition</h3>
            <p className="text-gray-600">
              Advanced AI technology that understands various accents and dialects across rural India, making it
              accessible to all farmers regardless of literacy levels.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <VolumeUp className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Multilingual Support</h3>
            <p className="text-gray-600">
              Available in 12 Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada,
              Malayalam, Punjabi, Odia, Assamese, and English.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Offline Access</h3>
            <p className="text-gray-600">
              Core functionality works without internet connectivity, making it accessible in remote rural areas with
              limited or no network coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Personalized Crop Advisory</h2>
            <p className="text-gray-700 mb-6">
              Krishi Vaani provides tailored advice based on your specific crop, soil type, and local weather
              conditions. Our AI system learns from thousands of agricultural data points to deliver the most relevant
              recommendations.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Crop disease identification and treatment</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Pest management strategies</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Optimal fertilizer recommendations</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Irrigation scheduling based on weather forecasts</p>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Personalized Crop Advisory"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Weather Forecasting"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Weather Forecasting & Alerts</h2>
            <p className="text-gray-700 mb-6">
              Stay ahead of changing weather patterns with localized forecasts and timely alerts. Krishi Vaani provides
              voice-based weather updates that help you plan your farming activities effectively.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">7-day weather forecasts for your specific location</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Extreme weather alerts (storms, heavy rainfall, heat waves)</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Seasonal climate predictions for crop planning</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Drought and flood risk assessments</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto py-16 px-4 md:px-6 bg-green-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Cloud className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Cloud Sync</h3>
            <p className="text-gray-600">
              Automatically sync your data when internet is available, ensuring you never lose important information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <BarChart className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Yield Analytics</h3>
            <p className="text-gray-600">
              Track your crop yields over time and receive insights on how to improve productivity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">SMS Fallback</h3>
            <p className="text-gray-600">
              Receive critical alerts via SMS when voice services are unavailable in your area.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Low Power Mode</h3>
            <p className="text-gray-600">
              Optimized for devices with limited battery life, ensuring functionality in rural areas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Data Privacy</h3>
            <p className="text-gray-600">
              Your farming data is secure and private, with full control over what information is shared.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Sustainable Practices</h3>
            <p className="text-gray-600">
              Access to eco-friendly farming techniques that improve soil health and reduce environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="px-6 py-4 text-left text-green-800">Features</th>
                <th className="px-6 py-4 text-center text-green-800">Free Plan</th>
                <th className="px-6 py-4 text-center text-green-800">Premium Plan</th>
                <th className="px-6 py-4 text-center text-green-800">Community Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-gray-700">Voice Recognition</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Multilingual Support</td>
                <td className="px-6 py-4 text-center text-gray-700">5 Languages</td>
                <td className="px-6 py-4 text-center text-gray-700">All 12 Languages</td>
                <td className="px-6 py-4 text-center text-gray-700">All 12 Languages</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Offline Access</td>
                <td className="px-6 py-4 text-center text-gray-700">Limited</td>
                <td className="px-6 py-4 text-center text-gray-700">Full</td>
                <td className="px-6 py-4 text-center text-gray-700">Full</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Weather Forecasting</td>
                <td className="px-6 py-4 text-center text-gray-700">3-Day</td>
                <td className="px-6 py-4 text-center text-gray-700">7-Day</td>
                <td className="px-6 py-4 text-center text-gray-700">5-Day</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Crop Disease Identification</td>
                <td className="px-6 py-4 text-center text-gray-700">Basic</td>
                <td className="px-6 py-4 text-center text-gray-700">Advanced</td>
                <td className="px-6 py-4 text-center text-gray-700">Advanced</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Community Support</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Expert Consultation</td>
                <td className="px-6 py-4 text-center text-gray-700">✗</td>
                <td className="px-6 py-4 text-center text-gray-700">✓</td>
                <td className="px-6 py-4 text-center text-gray-700">Limited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Market Price Updates</td>
                <td className="px-6 py-4 text-center text-gray-700">Weekly</td>
                <td className="px-6 py-4 text-center text-gray-700">Daily</td>
                <td className="px-6 py-4 text-center text-gray-700">Daily</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="bg-green-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of farmers across India who are using Krishi Vaani to improve crop yields and farming
            practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-green-50 px-6 py-6 rounded-lg">Download App</Button>
            <Button variant="outline" className="border-white text-white hover:bg-green-700 px-6 py-6 rounded-lg">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Krishi Vaani Logo"
                  width={40}
                  height={40}
                  className="rounded-full bg-white"
                />
                <h2 className="text-xl font-bold">Krishi Vaani</h2>
              </div>
              <p className="text-green-100">Voice-based agricultural advisory for rural Indian farmers.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-green-100 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-green-100 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-green-100 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-green-100 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-green-100">Email: info@krishivaani.com</li>
                <li className="text-green-100">Phone: +91 1234567890</li>
                <li className="text-green-100">Address: Bengaluru, India</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-green-100 mb-4">Get the latest agricultural tips and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800"
                />
                <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>© 2025 Krishi Vaani. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
