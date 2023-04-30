import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profile-slice"
import accountReducer from "./account-slice"

export default configureStore({
	reducer: {
		userProfile: profileReducer,
		userAccts: accountReducer,
	},
})
