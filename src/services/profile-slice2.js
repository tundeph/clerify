import { api } from "./api"
import { db, authService } from "../firebase/config"
import { transformLoginData } from "./utils"

const initialState = {
	user: null,
	authIsReady: false,
	profileTheme: "lightTheme",
}

export const authApi = api.injectEndpoints({
	// refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		profile: build.query({
			queryFn: async ({ filters: {} }, { getState }) => {
				try {
					let result
					result = await new Promise((resolve, reject) =>
						authService.onAuthStateChanged(async (user) => {
							if (user) {
								db.collection("business")
									.where("uid", "==", user.uid)
									.onSnapshot((snapshot) => {
										resolve(transformLoginData(snapshot, user, initialState))
									})
							} else {
								resolve({ ...initialState, authIsReady: true })
							}
						})
					)
					console.log("resulttt", result)
					return { data: result }
				} catch (error) {
					return { error: { error } }
				}
			},

			providesTags: ["Profile"],
			// refetchOnMountOrArgChange: true,
		}),
		logOut: build.query({
			queryFn: async () => {
				try {
					let result
					result = await new Promise((resolve, reject) => {
						authService.signOut()
						console.log({ ...initialState, authIsReady: true })
						resolve({ ...initialState, authIsReady: true })
					})
					return { data: result }
				} catch (error) {
					return { error: { error } }
				}
			},
			invalidatesTags: ["Profile"],
		}),

		addPost: build.mutation({
			query(body) {
				return {
					url: `posts`,
					method: "POST",
					body,
				}
			},
			invalidatesTags: ["Posts"],
		}),
	}),
})

export const { useProfileQuery, useLogOutQuery } = authApi
