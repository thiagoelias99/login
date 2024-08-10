import { z } from 'zod'
import FormInput from './form_input'
import FormSubmitButton from './form_submit_button'

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export default function SignUpForm() {
  return (
    <form className='w-full flex flex-col gap-2'>
      <FormInput type='text' id='firstName' name='firstName' label='First Name' />
      <FormInput type='text' id='lastName' name='lastName' label='Last Name' />
      <FormInput type='email' id='email' name='email' label='Email' />
      <FormInput type='password' id='password' name='password' label='Password' />
      <FormInput type='password' id='confirmPassword' name='confirmPassword' label='Confirm Password' />
      <FormSubmitButton>Sign Up</FormSubmitButton>
    </form>
  )
}
