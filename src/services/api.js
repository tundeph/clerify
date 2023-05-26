import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	endpoints: () => ({}),
	tagTypes: ["Profile", "Accounts", "Users"],
})
