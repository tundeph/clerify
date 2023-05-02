import { api } from "./api"
import { db, authService } from "../firebase/config"
import { transformLoginData } from "./utils"
import { reconcileAccts } from "../helper"

export const acctApi = api.injectEndpoints({
	endpoints: (build) => ({
		accounts: build.query({
			queryFn: async (selectedBusinessId) => {
				try {
					let result
					result = await new Promise((resolve, reject) =>
						db
							.collection("accounts")
							.doc(selectedBusinessId)
							.onSnapshot(
								(snapshot) => {
									if (snapshot.data()) {
										console.log(snapshot.data())
										resolve(snapshot.data())
									}
								},
								(err) => {
									throw err.message
								}
							)
					)
					return { data: result }
				} catch (error) {
					return { error: { error } }
				}
			},

			providesTags: ["Accounts"],
		}),

		updateAccounts: build.mutation({
			queryFn: async (body) => {
				const { selectedBusinessId, reconciledAccts } = body

				try {
					const ref = db.collection("accounts")
					await ref.doc(selectedBusinessId).update(reconciledAccts)
				} catch (err) {
					return { error: err }
				}
			},
			invalidatesTags: ["Accounts"],
		}),
	}),
})

export const { useAccountsQuery, useUpdateAccountsMutation } = acctApi
