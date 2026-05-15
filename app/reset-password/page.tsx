import { BetterAuthIcon } from '@/components/icons/better_auth'
import { ResetPasswordForm } from '@/components/reset-password-form'

export default function ResetPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">

        <div className='flex items-center justify-center gap-5'>
          <BetterAuthIcon className='size-15' />
          <span className='text-neutral-700 font-semibold'>Better Auth Reset Password</span>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  )
}
