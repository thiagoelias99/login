import Link from 'next/link'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'

export default function SignInForm() {
  return (
    <form className='w-full flex flex-col gap-4'>
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
    </form>
  )
}