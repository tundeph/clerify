export const transformLoginData = (data, user, initialState) => {
	let business = {}
	let selectedBusinessId
	let hasAccts = {}

	const { uid, displayName, photoURL, email } = user

	data.docs.map((doc) => {
		const { accts, name, type, selected, categories, lastAcctData } = doc.data()
		if (selected) {
			selectedBusinessId = doc.id
			hasAccts = lastAcctData
		}
		business[doc.id] = { id: doc.id, accts, name, type, selected, categories }
	})

	return {
		...initialState,
		user: { uid, displayName, photoURL, email, business },
		selectedBusinessId,
		lastAcctData: hasAccts,
		authIsReady: true,
	}
}
