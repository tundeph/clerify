import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, authReady } from "../redux/profileSlice"
import { db, authService } from "../firebase/config"

export const useAuth = () => {
  const { user, authIsReady, profileTheme } = useSelector(selectUserProfile)

  useEffect(() => {
    const unsub = authService.onAuthStateChanged((user) => {
      dispatch(authReady({ authIsReady: true }))
      //   if (user) {
      const { uid, displayName, photoURL, email } = user
      db.collection("business")
        .where("uid", "==", uid)
        .onSnapshot((snapshot) => {
          let business = {}
          let selectedBusinessId = null
          snapshot.docs.forEach((doc) => {
            let id = doc.id
            const { accts, name, type, selected, categories } = doc.data()
            if (selected) {
              selectedBusinessId = id
            }
            business[id] = { id, accts, name, type, selected, categories }
          })
          dispatch(
            authReady({
              data: { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, email, business },
              selectedBusinessId,
            })
          )
        })

      unsub()
      //   }
    })
  }, [])

  return { user, authIsReady, profileTheme }
}
