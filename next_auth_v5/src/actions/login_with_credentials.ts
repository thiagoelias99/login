"use server"

import { fireStore } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

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

export async function loginWithCredentials(email: string, password: string) {
  try {
    const q = query(collection(fireStore, "login_next_users"), where("email", "==", email))

    const querySnapshot = await getDocs(q)
    if(querySnapshot.size !== 1){
      return JSON.stringify({status: "not found"})
    }
    const document = querySnapshot.docs[0].data() as IUser

    if(document.password === password){
      return JSON.stringify({ status: 'success', data: document })
    }

    return JSON.stringify({ status: 'not found' })

  } catch (error) {
    console.error(error)
    return JSON.stringify({ status: 'error' })
  }
}