import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* About Hero */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Our Mission</h1>
          <p className="text-xl text-gray-700 mb-8">
            Empowering rural Indian farmers with accessible, voice-based agricultural knowledge in their native
            languages.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Farmers in a field"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Krishi Vaani was born from a simple observation: rural farmers in India possess generations of
              agricultural wisdom, but often lack access to modern farming techniques and solutions due to literacy and
              language barriers.
            </p>
            <p className="text-gray-700 mb-4">
              Founded in 2023 by a team of agricultural experts and AI engineers, we set out to bridge this gap by
              creating a voice-based advisory service that speaks the farmer's language—literally.
            </p>
            <p className="text-gray-700">
              Today, Krishi Vaani serves over 10,000 farmers across India, providing real-time advice on crop diseases,
              weather patterns, and sustainable farming practices in 12 Indian languages.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-green-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-32 h-32 mx-auto relative mb-4">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Team Member"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-1">Priya Sharma</h3>
            <p className="text-gray-500 mb-4">Founder & CEO</p>
            <p className="text-gray-600">
              Agricultural scientist with 15 years of experience in sustainable farming practices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-32 h-32 mx-auto relative mb-4">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Team Member"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-1">Rahul Patel</h3>
            <p className="text-gray-500 mb-4">CTO</p>
            <p className="text-gray-600">
              AI specialist focused on natural language processing and voice recognition technologies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-32 h-32 mx-auto relative mb-4">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Team Member"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-1">Ananya Reddy</h3>
            <p className="text-gray-500 mb-4">Head of Outreach</p>
            <p className="text-gray-600">
              Rural development expert with deep connections to farming communities across India.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Environmental Impact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">30% reduction in pesticide use among our farmers</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">25% increase in sustainable farming practices</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">40% improvement in water conservation techniques</p>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Economic Impact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">Average 35% increase in crop yields</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">20% higher income for participating farmers</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <p className="text-gray-700">50% reduction in crop disease-related losses</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="bg-green-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking for advice, an organization wanting to partner, or an individual passionate
            about rural development, we'd love to hear from you.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-green-600 hover:bg-green-50 px-6 py-6 rounded-lg">Contact Us Today</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
