// tests for the categorise functions
import "@testing-library/jest-dom"

import { reconcileAccts } from "../../../helper"
import {
  SALES_CAT_ID,
  categories,
  transaction,
  salesTransactions,
} from "../fixtures"

const generateTransaction = (transaction, id, remarks, type) => {
  const prop = id ? id : transaction[0].id
  const value = { ...transaction[0], id: prop, remarks, type }
  return [value]
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
    expect(categorized[0].categoryId).toEqual(SALES_CAT_ID)
  })

  it("should categorize group of transactions properly", () => {
    const categorized = reconcileAccts(categories, salesTransactions)
    categorized.forEach((selected) => {
      expect(selected.categoryId).toEqual(SALES_CAT_ID)
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
    expect(categorized[0].categoryId).not.toEqual(SALES_CAT_ID)
    expect(categorized[0].categoryId).toEqual("")
  })
})
