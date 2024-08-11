import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { loginWithCredentials } from './actions/login_with_credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const response = JSON.parse(await loginWithCredentials(credentials.email as string, credentials.password as string))

        if (response.status === 'success') {
          return {
            name: `${response.data.firstName} ${response.data.lastName}`,
            image: null,
            email: response.data.email
          }
        } else return null
      }
    })
  ],
  secret: process.env.AUTH_SECRET
})