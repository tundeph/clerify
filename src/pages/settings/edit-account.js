import React, { useState, useContext } from "react"
import { ThemeContext } from "styled-components"
import {
	useProfileQuery,
	useUpdateBusinessMutation,
} from "../../services/profile-slice2"
import { textSorter } from "../../helper"

import { handleButtonState } from "../../helper"
import { size } from "../../layout/theme"
import { Text, DivWrapper, Form, FormInput } from "../../layout/styles"
import Select from "../../components/select"

import { findIndex, assocPath, propEq, prop, find } from "ramda"

export const EditAccount = () => {
	const { colors } = useContext(ThemeContext)
	const {
		data: { business, selectedBusinessId },
	} = useProfileQuery()
	const [updateBusiness, { error, isLoading }] = useUpdateBusinessMutation()

	const [editedAccts, setEditedAccts] = useState("")
	const [selectedAccount, setSelectedAccount] = useState("")
	const buttonCondition = editedAccts && editedAccts.length > 2

	const bankAccounts = textSorter(
		[...business[selectedBusinessId].accts],
		"asc",
		"acctName"
	).map((acct) => ({
		value: acct.id,
		label: acct.acctName,
	}))

	const sortedBankAccounts = [
		{ value: "", label: "Select account" },
		...bankAccounts,
	]

	const getAcctNameById = (id, business, selectedBusinessId) => {
		const acct = find(propEq(id, "id"), business[selectedBusinessId].accts)
		return acct ? prop("acctName", acct) : undefined
	}

	const handleChangeSelectedAcct = (e) => {
		const selected = e.target.value
		setSelectedAccount(selected)
		setEditedAccts(getAcctNameById(selected, business, selectedBusinessId))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// merges edited acct name into the business object
		const indexToUpdate = findIndex(
			(acct) => acct.id === selectedAccount,
			business[selectedBusinessId].accts
		)
		const pathToAcctName = [
			selectedBusinessId,
			"accts",
			indexToUpdate,
			"acctName",
		]
		const updatedBusiness = assocPath(pathToAcctName, editedAccts, business)

		// writes the updated business to db
		await updateBusiness({ selectedBusinessId, updatedBusiness })
		if (!error) {
			setEditedAccts("")
			setSelectedAccount("")
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<DivWrapper top={2} gap={size.xs}>
				<Select
					label="Select a business"
					name="business"
					options={sortedBankAccounts}
					onChange={handleChangeSelectedAcct}
					value={selectedAccount}
				/>

				<FormInput
					onChange={(e) => setEditedAccts(e.target.value)}
					value={editedAccts}
					type="text"
				/>

				{handleButtonState(
					isLoading,
					"Loading",
					"Edit account",
					buttonCondition
				)}
			</DivWrapper>
			{error && <Text color={colors.red}>{error}</Text>}
		</Form>
	)
}
