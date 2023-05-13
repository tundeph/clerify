export const transformLoginData = (data, user, initialState) => {
	let business = {}
	let selectedBusinessId
	let hasAccts = {}
	let permission = null

	const { uid, displayName, photoURL, email } = user

	data.docs.forEach((doc) => {
		const { accts, name, type, selected, categories, lastAcctData, users } =
			doc.data()
		if (selected) {
			selectedBusinessId = doc.id
			hasAccts = lastAcctData
		}
		business[doc.id] = { id: doc.id, accts, name, type, selected, categories }
		permission = users.filter((user) => user.uid === uid)[0].permission
	})

	return {
		...initialState,
		user: { uid, displayName, photoURL, email, permission },
		business,
		selectedBusinessId,
		lastAcctData: hasAccts,
		authIsReady: true,
	}
}
