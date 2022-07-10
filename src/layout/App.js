import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

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
import Reconcile from "../pages/Reconcile"
import Reports from "../pages/reports/Reports"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const App = () => {
  const dispatch = useDispatch()
  const { updateDocument } = useFirestore("business")
  const { user, authIsReady = true, profileTheme } = useSelector(selectUserProfile)

  useEffect(() => {
    const unsub = authService.onAuthStateChanged((user) => {
      const { uid, displayName, photoURL, email } = user
      db.collection("business")
        .where("uid", "==", uid)
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
          dispatch(authReady({ data: { uid, displayName, photoURL, email, business }, selectedBusinessId }))
        })

      unsub()
    })
  }, [])

  const handleChangeBusiness = (e, businesses) => {
    e.preventDefault()
    Object.entries(businesses).forEach((bus) => {
      bus[0] === e.target.value ? updateDocument(bus[0], { selected: true }) : updateDocument(bus[0], { selected: false })
    })
  }

  return (
    <ThemeProvider theme={theme[profileTheme]}>
      <GlobalStyles />
      {authIsReady && (
        <AppWrapper>
          <BrowserRouter>
            {user && Object.keys(user.business).length > 0 && (
              <Sidebar business={user.business} onChange={(e) => handleChangeBusiness(e, user.business)} />
            )}
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate replace to="/signin" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
              <Route
                path="/signin"
                element={
                  user && Object.keys(user.business).length < 1 ? (
                    <Navigate replace to="/add-business" />
                  ) : user && Object.keys(user.business).length > 0 ? (
                    <Navigate replace to="/" />
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
