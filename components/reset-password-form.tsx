'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from './ui/spinner'
import { useState } from 'react'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { useRouter, useSearchParams } from 'next/navigation'

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  // Manera recomendada por Nextjs para manejar estado de carga o pendiente en una Server Action
  //const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token') as string
  const router = useRouter()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const form = event.currentTarget
      const formData = new FormData(form)

      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string

      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Password reset successfully')
        router.push('/login')
      }

      form.reset()

    } catch (err) {
      console.log(err)
      toast.error(`Something went wrong in the request: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name='password'
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  name='confirmPassword'
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className='cursor-pointer hover:opacity-90'>
                  {isLoading ? <Spinner /> : 'Reset'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
