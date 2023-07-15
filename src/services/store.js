// the store to maintain app state

import { configureStore } from "@reduxjs/toolkit"

import { api } from "./api"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
