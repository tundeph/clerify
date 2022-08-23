import React from "react"
import { Text } from "../layout/styles"

export const businessType = [
  { value: "", label: "Select type of business" },
  { value: "Sole Proprietorship", label: "Sole Proprietorship" },
  { value: "Partnership", label: "Partnership" },
  { value: "Limited Liability Company", label: "Limited Liability Company" },
  { value: "Public Liability Company", label: "Public Liability Company" },
  { value: "Non-Profit Organization", label: "Non-Profit Organization" },
]

export const businessCategories = [
  { value: "", label: "Select from categories" },
  { value: "Sales Income", label: "Sales Income" },
  { value: "Payroll", label: "Payroll" },
  { value: "Rent or mortgage payments", label: "Rent or mortgage payments" },
  { value: "Office supplies & expenses", label: "Office supplies & expenses" },
  { value: "Marketing & Advertising", label: "Marketing & Advertising" },
  { value: "Meals & Entertainment", label: "Meals & Entertainment" },
  { value: "Furniture & equipment", label: "Furniture & equipment" },
  { value: "Website and software expenses", label: "Website and software expenses" },
  { value: "Employee benefits", label: "Employee benefits" },
  { value: "Taxes", label: "Taxes" },
  { value: "Bank charges", label: "Bank charges" },
  { value: "Training & education", label: "Training & education" },
  { value: "Professional Services", label: "Professional Services" },
  { value: "Loan & Interest Payments", label: "Loan & Interest Payments" },
  { value: "Insurance", label: "Insurance" },
  { value: "Cost of goods", label: "Cost of goods" },
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
