"use client"

import Image from "next/image";
import { signIn } from "next-auth/react"

export default function GoogleButton() {
  return (
    <button
      type="button"
      className='w-full flex justify-center items-center min-h-10 px-4 py-2 p-2 gap-4 bg-[#F3F9FA] text-white rounded-xl'
      onClick={async () => await signIn('google', { callbackUrl: "/home" })}
    >
      <Image
        aria-hidden={true}
        src="/google.svg"
        width={24}
        height={24}
        alt="google logo"
      />
      <span className='text-[#313957]'>Google</span>
    </button>
  )
}
