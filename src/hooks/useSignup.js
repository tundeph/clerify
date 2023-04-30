import { useState, useEffect } from "react"
import { authService } from "../firebase/config"
import { useDispatch } from "react-redux"
import { isLoggedIn } from "../services/profile-slice"

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const [isCancelled, setIsCancelled] = useState(false)
	const dispatch = useDispatch()

	const signup = async (userEmail, userPassword, userDisplayName) => {
		setError(null)
		setIsPending(true)

		try {
			const res = await authService.createUserWithEmailAndPassword(
				userEmail,
				userPassword
			)
			console.log(res.user)
			if (!res) {
				throw new Error("Could not complete signup")
			}

			//add displayname to user
			await res.user.updateProfile({ userDisplayName })

			//dispatch the action to store uid in state
			const { uid, displayName, photoURL, email } = res
			await dispatch(isLoggedIn({ uid, displayName, photoURL, email }))

			if (!isCancelled) {
				setIsPending(false)
				setError(null)
			}

			//catch error
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message)
				setError(err.message)
				setIsPending(false)
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { error, isPending, signup }
}
