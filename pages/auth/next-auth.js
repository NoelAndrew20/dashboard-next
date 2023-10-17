import {NextAuth} from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../pages/utils/mongodb'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: {  label: "email", type: "text" },
        password:  {  label: "password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const user = await collection.findOne({ username: credentials.username })

        if (user && user.password === credentials.password) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      return session
    },
  },
})
