import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profile-slice"

import { api } from "./api"

export const store2 = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		userProfile: profileReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})
