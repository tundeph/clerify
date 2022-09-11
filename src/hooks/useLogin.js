import { useState, useEffect } from "react"
import { authService } from "../firebase/config"
import { useDispatch } from "react-redux"
import { isLoggedIn } from "../redux/profileSlice"
import { db } from "../firebase/config"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const dispatch = useDispatch()

  const login = async (userEmail, userPassword) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await authService.signInWithEmailAndPassword(userEmail, userPassword)
      const { uid, displayName, photoURL, email } = res.user
      let business = {}
      let selectedBusinessId = null
      let hasAccts = {}
      db.collection("business")
        .where("uid", "==", uid)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc, i) => {
            let id = doc.id
            const { accts, name, type, selected, categories, lastAcctData } = doc.data()
            if (selected) {
              selectedBusinessId = id
              hasAccts = lastAcctData
            }
            business[id] = { id, accts, name, type, selected, categories }
          })
          dispatch(
            isLoggedIn({
              data: { uid, displayName, photoURL, email, business },
              selectedBusinessId,
              lastAcctData: hasAccts,
            })
          )
        })

      // const { documents } = useCollection("business", ["uid", "==", uid])
      //   dispatch(isLoggedIn({ uid, displayName, photoURL, email, r }))

      //update state
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (err) {
      // if (!isCancelled) {
      console.log(err)
      setError(err.message)
      setIsPending(false)

      // }
    }
  }

  const resetPassword = async (userEmail) => {
    setError(null)
    setIsPending(true)

    try {
      await authService.sendPasswordResetEmail(userEmail)
      // if (!isCancelled) {
      setError(null)
      setIsPending(false)
      // }
    } catch (err) {
      // if (!isCancelled) {
      console.log(err)
      setError(err.message)
      setIsPending(false)

      // }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, login, resetPassword }
}
