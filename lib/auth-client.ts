import { createAuthClient } from 'better-auth/react'
import { lastLoginMethodClient } from 'better-auth/client/plugins'
import { APIError } from 'better-auth'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [
    lastLoginMethodClient()
  ]
})

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await authClient.signIn.social({
      provider: 'google'
    })

    if (data) {
      console.log(data)
    }

    if (error) {
      console.error(error)
    }

    return { data, error }
  } catch (error) {
    const err = error as APIError
    console.error(err)
    throw new Error(err.message || 'Login with Google failed')
  }

}