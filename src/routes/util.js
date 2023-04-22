import { Route } from "react-router-dom"
import { ProtectedRoute } from "./protected-route"

export const renderRoutes = (routes) => {
	routes.map((route) => (
		<Route
			path={route.path}
			element={<ProtectedRoute>{route.element}</ProtectedRoute>}
		/>
	))
}
