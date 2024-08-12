import SignForm from '@/components/sign_form'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-white p-4 rounded-lg'>
      <h1 className='text-lg font-bold'>Enter password to update</h1>
      <SignForm type={"reset-password"} />
    </div>
  )
}
