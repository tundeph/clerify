import React from "react"
import { Route, Navigate, useLocation } from "react-router-dom"
import { useProfileQuery } from "../services/profile-slice2"

export const ProtectedRoute = ({
	permission,
	altPath = "/signin",
	children,
}) => {
	const { data } = useProfileQuery()
	const { user } = data

	let location = useLocation()
	if (permission === "admin" && permission !== user.permission) {
		return <Navigate to={"dashboard"} replace />
	}

	if (!user) {
		return <Navigate to={altPath} state={{ from: location }} replace />
	}

	return children
}

export const renderProtectedRoutes = (
	routes,
	user,
	business,
	selectedBusinessId
) => {
	const protectedRoutes = routes.map((route, index) => {
		const { path, permission, Element } = route
		const defaultProps = {
			selectedBusinessId,
			user,
			business,
		}

		return (
			<React.Fragment key={index}>
				{route.subPath ? (
					<Route
						path={path}
						element={
							<ProtectedRoute
								altPath={route.altPath ? route.altPath : null}
								permission={permission}
							>
								<Element key={index} {...defaultProps} />
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
											permission={permission}
										>
											<Element key={subIndex} {...defaultProps} />
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
							<ProtectedRoute
								altPath={route.altPath ? route.altPath : null}
								permission={permission}
							>
								<Element key={index} {...defaultProps} />
							</ProtectedRoute>
						}
					/>
				)}
			</React.Fragment>
		)
	})

	return protectedRoutes
}
