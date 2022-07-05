import { useReducer, useState, useEffect } from "react"
import { db, timestamp } from "../firebase/config"

const initialState = {
  isPending: null,
  error: null,
  success: null,
  document: null,
}
const reducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, error: null, success: false, document: null }

    case "ERROR":
      return { isPending: false, error: action.payload, success: false, document: null }

    case "ADDED_DOCUMENT":
      return { isPending: false, error: null, success: true, document: action.payload }

    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(reducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  //collection
  const ref = db.collection(collection)

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, response }
}
