import { configureStore } from "@reduxjs/toolkit"

import { api } from "./api"

export const store2 = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})
