"use client"

import Link from 'next/link'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'

export default function SignInForm() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('code') || null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValue = Object.fromEntries(formData.entries())

    try {
      await signIn("credentials", { redirectTo: "/home", ...formValue })

    } catch (error) {
      alert("Authentication failed")
    }
  }

  return (
    <form
      className='w-full flex flex-col gap-4'
      onSubmit={handleSubmit}
    >
      <FormInput
        type='email'
        id='email'
        name='email'
        label='Email'
        placeholder='example@email.com'
      />
      <FormInput
        type='password'
        id='password'
        name='password'
        label='Password'
        placeholder='At least 6 characters'
        minLength={6}
      />
      <Link href="/forgot-password" className='w-full text-end text-sm text-[#1E4AE9]'>Forgot Password?</Link>
      <FormSubmitButton>Sign In</FormSubmitButton>
      {errorCode === 'credentials' && <p className='text-red-500 font-semibold text-sm'>Invalid credentials</p>}
    </form>
  )
}