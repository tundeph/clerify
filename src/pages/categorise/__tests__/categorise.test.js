import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { reconcileAccts } from "../../../helper"
import {
	SALES_CAT_ID,
	BANK_CHARGES_CAT_ID,
	categories,
	transaction,
	salesTransactions,
} from "../fixtures"

const generateTransaction = (transaction, id, remarks, type) => {
	const transactionObject = Object.entries(transaction)
	const prop = id ? id : transactionObject[0][0]
	const value = { ...transactionObject[0][1], remarks, type }
	return { [prop]: value }
}

describe("transaction categorisation", () => {
	it("should categorize a sales transaction properly", () => {
		const id = "id1"

		const sales = generateTransaction(
			transaction,
			id,
			"NIP/WBP/PayStack-Paystack/374dc041-f75e-4a4e-96cf-feaab2647a3c/Paystack payo",
			"credit"
		)

		const categorized = reconcileAccts(categories, sales)
		expect(categorized[id].categoryId).toEqual(SALES_CAT_ID)
	})

	it("should categorize group of transactions properly", () => {
		const categorized = reconcileAccts(categories, salesTransactions)
		Object.entries(categorized).map((selected) => {
			expect(selected[1].categoryId).toEqual(SALES_CAT_ID)
		})
	})

	it("should not change categoryId if transactions does not match category type", () => {
		const id = "id1"
		const transactionType = "debit"
		const sales = generateTransaction(
			transaction,
			id,
			"NIP/WBP/PayStack-Paystack/374dc041-f75e-4a4e-96cf-feaab2647a3c/Paystack payo",
			transactionType
		)

		const categorized = reconcileAccts(categories, sales)
		expect(categorized[id].categoryId).not.toEqual(SALES_CAT_ID)
		expect(categorized[id].categoryId).toEqual("")
	})
})
