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
			<>
				{route.subPath ? (
					<Route
						key={index}
						path={path}
						element={
							<ProtectedRoute altPath={route.altPath ? route.altPath : null}>
								<Element key={index} />
							</ProtectedRoute>
						}
					>
						{route.subPath.map((subRoute, subIndex) => {
							const { Element } = subRoute

							return (
								<Route
									key={subIndex}
									{...(subIndex === 0
										? { index: "true" }
										: { path: `${path}${subRoute.path}` })}
									element={
										<ProtectedRoute
											altPath={subRoute.altPath ? subRoute.altPath : null}
										>
											<Element key={subIndex} />
										</ProtectedRoute>
									}
								/>
							)
						})}
					</Route>
				) : (
					<Route
						key={index}
						path={route.path}
						element={
							<ProtectedRoute altPath={route.altPath ? route.altPath : null}>
								<Element key={index} />
							</ProtectedRoute>
						}
					/>
				)}
			</>
		)
	})

	return m
}
