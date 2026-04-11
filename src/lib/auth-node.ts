import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth-base"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const result = loginSchema.safeParse(credentials)
        if (!result.success) return null

        const { email, password } = result.data

        await dbConnect()
        const user = await User.findOne({ email }).lean() as any

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (passwordsMatch) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
})
