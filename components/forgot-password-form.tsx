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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  // Manera recomendada por Nextjs para manejar estado de carga o pendiente en una Server Action
  //const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const form = event.currentTarget
      const formData = new FormData(form)

      const email = formData.get('email') as string

      const { error } = await authClient.requestPasswordReset({
        email, //required
        redirectTo: '/reset-password',
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Password reset email sent')
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
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className='cursor-pointer hover:opacity-90'>
                  {isLoading ? <Spinner /> : 'Verify email'}
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
