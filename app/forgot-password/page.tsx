import { ForgotPasswordForm } from '@/components/forgot-password-form'
import { BetterAuthIcon } from '@/components/icons/better_auth'

export default function ForgotPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">

        <div className='flex items-center justify-center gap-5'>
          <BetterAuthIcon className='size-15' />
          <span className='text-neutral-700 font-semibold'>Better Auth Forgotten Password</span>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  )
}
