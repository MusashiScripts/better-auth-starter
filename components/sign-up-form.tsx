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
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { GoogleIcon } from './icons/google'
import { signUp } from '@/actions/auth'
import Link from 'next/link'
import { signInWithGoogle } from '@/lib/auth-client'
import { useTransition } from 'react'
import { Spinner } from './ui/spinner'
import { toast } from 'sonner'

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  // Manera recomendada por Nextjs para manejar estado de carga o pendiente en una Server Action
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={(formData) => {
            startTransition(async () => {
              try {
                const user = await signUp(formData)
                console.log({ user })
                if (user) {
                  toast.success('Sign up successfully. Please, verify your email')
                }
              } catch (error) {
                toast.error(`${error}`)
              }
            })
          }}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" className='cursor-pointer' onClick={signInWithGoogle}>
                  <GoogleIcon />
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name='username'
                  placeholder="Jhon Doe"
                  required
                />
              </Field>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name='password' required />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending} className='cursor-pointer hover:opacity-90'>
                  {isPending ? <Spinner /> : 'Sign Up'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
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
