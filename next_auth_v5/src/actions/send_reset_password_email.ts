"use server"

import { fireStore } from '@/lib/firebase'
import { getMailClient } from '@/lib/mailer'
import { collection, getDocs, query, where } from 'firebase/firestore'
import nodemailer from 'nodemailer'

interface IUser {
  id: string
  email: string
  confirmed: boolean
  firstName: string
  lastName: string
  password: string
  expiresAt: Date
  confirmationCode: number
}

export async function sendResetPasswordEmail(email: string) {
  try {
    const q = query(collection(fireStore, "login_next_users"), where("email", "==", email))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.size !== 1) {
      return JSON.stringify({ status: "not found" })
    }
    const document = querySnapshot.docs[0].data() as IUser

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Login with Next Auth V5',
        address: 'loginwithnext@mail.com'
      },
      to: {
        name: `${document.firstName} ${document.lastName}`,
        address: document.email
      },
      subject: 'Reset your password',
      html: `
        <h1>Reset your password</h1>
        <p>Use code below to reset your password in app or click the link</p>
        <a href="${process.env.APPLICATION_URL}/reset-password?user=${querySnapshot.docs[0].id}&token=${document.confirmationCode}">Click here to reset password</a>
        <p>Code expires in 5 minutes
  `
    })

    const testMessageUrl = nodemailer.getTestMessageUrl(message)

    return JSON.stringify({ status: 'success', testMessageUrl })

  } catch (error) {
    console.error(error)
    return JSON.stringify({ status: 'error' })
  }
}