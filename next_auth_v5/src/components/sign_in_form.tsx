import Link from 'next/link'

export default function SignInForm() {
  return (
    <form className='w-full flex flex-col gap-4'>
      <label htmlFor="email" className='text-sm font-semibold'>
        Email
        <input
          type="email"
          id="email"
          name="email"
          placeholder='example@email.com'
          className='w-full mt-1 p-2 border border-[#D4D7E3] bg-slate-100 min-h-11 rounded-md'
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
          className='w-full mt-1 p-2 border border-[#D4D7E3] bg-slate-100 min-h-11 rounded-md text-sm'
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
  )
}
