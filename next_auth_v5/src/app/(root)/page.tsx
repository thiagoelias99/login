import { auth } from '@/auth';
import SignInForm from '@/components/sign_in_form';
import SocialLogin from '@/components/social_login/social_login';
import Image from "next/image";
import Link from 'next/link';
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (session) {redirect('/home')}

  return (
    <main className='w-full bg-white p-6 flex flex-col lg:flex-row-reverse lg:justify-center gap-7 rounded-2xl'>
      <Image
        aria-hidden={true}
        src="/login_image.jpg"
        width={1440}
        height={810}
        alt="background image"
        className='hidden sm:block w-full lg:w-2/3 rounded-3xl object-cover'
      />
      <div className='w-full max-w-[720px] flex flex-col gap-7 lg:justify-center'>
        <h1 className='text-2xl font-bold'>Welcome Back</h1>
        <p className='max-w-prose text-sm text-[#313957]'>Sign in to access the application</p>

        <SignInForm />
        <SocialLogin />

        <div className='w-full flex gap-1 justify-center items-center'>
          <p className='text-sm text-[#313957]'>Don&apos;t you have an account?</p>
          <Link href="/signup" className='text-sm text-[#1E4AE9]'>Sign Up</Link>
        </div>
      </div>
    </main>
  );
}
