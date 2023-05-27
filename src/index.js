import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./layout/App"

import { Provider } from "react-redux"
import { store } from "./services/store"

import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "./layout/ErrorFallback"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={(details) => console.log("error boundary")}
      >
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)
