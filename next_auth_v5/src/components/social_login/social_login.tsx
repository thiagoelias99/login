import Image from "next/image";
import GoogleButton from './google_button';
import GitHubButton from './github_button';

export default function SocialLogin() {
  return (
    <div className='mt-6'>
      <div className='w-full flex justify-center items-center'>
        <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
        <p className='w-64 text-center text-[#294957] text-sm'>Or sign in with</p>
        <div className='w-full h-[1px] bg-[#CFDFE2] rounded-full'></div>
      </div>
      <div className='w-full flex gap-4 mt-4'>
        <GoogleButton />
        <GitHubButton />
      </div>
    </div>
  )
}
