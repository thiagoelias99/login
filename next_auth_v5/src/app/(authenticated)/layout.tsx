import { auth } from '@/auth';
import { PropsWithChildren } from 'react';
import Image from "next/image";
import LogoutButton from '@/components/logout_button';
import Link from 'next/link';
import LinkButton from '@/components/link_button';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {

  const session = await auth()
  return (
    <div className='bg-white w-full h-full p-8 rounded-2xl'>
      <nav className='flex flex-row gap-4'>
        <LinkButton href="/home">Home Page</LinkButton>
        <LinkButton href="/client-page">Client Page</LinkButton>
        <LinkButton href="/server-page">Server Page</LinkButton>
      </nav>
      <div className='bg-slate-100 p-2 mt-8 w-[360px] flex justify-start items-start gap-4 rounded-md'>
        <Image
          src={session?.user.image || "/avatar_placeholder.png"}
          width={60}
          height={60}
          className='rounded-full'
          alt="user image"
        />
        <div className='pr-10'>
          <h2 className='text-xl font-semibold'>{session?.user.name}</h2>
          <h3 className='text-sm'>{session?.user.email}</h3>
        </div>
        <LogoutButton />
      </div>
      {children}
    </div>
  )
}