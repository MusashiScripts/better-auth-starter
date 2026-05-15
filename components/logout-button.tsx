'use client'

import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Spinner } from './ui/spinner'

export const LogoutButton = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const Logout = async () => {
    setIsLoading(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login') // redirect to login page
        },
      },
    })
    setIsLoading(false)
  }

  return (
    <Button className='cursor-pointer' onClick={Logout} disabled={isLoading}>
      <LogOut />
      {isLoading ? <Spinner /> : 'Logout'}
    </Button>
  )
}