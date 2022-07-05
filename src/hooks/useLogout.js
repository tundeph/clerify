import { useState, useEffect } from "react"
import { authService } from "../firebase/config"
import { useDispatch } from "react-redux"
import { logOut } from "../redux/profileSlice"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const dispatch = useDispatch()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await authService.signOut()
      dispatch(logOut())

      //update state
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err)
        setIsPending(false)
        setError(err.message)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, logout }
}
