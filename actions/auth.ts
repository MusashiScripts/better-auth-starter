'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import type { APIError } from 'better-auth/api'
//import { redirect } from 'next/navigation'

export const signUp = async (formData: FormData) => {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  //console.log({ username, email, password })

  try {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    })

    //console.log(user)
    if (user) return user

  } catch (error) {
    const err = error as APIError
    console.error('Something went wrong: ', err)
    throw new Error(err.message || 'Sign up failed')
  }


}

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log({ email, password })

  try {
    const { user } = await auth.api.signInEmail({
      body: {
        email,
        password,
      },

      headers: await headers(),
    })

    //console.log(user)

    if (user) return user
  } catch (error) {
    const err = error as APIError
    console.error(err)
    throw new Error(err.message || 'Login failed')
  }


}

export const requestPasswordReset = async (formData: FormData) => {
  const email = formData.get('email') as string
  const data = await auth.api.requestPasswordReset({
    body: {
      email, //required
      redirectTo: '/reset-password',
    },
  })

  if (data) {
    return data
  }
}