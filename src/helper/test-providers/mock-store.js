import { configureStore } from "@reduxjs/toolkit"
import { api } from "../../services/api"

// create a store

export const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
