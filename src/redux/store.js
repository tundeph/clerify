import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileSlice"
import accountReducer from "./accountSlice"

export default configureStore({
  reducer: {
    userProfile: profileReducer,
    userAccts: accountReducer,
  },
})
