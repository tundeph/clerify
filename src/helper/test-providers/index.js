import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import theme from "../../layout/theme"
import { createMemoryHistory } from "history"
import { BrowserRouter } from "react-router-dom"
// As a basic setup, import your same slice reducers
// import userReducer from "../features/users/userSlice"

import { mockStore } from "./mock-store"

const ContextProvider = ({ children, ...props }) => {
  props.selectedBusinessId = ""
  props.business = {}

  return <>{children}</>
}

// export renderWithProviders
export function renderWithProviders(
  ui,
  {
    // preloadedState = {},
    store = mockStore,

    // Automatically create a store instance if no store was passed in
    // store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const history = createMemoryHistory()
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme.lightTheme}>
          <BrowserRouter location={history.location} navigator={history}>
            {children}
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function TestProvider({ children, store = mockStore }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme.lightTheme}>{children}</ThemeProvider>
    </Provider>
  )
}
