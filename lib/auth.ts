import { cookies } from "next/headers"

// Mock user database - in a real app, this would be a database
const USERS = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "+91 9876543210",
    location: "Pune, Maharashtra",
    language: "hi",
    crops: ["wheat", "rice", "cotton"],
    farmSize: "5 acres",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
]

// Session management
export type User = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  language: string
  crops: string[]
  farmSize: string
  profileImage: string
}

export type Session = {
  user: User | null
}

export async function getSession(): Promise<Session> {
  const sessionCookie = cookies().get("session")?.value

  if (!sessionCookie) {
    return { user: null }
  }

  try {
    // In a real app, you would verify the session token
    const userId = sessionCookie
    const user = USERS.find((u) => u.id === userId)

    if (!user) {
      return { user: null }
    }

    // Don't return the password
    const { password, ...userWithoutPassword } = user
    return { user: userWithoutPassword as User }
  } catch (error) {
    console.error("Error getting session:", error)
    return { user: null }
  }
}

export async function login(email: string, password: string): Promise<User | null> {
  // In a real app, you would hash the password and compare with the stored hash
  const user = USERS.find((u) => u.email === email && u.password === password)

  if (!user) {
    return null
  }

  // Set a cookie with the user ID
  cookies().set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Don't return the password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function logout() {
  cookies().delete("session")
}

export async function register(userData: {
  name: string
  email: string
  password: string
  phone: string
  location: string
  language: string
  crops: string[]
  farmSize: string
}): Promise<User | null> {
  // Check if user already exists
  const existingUser = USERS.find((u) => u.email === userData.email)

  if (existingUser) {
    return null
  }

  // In a real app, you would hash the password
  const newUser = {
    id: (USERS.length + 1).toString(),
    ...userData,
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  // Add user to the database
  USERS.push(newUser)

  // Set a cookie with the user ID
  cookies().set("session", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Don't return the password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}

export async function updateProfile(userId: string, userData: Partial<User>): Promise<User | null> {
  const userIndex = USERS.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return null
  }

  // Update user data
  USERS[userIndex] = {
    ...USERS[userIndex],
    ...userData,
  }

  // Don't return the password
  const { password, ...userWithoutPassword } = USERS[userIndex]
  return userWithoutPassword as User
}
