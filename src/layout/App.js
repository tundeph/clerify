import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"
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
  // const dispatch = useDispatch()
  const { userid } = useSelector(selectUserProfile)
  const { profileTheme } = useSelector(selectUserProfile)

  // const [userIdValue, setUserIdValue] = useState(0)

  // const handleChangeUser = () => {
  //   dispatch(isLoggedIn(userIdValue))
  //   console.log(userid, userIdValue)
  // }

  return (
    <ThemeProvider theme={theme[profileTheme]}>
      <GlobalStyles />
      <AppWrapper>
        <BrowserRouter>
          {!userid && <Sidebar />}
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route
              path="/signup"
              element={
                !userid ? <Signup /> : <Navigate replace to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                userid ? <Dashboard /> : <Navigate replace to="/signin" />
              }
            />
            <Route
              path="/signin"
              element={
                !userid ? <Signin /> : <Navigate replace to="/dashboard" />
              }
            />
            <Route
              path="/add-business"
              element={
                !userid ? <AddBusiness /> : <Navigate replace to="/signin" />
              }
            />
            <Route
              path="/categorise"
              element={
                !userid ? <Categorise /> : <Navigate replace to="/signin" />
              }
            />
            <Route
              path="/keywords"
              element={
                !userid ? <KeywordsEdit /> : <Navigate replace to="/signin" />
              }
            />

            <Route
              path="/imports"
              element={
                !userid ? <ImportAccounts /> : <Navigate replace to="/signin" />
              }
            />
            <Route
              path="/reconcile"
              element={
                !userid ? <Reconcile /> : <Navigate replace to="/signin" />
              }
            />
            <Route
              path="/reports"
              element={
                !userid ? <Reports /> : <Navigate replace to="/signin" />
              }
            />
          </Routes>
        </BrowserRouter>
        {/* <input type="text" onChange={(e) => setUserIdValue(e.target.value)} />
      <button onClick={handleChangeUser}>Change User </button> */}
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
