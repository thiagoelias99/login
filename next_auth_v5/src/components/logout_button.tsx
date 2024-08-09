"use client"

import { signOut } from "next-auth/react"
import { LogOutIcon } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
    className='self-center'
    onClick={async () => await signOut({ callbackUrl: '/' })}
    >
      <LogOutIcon size={24} />
    </button>
  )
}
