import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"

//pages
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"
import Dashboard from "../pages/Dashboard"
import AddBusiness from "../pages/AddBusiness"

const App = () => {
  // const dispatch = useDispatch()
  const { userid } = useSelector(selectUserProfile)
  // const [userIdValue, setUserIdValue] = useState(0)

  // const handleChangeUser = () => {
  //   dispatch(isLoggedIn(userIdValue))
  //   console.log(userid, userIdValue)
  // }

  return (
    <div className="App">
      Clerify {userid}
      <BrowserRouter>
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
            element={userid ? <Dashboard /> : <Navigate replace to="/signin" />}
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
        </Routes>
      </BrowserRouter>
      {/* <input type="text" onChange={(e) => setUserIdValue(e.target.value)} />
      <button onClick={handleChangeUser}>Change User </button> */}
    </div>
  )
}

export default App
