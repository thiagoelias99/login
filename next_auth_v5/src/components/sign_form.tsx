"use client"

import { z } from 'zod'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'
import { useMemo, useState } from 'react'
import { registerUser } from '@/actions/register_user'
import { Loader2Icon } from 'lucide-react'
import EmailConfirmDialog from './email_confirm_dialog'
import { signFormSchema } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { resetPassword } from '@/actions/reset_password'


export default function SignForm({ type }: SignFormProps) {
  const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testMessageUrl, setTestMessageUrl] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  const formSchema = useMemo(() => signFormSchema({ type }), [type])
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('code') || null
  const message = searchParams.get('message') || null
  const user = searchParams.get('user') || null
  const token = searchParams.get('token') || null

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValue = Object.fromEntries(formData.entries())
    setFormErrors(null)
    setIsSubmitting(true)

    if (type === 'sign-in') {
      try {
        const validFormValue = formSchema.parse(formValue)
        await signIn("credentials", { redirectTo: "/home", ...validFormValue })

      } catch (error) {
        if (error instanceof z.ZodError) {
          setFormErrors(error.issues)
        } else {
          console.error(error)
        }
      } finally {
        setIsSubmitting(false)
      }
    } else if (type === 'sign-up') {
      try {
        const validFormValue = formSchema.parse(formValue)
        // Compare passwords
        if (validFormValue.password !== validFormValue.confirmPassword) {
          setFormErrors([{ path: ['confirmPassword'], message: 'Passwords do not match', code: 'custom' }])
          return
        }
        const response = await registerUser(validFormValue)
        if (response.status === 'success') {
          setTestMessageUrl(response.testMessageUrl as string)
          setUserId(response.userId as string)
        } else {
          alert('Something went wrong while registering')
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setFormErrors(error.issues)
        } else {
          console.error(error)
        }
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log('reset password')
      try {
        console.log(formValue)
        const validFormValue = formSchema.parse(formValue)
        // Compare passwords
        if (validFormValue.password !== validFormValue.confirmPassword) {
          setFormErrors([{ path: ['confirmPassword'], message: 'Passwords do not match', code: 'custom' }])
          return
        }
        // Reset password
        if (user && token) {
          const result = JSON.parse(await resetPassword(user, token,
            validFormValue.password))

          if (result.status === 'success') {
            router.push('/?message=password_reset')
          } else {
            alert('Something went wrong while resetting password')
          }
        } else {
          alert('Something went wrong while resetting password')
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(error.issues)
          setFormErrors(error.issues)
        } else {
          console.error(error)
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form
      className='w-full flex flex-col gap-2'
      onSubmit={onSubmit}
    >
      {type === 'sign-up' && (
        <>
          <FormInput type='text' id='firstName' name='firstName' label='First Name' errors={formErrors} disabled={isSubmitting} />
          <FormInput type='text' id='lastName' name='lastName' label='Last Name' errors={formErrors} disabled={isSubmitting} />
        </>
      )}
      {type !== 'reset-password' && (
        <FormInput type='email' id='email' name='email' label='Email' errors={formErrors} disabled={isSubmitting} />
      )}
      <FormInput type='password' id='password' name='password' label='Password' errors={formErrors} disabled={isSubmitting} />
      {type === 'sign-in' && (
        <Link href="/forgot-password" className='w-full text-end text-sm text-[#1E4AE9]'>Forgot Password?</Link>
      )}
      {type !== 'sign-in' && (
        <FormInput type='password' id='confirmPassword' name='confirmPassword' label='Confirm Password' errors={formErrors} disabled={isSubmitting} />
      )}
      <FormSubmitButton disabled={isSubmitting}
      >
        {isSubmitting && <Loader2Icon className='animate-spin inline-block w-6 h-6' />}
        <span className='ml-4'>{type === "sign-in" ? "Sign In" : type === "sign-up" ? "Sign Up" : "Submit"}</span>
      </FormSubmitButton>
      {errorCode === 'credentials' && <p className='text-red-500 font-semibold text-sm'>Invalid credentials</p>}
      <p className='text-green-500 font-semibold text-sm'>{message === "email_confirmed" ? "Email confirmed successfully, you can now sign-in" : message === "password_reset" ? "Password reset successfully, you can now sign-in" : ""}</p>

      <EmailConfirmDialog testMessageUrl={testMessageUrl} userId={userId} />
    </form>
  )
}
