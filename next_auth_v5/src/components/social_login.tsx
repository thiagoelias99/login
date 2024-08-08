import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className='mt-6'>
      <div className='w-full flex justify-center items-center'>
        <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
        <p className='w-64 text-center text-[#294957] text-sm'>Or sign in with</p>
        <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
      </div>
      <div className='w-full flex gap-4 mt-4'>
        <button
          type="button"
          className='w-full flex justify-center items-center min-h-10 px-4 py-2 p-2 gap-4 bg-[#F3F9FA] text-white rounded-xl'
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
        <button
          type="button"
          className='w-full flex justify-center items-center min-h-10 px-4 py-2 p-2 gap-4 bg-[#F3F9FA] text-white rounded-xl'
        >
          <Image
            aria-hidden={true}
            src="/facebook.svg"
            width={24}
            height={24}
            alt="facebook logo"
          />
          <span className='text-[#313957]'>Facebook</span>
        </button>
      </div>
    </div>
  )
}
