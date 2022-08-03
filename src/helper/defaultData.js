import React from "react"
import { Text } from "../layout/styles"

export const businessType = [
  { value: "", text: "Select type of business" },
  { value: "Sole Proprietorship", text: "Sole Proprietorship" },
  { value: "Partnership", text: "Partnership" },
  { value: "Limited Liability Company", text: "Limited Liability Company" },
  { value: "Public Liability Company", text: "Public Liability Company" },
  { value: "Non-Profit Organization", text: "Non-Profit Organization" },
]

export const businessCategories = [
  { value: "", text: "Select from categories" },
  { value: "Sales Income", text: "Sales Income" },
  { value: "Payroll", text: "Payroll" },
  { value: "Rent or mortgage payments", text: "Rent or mortgage payments" },
  { value: "Office supplies & expenses", text: "Office supplies & expenses" },
  { value: "Marketing & Advertising", text: "Marketing & Advertising" },
  { value: "Meals & Entertainment", text: "Meals & Entertainment" },
  { value: "Furniture & equipment", text: "Furniture & equipment" },
  { value: "Website and software expenses", text: "Website and software expenses" },
  { value: "Employee benefits", text: "Employee benefits" },
  { value: "Taxes", text: "Taxes" },
  { value: "Bank charges", text: "Bank charges" },
  { value: "Training & education", text: "Training & education" },
  { value: "Professional Services", text: "Professional Services" },
  { value: "Loan & Interest Payments", text: "Loan & Interest Payments" },
  { value: "Insurance", text: "Insurance" },
  { value: "Cost of goods", text: "Cost of goods" },
]

export const syncModalMessages = (colors) => ({
  loading: {
    title: "Sync in Progress",
    text: (
      <Text justify="center" color={colors.gray600}>
        Please be patient, your data is being synchronized. Don't close this page, as this may take up to 5 mins.
      </Text>
    ),
  },
  adding: {
    title: "Adding to Database",
    text: (
      <Text justify="center" color={colors.green}>
        The your financial data is now being added to your account, please wait a bit more!
      </Text>
    ),
  },
  reconciling: {
    title: "Reconciling accounts...",
    text: (
      <Text justify="center" color={colors.green}>
        We're almost there. We are now automatically reconciling your new data with your categories.
      </Text>
    ),
  },
  error: {
    title: "Error!",
    text: (
      <Text justify="center" color={colors.red}>
        Data sync was not successful. Please retry!
      </Text>
    ),
  },
})
