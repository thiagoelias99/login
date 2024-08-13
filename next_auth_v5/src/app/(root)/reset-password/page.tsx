import SignForm from '@/components/sign_form'
import { Loader2Icon } from 'lucide-react'
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-white p-4 rounded-lg max-w-screen-sm'>
      <Suspense fallback={<Loader2Icon size='64' className='animate-spin' />}>
        <h1 className='text-lg font-bold'>Enter password to update</h1>
        <SignForm type={"reset-password"} />
      </Suspense>
    </div>
  )
}
