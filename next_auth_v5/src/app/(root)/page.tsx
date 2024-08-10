import { auth } from '@/auth';
import Image from "next/image";
import { redirect } from 'next/navigation'
import MainSection from './_components/main_section';

export default async function Home() {
  const session = await auth()

  if (session) { redirect('/home') }

  return (
    <main className='w-full bg-white p-6 flex flex-col lg:flex-row-reverse lg:justify-center gap-7 rounded-2xl'>
      <Image
        aria-hidden={true}
        src="/login_image.jpg"
        width={1440}
        height={810}
        alt="background image"
        className='hidden sm:block w-full lg:w-2/3 rounded-3xl object-cover'
      />
      <MainSection />
    </main>
  );
}
