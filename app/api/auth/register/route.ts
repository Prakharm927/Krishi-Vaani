import { register } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "password", "phone", "location", "language"]
    for (const field of requiredFields) {
      if (!userData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Set default values for optional fields
    userData.crops = userData.crops || []
    userData.farmSize = userData.farmSize || "Not specified"

    const user = await register(userData)

    if (!user) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
