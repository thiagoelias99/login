import { ComponentProps } from 'react';

interface FormInputProps extends ComponentProps<'input'> {
  label: string;
}

export default function FormInput({ label, ...rest }: FormInputProps) {
  return (
    <label htmlFor={rest.name} className='text-sm font-semibold'>
      {label}
      <input
        {...rest}
        className='w-full mt-1 p-2 border border-[#D4D7E3] bg-slate-100 min-h-11 rounded-md text-sm'
      />
    </label>
  )
}
