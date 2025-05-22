import { getSession, updateProfile } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getSession()

    if (!session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({ user: session.user })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "An error occurred while fetching profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userData = await request.json()
    const updatedUser = await updateProfile(session.user.id, userData)

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 400 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "An error occurred while updating profile" }, { status: 500 })
  }
}
