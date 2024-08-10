"use server"

import nodemailer from 'nodemailer'
import { registerUserDtoSchema } from '@/dto/register_user.dto';
import { getMailClient } from '@/lib/mailer';
import { z } from 'zod';

export async function registerUser(dto: z.infer<typeof registerUserDtoSchema>) {
  try {
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
        <p>1 2 3 4 5<p>
        <a href="http://localhost:3000/confirm-email?token=1234">Click here to confirm email</a>
    `
    })

    const testMessageUrl = nodemailer.getTestMessageUrl(message)

    console.log('Preview URL: %s', testMessageUrl)
    return { testMessageUrl: testMessageUrl, status: 'success' }
  } catch (error) {
    console.error(error)
    return { status: 'error', testMessageUrl: null }
  }
}