import React from "react"
import { Route, Navigate, useLocation } from "react-router-dom"
import { useProfileQuery } from "../services/profile-slice2"

export const ProtectedRoute = ({ altPath = "/signin", children }) => {
	const { data } = useProfileQuery()
	const { user } = data

	let location = useLocation()

	if (!user) {
		return <Navigate to={altPath} state={{ from: location }} replace />
	}

	return children
}

export const renderProtectedRoutes = (routes) => {
	const protectedRoutes = routes.map((route, index) => {
		const { path, Element } = route

		return (
			<React.Fragment key={index}>
				{route.subPath ? (
					<Route
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
						path={route.path}
						element={
							<ProtectedRoute altPath={route.altPath ? route.altPath : null}>
								<Element key={index} />
							</ProtectedRoute>
						}
					/>
				)}
			</React.Fragment>
		)
	})

	return protectedRoutes
}
