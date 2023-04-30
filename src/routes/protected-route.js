import React from "react"
import { Route, Navigate, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { selectUserProfile } from "../services/profile-slice"
// import { useProfileQuery } from "../services/profile-slice2"

export const ProtectedRoute = ({ user, altPath = "/signin", children }) => {
	// const { data } = useProfileQuery()
	// const { user } = data
	console.log("routes user", user)
	// const { user } = useSelector(selectUserProfile)
	let location = useLocation()
	console.log("location", location)
	if (!user) {
		// return <Navigate to={altPath} state={{ from: location }} replace />
		return <Navigate to={altPath} replace />
	}

	return children
}

export const renderProtectedRoutes = (routes, user) => {
	const protectedRoutes = routes.map((route, index) => {
		const { path, Element } = route

		return (
			<>
				{route.subPath ? (
					<Route
						key={index}
						path={path}
						element={
							<ProtectedRoute
								user={user}
								altPath={route.altPath ? route.altPath : null}
							>
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
											user={user}
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
							<ProtectedRoute
								user={user}
								altPath={route.altPath ? route.altPath : null}
							>
								<Element key={index} />
							</ProtectedRoute>
						}
					/>
				)}
			</>
		)
	})

	return protectedRoutes
}
