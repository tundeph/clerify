//this is a custom hook to handle login ans reset password functions for the app
import { useState, useEffect } from "react"
import { authService } from "../firebase/config"
import { useProfileQuery } from "../services/profile-slice2"

export const useLogin = () => {
  const { refetch } = useProfileQuery()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const login = async (userEmail, userPassword) => {
    setError(null)
    setIsPending(true)

    try {
      //firebase function to log users in
      const res = await authService.signInWithEmailAndPassword(
        userEmail,
        userPassword
      )
      //if user account is available, refetch the rtkquery to fetch user details
      if (res.user) refetch()
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const resetPassword = async (userEmail) => {
    setError(null)
    setIsPending(true)

    try {
      //firebase function to send reset password by email
      await authService.sendPasswordResetEmail(userEmail)
      setError(null)
      setIsPending(false)
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, login, resetPassword }
}
