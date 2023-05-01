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
  { value: "Sales Income", label: "Sales Income", type: "credit" },
  { value: "Payroll", label: "Payroll", type: "debit" },
  { value: "Rent or mortgage payments", label: "Rent or mortgage payments", type: "debit" },
  { value: "Office supplies & expenses", label: "Office supplies & expenses", type: "debit" },
  { value: "Marketing & Advertising", label: "Marketing & Advertising", type: "debit" },
  { value: "Meals & Entertainment", label: "Meals & Entertainment", type: "debit" },
  { value: "Furniture & equipment", label: "Furniture & equipment", type: "debit" },
  { value: "Website and software expenses", label: "Website and software expenses", type: "debit" },
  { value: "Employee benefits", label: "Employee benefits", type: "debit" },
  { value: "Taxes", label: "Taxes", type: "debit" },
  { value: "Bank charges", label: "Bank charges", type: "debit" },
  { value: "Training & education", label: "Training & education", type: "debit" },
  { value: "Professional Services", label: "Professional Services", type: "debit" },
  { value: "Loan & Interest Payments", label: "Loan & Interest Payments", type: "debit" },
  { value: "Insurance", label: "Insurance", type: "debit" },
  { value: "Cost of goods", label: "Cost of goods", type: "debit" },
]

export const syncModalMessages = (colors) => ({
  loading: {
    title: "Sync in Progress",
    text: (
      <Text justify="center" color={colors.gray600}>
        Please be patient, your data is being synchronized. Don't close this page, as this may take
        up to 5 mins.
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

export const returnColorOptions = () => {
  const col = [
    "#7f0000",
    "#4a148c",
    "#5472d3",
    "#bc5100",
    "#009624",
    "#8b6b61",
    "#ff5bff",
    "#9575cd",
    "#c51162",
    "#b71c1c",
    "#12005e",
    "#0d47a1",
    "#629749",
    "#f57f17",
    "#321911",
    "#5d4037",
    "#ff6090",
    "#7c43bd",
    "#002171",
    "#33691e",
    "#00c853",
    "#9e00c5",
    "#65499c",
  ]

  return col[Math.round(Math.random() * (col.length - 1) + 1)]
}
