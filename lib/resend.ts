/* import ForgotPasswordEmailTemplate from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ForgotPasswordEmailData {
  email: string
  resetUrl: string
}

export const sendForgotPasswordEmail = ({ email, resetUrl }: ForgotPasswordEmailData) => {
  resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    react: ForgotPasswordEmailTemplate({ userEmail: email, resetUrl }),
  })
}
 */