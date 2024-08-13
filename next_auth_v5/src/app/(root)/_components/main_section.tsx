"use client"

import { useState } from 'react'
import SignForm from '@/components/sign_form'
import SocialLogin from '@/components/social_login/social_login'

export default function MainSection() {
  const [showSignUpForm, setShowSignUpForm] = useState(false)

  return (
    <div className='w-full h-full max-w-[360px] flex flex-col gap-7 justify-start items-center lg:justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden pl-6 py-2'>
      <h1 className='text-2xl font-bold'>{showSignUpForm ? "Welcome" : "Welcome Back"}</h1>
      <p className='max-w-prose text-sm text-[#313957]'>{showSignUpForm ? "Sign up" : "Sign in"} to access the application</p>

      <SignForm type={showSignUpForm ? "sign-up" : "sign-in"} />
      <SocialLogin />

      <div className='w-full flex gap-1 justify-center items-center'>
        <p className='text-sm text-[#313957]'>{showSignUpForm ? "Already have an account?" : "Don't you have an account?"}</p>
        <button
          onClick={() => setShowSignUpForm(!showSignUpForm)}
          className='text-sm text-[#1E4AE9]'>{showSignUpForm ? "Sign In" : "Sign Up"}</button>
      </div>
    </div>
  )
}
