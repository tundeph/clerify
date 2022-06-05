import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./layout/App"
import { Provider } from "react-redux"
import store from "./redux/store"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./layout/GlobalStyles"

import theme from "./layout/theme"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme["lightTheme"]}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
