"use client"

import { z } from 'zod'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'
import { useState } from 'react'
import { registerUser } from '@/actions/register_user'
import { registerUserDtoSchema } from '@/dto/register_user.dto'

export default function SignUpForm() {
  const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null)

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
      await registerUser(validFormValue)
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
      <FormInput type='text' id='firstName' name='firstName' label='First Name' errors={formErrors} />
      <FormInput type='text' id='lastName' name='lastName' label='Last Name' errors={formErrors} />
      <FormInput type='email' id='email' name='email' label='Email' errors={formErrors} />
      <FormInput type='password' id='password' name='password' label='Password' errors={formErrors} />
      <FormInput type='password' id='confirmPassword' name='confirmPassword' label='Confirm Password' errors={formErrors} />
      <FormSubmitButton>Sign Up</FormSubmitButton>
    </form>
  )
}
