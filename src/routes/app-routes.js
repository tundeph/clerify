import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute, renderProtectedRoutes } from "./protected-route"

import Home from "../pages/Home"
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"
import Dashboard from "../pages/Dashboard"
import AddBusiness from "../pages/addbusiness/AddBusiness"
import CategorySettings from "../pages/CategorySettings"
import Sidebar from "../pages/Sidebar"
import KeywordsSettings from "../pages/KeywordsSettings"
import SyncFromOpenBank from "../pages/import/SyncFromOpenBank"
import Categorise from "../pages/Categorise"
import Reports from "../pages/reports/Reports"
import CategoryReports from "../pages/reports/CategoryReports"
import FinancialReports from "../pages/reports/FinancialReports"
import Settings from "../pages/settings/Settings"
// import MonoSync from "../backend/Sync1"

const routes = [
	{ path: "/", Element: Home, altPath: "/dashboard" },
	{ path: "/add-business", Element: AddBusiness },
	{ path: "/signup", Element: Signup, altPath: "/" },
	{ path: "/sync-accounts", Element: SyncFromOpenBank },
	{ path: "/reconcile", Element: Categorise },
	{ path: "/reports", Element: Reports },
	{ path: "/reports/visual", Element: CategoryReports },
	{ path: "/reports/financial", Element: FinancialReports },
]

export const AppRoutes = ({ user, hasBusiness, handleChangeBusiness }) => {
	return (
		<BrowserRouter>
			{hasBusiness(user) && (
				<Sidebar
					business={user.business}
					onChange={(e) => handleChangeBusiness(e)}
				/>
			)}
			<Routes>
				<Route
					path="/dashboard"
					element={
						hasBusiness(user) ? <Dashboard /> : <Navigate to="/signin" />
					}
				/>
				<Route
					path="/signin"
					element={
						!user ? (
							<Signin />
						) : (
							<Navigate
								to={!hasBusiness(user) ? "/add-business" : "/dashboard"}
							/>
						)
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				>
					<Route index element={<CategorySettings />} />
					<Route
						path="/settings/keywords"
						element={
							<ProtectedRoute>
								<KeywordsSettings />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings/accounts"
						element={
							<ProtectedRoute>
								<AddBusiness />
							</ProtectedRoute>
						}
					/>
				</Route>
				{renderProtectedRoutes(routes)}
			</Routes>
		</BrowserRouter>
	)
}

AppRoutes.propTypes = {
	user: PropTypes.shape({
		business: PropTypes.string,
	}),
}
