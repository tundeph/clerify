import React, { useEffect } from "react"

import { useFirestore } from "../hooks/useFirestore"
import { useDocument } from "../hooks/useDocument"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../services/profile-slice"
import { LIVE_SECRET_KEY } from "../helper"

//function to get transactions
const fetchTransactions = async (id, secretKey) => {
	const options = {
		method: "GET",
		headers: { Accept: "application/json", "mono-sec-key": secretKey },
	}

	try {
		const response = await fetch(
			`https://api.withmono.com/accounts/${id}/statement?period=last12months`,
			options
		)
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

//function to exchange code for account id
const getExchangeToken = async (code, acctsId, document, secretKey) => {
	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"mono-sec-key": secretKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ code }),
	}

	const data = await fetch("https://api.withmono.com/account/auth", options)
	const response = await data.json()

	// edit accounts with sync id
	const editedAccts = document.accts.reduce((prev, acct) => {
		if (acct.id === acctsId) {
			acct.syncId = response.id
			prev.push(acct)
		} else {
			prev.push(acct)
		}
		return prev
	}, [])
	const updatedDocument = { ...document, ...{ accts: editedAccts } }
	const token = response.id

	return { token, updatedDocument }
}

export const MonoSync = (code, acctsId) => {
	const { selectedBusinessId, user } = useSelector(selectUserProfile)
	const { updateDocument } = useFirestore("business")
	const { document } = useDocument("business", selectedBusinessId)

	const { token, updatedDocument } = getExchangeToken(
		code,
		acctsId,
		document,
		LIVE_SECRET_KEY
	)
	updateDocument(selectedBusinessId, updatedDocument)
	const transactions = fetchTransactions(token, LIVE_SECRET_KEY)

	return transactions
}
