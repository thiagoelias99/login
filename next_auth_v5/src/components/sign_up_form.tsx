"use client"

import { z } from 'zod'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'
import { useState } from 'react'
import { registerUser } from '@/actions/register_user'
import { registerUserDtoSchema } from '@/dto/register_user.dto'
import { Loader2Icon } from 'lucide-react'
import EmailConfirmDialog from './email_confirm_dialog'

export default function SignUpForm() {
  const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testMessageUrl, setTestMessageUrl] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValue = Object.fromEntries(formData.entries())
    try {
      const validFormValue = registerUserDtoSchema.parse(formValue)
      setFormErrors(null)
      // Compare passwords
      if (validFormValue.password !== validFormValue.confirmPassword) {
        setFormErrors([{ path: ['confirmPassword'], message: 'Passwords do not match', code: 'custom' }])
        return
      }
      setIsSubmitting(true)
      const response = await registerUser(validFormValue)
      if (response.status === 'success') {
        setTestMessageUrl(response.testMessageUrl as string)
        setUserId(response.userId as string)
      } else {
        alert('Something went wrong while registering')
      }
      setIsSubmitting(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.issues)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form
      className='w-full flex flex-col gap-2'
      onSubmit={onSubmit}
    >
      <FormInput type='text' id='firstName' name='firstName' label='First Name' errors={formErrors} disabled={isSubmitting} />
      <FormInput type='text' id='lastName' name='lastName' label='Last Name' errors={formErrors} disabled={isSubmitting} />
      <FormInput type='email' id='email' name='email' label='Email' errors={formErrors} disabled={isSubmitting} />
      <FormInput type='password' id='password' name='password' label='Password' errors={formErrors} disabled={isSubmitting} />
      <FormInput type='password' id='confirmPassword' name='confirmPassword' label='Confirm Password' errors={formErrors} disabled={isSubmitting} />
      <FormSubmitButton disabled={isSubmitting}
      >
        {isSubmitting && <Loader2Icon className='animate-spin inline-block w-6 h-6' />}
        <span className='ml-4'>Sign Up</span>
      </FormSubmitButton>

      <EmailConfirmDialog testMessageUrl={testMessageUrl} userId={userId} />
    </form>
  )
}
