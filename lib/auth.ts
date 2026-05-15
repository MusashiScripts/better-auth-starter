import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db/drizzle' // your drizzle instance
import { nextCookies } from 'better-auth/next-js'
import { lastLoginMethod } from 'better-auth/plugins'
import { schema } from '@/db/schema'
import { Resend } from 'resend'
import ForgotPasswordEmailTemplate from '@/components/email-template'
import EmailVerificationTemplate from '@/components/verification-email-template'

//import { sendEmail } from "./email"; // your email sending function

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset password',
        react: ForgotPasswordEmailTemplate({ username: user.name, userEmail: user.email, resetUrl: url }),
      })
    },

  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Email Verification',
        react: EmailVerificationTemplate({ username: user.name, verifyUrl: url }),
      })
    },

    sendOnSignUp: true,

    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`)
    }

  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema
  }),

  plugins: [lastLoginMethod(), nextCookies()] // make sure this is the last plugin in the array

})