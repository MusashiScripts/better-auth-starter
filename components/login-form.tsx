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
import { signIn } from '@/actions/auth'
import Link from 'next/link'
import { authClient, signInWithGoogle } from '@/lib/auth-client'
import { Spinner } from './ui/spinner'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Badge } from './ui/badge'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await signInWithGoogle()
      console.log({ data, error })

      if (error) {
        toast.error(error.message)
      } else {
        toast.info('Logging in with Google...')
      }

    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }

  }

  // Manera recomendada por Nextjs para manejar estado de carga o pendiente en una Server Action
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  //Last Login Better Auth Plugin
  const lastLogin = authClient.getLastUsedLoginMethod()

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
          <form action={async (formData) => {
            startTransition(async () => {
              try {
                const user = await signIn(formData)
                console.log({ user })
                if (user) {
                  toast.success('Login successfully.')
                  router.push('/')
                }
              } catch (error) {
                toast.error(`${error}`)
              }

            })
          }}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" className='cursor-pointer relative'
                  disabled={isLoading}
                  onClick={loginWithGoogle}>
                  <GoogleIcon />
                  Login with Google

                  {isLoading && <Spinner />}
                  {lastLogin === 'google' && <Badge className='text-[10px] absolute right-2'>last used</Badge>}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <div className='flex items-center justify-between'>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  {lastLogin === 'email' && <Badge className='text-[10px]'>last used</Badge>}
                </div>
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
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name='password' required />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending} className='cursor-pointer hover:opacity-90'>
                  {isPending ? <Spinner /> : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
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
