import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute, renderProtectedRoutes } from "./protected-route"

import {
	Home,
	Signup,
	Signin,
	Dashboard,
	AddBusiness,
	CategoriseSettings,
	Sidebar,
	KeywordsSettings,
	SyncFromOpenBank,
	CategoriseTransaction,
	TransactionSettings,
	Reports,
	CategoryReports,
	FinancialReports,
	CashflowReports,
	VisualReports,
	MomReports,
	AccountSettings,
	AdminSettings,
	EditAccount,
	AddAccount,
	AddUserAccount,
	DeleteUserAccount,
} from "../pages"
import { useProfileQuery } from "../services/profile-slice2"

export const AppRoutes = ({ hasBusiness, handleChangeBusiness }) => {
	const { data } = useProfileQuery()
	const { user, business } = data

	const routes = [
		{ path: "/add-business", Element: AddBusiness },
		{ path: "/signup", Element: Signup, altPath: "/" },
		{ path: "/sync-accounts", Element: SyncFromOpenBank },
		{ path: "/reconcile", Element: CategoriseTransaction },
		{
			path: "/transaction-settings",
			Element: TransactionSettings,
			subPath: [
				{
					path: "",
					Element: TransactionSettings,
				},
				{ path: "/category", Element: CategoriseSettings },
				{ path: "/keywords", Element: KeywordsSettings },
			],
		},
		{ path: "/reports", Element: Reports },
		{
			path: "/reports/visual",
			Element: VisualReports,
			subPath: [
				{
					path: "",
					Element: CategoryReports,
				},
				{ path: "/cashflow", Element: CashflowReports },
				{ path: "/mom", Element: MomReports },
			],
		},
		{ path: "/reports/financial", Element: FinancialReports },
		{
			path: "/account-settings",
			Element: AccountSettings,
			subPath: [
				{ path: "", Element: EditAccount },
				{ path: "/add-user", Element: AddAccount },
			],
		},
		{
			path: "/admin-settings",
			Element: AdminSettings,
			subPath: [
				{ path: "", Element: AddUserAccount },
				{ path: "/delete", Element: DeleteUserAccount },
				{ path: "/add-business", Element: AddBusiness },
			],
		},
	]

	return (
		<BrowserRouter>
			{hasBusiness(user) && (
				<Sidebar
					business={business}
					onChange={(e) => handleChangeBusiness(e)}
				/>
			)}
			<Routes>
				<Route
					path="/"
					element={!user ? <Home /> : <Navigate to="/dashboard" />}
				/>
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
								to={!hasBusiness(business) ? "/add-business" : "/dashboard"}
							/>
						)
					}
				/>

				{renderProtectedRoutes(routes)}
			</Routes>
		</BrowserRouter>
	)
}
