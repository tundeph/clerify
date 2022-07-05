import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, authReady } from "../redux/profileSlice"
import { db, authService } from "../firebase/config"

import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../layout/GlobalStyles"
import theme from "../layout/theme"

//pages
import Landing from "../pages/Landing"
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"
import Dashboard from "../pages/Dashboard"
import AddBusiness from "../pages/AddBusiness"
import Categorise from "../pages/Categorise"
import Sidebar from "../pages/Sidebar"
import KeywordsEdit from "../pages/KeywordsEdit"
import ImportAccounts from "../pages/import/ImportAccounts"
import Reconcile from "../pages/Reconcile"
import Reports from "../pages/reports/Reports"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = authService.onAuthStateChanged((user) => {
      const { uid, displayName, photoURL, email } = user
      let business = []
      db.collection("business")
        .where("uid", "==", uid)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc, i) => {
            const { accts, name, type } = doc.data()
            business.push({ accts, name, type })
          })
          dispatch(authReady({ uid, displayName, photoURL, email, business }))
        })
      // dispatch(authReady({ uid, displayName, photoURL, email }))
      unsub()
    })
  }, [])

  const { user, authIsReady = true, profileTheme } = useSelector(selectUserProfile)

  return (
    <ThemeProvider theme={theme[profileTheme]}>
      <GlobalStyles />
      {authIsReady && (
        <AppWrapper>
          <BrowserRouter>
            {user && user.business.length > 0 && <Sidebar business={user.business} />}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to="/signin" />} />
              <Route
                path="/signin"
                element={
                  user && user.business.length < 1 ? (
                    <Navigate replace to="/add-business" />
                  ) : user && user.business.length > 0 ? (
                    <Navigate replace to="/dashboard" />
                  ) : (
                    <Signin />
                  )
                }
              />
              <Route path="/add-business" element={user ? <AddBusiness /> : <Navigate replace to="/signin" />} />
              <Route path="/categorise" element={user ? <Categorise /> : <Navigate replace to="/signin" />} />
              <Route path="/keywords" element={user ? <KeywordsEdit /> : <Navigate replace to="/signin" />} />

              <Route path="/imports" element={user ? <ImportAccounts /> : <Navigate replace to="/signin" />} />
              <Route path="/reconcile" element={user ? <Reconcile /> : <Navigate replace to="/signin" />} />
              <Route path="/reports" element={user ? <Reports /> : <Navigate replace to="/signin" />} />
            </Routes>
          </BrowserRouter>
        </AppWrapper>
      )}
    </ThemeProvider>
  )
}

export default App
