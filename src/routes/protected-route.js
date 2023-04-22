import React from "react"
import { Route, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"

export const ProtectedRoute = ({ children, altPath = "/signin" }) => {
	const { user } = useSelector(selectUserProfile)
	let location = useLocation()

	if (!user) {
		return <Navigate to={altPath} state={{ from: location }} replace />
	}

	return children
}

export const renderProtectedRoutes = (routes) => {
	const m = routes.map((route, index) => {
		const { path, Element } = route

		return (
			<Route
				key={index}
				path={route.path}
				element={
					<ProtectedRoute altPath={route.altPath ? route.altPath : null}>
						<Element />
					</ProtectedRoute>
				}
			/>
		)
	})

	return m
}
