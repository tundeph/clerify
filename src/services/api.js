// the api that hooks redux slice and store
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["Profile", "Accounts", "Users"],
})
