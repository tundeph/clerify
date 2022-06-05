import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isLoggedIn, selectUserProfile } from "../redux/profileSlice"

const App = () => {
  const dispatch = useDispatch()
  const { userid } = useSelector(selectUserProfile)
  const [userIdValue, setUserIdValue] = useState(0)

  const handleChangeUser = () => {
    dispatch(isLoggedIn(userIdValue))
    console.log(userid, userIdValue)
  }

  return (
    <div className="App">
      Clerify {userid}
      <input type="text" onChange={(e) => setUserIdValue(e.target.value)} />
      <button onClick={handleChangeUser}>Change User </button>
    </div>
  )
}

export default App
