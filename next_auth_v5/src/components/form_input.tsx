"use client"
import { ComponentProps, useMemo } from 'react';
import { z } from 'zod';

interface FormInputProps extends ComponentProps<'input'> {
  label: string;
  errors?: z.ZodIssue[] | null;
}

export default function FormInput({ label, errors, ...rest }: FormInputProps) {
  const error = useMemo(() => errors?.find(error => error.path[0] === rest.name), [errors, rest.name]) 

  return (
    <label htmlFor={rest.name} className='text-sm font-semibold'>
      {label}
      <input
        {...rest}
        className='w-full mt-1 p-2 border border-[#D4D7E3] bg-slate-100 min-h-11 rounded-md text-sm'
      />
      {error && <p className='text-red-500 text-xs'>{error.message}</p>}
    </label>
  )
}
