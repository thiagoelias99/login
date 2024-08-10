import Link from 'next/link'

interface EmailConfirmDialogProps {
  testMessageUrl: string | null
}

export default function EmailConfirmDialog({ testMessageUrl }: EmailConfirmDialogProps) {
  return (
    <div
      className={`fixed inset-0 w-full h-screen bg-black bg-opacity-70 flex justify-center items-center px-16 ${!!testMessageUrl ? 'visible' : 'hidden'}`}
    >
      <div className='w-full bg-white p-4 rounded-lg flex flex-col gap-2'>
        <h1 className='text-xl font-bold'>Email Confirmation</h1>
        <p className='text-sm'>This app will <strong>not send a real confirmation email</strong>, but creates a <strong>temporary email message</strong> that can be accessed to confirm registration</p>
        <p className='text-sm'>Use the link bellow to access the temporary email <strong>before continuing</strong></p>
        <a
          className='text-blue-500 underline self-center py-6'
          href={testMessageUrl || ""}
          target='_blank'
          rel='noreferrer'
        >
          Access Temporary Email
        </a>
        <Link href='/confirm-email'
          className='w-full p-2 bg-[#162D3A] text-white rounded-md text-center'
        >Continue
        </Link>
      </div>
    </div>
  )
}
