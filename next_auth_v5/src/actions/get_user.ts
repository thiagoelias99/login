"use server"

import { fireStore } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface IUser {
  id: string
  email: string
  confirmed: boolean
  firstName: string
  lastName: string
  expiresAt: Date
  confirmationCode: number
}

export async function getUser(userId: string) {
  try {
    console.log(userId)
    const document = doc(fireStore, 'login_next_users', userId)
    const snapshot = await getDoc(document)

    if (snapshot.exists()) {
      const data = snapshot.data() as IUser

      console.log(data)

      return JSON.stringify({ status: 'success', user: data })
    }
    return JSON.stringify({ status: 'not found', userId: null })

  } catch (error) {
    console.error(error)
    return JSON.stringify({ status: 'error', userId: null })
  }
}