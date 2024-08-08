"use client"

import Link from 'next/link'

export default function ClientPage() {
  return (
    <div>
      <h1>You are in Client Page</h1>
      <div className='flex flex-col gap-4'>
        <Link href="/home">Home Page</Link>
        <Link href="/client-page">Client Page</Link>
        <Link href="/server-page">Server Page</Link>
      </div>
    </div>
  )
}
