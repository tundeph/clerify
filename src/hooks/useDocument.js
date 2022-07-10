import { useEffect, useState } from "react"
import { db } from "../firebase/config"

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  //realtime data for document
  useEffect(() => {
    const ref = db.collection(collection).doc(id)

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id })
          setError(null)
        } else {
          setError("Oops! Nothing exists there")
        }
      },
      (err) => {
        console.log(err.message)
        setError("failed to get document")
      }
    )

    return () => unsub()
  }, [collection, id])

  return { document, error }
}
