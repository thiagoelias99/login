"use client"

import { confirmToken } from '@/actions/confirm_token';
import { getUser } from '@/actions/get_user';
import { Loader2Icon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')
  const token = searchParams.get('token') || ''

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUser(userId).then((response) => {
        const userData = JSON.parse(response)
        if (userData.status === 'success' && userData.user) {
          setEmail(userData.user.email)
        } else {
          alert('User not found')
        }
        setLoading(false)
      })
    }
  }, []);

  async function handleConfirmToken() {
    if (userId && otp) {
      const result = JSON.parse(await confirmToken(userId, otp))
      switch (result.status) {
        case 'success':
          alert('Success')
          break;

        case 'invalid':
          alert('Invalid code')
          break;

        default:
          alert('Error')
          break;
      }
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-white p-4 rounded-lg'>
      {loading ? (
        <Loader2Icon size='64' className='animate-spin' />
      ) : (
        <div className='w-full flex flex-col justify-start items-start gap-4'>
          <h1 className='text-lg font-bold'>Enter the 4 digits code sent to {email}</h1>
          <div className='self-center'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className='mx-2'>-</span>}
              renderInput={(props) =>
                <div
                  className='flex flex-col items-center p-4 bg-slate-100 text-2xl rounded-lg shadow-md'
                >
                  <input
                    {...props}
                    className='outline-none bg-slate-100'
                  />
                </div>}
            />
          </div>
          <button
            onClick={handleConfirmToken}
            className='w-full bg-slate-900 text-white p-2 rounded-lg'>Confirm</button>
        </div>
      )}
    </div>
  )
}
