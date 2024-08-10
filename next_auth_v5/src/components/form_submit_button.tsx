import { ComponentProps } from 'react'

export default function FormSubmitButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type="submit"
      className='w-full p-2 bg-[#162D3A] text-white rounded-md'
    >
      {props.children}
    </button>
  )
}
