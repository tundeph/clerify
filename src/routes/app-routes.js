import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { renderProtectedRoutes, ProtectedRoute } from "./protected-route"

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
  VisualCategoryReport,
  FinancialReports,
  FinancialProfitAndLossReport,
  FinancialCashflowReport,
  VisualCashflowReport,
  VisualReports,
  VisualMomReport,
  AccountSettings,
  AdminSettings,
  EditAccount,
  AddAccount,
  AddUserAccount,
  DeleteUserAccount,
  ResetPassword,
} from "../pages"

export const AppRoutes = ({
  user,
  business,
  hasBusiness,
  selectedBusinessId,
  handleChangeBusiness,
}) => {
  const routes = [
    { path: "/add-business", Element: AddBusiness },
    { path: "/sync-accounts", Element: SyncFromOpenBank },
    { path: "/reconcile", Element: CategoriseTransaction },
    { path: "/transaction-settings", Element: TransactionSettings },
    { path: "/reports", Element: Reports },
    {
      path: "/reports/visual",
      Element: VisualReports,
      subPath: [
        {
          path: "",
          Element: VisualCategoryReport,
        },
        { path: "/cashflow", Element: VisualCashflowReport },
        { path: "/mom", Element: VisualMomReport },
      ],
    },
    {
      path: "/reports/financial",
      Element: FinancialReports,
      subPath: [
        {
          path: "",
          Element: FinancialProfitAndLossReport,
        },
        { path: "/cashflow", Element: FinancialCashflowReport },
      ],
    },
    { path: "/reset-password", Element: ResetPassword },
    {
      path: "/account-settings",
      Element: AccountSettings,
      subPath: [
        { path: "", Element: EditAccount },
        { path: "/add", Element: AddAccount },
        { path: "/category", Element: CategoriseSettings },
        { path: "/keywords", Element: KeywordsSettings },
      ],
    },
    {
      path: "/admin-settings",
      permission: "admin",
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
      {hasBusiness(business) && (
        <Sidebar
          business={business}
          permission={user.permission}
          onChange={(e) => handleChangeBusiness(e)}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            hasBusiness(business) ? <Dashboard /> : <Navigate to="/signin" />
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
        <Route
          path="/add-business"
          element={
            hasBusiness(business) ? (
              <Navigate to="/dashboard" />
            ) : (
              <ProtectedRoute>
                <AddBusiness />
              </ProtectedRoute>
            )
          }
        />
        <Route
          path="*"
          element={
            hasBusiness(business) ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {renderProtectedRoutes(routes, user, business, selectedBusinessId)}
      </Routes>
    </BrowserRouter>
  )
}
