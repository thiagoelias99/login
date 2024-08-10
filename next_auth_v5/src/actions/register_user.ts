"use server"

import nodemailer from 'nodemailer'
import { registerUserDtoSchema } from '@/dto/register_user.dto';
import { getMailClient } from '@/lib/mailer';
import { z } from 'zod';
import { fireStore } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { add } from 'date-fns';

export async function registerUser(dto: z.infer<typeof registerUserDtoSchema>) {
  try {
    const APPLICATION_URL = process.env.APPLICATION_URL
    const confirmationCode = Math.floor(1000 + Math.random() * 9000)
    const expiresAt = add(new Date(), { minutes: 5 })

    const docRef = await addDoc(collection(fireStore, 'login_next_users'), {
      ...dto,
      confirmed: false,
      confirmationCode,
      expiresAt
    })
    
    const userId = docRef.id

    const mail = await getMailClient()
    const message = await mail.sendMail({
      from: {
        name: 'Login with Next Auth V5',
        address: 'loginwithnext@mail.com'
      },
      to: {
        name: `${dto.firstName} ${dto.lastName}`,
        address: dto.email
      },
      subject: 'Confirm your email',
      html: `
        <h1>Welcome to Login with Next Auth V5</h1>
        <p>Use code below to confirm your email address in app or click the link</p>
        <p>${confirmationCode}<p>
        <a href="${APPLICATION_URL}/confirm-email?user=${userId}&token=${confirmationCode}">Click here to confirm email</a>
        <p>Code expires in 5 minutes</p>
    `
    })

    const testMessageUrl = nodemailer.getTestMessageUrl(message)

    console.log('Preview URL: %s', testMessageUrl)
    return { testMessageUrl: testMessageUrl, status: 'success', userId }
  } catch (error) {
    console.error(error)
    return { status: 'error', testMessageUrl: null, userId: null }
  }
}