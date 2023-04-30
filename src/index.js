import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./layout/App"
import { Provider } from "react-redux"
import store from "./services/store"
import { store2 } from "./services/store2"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<Provider store={store2}>
			<App />
		</Provider>
	</React.StrictMode>
)
