import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./protected-route"

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
import MonoSync from "../backend/Sync1"

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
					path="/signup"
					element={!user ? <Signup /> : <Navigate replace to="/" />}
				/>
				<Route
					path="/signin"
					element={!user ? <Signin /> : <Navigate to="/add-business" />}
				/>
				<Route
					path="/add-business"
					element={
						!hasBusiness(user) ? (
							<AddBusiness />
						) : (
							<Navigate replace to="/dashboard" />
						)
					}
				/>
				<Route
					path="/sync-accounts"
					element={
						user ? <SyncFromOpenBank /> : <Navigate replace to="/signin" />
					}
				/>
				<Route
					path="/reconcile"
					element={
						<ProtectedRoute>
							<Categorise />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/reports"
					element={
						<ProtectedRoute>
							<Reports />
						</ProtectedRoute>
					}
				>
					<Route index element={<CategoryReports />} />
					<Route
						path="/reports/financial"
						element={
							<ProtectedRoute>
								<FinancialReports />
							</ProtectedRoute>
						}
					/>
				</Route>
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
			</Routes>
		</BrowserRouter>
	)
}
