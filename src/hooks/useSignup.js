import { useState } from "react"
import { authService } from "../firebase/config"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await authService.createUserWithEmailAndPassword(
        email,
        password
      )
      console.log(res.user)
      if (!res) {
        throw new Error("Could not complete signup")
      }

      //add displayname to user
      await res.user.updateProfile({ displayName })

      setIsPending(false)
      setError(null)

      //catch error
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, signup }
}
