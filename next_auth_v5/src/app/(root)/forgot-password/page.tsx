"use client"

import { sendResetPasswordEmail } from '@/actions/send_reset_password_email';
import FormInput from '@/components/form_input';
import FormSubmitButton from '@/components/form_submit_button';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [testMessageUrl, setTestMessageUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRequestFinished, setIsRequestFinished] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsRequestFinished(false)
    setIsSubmitting(true)
    setTestMessageUrl(null)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValue = Object.fromEntries(formData.entries())

    const response = JSON.parse(await sendResetPasswordEmail(formValue.email as string))

    if (response.status === 'success') {
      setTestMessageUrl(response.testMessageUrl)
    }

    setIsSubmitting(false)
    setIsRequestFinished(true)
  }

  return (
    <div className='w-full bg-white rounded-lg p-4'>
      <h1 className='text-2xl font-semibold'>Forgot Password</h1>
      <p className='mt-4 text-sm text-gray-500'>Enter your email address and if correct, we will send you a link to reset your password.</p>
      <form className='mt-2 w-full flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <FormInput
          type='email'
          id='email'
          name='email'
          label='Email'
          placeholder='example@email.com'
          disabled={isSubmitting}
        />
        {isRequestFinished && (
          <span className='text-sm text-green-500 font-bold'>If email is correct you will receive an email with a link to reset your password.</span>
        )}
        <FormSubmitButton
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className='animate-spin inline-block w-6 h-6' />}
          <span className='ml-4'>Request password reset</span>
        </FormSubmitButton>
      </form>
      {!!testMessageUrl && (
        <div className='fixed top-0 w-full flex justify-center items-center'>
          <a
            target='_blank'
            rel='noreferrer'
            href={testMessageUrl}
            className='bg-white px-4 pt-6 pb-2 rounded-lg shadow-md text-blue-500 underline'
          >Open temporary email</a>
        </div>
      )}
    </div>
  )
}