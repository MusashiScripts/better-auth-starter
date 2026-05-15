import { LogoutButton } from '@/components/logout-button'
import { getSession } from '@/lib/session'
//import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black">
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='flex justify-center items-center gap-2'>
          {session.user.image
            && <img src={session.user.image} alt='user-profile-pic' width={50} height={50} className='rounded-full' />
          }
          <p className='font-semibold'>Welcome, {session.user.name}</p>
        </div>
        <LogoutButton />
      </div>

    </div>
  )
}
