import { api } from "./api"
import { db, authService } from "../firebase/config"
import { transformLoginData } from "./utils"

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
	}),
})

export const { useAccountsQuery } = acctApi
