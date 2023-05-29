import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "@utils/test-providers"

import { Signin } from "../index"
import { useLogin } from "../../../hooks/useLogin"

const error = ""
const isPending = ""
const login = jest.fn()
const resetPassword = jest.fn()

jest.mock("../../../hooks/useLogin", () => ({
  useLogin: jest.fn(),
}))

beforeEach(() => {
  useLogin.mockImplementation(() => ({
    error,
    isPending,
    login,
    resetPassword,
  }))
})

const renderWithWrapper = () => {
  return renderWithProviders(<Signin />)
}

describe("Sign in page", () => {
  it("should render the sign in page", () => {
    const { getByRole } = renderWithWrapper()
    expect(getByRole("button", { name: /login/i })).toBeInTheDocument()
  })

  // it("should click only one checkbox to sort per time", () => {
  //   render(<Search options={options} handleSortBy={jest.fn} />)
  //   const nameSelectElement = screen.getByTestId("name")
  //   const addedSelectElement = screen.getByTestId("added")
  //   fireEvent.click(nameSelectElement)
  //   expect(addedSelectElement).not.toBeChecked()
  // })
})
