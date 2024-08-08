import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className='p-6 flex flex-col gap-7'>
      <Image
        aria-hidden={true}
        src="/login_image.jpg"
        width={1440}
        height={810}
        alt="background image"
        className='w-full rounded-3xl'
      />
      <h1 className='text-2xl font-bold'>Welcome Back</h1>
      <p className='max-w-prose text-sm text-[#313957]'>Sign in to access the application</p>

      <form className='w-full flex flex-col gap-4'>
        <label htmlFor="email" className='text-sm font-semibold'>
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder='example@email.com'
            className='w-full mt-1 p-2 border border-[#D4D7E3] bg-[#F3F7FB] min-h-11 rounded-md'
          />
        </label>
        <label htmlFor="password" className='text-sm font-semibold'>
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder='At least 6 characters'
            minLength={6}
            className='w-full mt-1 p-2 border border-[#D4D7E3] bg-[#F3F7FB] min-h-11 rounded-md text-sm'
          />
        </label>
        <Link href="/forgot-password" className='w-full text-end text-sm text-[#1E4AE9]'>Forgot Password?</Link>
        <button
          type="submit"
          className='w-full p-2 bg-[#162D3A] text-white rounded-md'
        >
          Sign In
        </button>
      </form>
      {/* Social Login */}
      <div className='mt-6'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
          <p className='w-full text-center text-[#294957] text-sm'>Or sign in with</p>
          <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
        </div>
        <div className='w-full flex gap-4'>
          <button
            type="button"
            className='w-full flex justify-center items-center min-h-10 px-4 py-2 p-2 gap-4 bg-[#F3F9FA] text-white rounded-xl'
          >
            <Image
              aria-hidden={true}
              src="/google.svg"
              width={24}
              height={24}
              alt="google logo"
            />
            <span className='text-[#313957]'>Google</span>
          </button>
          <button
            type="button"
            className='w-full flex justify-center items-center min-h-10 px-4 py-2 p-2 gap-4 bg-[#F3F9FA] text-white rounded-xl'
          >
            <Image
              aria-hidden={true}
              src="/facebook.svg"
              width={24}
              height={24}
              alt="facebook logo"
            />
            <span className='text-[#313957]'>Facebook</span>
          </button>
        </div>
      </div>
      {/* SignUp */}
      <div className='w-full flex gap-1 justify-center items-center'>
        <p className='text-sm text-[#313957]'>Don&apos;t you have an account?</p>
        <Link href="/signup" className='text-sm text-[#1E4AE9]'>Sign Up</Link>
      </div>
    </main>
  );
}
