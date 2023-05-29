import React from "react"
import "@testing-library/jest-dom"
import { waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  it("should display disabled button", () => {
    const { getByRole } = renderWithWrapper()
    expect(getByRole("button", { name: /login/i })).toBeDisabled()
  })

  it("should fulfill condition before button is enabled", async () => {
    const { getByTestId, getByRole } = renderWithWrapper()
    act(() => {
      userEvent.type(getByTestId("email"), "carpaddy@carpaddy.com")
      userEvent.type(getByTestId("password"), "cccccc")
    })

    await waitFor(() => {
      expect(getByRole("button", { name: /login/i })).not.toBeDisabled()
    })
  })
})
