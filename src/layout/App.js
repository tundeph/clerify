// NEEDED - Error handling if useeffect data fails to render a modal or something

import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, authReady } from "../redux/profileSlice"
import { db, authService } from "../firebase/config"
import { useFirestore } from "../hooks/useFirestore"

import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../layout/GlobalStyles"
import theme from "../layout/theme"

//pages
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"
import Dashboard from "../pages/Dashboard"
import AddBusiness from "../pages/AddBusiness"
import Categorise from "../pages/Categorise"
import Sidebar from "../pages/Sidebar"
import KeywordsEdit from "../pages/KeywordsEdit"
import ImportAccounts from "../pages/import/ImportAccounts"
import SyncFromOpenBank from "../pages/import/SyncFromOpenBank"
import Reconcile from "../pages/Reconcile"
import Reports from "../pages/reports/Reports"
import CategoryReports from "../pages/reports/CategoryReports"
import FinancialReports from "../pages/reports/FinancialReports"
import Settings from "../pages/settings/Settings"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const App = () => {
  const dispatch = useDispatch()
  const { updateDocument } = useFirestore("business")
  const { user, authIsReady, profileTheme } = useSelector(selectUserProfile)
  // const navigate = useNavigate()

  useEffect(() => {
    const unsub = authService.onAuthStateChanged((user) => {
      if (!user && !authIsReady) {
        dispatch(authReady({ authIsReady: true }))
        // console.log("user: ", user, authIsReady)
      }
      if (user) {
        const { uid, displayName, photoURL, email } = user
        db.collection("business")
          .where("uid", "==", user.uid)
          .onSnapshot((snapshot) => {
            let business = {}
            let selectedBusinessId = null
            snapshot.docs.forEach((doc) => {
              let id = doc.id
              const { accts, name, type, selected, categories } = doc.data()
              if (selected) {
                selectedBusinessId = id
              }
              business[id] = { id, accts, name, type, selected, categories }
            })
            dispatch(
              authReady({
                data: { uid, displayName, photoURL, email, business },
                selectedBusinessId,
              })
            )
          })

        unsub(user)
      }
    })
  }, [])

  const handleChangeBusiness = (e, businesses) => {
    e.preventDefault()
    Object.entries(businesses).forEach((bus) => {
      bus[0] === e.target.value ? updateDocument(bus[0], { selected: true }) : updateDocument(bus[0], { selected: false })
    })
  }

  const hasBusiness = (user) => {
    if (user) {
      if (user.hasOwnProperty("business") && Object.keys(user.business).length) {
        return true
      }
    }
    return false
  }

  return (
    <ThemeProvider theme={theme[profileTheme]}>
      <GlobalStyles />
      {authIsReady && (
        <AppWrapper>
          <BrowserRouter>
            {hasBusiness(user) && <Sidebar business={user.business} onChange={(e) => handleChangeBusiness(e, user.business)} />}
            <Routes>
              <Route path="/" element={hasBusiness(user) ? <Dashboard /> : <Navigate to="/signin" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
              <Route path="/signin" element={!user ? <Signin /> : <Navigate to="/add-business" />} />
              <Route path="/add-business" element={!hasBusiness(user) ? <AddBusiness /> : <Navigate replace to="/" />} />
              <Route path="/sync-accounts" element={user ? <SyncFromOpenBank /> : <Navigate replace to="/signin" />} />
              <Route path="/reconcile" element={user ? <Reconcile /> : <Navigate replace to="/signin" />} />
              <Route path="/reports" element={user ? <Reports /> : <Navigate replace to="/signin" />}>
                <Route index element={<CategoryReports />} />
                <Route path="/reports/financial" element={user ? <FinancialReports /> : <Navigate replace to="/signin" />} />
              </Route>
              <Route path="/settings" element={user ? <Settings /> : <Navigate replace to="/signin" />}>
                <Route index element={<Categorise />} />
                <Route path="/settings/keywords" element={user ? <KeywordsEdit /> : <Navigate replace to="/signin" />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppWrapper>
      )}
    </ThemeProvider>
  )
}

export default App
