import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute, renderProtectedRoutes } from "./protected-route"

import Home from "../pages/home"
import Signup from "../pages/signup"
import Signin from "../pages/signin"
import Dashboard from "../pages/dashboard"
import AddBusiness from "../pages/add-business/add-business"
import CategorySettings from "../pages/category-settings"
import Sidebar from "../pages/sidebar"
import KeywordsSettings from "../pages/keywords-settings"
import SyncFromOpenBank from "../pages/import/sync-from-open-bank"
import Categorise from "../pages/categorise"
import Reports from "../pages/reports/reports"
import CategoryReports from "../pages/reports/category-reports"
import FinancialReports from "../pages/reports/financial-reports"
import CashflowReports from "../pages/reports/cashflow-reports"
import VisualReports from "../pages/reports/visual-reports"
import MomReports from "../pages/reports/mom-reports"
import Settings from "../pages/settings/settings"
// import MonoSync from "../backend/Sync1"

const routes = [
	{ path: "/", Element: Home, altPath: "/dashboard" },
	{ path: "/add-business", Element: AddBusiness },
	{ path: "/signup", Element: Signup, altPath: "/" },
	{ path: "/sync-accounts", Element: SyncFromOpenBank },
	{ path: "/reconcile", Element: Categorise },
	{ path: "/reports", Element: Reports },
	{
		path: "/reports/visual",
		Element: VisualReports,
		subPath: [
			{
				path: "/category",
				Element: CategoryReports,
			},
			{ path: "/cashflow", Element: CashflowReports },
			{ path: "/mom", Element: MomReports },
		],
	},
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
		business: PropTypes.object,
	}),
}
