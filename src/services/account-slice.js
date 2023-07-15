// redux slice for account actions and operations
import { api } from "./api"

import {
  addAccountsService,
  getAccountsService,
  updateAccountsService,
} from "./account-service"

export const acctApi = api.injectEndpoints({
  endpoints: (build) => ({
    accounts: build.query({
      queryFn: async (selectedBusinessId) => {
        try {
          let result
          result = await new Promise((resolve) => {
            resolve(getAccountsService(selectedBusinessId))
          })

          return { data: result }
        } catch (error) {
          return { error: { error } }
        }
      },

      providesTags: ["Accounts"],
    }),

    addAccounts: build.mutation({
      queryFn: async (body) => {
        const { selectedBusinessId, accts } = body

        try {
          const result = await new Promise((resolve) => {
            resolve(addAccountsService(selectedBusinessId, accts))
          })
          if (result) {
            return { data: result }
          }
        } catch (err) {
          return { error: err }
        }
      },
      invalidatesTags: ["Accounts", "Profile"],
    }),

    updateAccounts: build.mutation({
      queryFn: async (body) => {
        const { selectedBusinessId, reconciledAccts } = body

        try {
          const result = await new Promise((resolve) => {
            resolve(updateAccountsService(selectedBusinessId, reconciledAccts))
          })
          if (result) {
            return { data: result }
          }
        } catch (err) {
          return { error: err }
        }
      },
      invalidatesTags: ["Accounts"],
    }),
  }),
})

export const {
  useAccountsQuery,
  useAddAccountsMutation,
  useUpdateAccountsMutation,
} = acctApi

// db
// 	.collection("accounts")
// 	.doc(selectedBusinessId)
// 	.onSnapshot(
// 		(snapshot) => {
// 			if (snapshot.data()) {
// 				console.log(snapshot.data())
// 				resolve(snapshot.data())
// 			}
// 		},
// 		(err) => {
// 			throw err.message
// 		}
// 	)
