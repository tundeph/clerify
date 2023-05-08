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
			return {
				isPending: false,
				error: action.payload,
				success: false,
				document: null,
			}

		case "ADDED_DOCUMENT":
			return {
				isPending: false,
				error: null,
				success: true,
				document: action.payload,
			}

		case "DELETED_DOCUMENT":
			return { isPending: false, document: null, success: true, error: null }

		case "UPDATED_DOCUMENT":
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			}

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

	//add a document
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

	//add a document
	const addDocumentWithId = async (id, doc) => {
		dispatch({ type: "IS_PENDING" })
		try {
			const addDocumentWithId = await ref.doc(id).set({ ...doc })
			dispatchIfNotCancelled({
				type: "ADDED_DOCUMENT",
				payload: addDocumentWithId,
			})
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
		}
	}

	//update a document
	const updateDocument = async (id, updates) => {
		dispatch({ type: "IS_PENDING" })

		try {
			const updatedDocument = await ref.doc(id).update(updates)
			dispatch({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
			return updatedDocument
		} catch (err) {
			dispatch({ type: "ERROR", payload: err.message })
			return null
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { addDocument, addDocumentWithId, updateDocument, response }
}
