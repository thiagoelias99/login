"use server"

import { fireStore } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface IUser {
  confirmationCode: number
}

export async function resetPassword(userId: string, token: string, password: string) {
  try {
    const document = doc(fireStore, 'login_next_users', userId)
    const snapshot = await getDoc(document)

    if (snapshot.exists()) {
      const data = snapshot.data() as IUser

      if (data.confirmationCode === parseInt(token)) {
        await updateDoc(document, { password })
        return JSON.stringify({ status: 'success' })
      }
      return JSON.stringify({ status: 'invalid' })
    }
    return JSON.stringify({ status: 'not found' })

  } catch (error) {
    console.error(error)
    return JSON.stringify({ status: 'error', userId: null })
  }
}